"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";

export async function getYearLevelSemesters(
    curriculum_id: number,
    year_level: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const semesters = await db
        .select({
            semester: curriculum_subjects.semester,
        })
        .from(curriculum_subjects)
        .where(
            and(
                eq(curriculum_subjects.curriculum_id, curriculum_id),
                eq(curriculum_subjects.year_level, year_level)
            )
        )
        .orderBy(asc(curriculum_subjects.semester))
        .groupBy(curriculum_subjects.semester);

    return {
        data: semesters.map((semester) => {
            return semester.semester;
        }),
    };
}
