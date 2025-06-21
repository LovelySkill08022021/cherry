"use client";

import { removeCurriculumYearLevel } from "@/actions/curriculum/remove-curriculum-yearlevel";
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
    year_level: number;
    curriculum_id: number;
};
export default function RemoveYearlevelForm({
    year_level,
    curriculum_id,
}: Props) {
    const [confirm_key, setConfirmKey] = useState("");

    const [pending, startTransition] = useTransition();
    function submmitForm() {
        startTransition(async () => {
            const result = await removeCurriculumYearLevel(
                year_level,
                curriculum_id
            );

            setConfirmKey("");

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
                    <Button size={"sm"} disabled={pending}>
                        {pending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            <X />
                        )}
                        {pending ? "Removing..." : "Remove"}
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
                                    this year level.
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
                                onClick={submmitForm}
                                disabled={confirm_key != "CONFIRM"}
                            >
                                Confirm
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
