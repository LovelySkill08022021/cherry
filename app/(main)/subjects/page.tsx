import { Button } from "@/components/ui/button";

import { db } from "@/db";
import { subjects } from "@/db/schema";
import { ListPlus, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function page() {
    const all_subjects = await db.select().from(subjects);
    return (
        <div>
            <div className="mb-5">
                <span className="font-semibold text-lg">List of subjects</span>
            </div>
            <div className="mb-3">
                <Link href="/subjects/0">
                    <Button>
                        <ListPlus /> New
                    </Button>
                </Link>
            </div>
            <Table className="w-1/2">
                <TableCaption>A list of subjects.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {all_subjects.map((subject) => (
                        <TableRow key={subject.id}>
                            <TableCell className="font-medium">
                                {subject.code}
                            </TableCell>
                            <TableCell>{subject.title}</TableCell>
                            <TableCell>{subject.units}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/subjects/${subject.id}`}>
                                    <Button
                                        className="text-red-500 hover:bg-red-500 hover:text-white"
                                        variant={"ghost"}
                                    >
                                        <SquarePen />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
