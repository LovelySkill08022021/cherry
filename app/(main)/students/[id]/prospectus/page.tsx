import { db } from "@/db";
import { curriculum_subjects, subjects } from "@/db/schema";
import { eq } from "drizzle-orm";

import { getStudentCurriculum } from "@/actions/server_utils";
import YearLevel from "./server-components/YearLevel";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    const student_curriculum = await getStudentCurriculum(id);

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
