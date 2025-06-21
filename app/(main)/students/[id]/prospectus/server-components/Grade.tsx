import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { grades } from "@/db/schema";
import { Subject } from "@/types";
import { and, eq } from "drizzle-orm";
import { BookmarkX, Check, Loader, TriangleAlert, X } from "lucide-react";

export default async function Grade({
    student_id,
    subject,
}: {
    student_id: number;
    subject: Subject;
}) {
    // await new Promise((resolve) =>
    //     setTimeout(resolve, 1000 + Math.random() * 3000)
    // );
    const student_grades = await db
        .select()
        .from(grades)
        .where(
            and(
                eq(grades.subject_id, subject.id),
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
                    let badge_color = "bg-green-600";
                    if (student_grade.value == 4 || student_grade.value == 6) {
                        badge_color = "bg-amber-500";
                    } else if (
                        student_grade.value == 5 ||
                        student_grade.value == 8
                    ) {
                        badge_color = "bg-red-600";
                    } else if (student_grade.value == 7) {
                        badge_color = "bg-blue-500";
                    }
                    return (
                        <Badge
                            key={index}
                            className={`text-white ${badge_color}`}
                        >
                            <GradeIcon value={student_grade.value} />
                            <GradeValueRenderer value={student_grade.value} />
                        </Badge>
                    );
                })}

                {/* <AddGradeForm
                    student_id={student_id}
                    subject={subject}
                    student_grades={student_grades}
                /> */}
            </div>
        </>
    );
}

function GradeValueRenderer({ value }: { value: number }) {
    if (value <= 5) {
        return value.toFixed(2);
    }

    if (value == 6) {
        return "INC";
    }

    if (value == 7) {
        return "IP";
    }

    if (value == 8) {
        return "DRP";
    }
}

function GradeIcon({ value }: { value: number }) {
    if (value <= 3) {
        return <Check strokeWidth={3} />;
    }

    if (value == 5) {
        return <X strokeWidth={3} />;
    }

    if (value == 6 || value == 4) {
        return <TriangleAlert strokeWidth={3} />;
    }

    if (value == 7) {
        return <Loader strokeWidth={3} />;
    }

    if (value == 8) {
        return <BookmarkX strokeWidth={3} />;
    }
}
