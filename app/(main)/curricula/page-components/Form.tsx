"use client";

import { saveCurriculum } from "@/actions/curriculum/action";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { JSX, useActionState } from "react";

export default function Form({
    mode,
    data,
    triggerComponent,
}: {
    mode: "add" | "edit";
    data: { id: number; label: string };
    triggerComponent: JSX.Element;
}) {
    const [state, formAction, isPending] = useActionState(saveCurriculum, null);

    return (
        <>
            <div className="">
                <Dialog>
                    <DialogTrigger asChild>
                        {triggerComponent}
                        {/* {mode == "add" ? (
                            <Button>
                                <Grid2x2Plus />
                                New
                            </Button>
                        ) : (
                            <Button variant={"ghost"}>
                                <MoreHorizontal />
                            </Button>
                        )} */}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form action={formAction}>
                            <DialogHeader>
                                <DialogTitle>
                                    {mode == "add" ? "Create new" : "Edit"}{" "}
                                    curriculum
                                </DialogTitle>

                                <DialogDescription>
                                    {`Make changes to your profile here. Click
                                    save when you're done.`}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-2 py-4">
                                <Label htmlFor="label" className="text-right">
                                    Curriculum name
                                </Label>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={data.id}
                                />
                                <Input
                                    defaultValue={
                                        state?.inputs?.label
                                            ? state?.inputs.label
                                            : data.label
                                    }
                                    id="label"
                                    name="label"
                                    className="col-span-3"
                                />
                                <small className="text-red-700">
                                    {state?.errors?.label}
                                </small>
                                <div
                                    className={
                                        state?.success
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }
                                >
                                    {state?.message}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    <Save />
                                    {mode == "add"
                                        ? isPending
                                            ? "Saving..."
                                            : "Save"
                                        : isPending
                                          ? "Updating..."
                                          : "Update"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
