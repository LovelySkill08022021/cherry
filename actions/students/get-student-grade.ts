"use server";
import { db } from "@/db";
import { grades } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getStudentGrade(student_id: number, subject_id: number) {
    const student_grades = await db
        .select()
        .from(grades)
        .where(
            and(
                eq(grades.student_id, student_id),
                eq(grades.subject_id, subject_id)
            )
        );

    return student_grades;
}
