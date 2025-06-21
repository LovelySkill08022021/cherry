"use client";

import { addCurriculumSubject } from "@/actions/curriculum/add-curriculum-subject";
import { Button } from "@/components/ui/button";
import { Subject } from "@/types";
import { LoaderCircle, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddSubjectForm({
    curriculum_id,
    year_level,
    semester,
    subject,
}: {
    curriculum_id: number;
    year_level: number;
    semester: number;
    subject: Subject;
}) {
    const [pending, startTransition] = useTransition();

    function handleSubjectSelect() {
        startTransition(async () => {
            const response = await addCurriculumSubject(
                curriculum_id,
                year_level,
                semester,
                subject.id
            );

            if (!response.success) {
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
        <Button
            disabled={pending}
            onClick={handleSubjectSelect}
            variant={"ghost"}
            size={"icon"}
            className="bg-gray-100 hover:text-white hover:bg-red-700 text-red-500"
        >
            {pending ? (
                <LoaderCircle
                    className="animate-spin"
                    strokeWidth={3}
                    color="red"
                />
            ) : (
                <Plus strokeWidth={3} />
            )}
        </Button>
    );
}
