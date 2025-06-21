"use client";

import { removeSubjectPrerequisite } from "@/actions/curriculum/prerequisites/remove-subject-prerequisite";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button disabled={pending}>
                        {pending ? (
                            <LoaderCircle
                                className="animate-spin text-red-300"
                                strokeWidth={3}
                                size={15}
                            />
                        ) : (
                            <X
                                className="text-red-600"
                                strokeWidth={3}
                                size={15}
                            />
                        )}
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {`You are trying to remove a subject's prerequisite.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button onClick={handleRemove}>Confirm</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
