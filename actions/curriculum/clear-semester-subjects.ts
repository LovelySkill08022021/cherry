"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ReturnType = { status: "error" | "info" | "success"; message: string };
export async function clearCurriculumSubjects(
    curriculum_id: number,
    year_level: number,
    semester: number
): Promise<ReturnType> {
    const entirety_result: ReturnType = await db.transaction(async (tx) => {
        let delete_limit = await tx.$count(
            curriculum_subjects,
            and(
                eq(curriculum_subjects.curriculum_id, curriculum_id),
                eq(curriculum_subjects.year_level, year_level),
                eq(curriculum_subjects.semester, semester)
            )
        );

        if (delete_limit <= 1) {
            return {
                status: "info",
                message: "Nothing to clear here.",
            };
        }

        delete_limit = delete_limit - 1;

        const clear_result = await tx
            .delete(curriculum_subjects)
            .where(
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.year_level, year_level),
                    eq(curriculum_subjects.semester, semester)
                )
            )
            .limit(delete_limit);

        if (clear_result[0].affectedRows <= 0) {
            tx.rollback();
            return {
                status: "error",
                message: "Failed to clear subjects, please try again.",
            };
        }

        const update_result = await tx
            .update(curriculum_subjects)
            .set({ subject_id: null })
            .where(
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.year_level, year_level),
                    eq(curriculum_subjects.semester, semester)
                )
            )
            .limit(delete_limit);

        if (update_result[0].affectedRows <= 0) {
            tx.rollback();
            return {
                status: "error",
                message: "Failed to clear subjects, please try again.",
            };
        }

        return {
            status: "success",
            message: "Subjects cleared successfully.",
        };
    });

    if (entirety_result.status == "success") {
        revalidatePath(`/curricula/${curriculum_id}`);
    }

    return entirety_result;
}
