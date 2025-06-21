import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getOrdinal } from "@/lib/utils";
import { CurriculumSubject, Subject } from "@/types";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import Grade from "./Grade";

type Props = {
    student_id: number;
    semester_data: {
        subjects: Subject | null;
        curriculum_subjects: CurriculumSubject;
    }[];
};
export default function Semester({ student_id, semester_data }: Props) {
    return (
        <Card className="w-1/2 bg-white border-0 shadow-none">
            <CardHeader>
                <CardTitle>{getOrdinal(2)} Semester</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Units</TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {semester_data.map((subject) => (
                            <TableRow key={subject.subjects?.id}>
                                <TableCell>
                                    <div className="w-full text-wrap">
                                        {subject.subjects?.code} -{" "}
                                        {subject.subjects?.title}
                                    </div>
                                </TableCell>
                                <TableCell>{subject.subjects?.units}</TableCell>
                                <TableCell>
                                    {subject.subjects && (
                                        <Suspense
                                            fallback={
                                                <div className="flex justify-end items-center gap-1">
                                                    <LoaderCircle
                                                        size={15}
                                                        strokeWidth={3}
                                                        className="animate-spin text-blue-600"
                                                    />{" "}
                                                    Loading...
                                                </div>
                                            }
                                        >
                                            <Grade
                                                student_id={student_id}
                                                subject={subject.subjects}
                                            />
                                        </Suspense>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
