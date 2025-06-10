"use server";

import { db } from "@/db";
import { grades } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addStudentGrade(
    student_id: number,
    subject_id: number,
    grade: string
): Promise<{
    status: boolean | "warn";
    message: string;
}> {
    if (grade == "") {
        return {
            status: "warn",
            message: "Cannot save blank grade.",
        };
    }
    const result = await db.insert(grades).values({
        student_id: student_id,
        subject_id: subject_id,
        value: Number(grade),
    });

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to modify grade, please try again.",
        };
    }

    revalidatePath(`/students/${student_id}`);
    return {
        status: true,
        message: "Grade has been added.",
    };
}
