"use server";

import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { revalidatePath } from "next/cache";

type Form = {
    student_id: number;
    year_level: number;
    semester: number;
    sy: string;
};

export async function createEnrollment(form: Form): Promise<{
    status: boolean | "warning";
    message: string;
}> {
    if (!form.student_id || !form.semester || !form.year_level) {
        return {
            status: "warning",
            message: "Incomplete information, missing year level or semester",
        };
    }

    const result = await db.insert(enrollments).values(form);

    // console.log(form);
    if (result[0].affectedRows <= 0) {
        return {
            status: "warning",
            message: "Incomplete data",
        };
    }

    revalidatePath(`students/${form.student_id}/grades`);
    return {
        status: true,
        message: "Enrollment created",
    };
}
