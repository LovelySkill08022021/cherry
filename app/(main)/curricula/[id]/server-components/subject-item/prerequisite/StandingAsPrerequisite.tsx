"use client";

import { addSubjectPrerequisite } from "@/actions/curriculum/prerequisites/add-subject-prerequisite";
import { Button } from "@/components/ui/button";
import { getOrdinal } from "@/lib/utils";
import { LoaderCircle, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function StandingAsPrerequisite({
    year_level,
    subject_id,
    curriculum_id,
}: {
    year_level: number;
    subject_id: number;
    curriculum_id: number;
}) {
    const [pending, startTransition] = useTransition();

    function addStandingAsPrerequisite() {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await addSubjectPrerequisite(
                subject_id,
                year_level,
                curriculum_id,
                "std"
            );

            if (!response.status) {
                toast.error("Notice!", {
                    description: response.message,
                });
                return;
            }
            toast.success("Message", {
                description: response.message,
            });
        });
    }

    return (
        <div
            className={`shadow-lg  flex gap-2 items-center bg-gray-100 py-2 mb-3 rounded-lg px-2`}
        >
            <Button
                disabled={pending}
                onClick={addStandingAsPrerequisite}
                variant={"outline"}
                size={"icon"}
                className="hover:text-white hover:bg-red-600 bg-red-700 text-white"
            >
                {pending ? (
                    <LoaderCircle strokeWidth={3} className="animate-spin " />
                ) : (
                    <Plus strokeWidth={3} />
                )}
            </Button>
            <div className="leading-[15px] font-semibold w-full">
                {getOrdinal(year_level)} year standing
            </div>
        </div>
    );
}
