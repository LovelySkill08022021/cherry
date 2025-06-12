import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { db } from "@/db";
import { curriculum_subjects, subjects } from "@/db/schema";
import { getOrdinal } from "@/lib/utils";
import { CurriculumSubjectForm, Subject } from "@/types";
import { and, eq, isNull, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import ClearSemesterSubjectsForm from "./ClearSemesterSubjectsForm";
import SubjectItem from "./subject-item/SubjectItem";
import SubjectSelect from "./SubjectSelect";

type Props = {
    subjectsPromise: Promise<Subject[]>;
    curriculum_id: number;
    year_level: number;
    semester: 1 | 2 | 3;
};

export const td_class = `py-2 px-2 border-1`;

export default async function Semester({
    curriculum_id,
    year_level,
    semester,
    subjectsPromise,
}: Props) {
    // await new Promise((resolve) =>
    //     setTimeout(resolve, 1000 + Math.random() * 3000)
    // );

    const semester_data = await db.transaction(async (tx) => {
        const subject_ids = (
            await tx
                .select({ subject_id: curriculum_subjects.subject_id })
                .from(curriculum_subjects)
                .where(
                    and(
                        eq(curriculum_subjects.curriculum_id, curriculum_id),
                        eq(curriculum_subjects.year_level, year_level),
                        eq(curriculum_subjects.semester, semester)
                    )
                )
        )
            .map((subject) => {
                return subject.subject_id;
            })
            .filter((subject_id) => {
                return subject_id != null;
            });

        const total_units = Number(
            (
                await tx
                    .select({ value: sum(subjects.units) })
                    .from(curriculum_subjects)
                    .leftJoin(
                        subjects,
                        eq(subjects.id, curriculum_subjects.subject_id)
                    )
                    .where(
                        and(
                            eq(
                                curriculum_subjects.curriculum_id,
                                curriculum_id
                            ),
                            eq(curriculum_subjects.year_level, year_level),
                            eq(curriculum_subjects.semester, semester)
                        )
                    )
            )[0].value || 0
        );

        return {
            subject_ids,
            total_units,
        };
    });

    async function handleSubjectSelect(subject: Subject) {
        "use server";

        const add_subect_data: CurriculumSubjectForm = {
            curriculum_id,
            year_level,
            semester,
            subject_id: subject.id,
        };

        const entirety_result = await db.transaction(async (tx) => {
            const null_subject_id_exist = await tx.$count(
                curriculum_subjects,
                and(
                    eq(curriculum_subjects.curriculum_id, curriculum_id),
                    eq(curriculum_subjects.year_level, year_level),
                    eq(curriculum_subjects.semester, semester),
                    isNull(curriculum_subjects.subject_id)
                )
            );

            if (null_subject_id_exist > 0) {
                const update_result = await tx
                    .update(curriculum_subjects)
                    .set({ subject_id: subject.id })
                    .where(
                        and(
                            eq(
                                curriculum_subjects.curriculum_id,
                                curriculum_id
                            ),
                            eq(curriculum_subjects.year_level, year_level),
                            eq(curriculum_subjects.semester, semester),
                            isNull(curriculum_subjects.subject_id)
                        )
                    );

                if (update_result[0].affectedRows <= 0) {
                    return {
                        success: false,
                        message: "Failed to save subject.",
                    };
                }

                return {
                    success: true,
                    message: "Subject saved.",
                };
            }

            const insert_result = await tx
                .insert(curriculum_subjects)
                .values(add_subect_data);

            if (insert_result[0].affectedRows <= 0) {
                return {
                    success: false,
                    message: "Failed to save subject.",
                };
            }

            return {
                success: true,
                message: "Subject saved.",
            };
        });

        revalidatePath(`curricula/${curriculum_id}`);
        return entirety_result;
    }

    return (
        <Card className="w-1/2 bg-white border-0 shadow-none">
            <CardHeader>
                <CardTitle>{getOrdinal(semester)} Semester</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="">
                    <thead>
                        <tr>
                            <th className={td_class} align="left">
                                Code
                            </th>
                            <th className={td_class} align="left">
                                Title
                            </th>
                            <th className={td_class} align="left">
                                Units
                            </th>
                            <th className={td_class} align="left">
                                Prerequisite
                            </th>
                            <th className={td_class} align="left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester_data.subject_ids.map((subject_id, index) => (
                            <SubjectItem
                                key={index}
                                curriculum_id={curriculum_id}
                                subject_id={subject_id}
                                year_level={year_level}
                                semester={semester}
                            />
                        ))}
                        <tr className="font-semibold">
                            <td className={td_class} colSpan={2} align="right">
                                Total Units:
                            </td>
                            <td className={td_class}>
                                {semester_data.total_units}
                            </td>
                            <td className={td_class}></td>
                            <td className={td_class}></td>
                        </tr>
                    </tbody>
                </Table>
            </CardContent>
            <CardFooter>
                <Suspense fallback={<Loading />}>
                    <div className="flex gap-2">
                        <SubjectSelect
                            className="border-0 shadow-none bg-gray-100 hover:bg-red-700 text-red-500 hover:text-white"
                            subjectsPromise={subjectsPromise}
                            onSelectSubjectAction={handleSubjectSelect}
                        />

                        <ClearSemesterSubjectsForm
                            curriculum_id={curriculum_id}
                            year_level={year_level}
                            semester={semester}
                        />
                    </div>
                </Suspense>
            </CardFooter>
        </Card>
    );
}

function Loading() {
    return (
        <div className="flex gap-2">
            <Skeleton className="h-[35px] w-[35px] rounded-lg" />
            <Skeleton className="h-[35px] w-[35px] rounded-lg" />
        </div>
    );
}
