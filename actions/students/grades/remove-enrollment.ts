"use server";

import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function removeEnrollment(
    enrollment_id: number,
    student_id: number
) {
    const result = await db
        .delete(enrollments)
        .where(eq(enrollments.id, enrollment_id));

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to remove enrollment, please try again",
        };
    }

    revalidatePath(`students/${student_id}/grades`);

    return {
        status: true,
        message: "Enrollment has been removed.",
    };
}
