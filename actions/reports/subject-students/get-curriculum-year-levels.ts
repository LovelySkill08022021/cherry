"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getCurriculumYearLevels(curriculum_id: number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const year_levels = await db
        .select({
            year_level: curriculum_subjects.year_level,
        })
        .from(curriculum_subjects)
        .where(eq(curriculum_subjects.curriculum_id, curriculum_id))
        .orderBy(asc(curriculum_subjects.year_level))
        .groupBy(curriculum_subjects.year_level);

    return {
        data: year_levels.map((year_level) => {
            return year_level.year_level;
        }),
    };
}
