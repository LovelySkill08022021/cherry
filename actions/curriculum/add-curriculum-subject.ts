"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { CurriculumSubjectForm } from "@/types";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addCurriculumSubject(
    curriculum_id: number,
    year_level: number,
    semester: number,
    subject_id: number
) {
    // const data = {
    //     curriculum_id,
    //     year_level,
    //     semester,
    //     subject_id,
    // };
    const add_subect_data: CurriculumSubjectForm = {
        curriculum_id,
        year_level,
        semester,
        subject_id,
    };

    const entirety_result = await db.transaction(async (tx) => {
        const null_subject_id_exist = await tx.$count(
            curriculum_subjects,
            and(
                eq(curriculum_subjects.curriculum_id, curriculum_id),
                eq(curriculum_subjects.year_level, year_level),
                eq(curriculum_subjects.semester, semester),
                isNull(curriculum_subjects.subject_id)
            )
        );

        if (null_subject_id_exist > 0) {
            const update_result = await tx
                .update(curriculum_subjects)
                .set({ subject_id: subject_id })
                .where(
                    and(
                        eq(curriculum_subjects.curriculum_id, curriculum_id),
                        eq(curriculum_subjects.year_level, year_level),
                        eq(curriculum_subjects.semester, semester),
                        isNull(curriculum_subjects.subject_id)
                    )
                );

            if (update_result[0].affectedRows <= 0) {
                return {
                    success: false,
                    message: "Failed to save subject.",
                };
            }

            return {
                success: true,
                message: "Subject saved.",
            };
        }

        const insert_result = await tx
            .insert(curriculum_subjects)
            .values(add_subect_data);

        if (insert_result[0].affectedRows <= 0) {
            return {
                success: false,
                message: "Failed to save subject.",
            };
        }

        return {
            success: true,
            message: "Subject saved.",
        };
    });

    revalidatePath(`curricula/${curriculum_id}`);
    return entirety_result;
}
