"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subject } from "@/types";
import { MoreVertical, Network } from "lucide-react";
import TreeViewer from "./TreeViewer";

export default function ActionDropDown(props: {
    subject: Subject;
    student_id: number;
    curriculum_id: number;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="h-6 w-6 me-[3px] my-[3px] bg-transparent border-0 shadow-none rounded-[5px] hover:bg-red-100"
                    variant={"outline"}
                    // onMouseOver={() => alert(props.subject.id)}
                >
                    <MoreVertical size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <TreeViewer
                    className="w-[60%] h-[90%]"
                    triggerComponent={
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Network /> View tree
                        </DropdownMenuItem>
                    }
                    subject={props.subject}
                    curriculum_id={props.curriculum_id}
                    student_id={props.student_id}
                />
                {/* <DropdownMenuItem>Modify students</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
