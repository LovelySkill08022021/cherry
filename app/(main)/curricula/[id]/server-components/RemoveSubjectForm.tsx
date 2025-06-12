"use client";

import { removeCurriculumSubject } from "@/actions/curriculum/remove-curriculum-subject";
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

type Props = {
    curriculum_id: number;
    subject_id: number;
};

export default function RemoveSubjectForm({
    curriculum_id,
    subject_id,
}: Props) {
    const [pending, startTransition] = useTransition();
    function submitForm() {
        startTransition(async () => {
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            const result = await removeCurriculumSubject(
                curriculum_id,
                subject_id
            );

            if (!result.success) {
                toast.error("Notice!", {
                    description: result.message,
                });

                return;
            }

            toast.success("Message", {
                description: result.message,
            });
        });
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"ghost"} size={"icon"} disabled={pending}>
                        {pending ? (
                            <LoaderCircle
                                className="animate-spin"
                                strokeWidth={3}
                                color="red"
                            />
                        ) : (
                            <X strokeWidth={3} color="red" />
                        )}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are trying to remove a subject.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button onClick={submitForm}>Confirm</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
