import { modifyStudentGrade } from "@/actions/students/modify-student-grade";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Grade } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import RemoveGradeForm from "./RemoveGradeForm";

export default function ModifyForm({
    student_grade,
}: {
    student_grade: Grade;
}) {
    const [prevgrade, setPrevGrade] = useState(student_grade.value);
    const [grade, setGrade] = useState(student_grade.value);
    const [pending, startTransition] = useTransition();

    function handleGradeChange(value: string, grade_id: number) {
        setGrade(Number(value));
        startTransition(async () => {
            const response = await modifyStudentGrade(
                value,
                grade_id,
                student_grade.student_id
            );

            if (response.status) {
                toast.success("Message", {
                    description: response.message,
                });
                setPrevGrade(grade);
            }

            if (!response.status) {
                setGrade(prevgrade);
                toast.error("Notice", {
                    description: response.message,
                });
            }
        });
    }
    return (
        <>
            <Select
                value={String(grade)}
                onValueChange={(value) =>
                    handleGradeChange(value, student_grade.id)
                }
            >
                <SelectTrigger className="w-[100px]" disabled={pending}>
                    <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Grades</SelectLabel>
                        <SelectItem value="1">1.00</SelectItem>
                        <SelectItem value="1.25">1.25</SelectItem>
                        <SelectItem value="1.5">1.50</SelectItem>
                        <SelectItem value="1.75">1.75</SelectItem>
                        <SelectItem value="2">2.00</SelectItem>
                        <SelectItem value="2.25">2.25</SelectItem>
                        <SelectItem value="2.5">2.50</SelectItem>
                        <SelectItem value="2.75">2.75</SelectItem>
                        <SelectItem value="3">3.00</SelectItem>
                        <SelectItem value="4">4.00</SelectItem>
                        <SelectItem value="5">5.00</SelectItem>
                        <SelectItem value="6">INC</SelectItem>
                        <SelectItem value="7">IP</SelectItem>
                        <SelectItem value="8">DRP</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <RemoveGradeForm grade={student_grade} />
            {pending && (
                <span className="flex items-center gap-1">
                    <LoaderCircle
                        className="animate-spin text-blue-500"
                        strokeWidth={3}
                        size={15}
                    />
                    Updating...
                </span>
            )}
        </>
    );
}
