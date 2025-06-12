import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { subjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import Remove from "./Remove";

export default async function Prerequisite({
    prerequisite,
    subject_id,
    curriculum_id,
}: {
    prerequisite: number;
    subject_id: number;
    curriculum_id: number;
}) {
    // await new Promise((resolve) =>
    //     setTimeout(resolve, 1000 + Math.random() * 5000)
    // );
    const subject = (
        await db.select().from(subjects).where(eq(subjects.id, prerequisite))
    )[0];

    return (
        <div className="mb-1">
            <Badge variant={"outline"} className="border-0 bg-gray-200">
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
