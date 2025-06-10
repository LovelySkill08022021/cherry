import BackButton from "@/components/BackButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { curricula, curriculum_students, students } from "@/db/schema";
import { CheckedState } from "@radix-ui/react-checkbox";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const curriculum = await db
        .select()
        .from(curricula)
        .where(eq(curricula.id, id));

    const students_list = (
        await db
            .select()
            .from(students)
            .leftJoin(
                curriculum_students,
                eq(students.id, curriculum_students.student_id)
            )
    ).filter((student) => {
        if (student.curriculum_students?.student_id == null) {
            return true;
        }

        if (student.curriculum_students.curriculum_id == id) {
            return true;
        }
    });
    // .where(eq(curriculum_students.curriculum_id, id));

    async function handleSelect(student_id: number, checked: CheckedState) {
        "use server";

        if (checked) {
            const result = await db.insert(curriculum_students).values({
                student_id: student_id,
                curriculum_id: id,
            });

            if (result[0].affectedRows > 0) {
                revalidatePath(`curricula/${id}/students`);
            }
        } else {
            const result = await db
                .delete(curriculum_students)
                .where(
                    and(
                        eq(curriculum_students.student_id, student_id),
                        eq(curriculum_students.curriculum_id, id)
                    )
                );

            if (result[0].affectedRows > 0) {
                revalidatePath(`curricula/${id}/students`);
            }
        }
    }
    return (
        <>
            <div className="mb-5">
                <Link href={`/curricula`}>
                    <BackButton />
                </Link>
            </div>
            <div className="mb-10 text-lg font-semibold">
                Students in curriculum{" "}
                <span className="text-rose-700">{curriculum[0].label}</span>
            </div>
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
                        {students_list.length <= 0 && (
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
                        {students_list?.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Checkbox
                                            checked={
                                                student.curriculum_students
                                                    ?.student_id
                                                    ? true
                                                    : false
                                            }
                                            onCheckedChange={handleSelect.bind(
                                                null,
                                                student.students?.id
                                            )}
                                            id={`id_of_${student.students?.id}`}
                                        />
                                        <Label
                                            htmlFor={`id_of_${student.students?.id}`}
                                        >
                                            {student.curriculum_students
                                                ?.student_id
                                                ? "Unselect"
                                                : "Select"}
                                        </Label>
                                    </div>
                                    {}
                                </TableCell>
                                <TableCell>
                                    {student.students?.first_name}
                                </TableCell>
                                <TableCell>
                                    {student.students?.last_name}
                                </TableCell>
                                <TableCell>
                                    {student.students?.first_name}
                                </TableCell>
                                <TableCell>
                                    {student.students?.middle_name}
                                </TableCell>
                                <TableCell>
                                    {student.students?.year_level}
                                </TableCell>
                                <TableCell>
                                    {student.students?.section}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
