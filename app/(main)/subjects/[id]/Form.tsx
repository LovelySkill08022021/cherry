"use client";

import { saveSubject } from "@/actions/subjects/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Message from "@/components/ui/Message";
import { Textarea } from "@/components/ui/textarea";
import { Subject } from "@/types";
import { CircleCheck, CircleX, Save } from "lucide-react";
import { useActionState } from "react";

export default function Form({ data }: { data: Subject }) {
    const [state, formAction, pending] = useActionState(saveSubject, null);
    return (
        <form action={formAction}>
            <div className="flex flex-col gap-7 w-1/3">
                <div className="gap-2 w-full justify-end flex flex-col">
                    <input type="hidden" value={data.id} name="id" />
                    <Label htmlFor="code">Code</Label>
                    <Input
                        id="code"
                        name="code"
                        defaultValue={
                            state?.inputs?.code
                                ? state?.inputs?.code
                                : data.code
                        }
                    />
                    <div className="text-red-600">{state?.errors?.code}</div>
                </div>
                <div className="gap-2 w-full justify-end flex flex-col">
                    <Label htmlFor="title">Title</Label>
                    <Textarea
                        id="title"
                        name="title"
                        defaultValue={
                            state?.inputs?.title
                                ? state?.inputs?.title
                                : data.title
                        }
                    />
                    <div className="text-red-600">{state?.errors?.title}</div>
                </div>
                <div className="gap-2 w-full justify-end flex flex-col">
                    <Label htmlFor="units">units</Label>
                    <Input
                        id="units"
                        name="units"
                        type="number"
                        defaultValue={
                            state?.inputs?.units
                                ? state?.inputs?.units
                                : data.units
                        }
                    />
                    <div className="text-red-600">{state?.errors?.units}</div>
                </div>
                {state?.message && (
                    <div className="flex gap-2">
                        {state?.success ? (
                            <Message
                                icon={<CircleCheck />}
                                title="Well done!"
                                description={state.message}
                                variant={"success"}
                            />
                        ) : (
                            <Message
                                icon={<CircleX />}
                                title="Error"
                                description={state.message}
                                variant={"error"}
                            />
                        )}
                    </div>
                )}
                <div className="flex gap-2">
                    <Button disabled={pending}>
                        <Save />
                        {pending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
