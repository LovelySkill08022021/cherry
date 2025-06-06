import { Button } from "@/components/ui/button";

import Message from "@/components/ui/Message";
import { db } from "@/db";
import { curriculum_subjects, subjects } from "@/db/schema";
import { eq, notInArray } from "drizzle-orm";
import { CircleX, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import React from "react";
import YearLevel from "./YearLevel";

type Props = {
    curriculum_id: number;
    yearLevels: number[];
};

export default async function CurriculumTable({
    curriculum_id,
    yearLevels,
}: Props) {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    async function addYearLevel() {
        "use server";

        const new_year_level =
            (yearLevels.length > 0 ? yearLevels[yearLevels.length - 1] : 0) + 1;
        console.log(new_year_level);

        const insert_data = [
            { year_level: new_year_level, semester: 1, curriculum_id },
            { year_level: new_year_level, semester: 2, curriculum_id },
        ];

        const resut = await db.insert(curriculum_subjects).values(insert_data);

        if (resut[0].affectedRows > 0) {
            revalidatePath(`/curricula/${curriculum_id}`);
        }
    }

    const subjectsPromise = db.transaction(async (tx) => {
        const unwanted_subject_ids = (
            await tx
                .select({ subject_id: curriculum_subjects.subject_id })
                .from(curriculum_subjects)
                .where(eq(curriculum_subjects.curriculum_id, curriculum_id))
        )
            .map((subject) => {
                return subject.subject_id;
            })
            .filter((subject_id) => {
                return subject_id != null;
            });

        const subjectsPromise_temp = await tx
            .select()
            .from(subjects)
            .where(notInArray(subjects.id, unwanted_subject_ids));

        return subjectsPromise_temp;
    });

    return (
        <>
            {yearLevels.length <= 0 && (
                <Message
                    variant={"error"}
                    title={"Notice"}
                    description={"This curriculum is not yet modified."}
                    icon={<CircleX />}
                />
            )}

            <div className="space-y-10 mb-2">
                {yearLevels.map((year_level) => (
                    <React.Fragment key={year_level}>
                        <YearLevel
                            subjectsPromise={subjectsPromise}
                            curriculum_id={curriculum_id}
                            year_level={year_level}
                        />
                    </React.Fragment>
                ))}
                <Button onClick={addYearLevel}>
                    <Plus />
                    Add year level
                </Button>
            </div>
        </>
    );
}
