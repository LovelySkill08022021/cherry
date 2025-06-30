import {
    getPrereqTreeDepsData,
    getStudentGrades,
} from "@/actions/server_utils";
import PrerequisiteTreeChart from "@/components/PrerequisiteTreeChart";
import { Suspense } from "react";
import SubjectStudents from "./server-components/SubjectStudents";

export default async function ReportsPage() {
    // const db_curricula = await db.select().from(curricula);

    // const d = new Date(Date.now());
    // const month = d.getMonth() + 1;
    // const year = d.getFullYear();

    // let current_sy = "asds";
    // if (month <= 6) {
    //     current_sy = `SY ${year - 1}-${year}`;
    // } else {
    //     current_sy = `SY ${year}-${year + 1}`;
    // }
    const deps = await getPrereqTreeDepsData(7);
    const all_grades = await getStudentGrades(5);

    return (
        <>
            {/* {JSON.stringify(all_grades)} */}
            <Suspense fallback={"Loading"}>
                <div className="h-screen">
                    <PrerequisiteTreeChart
                        grades={all_grades}
                        subject_id={55}
                        tree_deps_data={deps}
                    />
                </div>
            </Suspense>

            <SubjectStudents />

            {/* <RegularStudents curricula={db_curricula} />
            <IrregularStudents curricula={db_curricula} /> */}
        </>
    );
}
