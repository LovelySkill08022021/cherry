import { TableCell, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { subjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import RemoveSubjectForm from "./RemoveSubjectForm";

export default async function SubjectItem({
    subject_id,
    curriculum_id,
}: {
    subject_id: number;
    curriculum_id: number;
}) {
    const result = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, subject_id));
    const subject = result[0];

    return (
        <TableRow>
            <TableCell>{subject.code}</TableCell>
            <TableCell>
                <div className="w-full text-wrap">{subject.title}</div>
            </TableCell>
            <TableCell>{subject.units}</TableCell>
            <TableCell align="right">
                <RemoveSubjectForm
                    curriculum_id={curriculum_id}
                    subject_id={subject_id}
                />
            </TableCell>
        </TableRow>
    );
}
