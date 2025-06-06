"use server";

import { db } from "@/db";
import { curricula, curriculum_subjects } from "@/db/schema";
import { Curriculum } from "@/types";
import { and, eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const NewCurriculumFormSchema = z.object({
    id: z.number(),
    label: z
        .string()
        .min(5, { message: "Name must be at least 5 characters long." })
        .trim(),
});

export async function saveCurriculum(prev: any, formData: FormData) {
    const data: Curriculum = {
        id: Number(formData.get("id")),
        label: formData.get("label") as string,
    };

    const validation = NewCurriculumFormSchema.safeParse(data);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            inputs: data,
        };
    }

    const { id, label } = validation.data;

    try {
        let result;
        if (id == 0) {
            result = await db.insert(curricula).values([{ label }]);
            console.log(result);
        } else {
            result = await db
                .update(curricula)
                .set({ label: validation.data.label })
                .where(eq(curricula.id, validation.data.id));
        }

        if (result[0].affectedRows <= 0) {
            return {
                inputs: data,
                success: false,
                message: "Failed to update curriculum.",
            };
        }
    } catch (error) {
        console.error("❌ System Error:", error);
    }

    revalidatePath("/curricula");

    return {
        success: true,
        message: "Saved successfully.",
    };
}

export async function getSubjectsWhere(
    curriculum_id: number,
    year_level: number,
    semester: number
) {
    const result = await db
        .select({ subject_id: curriculum_subjects.subject_id })
        .from(curriculum_subjects)
        .where(
            and(
                eq(curriculum_subjects.curriculum_id, curriculum_id),
                eq(curriculum_subjects.year_level, year_level),
                eq(curriculum_subjects.semester, semester)
            )
        );

    const subject_ids = result.map((subject) => {
        return subject.subject_id;
    });

    return subject_ids;
}
