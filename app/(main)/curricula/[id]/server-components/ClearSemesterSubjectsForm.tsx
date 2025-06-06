"use client";

import { clearCurriculumSubjects } from "@/actions/curriculum/clear-semester-subjects";
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { BrushCleaning, LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    curriculum_id: number;
    year_level: number;
    semester: number;
};
export default function ClearSemesterSubjectsForm({
    curriculum_id,
    year_level,
    semester,
}: Props) {
    const [pending, startTransition] = useTransition();
    function submmitForm() {
        startTransition(async () => {
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            const result = await clearCurriculumSubjects(
                curriculum_id,
                year_level,
                semester
            );

            if (result.status == "error") {
                toast.error("Notice!", {
                    description: result.message,
                });
                return;
            }

            if (result.status == "info") {
                toast.info("Information", {
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
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="border-0 shadow-none bg-gray-100 hover:bg-red-700 text-red-500 hover:text-white"
                                variant={"outline"}
                                size={"icon"}
                                disabled={pending}
                            >
                                {pending ? (
                                    <LoaderCircle
                                        className="animate-spin"
                                        strokeWidth={3}
                                        color="red"
                                    />
                                ) : (
                                    <BrushCleaning />
                                )}
                            </Button>
                        </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Clear all subjects in this semester</p>
                    </TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete all the subjects added to this semester.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button onClick={submmitForm}>Confirm</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
