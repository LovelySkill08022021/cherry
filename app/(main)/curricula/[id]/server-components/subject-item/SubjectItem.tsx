import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { curriculum_subjects, prerequisites, subjects } from "@/db/schema";
import { and, eq, notInArray } from "drizzle-orm";
import { Suspense } from "react";
import Prerequisite from "../prerequisite/Prerequisite";
import SelectPrerequisite from "../prerequisite/SelectPrerequisite";
import RemoveSubjectForm from "../RemoveSubjectForm";
import { td_class } from "../Semester";

export default async function SubjectItem({
    subject_id,
    curriculum_id,
    year_level,
    semester,
}: {
    subject_id: number;
    curriculum_id: number;
    year_level: number;
    semester: number;
}) {
    const result = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, subject_id));
    const subject = result[0];

    const subject_prerequisites = (
        await db
            .select({
                prerequisite: prerequisites.prerequisite,
            })
            .from(prerequisites)
            .leftJoin(subjects, eq(prerequisites.prerequisite, subjects.id))
            .where(
                and(
                    eq(prerequisites.subject_id, subject_id),
                    eq(prerequisites.curriculum_id, curriculum_id)
                )
            )
    ).map((item) => {
        return item.prerequisite;
    });

    async function getSubjectinThisCurriculum() {
        const subjectsPromise = (
            await db
                .select()
                .from(curriculum_subjects)
                .leftJoin(
                    subjects,
                    eq(curriculum_subjects.subject_id, subjects.id)
                )
                .where(
                    and(
                        eq(curriculum_subjects.curriculum_id, curriculum_id),
                        notInArray(
                            curriculum_subjects.subject_id,
                            subject_prerequisites
                        )
                    )
                )
        )
            .filter((item) => {
                if (
                    item.curriculum_subjects.year_level < year_level ||
                    (item.curriculum_subjects.year_level == year_level &&
                        item.curriculum_subjects.semester == 1)
                ) {
                    if (
                        item.curriculum_subjects.semester == semester &&
                        item.curriculum_subjects.year_level == year_level
                    ) {
                        return false;
                    }

                    return true;
                }
            })
            .map((item) => {
                return item.subjects;
            })
            .filter((item) => item != null);

        return subjectsPromise;
    }

    return (
        <tr className="hover:bg-gray-100 ">
            <td className={td_class} valign="top">
                {subject.code}
            </td>
            <td className={td_class} valign="top">
                <span className="text-wrap">{subject.title}</span>
            </td>
            <td className={td_class} valign="top">
                {subject.units}
            </td>
            <td className={td_class} valign="top">
                <div>
                    {subject_prerequisites.map(
                        (subject_prerequisite, index) => (
                            <Suspense
                                key={index}
                                fallback={
                                    <Skeleton className="w-[100px] h-[21px] mb-1" />
                                }
                            >
                                <Prerequisite
                                    prerequisite={subject_prerequisite}
                                    subject_id={subject_id}
                                    curriculum_id={curriculum_id}
                                />
                            </Suspense>
                        )
                    )}

                    {!(year_level == 1 && semester == 1) ? (
                        <SelectPrerequisite
                            subject_id={subject_id}
                            curriculum_id={curriculum_id}
                            subjectsPromise={getSubjectinThisCurriculum()}
                        />
                    ) : (
                        <div className="text-gray-400">n/a</div>
                    )}
                </div>
            </td>
            <td className={td_class} valign="top">
                <RemoveSubjectForm
                    curriculum_id={curriculum_id}
                    subject_id={subject_id}
                />
            </td>
        </tr>
    );
}
