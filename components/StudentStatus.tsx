import { Badge } from "./ui/badge";

export default async function StudentStatus({
    student_id,
}: {
    student_id: number;
}) {
    // const has_3_retakes = (
    //     await db
    //         .select({
    //             retakes: sum(grades.no_of_takes),
    //         })
    //         .from(grades)
    //         .groupBy(grades.subject_id)
    //         .where(eq(grades.student_id, student_id))
    // ).sort((a, b) => {
    //     return a.retakes - b.retakes;
    // });

    // console.log(has_3_retakes);

    return <Badge className="bg-amber-500">Probation</Badge>;
}
