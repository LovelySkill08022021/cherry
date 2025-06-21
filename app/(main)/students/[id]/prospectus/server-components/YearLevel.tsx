import { db } from "@/db";
import { curriculum_subjects, subjects } from "@/db/schema";
import { getOrdinal } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import Semester from "./Semester";

export default async function YearLevel({
    curriculum_id,
    student_id,
    year_level,
}: {
    student_id: number;
    curriculum_id: number;
    year_level: number;
}) {
    const year_level_subjects = await db.transaction(async (tx) => {
        const semester1 = await tx
            .select()
            .from(curriculum_subjects)
            .leftJoin(subjects, eq(curriculum_subjects.subject_id, subjects.id))
            .where(
                and(
                    eq(curriculum_subjects.semester, 1),
                    eq(curriculum_subjects.year_level, year_level),
                    eq(curriculum_subjects.curriculum_id, curriculum_id)
                )
            );

        const semester2 = await tx
            .select()
            .from(curriculum_subjects)
            .leftJoin(subjects, eq(curriculum_subjects.subject_id, subjects.id))
            .where(
                and(
                    eq(curriculum_subjects.semester, 2),
                    eq(curriculum_subjects.year_level, year_level),
                    eq(curriculum_subjects.curriculum_id, curriculum_id)
                )
            );

        return {
            semester1,
            semester2,
        };
    });

    return (
        <div className="flex gap-1 flex-col w-full ">
            <div className="flex">
                <div className="font-semibold text-lg">
                    {getOrdinal(year_level)} Year
                </div>
                <div></div>
            </div>
            <div className="flex gap-5">
                <Semester
                    student_id={student_id}
                    semester_data={year_level_subjects.semester1}
                />
                <Semester
                    student_id={student_id}
                    semester_data={year_level_subjects.semester2}
                />
            </div>
        </div>
    );
}
