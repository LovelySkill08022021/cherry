import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { curriculum_students, curriculum_subjects } from "@/db/schema";
import { getOrdinal } from "@/lib/utils";
import { eq } from "drizzle-orm";

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
            <div className="text-lg font-semibold mb-5">Grades</div>
            {/* <div>
                <NewEnrollment year_levels={year_levels} />
            </div> */}
            <div className="flex gap-5">
                <div className="flex flex-col gap-7 w-3/4">
                    {year_levels.map((year_level) => (
                        <>
                            <Card className="w-full bg year_level">
                                <CardHeader>
                                    <CardTitle>
                                        {getOrdinal(year_level)} Year
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex w-full gap-5">
                                        <Card className="w-full border-0 shadow-none bg-gray-100 semester">
                                            <CardHeader>
                                                <CardTitle>
                                                    Card Title
                                                </CardTitle>
                                                <CardDescription>
                                                    Card Description
                                                </CardDescription>
                                                <CardAction>
                                                    Card Action
                                                </CardAction>
                                            </CardHeader>
                                            <CardContent>table</CardContent>
                                            <CardFooter>
                                                <p>GWA: 0</p>
                                            </CardFooter>
                                        </Card>
                                        <Card className="w-full border-0 shadow-none bg-gray-100 semester">
                                            <CardHeader>
                                                <CardTitle>
                                                    Card Title
                                                </CardTitle>
                                                <CardDescription>
                                                    Card Description
                                                </CardDescription>
                                                <CardAction>
                                                    Card Action
                                                </CardAction>
                                            </CardHeader>
                                            <CardContent>table</CardContent>
                                            <CardFooter>
                                                <p>GWA: 0</p>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ))}
                </div>
                <div className="flex flex-col w-1/4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Subject</CardTitle>
                            <CardDescription>
                                Available subjects
                            </CardDescription>
                            <CardAction>Card Action</CardAction>
                        </CardHeader>
                        <CardContent>
                            <div>Subjects list</div>
                            <div>Subjects list</div>
                            <div>Subjects list</div>
                            <div>Subjects list</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
