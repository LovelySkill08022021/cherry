"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { CurriculumSubjects } from "@/types";
import { eq } from "drizzle-orm";

export async function getCuriculumSubject(curriculum_id: number) {
    const all_curriculum_subjects: CurriculumSubjects[] = await db
        .select()
        .from(curriculum_subjects)
        .where(eq(curriculum_subjects.curriculum_id, curriculum_id));
    return all_curriculum_subjects;
}
