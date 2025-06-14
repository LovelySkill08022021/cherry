"use server";

import { db } from "@/db";
import { curriculum_subjects, prerequisites } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addSubjectPrerequisite(
    subject_id: number,
    prerequisite: number,
    curriculum_id: number,
    type?: "std"
) {
    let prereq_type: "pre" | "co" | "std" = "pre";

    if (type == "std") {
        prereq_type = type;
    } else {
        const subject_year_level = await db
            .select({
                year_level: curriculum_subjects.year_level,
                semester: curriculum_subjects.semester,
            })
            .from(curriculum_subjects)
            .where(
                and(
                    eq(curriculum_subjects.subject_id, subject_id),
                    eq(curriculum_subjects.curriculum_id, curriculum_id)
                )
            );

        const prerequisite_year_level = await db
            .select({
                year_level: curriculum_subjects.year_level,
                semester: curriculum_subjects.semester,
            })
            .from(curriculum_subjects)
            .where(
                and(
                    eq(curriculum_subjects.subject_id, prerequisite),
                    eq(curriculum_subjects.curriculum_id, curriculum_id)
                )
            );
        console.log(
            prerequisite_year_level[0].year_level,
            subject_year_level[0].year_level
        );

        if (
            prerequisite_year_level[0].year_level ==
                subject_year_level[0].year_level &&
            prerequisite_year_level[0].semester ==
                subject_year_level[0].semester
        ) {
            prereq_type = "co";
        } else {
            prereq_type = "pre";
        }
    }

    const data = {
        subject_id,
        prerequisite,
        curriculum_id,
        type: prereq_type,
    };

    const result = await db.insert(prerequisites).values(data);

    if (result[0].affectedRows <= 0) {
        return {
            status: false,
            message: "Failed to add prerequisite.",
        };
    }

    revalidatePath(`/curricula/${curriculum_id}`);

    return {
        status: true,
        message: "Prerequisite added.",
    };
}
