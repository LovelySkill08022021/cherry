import { Skeleton } from "@/components/ui/skeleton";
import { getOrdinal } from "@/lib/utils";
import { Subject } from "@/types";
import { Suspense } from "react";
import RemoveYearlevelForm from "./RemoveYearlevelForm";
import Semester from "./Semester";

type Props = {
    curriculum_id: number;
    year_level: number;
    subjectsPromise: Promise<Subject[]>;
};

export default async function YearLevel({
    curriculum_id,
    year_level,
    subjectsPromise,
}: Props) {
    return (
        <div>
            <div className="flex justify-between items-center my-2">
                <div className="font-semibold">
                    {getOrdinal(year_level)} Year
                </div>
                <RemoveYearlevelForm
                    year_level={year_level}
                    curriculum_id={curriculum_id}
                />
            </div>
            <div className="flex gap-5">
                <Suspense fallback={<Loading />}>
                    <Semester
                        subjectsPromise={subjectsPromise}
                        semester={1}
                        curriculum_id={curriculum_id}
                        year_level={year_level}
                    />
                </Suspense>

                <Suspense fallback={<Loading />}>
                    <Semester
                        subjectsPromise={subjectsPromise}
                        semester={2}
                        curriculum_id={curriculum_id}
                        year_level={year_level}
                    />
                </Suspense>
            </div>
        </div>
    );
}

function Loading() {
    return <Skeleton className="h-[200px] w-1/2 rounded-xl" />;
}
