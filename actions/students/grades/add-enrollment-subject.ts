"use server";

import { db } from "@/db";
import { enrollment_subjects } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addEnrollmentSubject(
    enrollment_id: number,
    subject_id: number,
    student_id: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = {
        enrollment_id,
        subject_id,
    };
    const result = await db.insert(enrollment_subjects).values(data);

    if (result[0].affectedRows <= 0) {
        return new Error("Failed to add subject, please try again");
    }

    revalidatePath(`students/${student_id}/grades`);

    return {
        message: "Subject added to enlistment",
    };
}
