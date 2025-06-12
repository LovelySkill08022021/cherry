"use server";

import { db } from "@/db";
import { prerequisites } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addSubjectPrerequisite(
    subject_id: number,
    prerequisite: number,
    curriculum_id: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = {
        subject_id,
        prerequisite,
        curriculum_id,
    };

    const result = await db.insert(prerequisites).values(data);

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to add prerequisite.",
        };
    }

    revalidatePath(`/curricula/${curriculum_id}`);

    return {
        status: true,
        message: "Prerequisite added.",
    };
}
