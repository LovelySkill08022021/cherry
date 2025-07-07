import { getStudentRegularity } from "@/actions/server_utils";
import { db } from "@/db";
import { students } from "@/db/schema";
import { Student } from "@/types";
import StudentTable from "../StudentTable";
export default async function RegularStudentPage() {
    const init_students = await db.select().from(students);
    const list_student: Student[] = [];

    for (const student of init_students) {
        const regularity = await getStudentRegularity(student.id);
        if (regularity == "Regular") {
            list_student.push(student);
        }
    }

    return <StudentTable list_student={list_student} />;
}
