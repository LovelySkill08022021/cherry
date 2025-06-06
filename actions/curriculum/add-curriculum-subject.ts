"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { Subject } from "@/types";
import { revalidatePath } from "next/cache";

export async function addCurriculumSubject(
    curriculum_id: number,
    subject_id: number,
    semester: number,
    year_level: number
) {
    const data = {
        curriculum_id,
        subject_id,
        semester,
        year_level,
    };
    const result = await db.insert(curriculum_subjects).values(data);
    console.log(result);

    if (result[0].affectedRows > 0) {
        revalidatePath(`/curricula/${curriculum_id}`);
    }
}
