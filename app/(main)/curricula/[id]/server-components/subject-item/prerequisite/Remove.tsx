"use client";

import { removeSubjectPrerequisite } from "@/actions/curriculum/prerequisites/remove-subject-prerequisite";
import { LoaderCircle, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Remove({
    prerequisite,
    subject_id,
    curriculum_id,
}: {
    prerequisite: number;
    subject_id: number;
    curriculum_id: number;
}) {
    const [pending, startTransition] = useTransition();

    function handleRemove() {
        startTransition(async () => {
            const response = await removeSubjectPrerequisite(
                prerequisite,
                subject_id,
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
        <button onClick={handleRemove} disabled={pending}>
            {pending ? (
                <LoaderCircle
                    className="animate-spin text-red-300"
                    strokeWidth={3}
                    size={15}
                />
            ) : (
                <X className="text-red-600" strokeWidth={3} size={15} />
            )}
        </button>
    );
}
