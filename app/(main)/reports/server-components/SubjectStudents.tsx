"use client";

import {
    getSySubjects,
    SubjectStudentsType,
} from "@/actions/reports/subject-students/get-sy-subjects";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Curriculum, Student } from "@/types";
import { useEffect, useState } from "react";

export default function SubjectStudents(props: { curricula: Curriculum[] }) {
    const d = new Date(Date.now());
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const [subject_students, setSubjectStudent] = useState<
        SubjectStudentsType[]
    >([]);
    const [current_sy, setCurrentSy] = useState(() => {
        if (month <= 6) {
            return `SY ${year - 1}-${year}`;
        } else {
            return `SY ${year}-${year + 1}`;
        }
    });
    const [selected_sy, setSelectedSy] = useState("");
    const [search_filters, setSearchFilters] = useState({
        subject: "",
        student_name: "",
        year_level: "all",
        section: "all",
    });

    async function handleSearchAction(sy: string) {
        setSelectedSy(sy);
        const response = await getSySubjects(sy);
        setSubjectStudent(response);
    }

    function searchStudentName(student: Student) {
        return (
            student.first_name
                .toLowerCase()
                .includes(search_filters.student_name.toLowerCase()) ||
            student.middle_name
                ?.toLowerCase()
                .includes(search_filters.student_name.toLowerCase()) ||
            student.last_name
                .toLowerCase()
                .includes(search_filters.student_name.toLowerCase())
        );
    }

    function filterStudent(student: Student) {
        if (
            search_filters.year_level == "all" &&
            search_filters.section == "all"
        ) {
            return true;
        }

        if (
            search_filters.year_level != "all" &&
            search_filters.section == "all"
        ) {
            return student.year_level == Number(search_filters.year_level);
        }

        if (
            search_filters.year_level == "all" &&
            search_filters.section != "all"
        ) {
            return student.section == search_filters.section;
        }

        return (
            student.year_level == Number(search_filters.year_level) &&
            student.section == search_filters.section
        );
    }

    useEffect(() => {
        getSySubjects(current_sy).then((response) => {
            setSelectedSy(current_sy);
            setSubjectStudent(response);
        });
    }, []);

    return (
        <>
            <div className="mb-5 font-semibold text-lg">Subject Students</div>
            <div className="flex gap-5">
                <div className="w-3/4">
                    <Card className="shadow-none border-0">
                        <CardHeader>
                            <CardTitle className="mb-3">
                                Search filters
                            </CardTitle>
                            <CardDescription className="mb-5">
                                {/* {JSON.stringify(search_filters)} */}
                                <div className="space-y-7">
                                    <div className="space-y-2">
                                        <Label htmlFor="search_subject">
                                            Search subject
                                        </Label>
                                        <Input
                                            id="search_subject"
                                            placeholder="Search subject"
                                            value={search_filters.subject}
                                            onChange={(e) =>
                                                setSearchFilters({
                                                    ...search_filters,
                                                    subject: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="space-y-2 w-2/4">
                                                <Label>
                                                    Search{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className=""
                                                    placeholder="Search student by name"
                                                    value={
                                                        search_filters.student_name
                                                    }
                                                    onChange={(e) =>
                                                        setSearchFilters({
                                                            ...search_filters,
                                                            student_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2 w-1/4">
                                                <Label>Year level</Label>
                                                <Select
                                                    value={
                                                        search_filters.year_level
                                                    }
                                                    onValueChange={(
                                                        value: string
                                                    ) =>
                                                        setSearchFilters({
                                                            ...search_filters,
                                                            year_level: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Year Level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">
                                                            All
                                                        </SelectItem>
                                                        <SelectItem value="1">
                                                            1st year
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            2nd year
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            3rd year
                                                        </SelectItem>
                                                        <SelectItem value="4">
                                                            4th year
                                                        </SelectItem>
                                                        <SelectItem value="5">
                                                            5th year
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2 w-1/4">
                                                <Label>Section</Label>
                                                <Select
                                                    value={
                                                        search_filters.section
                                                    }
                                                    onValueChange={(
                                                        value: string
                                                    ) =>
                                                        setSearchFilters({
                                                            ...search_filters,
                                                            section: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Section" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">
                                                            All
                                                        </SelectItem>
                                                        <SelectItem value="A">
                                                            A
                                                        </SelectItem>
                                                        <SelectItem value="B">
                                                            B
                                                        </SelectItem>
                                                        <SelectItem value="C">
                                                            C
                                                        </SelectItem>
                                                        <SelectItem value="D">
                                                            D
                                                        </SelectItem>
                                                        <SelectItem value="E">
                                                            E
                                                        </SelectItem>
                                                        <SelectItem value="F">
                                                            F
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardDescription>
                            <CardTitle className="mb-3">
                                Subjects of{" "}
                                <span className="text-red-600">
                                    {selected_sy}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent
                        // className="max-h-[400px] overflow-y-auto"
                        >
                            <Accordion type="multiple">
                                {subject_students
                                    .filter((item) => {
                                        return (
                                            item.subject.code
                                                .toLowerCase()
                                                .includes(
                                                    search_filters.subject.toLowerCase()
                                                ) ||
                                            item.subject.title
                                                .toLowerCase()
                                                .includes(
                                                    search_filters.subject.toLowerCase()
                                                )
                                        );
                                    })
                                    .map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={String(index)}
                                        >
                                            <AccordionTrigger>
                                                {item.subject.code} -{" "}
                                                {item.subject.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <Card className="shadow-none bg-gray-100 border-0">
                                                    <CardHeader>
                                                        <CardTitle>
                                                            <div className="text-sm">
                                                                {
                                                                    item.students.filter(
                                                                        (
                                                                            student
                                                                        ) =>
                                                                            filterStudent(
                                                                                student
                                                                            )
                                                                    ).length
                                                                }{" "}
                                                                student
                                                                {item.students
                                                                    .length > 1
                                                                    ? "s"
                                                                    : ""}
                                                            </div>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>
                                                                        Last
                                                                        name
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        First
                                                                        name
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Middle
                                                                        name
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Year
                                                                        level
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Section
                                                                    </TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {item.students
                                                                    .filter(
                                                                        (
                                                                            student
                                                                        ) =>
                                                                            filterStudent(
                                                                                student
                                                                            )
                                                                    )
                                                                    .filter(
                                                                        (
                                                                            student
                                                                        ) =>
                                                                            searchStudentName(
                                                                                student
                                                                            )
                                                                    )
                                                                    .map(
                                                                        (
                                                                            student,
                                                                            mini_index
                                                                        ) => (
                                                                            <TableRow
                                                                                key={
                                                                                    mini_index
                                                                                }
                                                                            >
                                                                                <TableCell>
                                                                                    {
                                                                                        student.last_name
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        student.first_name
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        student.middle_name
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        student.year_level
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        student.section
                                                                                    }
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    )}
                                                            </TableBody>
                                                        </Table>
                                                    </CardContent>
                                                </Card>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-1/4">
                    <Card className="shadow-none border-0">
                        <CardHeader>
                            <CardTitle>School years</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-[400px] overflow-y-auto">
                            <Button
                                onClick={() => handleSearchAction(current_sy)}
                                className=""
                            >
                                {current_sy}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* {JSON.stringify(subject_students)} */}

            {/* <div className="space-y-2">
                {subject_students.map((item) => (
                    <div className="bg-white px-4 py-3 leading-5 rounded-lg">
                        <div className="font-semibold">
                            {item.subject.code} - {item.subject.title}
                        </div>
                    </div>
                ))}
            </div> */}

            {/* <SubjectStudentsForm
                curricula={props.curricula}
                form_pending={false}
                onSearchAction={handleSearchAction}
            /> */}
        </>
    );
}
