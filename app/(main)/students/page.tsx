import { db } from "@/db";
import { students } from "@/db/schema";
import { Student } from "@/types";
import StudentTable from "./StudentTable";

export default async function page() {
    const data: Student[] = await db
        .select()
        .from(students)
        .orderBy(students.last_name);
    return (
        <div>
            <StudentTable initial_data={data} />
        </div>
    );
}
