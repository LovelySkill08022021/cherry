import {
    getPrereqTreeDepsData,
    getStudentCurriculum,
    getStudentGrades,
} from "@/actions/server_utils";
import BackButton from "@/components/BackButton";
import ScholasticDelinquency from "@/components/ScholasticDelinquency";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import StudentContextProvider from "./contexts/StudentContextProvider";
import NavButton from "./NavButton";
import StudentStatus from "./StudentStatus";

export default async function StudentPageLayout({
    params,
    children,
}: {
    params: Promise<{ id: number }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const student = (
        await db.select().from(students).where(eq(students.id, id)).limit(1)
    )[0];

    const student_curriculum = await getStudentCurriculum(id);

    const prereq_tree_deps_data =
        await getPrereqTreeDepsData(student_curriculum);
    const student_grades = await getStudentGrades(id);

    return (
        <StudentContextProvider
            prereq_tree_deps_data={prereq_tree_deps_data}
            student_grades={student_grades}
        >
            <div>
                <div className="mb-10">
                    <Link href={`/students`}>
                        <BackButton />
                    </Link>
                </div>
                <div className="flex items-center gap-2 mb-5">
                    <LinkIcon size={16} />
                    <NavButton
                        label={`Prospectus`}
                        link={`/students/${id}/prospectus`}
                    />
                    <NavButton
                        label={`Grades`}
                        link={`/students/${id}/grades`}
                    />
                </div>
                <div className="text-3xl font-semibold sticky">
                    <div className="backdrop-blur-sm px-[12px] py-2 translate-x-[-12px] inline-block rounded-lg">
                        {student.first_name} {student.middle_name}{" "}
                        {student.last_name}
                    </div>
                </div>
                <div className="mb-5 space-y-1">
                    <div className="space-x-1">
                        <ScholasticDelinquency student_id={id} />
                        <StudentStatus student_id={id} />
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </StudentContextProvider>
    );
}
