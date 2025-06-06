import { db } from "@/db";
import { curricula, curriculum_subjects } from "@/db/schema";
import { eq } from "drizzle-orm";

import BackButton from "@/components/BackButton";
import Link from "next/link";
import CurriculumTable from "./server-components/CurriculumTable";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const { id } = await params;

    const curriculum = await db
        .select()
        .from(curricula)
        .where(eq(curricula.id, id));

    const year_levels = (
        await db
            .selectDistinct({ year_level: curriculum_subjects.year_level })
            .from(curriculum_subjects)
            .where(eq(curriculum_subjects.curriculum_id, id))
            .orderBy(curriculum_subjects.year_level)
    ).map((level) => {
        return level.year_level;
    });

    return (
        <div>
            <div className="mb-5">
                <Link href={"/curricula"}>
                    <BackButton />
                </Link>
            </div>
            <div className="text-lg font-semibold mb-7">
                Curriculum{" "}
                <span className="text-rose-700">{curriculum[0].label}</span>
            </div>

            <div>
                <CurriculumTable curriculum_id={id} yearLevels={year_levels} />
            </div>
        </div>
    );
}
