"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Student } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function StudentTable(props: { list_student: Student[] }) {
    const [filters, setFilters] = useState({
        keyword: "",
        year_level: "all",
        section: "all",
    });

    function filterStudent(student: Student) {
        if (filters.year_level == "all" && filters.section == "all") {
            return true;
        }

        if (filters.year_level != "all" && filters.section == "all") {
            return student.year_level == Number(filters.year_level);
        }

        if (filters.year_level == "all" && filters.section != "all") {
            return student.section == filters.section;
        }

        return (
            student.year_level == Number(filters.year_level) &&
            student.section == filters.section
        );
    }

    return (
        <>
            <div className="flex items-center gap-3 mb-3">
                <div className="space-y-2 w-2/4">
                    <Label>
                        Search <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        className="bg-gray-200"
                        placeholder="Search student by name"
                        value={filters.keyword}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                keyword: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="space-y-2 w-1/4">
                    <Label>Year level</Label>
                    <Select
                        value={filters.year_level}
                        onValueChange={(value: string) =>
                            setFilters({
                                ...filters,
                                year_level: value,
                            })
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="1">1st year</SelectItem>
                            <SelectItem value="2">2nd year</SelectItem>
                            <SelectItem value="3">3rd year</SelectItem>
                            <SelectItem value="4">4th year</SelectItem>
                            <SelectItem value="5">5th year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 w-1/4">
                    <Label>Section</Label>
                    <Select
                        value={filters.section}
                        onValueChange={(value: string) =>
                            setFilters({
                                ...filters,
                                section: value,
                            })
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="E">E</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Last Name</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Middle Name</TableHead>
                        <TableHead>Year Level</TableHead>
                        <TableHead>Section</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.list_student
                        .filter((student) => {
                            return (
                                student.last_name
                                    .toLowerCase()
                                    .includes(filters.keyword.toLowerCase()) ||
                                student.first_name
                                    .toLowerCase()
                                    .includes(filters.keyword.toLowerCase()) ||
                                student.middle_name
                                    ?.toLowerCase()
                                    .includes(filters.keyword.toLowerCase())
                            );
                        })
                        .filter((student) => filterStudent(student))
                        .map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.middle_name}</TableCell>
                                <TableCell>{student.year_level}</TableCell>
                                <TableCell>{student.section}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
