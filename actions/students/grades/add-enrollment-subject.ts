"use server";

import { db } from "@/db";
import { enrollment_subjects, enrollments, grades } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addEnrollmentSubject(
    enrollment_id: number,
    subject_id: number,
    student_id: number
) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = {
        enrollment_id,
        subject_id,
    };

    const check_result = await db.$count(
        enrollment_subjects,
        and(
            eq(enrollment_subjects.enrollment_id, data.enrollment_id),
            eq(enrollment_subjects.subject_id, data.subject_id)
        )
    );

    if (check_result > 0) {
        return {
            message:
                "Duplicate entry: The selected subject is already added in the semester.",
        };
    }

    const result = await db.insert(enrollment_subjects).values(data);

    if (result[0].affectedRows <= 0) {
        return new Error("Failed to add subject, please try again");
    }

    revalidatePath(`students/${student_id}/grades`);

    return {
        message: "Subject added to enlistment",
    };
}

export async function checkDuplicateEntry(
    enrollment_id: number,
    subject_id: number
) {
    const data = {
        enrollment_id,
        subject_id,
    };

    const check_result = await db.$count(
        enrollment_subjects,
        and(
            eq(enrollment_subjects.enrollment_id, data.enrollment_id),
            eq(enrollment_subjects.subject_id, data.subject_id)
        )
    );

    if (check_result > 0) {
        return {
            status: false,
            message: "The selected subject is already added in the enlistmet.",
        };
    }

    return {
        status: true,
        message: "",
    };
}

export async function checkNoGradeEnrolledSubject(
    enrollment_id: number,
    subject_id: number,
    student_id: number
) {
    const data = {
        enrollment_id,
        subject_id,
        student_id,
    };

    const entirety = await db.transaction(async (tx) => {
        const has_enrolled_subject = (
            await tx
                .select()
                .from(enrollments)
                .leftJoin(
                    enrollment_subjects,
                    eq(enrollments.id, enrollment_subjects.enrollment_id)
                )
                .where(
                    and(
                        eq(enrollments.student_id, data.student_id),
                        eq(enrollment_subjects.subject_id, data.subject_id)
                    )
                )
                .orderBy(enrollments.year_level, enrollments.semester)
        )
            .map((item) => {
                return item.enrollment_subjects;
            })
            .filter((item) => {
                return item != null;
            });

        if (has_enrolled_subject.length <= 0) {
            return {
                status: true,
                message: "",
            };
        }

        const target = has_enrolled_subject[has_enrolled_subject.length - 1];

        const has_grade = await tx.$count(
            grades,
            and(
                eq(grades.subject_id, target.subject_id),
                eq(grades.enrollment_id, target.enrollment_id)
            )
        );

        if (has_grade <= 0) {
            return {
                status: false,
                message:
                    "This subject is already enlisted and does not have a grade yet.",
            };
        }

        return {
            status: true,
            message: "",
        };
    });

    return entirety;
}
