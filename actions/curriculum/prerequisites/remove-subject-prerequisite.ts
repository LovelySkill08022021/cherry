"use server";

import { db } from "@/db";
import { prerequisites } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeSubjectPrerequisite(
    prerequisite: number,
    subject_id: number,
    curriculum_id: number
) {
    const result = await db
        .delete(prerequisites)
        .where(
            and(
                eq(prerequisites.prerequisite, prerequisite),
                eq(prerequisites.subject_id, subject_id),
                eq(prerequisites.curriculum_id, curriculum_id)
            )
        );

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to remove prerequisite.",
        };
    }

    revalidatePath(`/curricula/${curriculum_id}`);

    return {
        status: true,
        message: "Prerequisite removed.",
    };
}
