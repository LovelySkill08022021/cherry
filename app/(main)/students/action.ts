"use server";
import { db } from "@/db";
import { students } from "@/db/schema";
import { Student } from "@/types";
import { like, or } from "drizzle-orm";

export async function searchGetStudents(prev: any, formData: FormData) {
    const keyword = formData.get("keyword") as string;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    var data: Student[] = await db
        .select()
        .from(students)
        .where(
            or(
                like(students.last_name, `%${keyword}%`),
                like(students.first_name, `%${keyword}%`),
                like(students.middle_name, `%${keyword}%`)
            )
        );

    return data;
}
