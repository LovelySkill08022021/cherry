import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    subjects,
} from "@/db/schema";
import { eq } from "drizzle-orm";

import StudentStatus from "@/components/StudentStatus";
import YearLevel from "./server-components/YearLevel";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    const student_curriculum = (
        await db
            .select()
            .from(curriculum_students)
            .where(eq(curriculum_students.student_id, id))
    )[0].curriculum_id;

    const year_levels = await db
        .selectDistinct({
            year_level: curriculum_subjects.year_level,
        })
        .from(curriculum_subjects)
        .leftJoin(subjects, eq(curriculum_subjects.subject_id, subjects.id))
        .where(eq(curriculum_subjects.curriculum_id, student_curriculum))
        .orderBy(curriculum_subjects.year_level);

    // const year_level
    return (
        <div className="">
            <div className="mb-5 space-y-1">
                <div>
                    <StudentStatus student_id={id} />
                </div>
            </div>
            <div className="space-y-10">
                {year_levels.map((year_level) => (
                    <YearLevel
                        key={year_level.year_level}
                        year_level={year_level.year_level}
                        curriculum_id={student_curriculum}
                        student_id={id}
                    />
                ))}
            </div>
        </div>
    );
}
