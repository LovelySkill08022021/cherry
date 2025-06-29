"use server";

import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    grades,
    prerequisites,
    subjects,
} from "@/db/schema";
import { Prerequisite, Subject } from "@/types";
import { and, asc, eq, or } from "drizzle-orm";

export async function usePrereqTreeDepsData(curriculum_id: number): Promise<{
    prerequisite_list: Prerequisite[];
    subject_info: Subject[];
}> {
    const prerequisite_list = await getPrerequisiteList(curriculum_id);

    const subject_info = await getSubjectInfo(curriculum_id);

    return {
        prerequisite_list,
        subject_info,
    };
}

export async function getPrerequisiteList(curriculum_id: number) {
    return await db
        .select()
        .from(prerequisites)
        .where(
            and(
                eq(prerequisites.curriculum_id, curriculum_id),
                or(eq(prerequisites.type, "pre"), eq(prerequisites.type, "co"))
            )
        )
        .orderBy(asc(prerequisites.subject_id));
}

export async function getSubjectInfo(curriculum_id: number) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        await db
            .select()
            .from(curriculum_subjects)
            .leftJoin(subjects, eq(subjects.id, curriculum_subjects.subject_id))
            .where(eq(curriculum_subjects.curriculum_id, curriculum_id))
    )
        .map((item) => {
            return item.subjects;
        })
        .filter((item) => {
            return item != null;
        });
}

export async function getStudentGrades(student_id: number) {
    return await db
        .select()
        .from(grades)
        .where(eq(grades.student_id, student_id));
}

export async function getStudentCurriculum(student_id: number) {
    return (
        await db
            .select()
            .from(curriculum_students)
            .where(eq(curriculum_students.student_id, student_id))
    )[0].curriculum_id;
}
