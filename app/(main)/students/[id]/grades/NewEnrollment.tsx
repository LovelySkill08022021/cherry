"use client";

import { createEnrollment } from "@/actions/students/grades/create-enrollment";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getOrdinal } from "@/lib/utils";
import { ClipboardPlus, LoaderCircle, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
    student_id: number;
    year_levels: number[];
};

export default function NewEnrollment(props: Props) {
    const semesters = [1, 2, 3];

    const [pending, startTransition] = useTransition();
    const [form, setForm] = useState({
        year_level: "",
        semester: "",
    });

    function handleHandleSubmit() {
        startTransition(async () => {
            const response = await createEnrollment({
                student_id: props.student_id,
                year_level: Number(form.year_level),
                semester: Number(form.semester),
            });

            if (response.status == "warning") {
                toast.warning("Warning", {
                    description: response.message,
                });
                return;
            }

            if (!response.status) {
                toast.error("Notice", {
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus /> New enrollment
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new enrollment</DialogTitle>
                    {/* <DialogDescription>
                        Create 
                    </DialogDescription> */}
                </DialogHeader>
                {/* {JSON.stringify(form)} */}
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <Select
                            onValueChange={(value) =>
                                setForm({ ...form, year_level: value })
                            }
                            defaultValue={form.year_level}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Year Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.year_levels.map((item, index) => (
                                    <SelectItem
                                        key={index}
                                        value={String(item)}
                                    >
                                        {getOrdinal(item)} year
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <Select
                            onValueChange={(value) =>
                                setForm({ ...form, semester: value })
                            }
                            defaultValue={form.semester}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters.map((item, index) => {
                                    if (item == 3) {
                                        return (
                                            <SelectItem
                                                key={index}
                                                value={String(item)}
                                            >
                                                Mid year
                                            </SelectItem>
                                        );
                                    }
                                    return (
                                        <SelectItem
                                            key={index}
                                            value={String(item)}
                                        >
                                            {getOrdinal(item)} semester
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleHandleSubmit} disabled={pending}>
                        {pending ? (
                            <>
                                <LoaderCircle
                                    className="animate-spin"
                                    strokeWidth={3}
                                    size={15}
                                />{" "}
                                Creating...
                            </>
                        ) : (
                            <>
                                <ClipboardPlus /> Create
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
