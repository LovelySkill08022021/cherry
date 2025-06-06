"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeCurriculumSubject(
    curriculum_id: number,
    subject_id: number
) {
    const entirety_result = await db.transaction(async (tx) => {
        const info = await tx
            .select({
                semester: curriculum_subjects.semester,
                year_level: curriculum_subjects.year_level,
            })
            .from(curriculum_subjects)
            .where(
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.subject_id, subject_id)
                )
            );

        const slot_count = await tx.$count(
            curriculum_subjects,
            and(
                eq(curriculum_subjects.curriculum_id, curriculum_id),
                eq(curriculum_subjects.semester, info[0].semester),
                eq(curriculum_subjects.year_level, info[0].year_level)
            )
        );

        if (slot_count > 1) {
            const result = await tx
                .delete(curriculum_subjects)
                .where(
                    and(
                        eq(curriculum_subjects.curriculum_id, curriculum_id),
                        eq(curriculum_subjects.subject_id, subject_id)
                    )
                );

            if (result[0].affectedRows <= 0) {
                return {
                    success: false,
                };
            }

            return {
                success: true,
            };
        }

        const result = await tx
            .update(curriculum_subjects)
            .set({
                subject_id: null,
            })
            .where(
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.subject_id, subject_id),
                    eq(curriculum_subjects.semester, info[0].semester),
                    eq(curriculum_subjects.year_level, info[0].year_level)
                )
            );

        if (result[0].affectedRows <= 0) {
            return {
                success: false,
            };
        }

        return {
            success: true,
        };
    });

    if (!entirety_result.success) {
        return {
            success: entirety_result.success,
            message: "Failed to remove subject, please try again.",
        };
    }

    revalidatePath(`/curricula/${curriculum_id}`);
    return {
        success: entirety_result.success,
        message: "Subject is removed.",
    };
}
