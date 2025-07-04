"use server";

import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    enrollment_subjects,
    enrollments,
    grades,
    prerequisites,
    students,
    subjects,
} from "@/db/schema";
import { Prerequisite, Subject } from "@/types";
import { and, asc, desc, eq, lte, or } from "drizzle-orm";

export async function getPrereqTreeDepsData(curriculum_id: number): Promise<{
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
    return (
        await db
            .select()
            .from(grades)
            .leftJoin(enrollments, eq(enrollments.id, grades.enrollment_id))
            .where(eq(grades.student_id, student_id))
            .orderBy(
                asc(grades.subject_id),
                desc(enrollments.year_level),
                desc(enrollments.semester),
                desc(grades.id)
            )
    ).map((item) => {
        return item.grades;
    });
}

export async function getStudentCurriculum(student_id: number) {
    return (
        await db
            .select()
            .from(curriculum_students)
            .where(eq(curriculum_students.student_id, student_id))
    )[0].curriculum_id;
}

export async function getCurrentSy() {
    const d = new Date(Date.now());
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    let current_sy: string | null = null;

    if (month <= 6) {
        current_sy = `SY ${year - 1}-${year}`;
    } else {
        current_sy = `SY ${year}-${year + 1}`;
    }

    return current_sy;
}

export async function isTransitionMonth() {
    const d = new Date(Date.now());
    const month = d.getMonth() + 1;

    return month == 7;
}

export async function updateStudentsYearLevel() {
    const d = new Date(Date.now());
    const year = d.getFullYear() + 1;

    if (await isTransitionMonth()) {
        await db.transaction(async (tx) => {
            const all_students = await tx.select().from(students);

            for (const student of all_students) {
                const student_year_admitted = student.year_admitted;

                const result = await tx
                    .update(students)
                    .set({
                        year_level: year - student_year_admitted,
                    })
                    .where(eq(students.id, student.id));
            }
        });
    }

    console.log("yyll");
}

export async function updateStudentsStanding() {
    const d = new Date(Date.now());
    const year = d.getFullYear() + 1;
    // const month = d.getMonth() + 1;

    if (await isTransitionMonth()) {
        await db.transaction(async (tx) => {
            const all_students = await tx.select().from(students);

            for (const student of all_students) {
                const subject_carried = await getStudentSubjectCarried(
                    student.id
                );

                if (subject_carried.percentage < 75) {
                    const update_result = await tx
                        .update(students)
                        .set({
                            standing: student.year_level - 1,
                        })
                        .where(eq(students.id, student.id));
                } else {
                    const update_result = await tx
                        .update(students)
                        .set({
                            standing: student.year_level,
                        })
                        .where(eq(students.id, student.id));
                }
            }
        });
    }

    console.log("stdd");
}

export async function getStudentFailedSubjects(student_id: number) {
    const entirety = await db.transaction(async (tx) => {});
}

export async function getStudentSubjectCarried(student_id: number) {
    const student_curriculum = await getStudentCurriculum(student_id);

    const entirety = await db.transaction(async (tx) => {
        const student = await tx
            .select()
            .from(students)
            .where(eq(students.id, student_id));
        const prev_year_level = student[0].year_level - 1;

        const target_subjects_taken = (
            await tx
                .select()
                .from(curriculum_subjects)
                .leftJoin(
                    subjects,
                    eq(subjects.id, curriculum_subjects.subject_id)
                )
                .where(
                    and(
                        eq(
                            curriculum_subjects.curriculum_id,
                            student_curriculum
                        ),
                        lte(curriculum_subjects.year_level, prev_year_level)
                    )
                )
        )
            .map((item) => {
                return item.subjects;
            })
            .filter((item) => {
                return item != null;
            });
        let target_units_taken = 0;
        let taken_units = 0;
        const subjects_taken: Subject[] = [];

        for (const target_subject_taken of target_subjects_taken) {
            const subject_taken_row = {
                id: target_subject_taken.id,
                code: target_subject_taken.code,
                title: target_subject_taken.title,
                units: target_subject_taken.units,
                grade: 0,
            };

            target_units_taken += target_subject_taken.units;

            const student_grade = await tx
                .select()
                .from(grades)
                .where(
                    and(
                        eq(grades.student_id, student_id),
                        eq(grades.subject_id, target_subject_taken.id)
                    )
                )
                .orderBy(asc(grades.value));

            if (student_grade.length > 0) {
                if (student_grade[0].value <= 3) {
                    taken_units += target_subject_taken.units;
                    subject_taken_row.grade = student_grade[0].value;
                    subjects_taken.push(subject_taken_row);
                }
            }
        }

        return {
            target_subjects_taken,
            subjects_taken,
            target_units_taken,
            taken_units,
            percentage: (taken_units / target_units_taken) * 100,
        };
    });

    return entirety;
}

