"use server";

import { db } from "@/db";
import { enrollment_subjects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeEnrollmentSubject(
    enrollment_id: number,
    subject_id: number,
    student_id: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = await db
        .delete(enrollment_subjects)
        .where(
            and(
                eq(enrollment_subjects.enrollment_id, enrollment_id),
                eq(enrollment_subjects.subject_id, subject_id)
            )
        );

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to remove subject, please try again",
        };
    }

    revalidatePath(`students/${student_id}/grades`);

    return {
        status: true,
        message: "Subject removed from enlistment",
    };
}
