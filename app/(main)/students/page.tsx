
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { students } from "@/db/schema";
import React from "react";

export default async function page() {
    const data = await db.select().from(students);

    return (
        <div>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.student_number}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.middle_name}</TableCell>
                                <TableCell>{student.year_level}</TableCell>
                                <TableCell>{student.section}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