export async function getCurrentSemester() {
    const d = new Date(Date.now());
    const month = d.getMonth() + 1;

    if (month < 7) {
        return 2;
    }

    return 1;
}

export async function getStudentRegularity(
    student_id: number
): Promise<"Regular" | "Irregular"> {
    const last_enrollment = await getStudentLastEnrollment(student_id);
    const subjects_of_enrollment = await db
        .select()
        .from(enrollment_subjects)
        .where(
            eq(enrollment_subjects.enrollment_id, last_enrollment.enrollment_id)
        );

    let regularity: "Regular" | "Irregular" = "Regular";
    for (const subject_of_enrollment of subjects_of_enrollment) {
        const subject_grades = await db
            .select()
            .from(grades)
            .where(
                and(
                    eq(grades.subject_id, subject_of_enrollment.subject_id),
                    eq(
                        grades.enrollment_id,
                        subject_of_enrollment.enrollment_id
                    )
                )
            )
            .orderBy(desc(grades.id));

        if (subject_grades.length == 0 || subject_grades[0].value > 3) {
            regularity = "Irregular";
            break;
        }
    }

    return regularity;
}

export async function getStudentScholasticDelinquency(student_id: number) {
    const last_enrollment = await getStudentLastEnrollment(student_id);
    const percentage = await db.transaction(async (tx) => {
        const taken_subjects = (
            await tx
                .select()
                .from(enrollment_subjects)
                .leftJoin(
                    subjects,
                    eq(subjects.id, enrollment_subjects.subject_id)
                )
                .where(
                    eq(
                        enrollment_subjects.enrollment_id,
                        last_enrollment.enrollment_id
                    )
                )
        )
            .map((item) => {
                return item.subjects;
            })
            .filter((item) => {
                return item != null;
            });

        let units_failed = 0;
        let total_units = 0;
        for (const taken_subject of taken_subjects) {
            total_units += taken_subject.units;
            const subject_grade = await tx
                .select()
                .from(grades)
                .where(
                    and(
                        eq(grades.subject_id, taken_subject.id),
                        eq(grades.enrollment_id, last_enrollment.enrollment_id)
                    )
                )
                .orderBy(asc(grades.value));

            if (subject_grade.length > 0 && subject_grade[0].value > 3) {
                units_failed += taken_subject.units;
            }
        }

        return (units_failed / total_units) * 100;
    });

    let remarks: "Regular" | "Warning" | "Probation" | "Dismissal" = "Regular";

    if (percentage <= 25) {
        remarks = "Regular";
    } else if (percentage <= 50) {
        remarks = "Warning";
    } else if (percentage <= 75) {
        remarks = "Probation";
    } else {
        remarks = "Dismissal";
    }

    return { remarks, percentage };
}

export async function getStudentLastEnrollment(student_id: number) {
    const current_semester = await getCurrentSemester();

    const student_enrollments = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.student_id, student_id))
        .orderBy(desc(enrollments.year_level), desc(enrollments.semester));

    let last_enrollment = {
        enrollment_id: 0,
        semester: 0,
        year_level: 0,
    };

    for (const student_enrollment of student_enrollments) {
        if (current_semester != student_enrollment.semester) {
            last_enrollment.enrollment_id = student_enrollment.id;
            last_enrollment.semester = student_enrollment.semester;
            last_enrollment.year_level = student_enrollment.year_level;
            break;
        }
    }

    return last_enrollment;
}

export async function getStudentYearLevel(student_id: number) {
    const year_level = (
        await db.select().from(students).where(eq(students.id, student_id))
    )[0].year_level;

    return year_level;
}

export async function getStudentSection(student_id: number) {
    const section = (
        await db.select().from(students).where(eq(students.id, student_id))
    )[0].section;

    return section;
}

export async function getStudentStanding(student_id: number) {
    const standing = (
        await db.select().from(students).where(eq(students.id, student_id))
    )[0].standing;

    return standing;
}
