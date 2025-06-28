import BackButton from "@/components/BackButton";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import NavButton from "./NavButton";

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
    return (
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
                <NavButton label={`Grades`} link={`/students/${id}/grades`} />
            </div>
            <div className="text-3xl font-semibold sticky">
                <div className="backdrop-blur-sm px-[12px] py-2 translate-x-[-12px] inline-block rounded-lg">
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}
