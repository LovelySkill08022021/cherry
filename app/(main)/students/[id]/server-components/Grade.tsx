import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { grades } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Check, X } from "lucide-react";
import AddGradeForm from "./AddGradeForm";

export default async function Grade({
    student_id,
    subject_id,
}: {
    student_id: number;
    subject_id: number;
}) {
    // await new Promise((resolve) =>
    //     setTimeout(resolve, 1000 + Math.random() * 3000)
    // );
    const student_grades = await db
        .select()
        .from(grades)
        .where(
            and(
                eq(grades.subject_id, subject_id),
                eq(grades.student_id, student_id)
            )
        );

    // if (student_grades.length <= 0) {
    //     return (
    //         <AddGradeForm
    //             student_id={student_id}
    //             subject_id={subject_id}
    //             student_grades={student_grades}
    //         />
    //     );
    // }

    return (
        <>
            <div className="flex gap-1 items-center justify-end">
                {student_grades.map((student_grade, index) => {
                    return (
                        <Badge
                            key={index}
                            className={`text-white ${student_grade.value <= 3 ? "bg-green-600" : "bg-red-600"}`}
                        >
                            {student_grade.value <= 3 ? <Check /> : <X />}
                            {student_grade.value.toFixed(2)}
                        </Badge>
                    );
                })}

                <AddGradeForm
                    student_id={student_id}
                    subject_id={subject_id}
                    student_grades={student_grades}
                />
            </div>
        </>
    );
}
