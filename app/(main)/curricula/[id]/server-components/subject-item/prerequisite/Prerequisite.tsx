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
            <Badge
                variant={"outline"}
                className={`border-0 ${type == "pre" ? "bg-purple-200" : "bg-blue-200"}`}
            >
                {subject.code}
                <Remove
                    prerequisite={prerequisite}
                    subject_id={subject_id}
                    curriculum_id={curriculum_id}
                />
            </Badge>
        </div>
    );
}
