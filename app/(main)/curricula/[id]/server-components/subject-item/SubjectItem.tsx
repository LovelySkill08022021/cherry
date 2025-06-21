import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { curriculum_subjects, prerequisites, subjects } from "@/db/schema";
import { and, eq, ne, notInArray } from "drizzle-orm";
import { Suspense } from "react";
import RemoveSubjectForm from "../RemoveSubjectForm";
import { td_class } from "../Semester";
import Prerequisite from "./prerequisite/Prerequisite";
import SelectPrerequisite from "./prerequisite/SelectPrerequisite";

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

    const subject_prerequisites = await db.transaction(async (tx) => {
        const subject_prerequisite_ids = (
            await tx
                .select({
                    prerequisite: prerequisites.prerequisite,
                })
                .from(prerequisites)
                .where(
                    and(
                        eq(prerequisites.subject_id, subject_id),
                        eq(prerequisites.curriculum_id, curriculum_id),
                        ne(prerequisites.type, "std")
                    )
                )
        ).map((item) => {
            return item.prerequisite;
        });

        const subject_prerequisite_data = await tx
            .select()
            .from(prerequisites)
            .where(
                and(
                    eq(prerequisites.subject_id, subject_id),
                    eq(prerequisites.curriculum_id, curriculum_id)
                )
            );

        const standing_prereq = await tx
            .select()
            .from(prerequisites)
            .where(
                and(
                    eq(prerequisites.subject_id, subject_id),
                    eq(prerequisites.curriculum_id, curriculum_id),
                    eq(prerequisites.type, "std")
                )
            );

        const has_standing_prereq = standing_prereq.length > 0 ? true : false;

        return {
            subject_prerequisite_ids,
            subject_prerequisite_data,
            has_standing_prereq,
        };
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
                            subject_prerequisites.subject_prerequisite_ids
                        )
                    )
                )
        )
            .filter((item) => {
                if (
                    item.curriculum_subjects.year_level < year_level ||
                    (item.curriculum_subjects.year_level == year_level &&
                        item.curriculum_subjects.semester <= semester &&
                        item.curriculum_subjects.subject_id != subject_id)
                ) {
                    // if (
                    //     item.curriculum_subjects.semester == semester &&
                    //     item.curriculum_subjects.year_level == year_level
                    // ) {
                    //     return false;
                    // }

                    return true;
                }
                // if (item.curriculum_subjects.year_level == year_level) {
                //     return true;
                // }
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
                    {subject_prerequisites.subject_prerequisite_data.map(
                        (subject_prerequisite, index) => (
                            <Suspense
                                key={index}
                                fallback={
                                    <Skeleton className="w-[100px] h-[21px] mb-1" />
                                }
                            >
                                <Prerequisite
                                    prerequisite={
                                        subject_prerequisite.prerequisite
                                    }
                                    subject_id={subject_id}
                                    curriculum_id={curriculum_id}
                                    type={subject_prerequisite.type}
                                />
                            </Suspense>
                        )
                    )}

                    {!(year_level == 1 && semester == 1) ? (
                        <SelectPrerequisite
                            year_level={year_level}
                            subject_id={subject_id}
                            curriculum_id={curriculum_id}
                            subjectsPromise={getSubjectinThisCurriculum()}
                            hasStandingPrereq={
                                subject_prerequisites.has_standing_prereq
                            }
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
