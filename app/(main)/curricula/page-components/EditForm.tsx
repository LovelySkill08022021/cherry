"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Form from "./Form";

export default function EditForm({
    data,
}: {
    data: {
        id: number;
        label: string;
    };
}) {
    return (
        <Form
            mode="edit"
            data={data}
            triggerComponent={
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                    }}
                >
                    Edit
                </DropdownMenuItem>
            }
        />
    );
}
