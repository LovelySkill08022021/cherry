"use server";

import { db } from "@/db";
import {
    enrollment_subjects,
    enrollments,
    students,
    subjects,
} from "@/db/schema";
import { Student, Subject } from "@/types";
import { and, asc, eq } from "drizzle-orm";

export type SubjectStudentsType = {
    subject: Subject;
    students: Student[];
};

export async function getSySubjects(sy: string) {
    const main_list: SubjectStudentsType[] = [];

    const sy_subjects = (
        await db
            .select()
            .from(enrollments)
            .leftJoin(
                enrollment_subjects,
                eq(enrollments.id, enrollment_subjects.enrollment_id)
            )
            .where(eq(enrollments.sy, sy))
            .groupBy(enrollment_subjects.subject_id)
            .orderBy(enrollment_subjects.subject_id)
            .leftJoin(subjects, eq(subjects.id, enrollment_subjects.subject_id))
    )
        .map((item) => {
            return item.subjects;
        })
        .filter((item) => {
            return item != null;
        });

    for (const sy_subject of sy_subjects) {
        const subject_students = (
            await db
                .select()
                .from(enrollments)
                .leftJoin(
                    enrollment_subjects,
                    eq(enrollments.id, enrollment_subjects.enrollment_id)
                )
                .leftJoin(students, eq(students.id, enrollments.student_id))
                .orderBy(
                    asc(students.year_level),
                    asc(students.section),
                    asc(students.last_name),
                    asc(students.first_name),
                    asc(students.middle_name)
                )
                .where(
                    and(
                        eq(enrollments.sy, sy),
                        eq(enrollment_subjects.subject_id, sy_subject.id)
                    )
                )
        )
            .map((item) => item.students)
            .filter((item) => item != null);

        main_list.push({
            subject: sy_subject,
            students: subject_students,
        });
    }

    console.log(main_list);
    return main_list;
}
