import StudentStatus from "@/components/StudentStatus";
import { db } from "@/db";
import { curriculum_students, curriculum_subjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import NewEnrollment from "./NewEnrollment";
import EnrollmentsServer from "./server-components/EnrollmentsServer";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const year_levels = (
        await db
            .select()
            .from(curriculum_students)
            .where(eq(curriculum_students.student_id, id))
            .leftJoin(
                curriculum_subjects,
                eq(
                    curriculum_subjects.curriculum_id,
                    curriculum_students.curriculum_id
                )
            )
            .groupBy(curriculum_subjects.year_level)
            .orderBy(curriculum_subjects.year_level)
    )
        .map((item) => {
            return item.curriculum_subjects?.year_level;
        })
        .filter((item) => {
            return item != undefined;
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
                    <NewEnrollment student_id={id} year_levels={year_levels} />
                </div>
                <EnrollmentsServer student_id={id} />
            </div>
        </>
    );
}
