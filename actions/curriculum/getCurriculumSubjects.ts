"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { CurriculumSubject } from "@/types";
import { eq } from "drizzle-orm";

export async function getCuriculumSubject(curriculum_id: number) {
    const all_curriculum_subjects: CurriculumSubject[] = await db
        .select()
        .from(curriculum_subjects)
        .where(eq(curriculum_subjects.curriculum_id, curriculum_id));
    return all_curriculum_subjects;
}
