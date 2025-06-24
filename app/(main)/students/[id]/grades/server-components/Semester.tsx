"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getOrdinal } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import EnlistedSubject from "./EnlistedSubject";
import { SemesterData } from "./EnrollmentsServer";
import GWA from "./GWA";
import RemoveEnrollmentForm from "./RemoveEnrollmentForm";
type Props = {
    year_level: number;
    semester: SemesterData;
    dragging: boolean;
    student_id: number;
};
export default function Semester(props: Props) {
    const { setNodeRef } = useDroppable({
        id: props.semester.enrollment_id,
    });

    let total_units = 0;
    props.semester.subjects.forEach((subject) => {
        total_units += subject.subject.units;
    });

    return (
        <>
            <Card
                ref={setNodeRef}
                className={`2xl:w-1/2 w-full hover:bg-gray-100 border-0 shadow-none bg-gray-50 semester transition-all duration-200 ${props.dragging ? "border-2 border-green-400 bg-green-50" : "border-2 border-white"}`}
            >
                <CardHeader>
                    <CardTitle>
                        {props.semester.semester == 3
                            ? "Mid year"
                            : `${getOrdinal(props.semester.semester)} semester`}
                    </CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        {props.semester.subjects.length <= 0 && (
                            <RemoveEnrollmentForm
                                enrollment_id={props.semester.enrollment_id}
                                student_id={props.student_id}
                            />
                        )}
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {props.semester.subjects.length <= 0 ? (
                        <div className="text-gray-500">
                            <i>
                                Grab a subject on the right side and drop here
                            </i>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Units</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.semester.subjects.map(
                                    (subject, index) => (
                                        <EnlistedSubject
                                            key={index}
                                            student_id={props.student_id}
                                            enrollment_id={
                                                props.semester.enrollment_id
                                            }
                                            subject_with_grade={subject}
                                        />
                                    )
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                <CardFooter className="flex h-full items-end">
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex w-full justify-between">
                            Max allowed units:
                            <div>Units: {total_units}</div>
                            <div className="text-wrap z-50">
                                GWA:{" "}
                                {props.semester.subjects.length > 0 ? (
                                    <GWA
                                        subjects_with_grades={
                                            props.semester.subjects
                                        }
                                    />
                                ) : (
                                    "N/A"
                                )}
                            </div>
                        </div>
                        <div className="font-semibold">
                            {props.semester.semester == 3
                                ? "Mid year"
                                : `${getOrdinal(props.semester.semester)} semester`}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
