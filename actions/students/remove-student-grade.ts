"use server";

import { db } from "@/db";
import { grades } from "@/db/schema";
import { Grade } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeStudentGrade(grade: Grade) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // return {
    //     status: false,
    //     message: "Failed to remove grade, please try again.",
    // };
    const result = await db.delete(grades).where(eq(grades.id, grade.id));

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to remove grade, please try again.",
        };
    }

    revalidatePath(`/students/${grade.student_id}`);

    return {
        status: true,
        message: "Grade removed.",
    };
}
