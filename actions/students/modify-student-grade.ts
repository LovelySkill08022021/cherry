"use server";

import { db } from "@/db";
import { grades } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function modifyStudentGrade(
    value: string,
    grade_id: number,
    student_id: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const result = await db
        .update(grades)
        .set({
            value: Number(value),
        })
        .where(eq(grades.id, grade_id));

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to modify grade, please try again.",
        };
    }

    revalidatePath(`/students/${student_id}`);
    return {
        status: true,
        message: "Grade modified.",
    };
}
