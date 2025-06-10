import BackButton from "@/components/BackButton";
import { db } from "@/db";
import {
    curriculum_students,
    curriculum_subjects,
    students,
    subjects,
} from "@/db/schema";
import { eq } from "drizzle-orm";

import Link from "next/link";
import YearLevel from "./server-components/YearLevel";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const student = (
        await db.select().from(students).where(eq(students.id, id)).limit(1)
    )[0];

    const student_curriculum = (
        await db
            .select()
            .from(curriculum_students)
            .where(eq(curriculum_students.student_id, id))
    )[0].curriculum_id;

    const year_levels = await db
        .selectDistinct({
            year_level: curriculum_subjects.year_level,
        })
        .from(curriculum_subjects)
        .leftJoin(subjects, eq(curriculum_subjects.subject_id, subjects.id))
        .where(eq(curriculum_subjects.curriculum_id, student_curriculum))
        .orderBy(curriculum_subjects.year_level);

    // const year_level
    return (
        <div className="">
            <div className="mb-5">
                <Link href={`/students`}>
                    <BackButton />
                </Link>
            </div>
            <div className=" text-lg mb-5 font-semibold">
                Profile of{" "}
                <span className="text-red-700">
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                </span>
            </div>
            <div>Grades</div>
            <div className="space-y-10">
                {year_levels.map((year_level) => (
                    <YearLevel
                        key={year_level.year_level}
                        year_level={year_level.year_level}
                        curriculum_id={student_curriculum}
                        student_id={id}
                    />
                ))}
            </div>
        </div>
    );
}
