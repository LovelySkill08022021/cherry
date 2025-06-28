"use client";

import { createEnrollment } from "@/actions/students/grades/create-enrollment";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getOrdinal } from "@/lib/utils";
import { ClipboardPlus, LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { ValidYearLevel } from "./page";

type Props = {
    student_id: number;
    valid_year_levels: ValidYearLevel[];
};

export default function NewEnrollment(props: Props) {
    const semesters_reference = [1, 2, 3];
    const [semesters, setSemesters] = useState<number[]>();

    const [pending, startTransition] = useTransition();
    const [form, setForm] = useState({
        student_id: props.student_id,
        year_level: "",
        semester: "",
        sy: "",
    });

    function handleHandleSubmit() {
        startTransition(async () => {
            const response = await createEnrollment({
                student_id: form.student_id,
                year_level: Number(form.year_level),
                semester: Number(form.semester),
                sy: form.sy,
            });

            if (response.status == "warning") {
                toast.warning("Warning", {
                    description: response.message,
                });
                return;
            }

            if (!response.status) {
                toast.error("Notice", {
                    description: response.message,
                });

                return;
            }

            toast.success("Message", {
                description: response.message,
            });

            setForm({
                ...form,
                year_level: "",
                semester: "",
            });
        });
    }

    function handleYearLevelChange(value: string): void {
        setForm({ ...form, year_level: value });

        let used_semesters_reference: number[] = [];

        for (const valid_year_level of props.valid_year_levels) {
            if (Number(value) == valid_year_level.year_level) {
                used_semesters_reference = valid_year_level.used_semesters;
                break;
            }
        }

        const valid_semesters = semesters_reference.filter((semester) => {
            const is_used = used_semesters_reference.includes(semester);
            return !is_used;
        });

        setSemesters(valid_semesters);
    }

    function SemesterOptions() {
        return semesters?.map((item, index) => {
            if (item == 3) {
                return (
                    <SelectItem key={index} value={String(item)}>
                        Mid year
                    </SelectItem>
                );
            }
            return (
                <SelectItem key={index} value={String(item)}>
                    {getOrdinal(item)} semester
                </SelectItem>
            );
        });
    }

    useEffect(() => {
        const d = new Date(Date.now());
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        let current_sy = "";

        if (month <= 6) {
            current_sy = `SY ${year - 1}-${year}`;
        } else {
            current_sy = `SY ${year}-${year + 1}`;
        }

        setForm({
            ...form,
            sy: current_sy,
        });
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus /> New enrollment
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new enrollment</DialogTitle>
                    {/* <DialogDescription>
                        Create 
                    </DialogDescription> */}
                </DialogHeader>
                {/* {JSON.stringify(form)} */}
                {/* <div>
                    used_semesters: {JSON.stringify(props.valid_year_levels)}
                </div> */}
                {/* <div>{semesters}</div> */}
                <div>
                    <Input
                        autoFocus={false}
                        value={form.sy}
                        onChange={(e) =>
                            setForm({ ...form, sy: e.target.value })
                        }
                    />
                </div>
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(value) =>
                                handleYearLevelChange(value)
                            }
                            value={form.year_level}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Year Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.valid_year_levels.map((item, index) => (
                                    <SelectItem
                                        key={index}
                                        value={String(item.year_level)}
                                    >
                                        {getOrdinal(item.year_level)} year
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <Select
                            onValueChange={(value) =>
                                setForm({ ...form, semester: value })
                            }
                            value={form.semester}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SemesterOptions />
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleHandleSubmit} disabled={pending}>
                        {pending ? (
                            <>
                                <LoaderCircle
                                    className="animate-spin"
                                    strokeWidth={3}
                                    size={15}
                                />{" "}
                                Creating...
                            </>
                        ) : (
                            <>
                                <ClipboardPlus /> Create
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
