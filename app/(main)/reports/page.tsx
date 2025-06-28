import { getSySubjects } from "@/actions/reports/subject-students/get-sy-subjects";
import { db } from "@/db";
import { curricula } from "@/db/schema";
import SubjectStudents from "./server-components/SubjectStudents";

export default async function ReportsPage() {
    const db_curricula = await db.select().from(curricula);

    const d = new Date(Date.now());
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    let current_sy = "asds";
    if (month <= 6) {
        current_sy = `SY ${year - 1}-${year}`;
    } else {
        current_sy = `SY ${year}-${year + 1}`;
    }
    async function handleChange() {
        "use server";

        // revalidatePath("/reports");
        getSySubjects(current_sy);
    }

    return (
        <>
            <SubjectStudents curricula={db_curricula} />

            {/* <RegularStudents curricula={db_curricula} />
            <IrregularStudents curricula={db_curricula} /> */}
        </>
    );
}
