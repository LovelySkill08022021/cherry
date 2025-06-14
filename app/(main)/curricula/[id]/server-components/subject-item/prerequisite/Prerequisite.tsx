import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { subjects } from "@/db/schema";
import { getOrdinal } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Remove from "./Remove";

export default async function Prerequisite({
    prerequisite,
    subject_id,
    curriculum_id,
    type,
}: {
    prerequisite: number;
    subject_id: number;
    curriculum_id: number;
    type: string | null;
}) {
    // await new Promise((resolve) =>
    //     setTimeout(resolve, 1000 + Math.random() * 5000)
    // );
    // const prereq_type = await db
    //     .select()
    //     .from(prerequisites)
    //     .where(
    //         and(
    //             eq(prerequisites.curriculum_id, curriculum_id),
    //             eq(prerequisites.prerequisite, prerequisite)
    //         )
    //     );
    if (type == "std") {
        return (
            <div className="mb-1">
                <Badge variant={"outline"} className="border-0 bg-gray-200">
                    {getOrdinal(prerequisite)} year standing
                    <Remove
                        prerequisite={prerequisite}
                        subject_id={subject_id}
                        curriculum_id={curriculum_id}
                    />
                </Badge>
            </div>
        );
    }

    const subject = (
        await db.select().from(subjects).where(eq(subjects.id, prerequisite))
    )[0];

    return (
        <div className="mb-1">
            <Badge variant={"outline"} className="border-0 bg-gray-200">
                {subject.code} {type}
                <Remove
                    prerequisite={prerequisite}
                    subject_id={subject_id}
                    curriculum_id={curriculum_id}
                />
            </Badge>
        </div>
    );
}
