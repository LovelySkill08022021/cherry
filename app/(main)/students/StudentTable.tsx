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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Student } from "@/types";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { searchGetStudents } from "./action";

export default function StudentTable({
    initial_data,
}: {
    initial_data: Student[];
}) {
    const [student_list, action, pending] = useActionState(
        searchGetStudents,
        initial_data
    );

    return (
        <>
            <form action={action}>
                <div className="flex gap-3 mb-5 w-1/2">
                    <Input name="keyword" placeholder="Search student" />
                    <Button disabled={pending}>
                        {pending ? "Searching..." : "Search"}
                    </Button>
                </div>
            </form>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Number</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Middle Name</TableHead>
                            <TableHead>Year Level</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {student_list.length <= 0 && (
                            <TableRow>
                                <TableCell
                                    align="center"
                                    className="py-5"
                                    colSpan={6}
                                >
                                    No student found
                                </TableCell>
                            </TableRow>
                        )}
                        {student_list?.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.student_number}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.middle_name}</TableCell>
                                <TableCell>{student.year_level}</TableCell>
                                <TableCell>{student.section}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size={"icon"}
                                            >
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Option
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link
                                                href={`/students/${student.id}/prospectus`}
                                            >
                                                <DropdownMenuItem>
                                                    Prospectus
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link
                                                href={`/students/${student.id}/grades`}
                                            >
                                                <DropdownMenuItem>
                                                    Grades
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
