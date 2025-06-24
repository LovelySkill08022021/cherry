import { db } from "@/db";
import { prerequisites } from "@/db/schema";
import { Curriculum, Subject } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { and, eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function isGradePassed(grade: number) {
    if (grade <= 3) return true;
    return false;
}

export async function getSubjectPrerequisites(
    curriculum: Curriculum,
    subject: Subject
) {
    const subject_prerequisites = (
        await db
            .select({
                subject_id: prerequisites.prerequisite,
            })
            .from(prerequisites)
            .where(
                and(
                    eq(prerequisites.curriculum_id, curriculum.id),
                    eq(prerequisites.subject_id, subject.id)
                )
            )
    ).map((prerequisite) => {
        return prerequisite.subject_id;
    });

    return subject_prerequisites;
}

// export async function getFailedPrerequisites(
//     curriculum_id: number,
//     subject_id: number,
//     failed_subjects: number[]
// ): Promise<number[]> {
//     const subject_prerequisites = await db
//         .select({
//             subject_id: prerequisites.prerequisite,
//         })
//         .from(prerequisites)
//         .where(
//             and(
//                 eq(prerequisites.curriculum_id, curriculum_id),
//                 eq(prerequisites.subject_id, subject_id)
//             )
//         );

//     subject_prerequisites.forEach(async (prerequisite) => {
//         await getFailedPrerequisites(curriculum_id, prerequisite.subject_id);
//     });
// }
