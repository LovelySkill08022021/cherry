"use client";

import { removeStudentGrade } from "@/actions/students/remove-student-grade";
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
import { Grade } from "@/types";
import { LoaderCircle, X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function RemoveGradeForm({ grade }: { grade: Grade }) {
    const [pending, startTransition] = useTransition();

    function submitForm() {
        startTransition(async () => {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(grade);

            const response = await removeStudentGrade(grade);
            if (response.status == true) {
                toast.success("Message", {
                    description: response.message,
                });
            }

            if (response.status == false) {
                toast.error("Notice", {
                    description: response.message,
                });
            }
        });
    }

    return (
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
                        Attempting to remove{" "}
                        <span className="text-red-600">
                            {grade.value.toFixed(2)}
                        </span>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. It will permanently delete
                        the grade.
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
    );
}
