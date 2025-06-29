import { getStudentCurriculum } from "@/actions/server_utils";
import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    enrollment_subjects,
    enrollments,
    grades,
    subjects,
} from "@/db/schema";
import { Grade, Subject } from "@/types";
import { and, asc, eq, notInArray } from "drizzle-orm";
import EnrollmentsClient from "./EnrollmentsClient";

export type SubjectWithGrade = {
    enrollment_id: number;
    subject: Subject;
    grades: Grade[];
};

export type SemesterData = {
    enrollment_id: number;
    semester: number;
    subjects: SubjectWithGrade[];
};

export type YearLevelData = {
    year_level: number;
    sy: string;
    semesters: SemesterData[];
};

type Props = {
    student_id: number;
};

export default async function Enrollments(props: Props) {
    const student_curriculum = await getStudentCurriculum(props.student_id);
    const year_levels_and_semesters = await db.transaction(async (tx) => {
        const temp_year_levels_and_semesters = await tx
            .select({
                year_level: curriculum_subjects.year_level,
                semester: curriculum_subjects.semester,
            })
            .from(curriculum_subjects)
            .where(eq(curriculum_subjects.curriculum_id, student_curriculum))
            .orderBy(
                asc(curriculum_subjects.year_level),
                asc(curriculum_subjects.semester)
            )
            .groupBy(
                curriculum_subjects.semester,
                curriculum_subjects.year_level
            );
        return temp_year_levels_and_semesters;
    });

    const enrollment_data = await db.transaction(async (tx) => {
        const year_levels = await tx
            .selectDistinct({
                year_level: enrollments.year_level,
                sy: enrollments.sy,
            })
            .from(enrollments)
            .where(eq(enrollments.student_id, props.student_id))
            .orderBy(enrollments.year_level);

        const temp_data: YearLevelData[] = [];

        year_levels.forEach(async (item) => {
            const data: YearLevelData = {
                year_level: item.year_level,
                sy: item.sy,
                semesters: [],
            };
            const semesters = (
                await tx
                    .select()
                    .from(enrollments)
                    .where(
                        and(
                            eq(enrollments.year_level, item.year_level),
                            eq(enrollments.student_id, props.student_id)
                        )
                    )
                    .orderBy(enrollments.semester)
            ).map((item) => {
                return {
                    enrollment_id: item.id,
                    semester: item.semester,
                };
            });

            semesters.forEach(async (semester) => {
                const semester_data: SemesterData = {
                    enrollment_id: semester.enrollment_id,
                    semester: semester.semester,
                    subjects: [],
                };

                const semester_subjects = (
                    await tx
                        .select()
                        .from(enrollments)
                        .where(
                            and(
                                eq(enrollments.year_level, item.year_level),
                                eq(enrollments.semester, semester.semester),
                                eq(enrollments.student_id, props.student_id)
                            )
                        )
                        .leftJoin(
                            enrollment_subjects,
                            eq(
                                enrollment_subjects.enrollment_id,
                                enrollments.id
                            )
                        )
                        .leftJoin(
                            subjects,
                            eq(subjects.id, enrollment_subjects.subject_id)
                        )
                )
                    .map((item) => {
                        return item.subjects;
                    })
                    .filter((item) => {
                        return item != null;
                    });

                const subject_with_grade: SubjectWithGrade[] = [];

                semester_subjects.forEach(async (subject) => {
                    const temp_subject_with_grade: SubjectWithGrade = {
                        enrollment_id: semester.enrollment_id,
                        subject: subject,
                        grades: [],
                    };
                    const subject_grades = await tx
                        .select()
                        .from(grades)
                        .where(
                            and(
                                eq(
                                    grades.enrollment_id,
                                    semester.enrollment_id
                                ),
                                eq(grades.subject_id, subject.id)
                            )
                        );

                    temp_subject_with_grade.grades = subject_grades;

                    subject_with_grade.push(temp_subject_with_grade);
                });

                semester_data.subjects = subject_with_grade;

                data.semesters.push(semester_data);
            });

            temp_data.push(data);
        });

        return temp_data;
    });

    const student_subjects = await db.transaction(async (tx) => {
        const student_curriculum = (
            await tx
                .select()
                .from(curriculum_students)
                .where(eq(curriculum_students.student_id, props.student_id))
                .limit(1)
        )[0].curriculum_id;

        const temp_enrolled_and_passed_subjects = (
            await tx
                .select()
                .from(enrollments)
                .leftJoin(
                    enrollment_subjects,
                    eq(enrollments.id, enrollment_subjects.enrollment_id)
                )
                .where(eq(enrollments.student_id, props.student_id))
        )
            .map((enrolled_subject) => {
                return enrolled_subject.enrollment_subjects;
            })
            .filter((item) => {
                return item != null;
            })
            .map((enrolled_subject) => {
                return enrolled_subject.subject_id;
            });

        const enrolled_and_passed_subjects: number[] = [];
        for (const subject_id of temp_enrolled_and_passed_subjects) {
            const specific_subject_grades = (
                await tx
                    .select()
                    .from(grades)
                    .where(
                        and(
                            eq(grades.subject_id, subject_id),
                            eq(grades.student_id, props.student_id)
                        )
                    )
                    .orderBy(grades.enrollment_id)
            ).map((grade) => {
                return grade.value;
            });

            let has_passed_grade = false;

            for (const grade of specific_subject_grades) {
                if (grade <= 3) {
                    has_passed_grade = true;
                    break;
                }
            }

            // console.log(subject_id, has_passed_grade);

            if (has_passed_grade) {
                enrolled_and_passed_subjects.push(subject_id);
            }

            // console.log(enrolled_and_passed_subjects);
        }

        // console.log(
        //     "enrolled_and_passed_subjects",
        //     enrolled_and_passed_subjects
        // );

        const temp_subjects = (
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
                        notInArray(subjects.id, enrolled_and_passed_subjects)
                    )
                )
        )
            .map((item) => {
                if (item.subjects != null) {
                    return {
                        id: item.subjects.id,
                        code: item.subjects.code,
                        title: item.subjects.title,
                        units: item.subjects.units,
                        year_level: item.curriculum_subjects.year_level,
                        semester: item.curriculum_subjects.semester,
                    };
                }
            })
            .filter((item) => {
                return item != undefined;
            });

        return temp_subjects;
    });

    return (
        <>
            <div className="flex h-1/2 gap-5">
                <EnrollmentsClient
                    student_id={props.student_id}
                    enrollment_data={enrollment_data}
                    student_subjects={student_subjects}
                    year_levels_and_semesters={year_levels_and_semesters}
                    curriculum_id={student_curriculum}
                />
            </div>
        </>
    );
}
