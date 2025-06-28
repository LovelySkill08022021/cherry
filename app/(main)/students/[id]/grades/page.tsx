import StudentStatus from "@/components/StudentStatus";
import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    enrollments,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import NewEnrollment from "./NewEnrollment";
import EnrollmentsServer from "./server-components/EnrollmentsServer";

export type ValidYearLevel = {
    year_level: number;
    used_semesters: number[];
};

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    const valid_year_levels = await db.transaction(async (tx) => {
        // const used_year_levels = (
        //     await tx
        //         .select({ year_level: enrollments.year_level })
        //         .from(enrollments)
        //         .where(eq(enrollments.student_id, id))
        //         .orderBy(asc(enrollments.year_level))
        //         .groupBy(enrollments.year_level)
        // ).map((item) => {
        //     return item.year_level;
        // });
        // console.log("used_year_levels", used_year_levels);

        // const
        const temp_year_levels = (
            await tx
                .select()
                .from(curriculum_students)
                .leftJoin(
                    curriculum_subjects,
                    eq(
                        curriculum_subjects.curriculum_id,
                        curriculum_students.curriculum_id
                    )
                )
                .where(eq(curriculum_students.student_id, id))
                .groupBy(curriculum_subjects.year_level)
                .orderBy(curriculum_subjects.year_level)
        )

            .map((year_level) => {
                return year_level.curriculum_subjects?.year_level;
            })
            .filter((year_level) => {
                return year_level != undefined;
            });

        const year_levels: ValidYearLevel[] = [];
        for (const year_level of temp_year_levels) {
            const semesters = (
                await tx
                    .select({ semester: enrollments.semester })
                    .from(enrollments)
                    .where(
                        and(
                            eq(enrollments.student_id, id),
                            eq(enrollments.year_level, year_level)
                        )
                    )
            ).map((item) => {
                return item.semester;
            });

            if (semesters.length < 3) {
                year_levels.push({
                    year_level: year_level,
                    used_semesters: semesters,
                });
            }
        }

        return year_levels;
    });

    return (
        <>
            <div className="mb-5 space-y-1">
                <div>
                    <StudentStatus student_id={id} />
                </div>
            </div>
            <div>
                <div className="mb-5">
                    <NewEnrollment
                        student_id={id}
                        valid_year_levels={valid_year_levels}
                    />
                </div>
                <EnrollmentsServer student_id={id} />
            </div>
        </>
    );
}
