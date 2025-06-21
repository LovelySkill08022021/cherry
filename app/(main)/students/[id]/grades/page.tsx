import BackButton from "@/components/BackButton";
import StudentStatus from "@/components/StudentStatus";
import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    students,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import NewEnrollment from "./NewEnrollment";
import EnrollmentsServer from "./server-components/EnrollmentsServer";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const student = (
        await db.select().from(students).where(eq(students.id, id)).limit(1)
    )[0];
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
            <div className="mb-5">
                <Link href={`/students`}>
                    <BackButton />
                </Link>
            </div>
            <div className="text-lg font-semibold mb-5">Grades</div>
            <div className="mb-5 space-y-1">
                <div className="text-3xl font-semibold">
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                </div>
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
