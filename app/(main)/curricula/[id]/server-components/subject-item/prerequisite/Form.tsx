"use client";

import { addSubjectPrerequisite } from "@/actions/curriculum/prerequisites/add-subject-prerequisite";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    subject_id: number;
    prerequisite: number;
    curriculum_id: number;
};

export default function Form({
    subject_id,
    prerequisite,
    curriculum_id,
}: Props) {
    const [pending, startTransition] = useTransition();

    function onPrerequisiteSelect() {
        startTransition(async () => {
            const response = await addSubjectPrerequisite(
                subject_id,
                prerequisite,
                curriculum_id
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
        <div className="">
            <Button
                disabled={pending}
                onClick={onPrerequisiteSelect}
                variant={"ghost"}
                size={"icon"}
                className="hover:text-white bg-gray-100 hover:bg-red-700 text-red-500"
            >
                {pending ? (
                    <LoaderCircle
                        strokeWidth={3}
                        className="animate-spin text-red-500"
                    />
                ) : (
                    <Plus strokeWidth={3} />
                )}
            </Button>
        </div>
    );
}
