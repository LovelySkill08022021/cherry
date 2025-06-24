"use client";

import { addStudentGrade } from "@/actions/students/add-student-grade";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Grade, Subject } from "@/types";
import { LoaderCircle, Save, SquarePen } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ModifyForm from "../../prospectus/server-components/ModifyForm";

export default function AddGradeForm({
    student_id,
    subject,
    student_grades,
    enrollment_id,
}: {
    student_id: number;
    subject: Subject;
    student_grades: Grade[];
    enrollment_id: number;
}) {
    const [pending, startTransition] = useTransition();
    const [grade, setGrade] = useState("");

    function handleGradeSubmit() {
        startTransition(async () => {
            const response = await addStudentGrade(
                enrollment_id,
                student_id,
                subject.id,
                grade
            );

            if (response.status == true) {
                toast.success("Message", {
                    description: response.message,
                });
            }

            if (response.status == "warn") {
                toast.warning("Warning", {
                    description: response.message,
                });
            }

            if (response.status == false) {
                toast.error("Notice", {
                    description: response.message,
                });
            }
        });
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-0 h-0 p-3 shadow-none bg-gray-200 text-amber-600 hover:bg-amber-600 hover:text-white"
                    >
                        <SquarePen />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Add or edit grade for{" "}
                            <span className="text-red-600">{subject.code}</span>
                        </DialogTitle>
                        <DialogDescription>
                            You can only add a maximum of 3 grades per subject.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Grade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {student_grades.map(
                                        (student_grade, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="flex gap-2">
                                                    <ModifyForm
                                                        student_grade={
                                                            student_grade
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>

                            {((student_grades.length < 3 &&
                                student_grades[student_grades.length - 1]
                                    ?.value > 3) ||
                                student_grades.length <= 0) && (
                                <>
                                    <div className="font-semibold mt-5">
                                        Add student grade
                                    </div>
                                    <div className="flex gap-2">
                                        <Select
                                            value={grade}
                                            onValueChange={(value) =>
                                                setGrade(value)
                                            }
                                        >
                                            <SelectTrigger className="w-1/2">
                                                <SelectValue placeholder="Select a grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Grades
                                                    </SelectLabel>
                                                    <SelectItem value="1">
                                                        1.00
                                                    </SelectItem>
                                                    <SelectItem value="1.25">
                                                        1.25
                                                    </SelectItem>
                                                    <SelectItem value="1.5">
                                                        1.50
                                                    </SelectItem>
                                                    <SelectItem value="1.75">
                                                        1.75
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        2.00
                                                    </SelectItem>
                                                    <SelectItem value="2.25">
                                                        2.25
                                                    </SelectItem>
                                                    <SelectItem value="2.5">
                                                        2.50
                                                    </SelectItem>
                                                    <SelectItem value="2.75">
                                                        2.75
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        3.00
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4.00
                                                    </SelectItem>
                                                    <SelectItem value="5">
                                                        5.00
                                                    </SelectItem>
                                                    <SelectItem value="6">
                                                        INC
                                                    </SelectItem>
                                                    <SelectItem value="7">
                                                        IP
                                                    </SelectItem>
                                                    <SelectItem value="8">
                                                        DRP
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            onClick={handleGradeSubmit}
                                            disabled={pending}
                                        >
                                            {pending ? (
                                                <>
                                                    <LoaderCircle
                                                        className="animate-spin"
                                                        strokeWidth={3}
                                                        size={15}
                                                    />{" "}
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save /> Save
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
