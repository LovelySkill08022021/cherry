"use client";
import {
    addEnrollmentSubject,
    checkDuplicateEntry,
    checkNoGradeEnrolledSubject,
} from "@/actions/students/grades/add-enrollment-subject";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getOrdinal } from "@/lib/utils";
import { Subject } from "@/types";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CircleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DraggableSubject from "./DraggableSubject";
import { YearLevelData } from "./EnrollmentsServer";
import YearLevel from "./YearLevel";

export default function EnrollmentsClient({
    student_id,
    enrollment_data,
    student_subjects,
    year_levels_and_semesters,
}: {
    student_id: number;
    enrollment_data: YearLevelData[];
    student_subjects: {
        id: number;
        code: string;
        title: string;
        units: number;
        year_level: number;
        semester: number;
    }[];
    year_levels_and_semesters: {
        year_level: number;
        semester: number;
    }[];
}) {
    const [dragging, setDragging] = useState(false);
    const [activeId, setActiveId] = useState<UniqueIdentifier>();
    const [draggedSubject, setDraggedSubject] = useState<Subject>();

    function handleDragStart(event: DragEndEvent) {
        console.log(event);

        setDragging(true);
        setActiveId(event.active.id);
    }

    async function handleDragEnd(event: DragEndEvent) {
        const subject_id = event.active.id;
        const enrollment_id = event.over?.id;

        setDragging(false);

        if (!enrollment_id) return;

        const check_response = await checkDuplicateEntry(
            Number(enrollment_id),
            Number(subject_id)
        );

        if (!check_response.status) {
            toast.warning("Duplicate entry", {
                description: check_response.message,
            });

            return;
        }

        const cnges_response = await checkNoGradeEnrolledSubject(
            Number(enrollment_id),
            Number(subject_id),
            student_id
        );

        if (!cnges_response.status) {
            toast.info("Cannot proceed", {
                description: cnges_response.message,
            });

            return;
        }

        const response = addEnrollmentSubject(
            Number(enrollment_id),
            Number(subject_id),
            student_id
        );

        toast.promise(response, {
            loading: <div>Adding subject, please wait.</div>,
            success: (data) => {
                return `${data.message}`;
            },

            error: (error) => {
                return `${error}`;
            },
        });
    }

    const [keyword, setKeyword] = useState("");
    const [searched_subjects, setSS] = useState(student_subjects);
    function searchSubject(val: string) {
        setKeyword(val);
        setSS(
            student_subjects.filter((subject) => {
                return subject.code.toLowerCase().includes(val.toLowerCase());
            })
        );
    }

    useEffect(() => {
        searchSubject(keyword);
    }, [student_subjects]);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-col gap-7 w-3/4">
                {enrollment_data.map((data, index) => (
                    <YearLevel
                        key={index}
                        student_id={student_id}
                        year_level_data={data}
                        dragging={dragging}
                    />
                ))}
            </div>
            <div className="w-1/4">
                <Card className="w-full border-0 shadow-none top-0 sticky  max-h-[calc(100dvh-(--spacing(10)))]">
                    <CardHeader>
                        <CardTitle>Subject</CardTitle>
                        <CardDescription>Available subjects</CardDescription>
                        {/* <CardAction>Card Action</CardAction> */}

                        <div className="">
                            <Input
                                placeholder="Search subject"
                                value={keyword}
                                onChange={(e) => searchSubject(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="overflow-y-auto">
                        <Accordion type="multiple">
                            {year_levels_and_semesters.map(
                                (item, superindex) => (
                                    <AccordionItem
                                        key={superindex}
                                        value={`${superindex}`}
                                    >
                                        <AccordionTrigger>
                                            <div className="font-semibold">
                                                {getOrdinal(item.year_level)}{" "}
                                                year
                                                {" | "}
                                                {getOrdinal(item.semester)}{" "}
                                                semester
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div>
                                                {searched_subjects
                                                    .filter((subject) => {
                                                        return (
                                                            subject.year_level ==
                                                                item.year_level &&
                                                            subject.semester ==
                                                                item.semester
                                                        );
                                                    })
                                                    .map((subject, index) => (
                                                        <DraggableSubject
                                                            key={index}
                                                            onDrag={(data) =>
                                                                setDraggedSubject(
                                                                    data
                                                                )
                                                            }
                                                            drag_id={subject.id}
                                                            subject={subject}
                                                            className={` ${dragging && activeId == subject.id ? "opacity-0 cursor-grabbing" : "border-white shadow-none cursor-grab"}`}
                                                        />
                                                    ))}

                                                <div>
                                                    {searched_subjects.filter(
                                                        (subject) => {
                                                            return (
                                                                subject.year_level ==
                                                                    item.year_level &&
                                                                subject.semester ==
                                                                    item.semester
                                                            );
                                                        }
                                                    ).length <= 0 && (
                                                        <div className="text-blue-700 bg-blue-50 flex gap-1 py-2 px-2 text-sm">
                                                            <CircleAlertIcon
                                                                size={20}
                                                            />{" "}
                                                            No item
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            )}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <DragOverlay
                modifiers={[restrictToWindowEdges]}
                dropAnimation={null}
            >
                {draggedSubject && (
                    <DraggableSubject
                        drag_id={Number(activeId)}
                        subject={draggedSubject}
                        className={` ${dragging ? "bg-red-700 text-white shadow-xl/50 cursor-grabbing" : "border-white shadow-none cursor-grab"}`}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}
