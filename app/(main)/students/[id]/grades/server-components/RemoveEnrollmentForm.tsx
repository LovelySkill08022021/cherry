"use client";

import removeEnrollment from "@/actions/students/grades/remove-enrollment";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
    enrollment_id: number;
    student_id: number;
};

export default function RemoveEnrollmentForm(props: Props) {
    const [confirm_key, setConfirmKey] = useState("");
    const [pending, startTransition] = useTransition();
    function submitForm() {
        startTransition(async () => {
            const response = await removeEnrollment(
                props.enrollment_id,
                props.student_id
            );

            setConfirmKey("");

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
        <AlertDialog>
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
                        <X strokeWidth={3} />
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            <div>
                                This action cannot be undone. It will
                                permanently delete all the subjects added to
                                this semester.
                            </div>
                            <div className="space-y-2 mt-5">
                                <Label htmlFor="confirmation">
                                    {`Type "CONFIRM" to proceed`}
                                </Label>
                                <Input
                                    id="confirmation"
                                    value={confirm_key}
                                    onChange={(e) =>
                                        setConfirmKey(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={submitForm}
                            disabled={confirm_key != "CONFIRM"}
                        >
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
