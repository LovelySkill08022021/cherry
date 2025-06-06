"use server";

import { db } from "@/db";
import { curriculum_subjects } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeCurriculumYearLevel(
    year_level: number,
    curriculum_id: number
) {
    const entirety_result = await db.transaction(async (tx) => {
        const delete_result = await tx
            .delete(curriculum_subjects)
            .where(
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.year_level, year_level)
                )
            );

        if (delete_result[0].affectedRows <= 0) {
            tx.rollback();
            return {
                success: false,
                message: "Failed to remove year level.",
            };
        }

        const max_query = await tx
            .selectDistinct({ max: curriculum_subjects.year_level })
            .from(curriculum_subjects)
            .where(eq(curriculum_subjects.curriculum_id, curriculum_id))
            .orderBy(desc(curriculum_subjects.year_level))
            .limit(1);

        if (max_query.length > 0) {
            const max_year_level = max_query[0].max;

            for (let i = year_level; i <= max_year_level - 1; i++) {
                const update_result = await tx
                    .update(curriculum_subjects)
                    .set({ year_level: i })
                    .where(
                        and(
                            eq(curriculum_subjects.year_level, i + 1),
                            eq(curriculum_subjects.curriculum_id, curriculum_id)
                        )
                    );

                if (update_result[0].affectedRows <= 0) {
                    tx.rollback();
                    return {
                        success: false,
                        message: "Failed to remove year level.",
                    };
                }
            }
        }

        return {
            success: true,
            message: "Year level removed.",
        };
    });

    revalidatePath(`curricula/${curriculum_id}`);
    return entirety_result;
}
