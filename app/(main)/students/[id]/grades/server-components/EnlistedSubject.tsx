"use client";

import { removeEnrollmentSubject } from "@/actions/students/grades/remove-enrollment-subject";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { SubjectWithGrade } from "./EnrollmentsServer";
import Grade from "./Grade";

export default function EnlistedSubject({
    subject_with_grade,
    enrollment_id,
    student_id,
}: {
    subject_with_grade: SubjectWithGrade;
    enrollment_id: number;
    student_id: number;
}) {
    const [pending, startTransition] = useTransition();
    function handleRemoveEnlistment() {
        startTransition(async () => {
            const response = await removeEnrollmentSubject(
                enrollment_id,
                subject_with_grade.subject.id,
                student_id
            );

            if (response.status == true) {
                toast.success("Message", {
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
        <TableRow>
            <TableCell>{subject_with_grade.subject.code}</TableCell>
            <TableCell>
                <div className="text-wrap">
                    {subject_with_grade.subject.title}
                </div>
            </TableCell>
            <TableCell>{subject_with_grade.subject.units}</TableCell>
            <TableCell>
                <Grade
                    student_id={student_id}
                    subject_with_grade={subject_with_grade}
                />
            </TableCell>
            <TableCell align="right">
                {!(subject_with_grade.grades.length > 0) && (
                    <Button
                        disabled={pending}
                        onClick={handleRemoveEnlistment}
                        variant={"ghost"}
                        size={"icon"}
                        className="bg-gray-200 text-red-700 hover:bg-red-700 hover:text-white"
                    >
                        {pending ? (
                            <LoaderCircle
                                className="animate-spin"
                                strokeWidth={3}
                            />
                        ) : (
                            <Trash2 />
                        )}
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
}
