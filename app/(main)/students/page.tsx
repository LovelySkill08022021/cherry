import { db } from "@/db";
import { students } from "@/db/schema";
import { Student } from "@/types";
import StudentTable from "./StudentTable";

export default async function page() {
    var data: Student[] = await db.select().from(students);
    return (
        <div>
            <StudentTable initial_data={data} />
        </div>
    );
}
