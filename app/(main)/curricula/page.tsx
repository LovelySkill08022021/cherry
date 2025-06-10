import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { db } from "@/db";
import { curricula } from "@/db/schema";
import { Grid2x2Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Form from "./page-components/Form";

export default async function page() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await db.select().from(curricula);

    return (
        <>
            <div className="mb-5">
                <Form
                    mode="add"
                    data={{ id: 0, label: "" }}
                    triggerComponent={
                        <Button>
                            <Grid2x2Plus />
                            New
                        </Button>
                    }
                />
            </div>

            <div className="w-[500px]">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Label</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((curriculum) => (
                            <TableRow key={curriculum.id}>
                                <TableCell>
                                    <Link
                                        className="hover:text-blue-400"
                                        href={`/curricula/${curriculum.id}`}
                                    >
                                        {curriculum.label}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {/*  */}

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                            >
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Form
                                                mode="edit"
                                                data={curriculum}
                                                triggerComponent={
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                }
                                            />
                                            <Link
                                                href={`/curricula/${curriculum.id}/students`}
                                            >
                                                <DropdownMenuItem>
                                                    Modify students
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
