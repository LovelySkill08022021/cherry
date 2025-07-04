import { getStudentScholasticDelinquency } from "@/actions/server_utils";
import { Badge } from "./ui/badge";

export default async function ScholasticDelinquency(props: {
    student_id: number;
}) {
    const sd = await getStudentScholasticDelinquency(props.student_id);
    let severity = "bg-green-500";
    if (sd.remarks == "Regular") {
        severity = "bg-green-500";
    } else if (sd.remarks == "Warning") {
        severity = "bg-amber-500";
    } else if (sd.remarks == "Probation") {
        severity = "bg-purple-500";
    } else if (sd.remarks == "Dismissal") {
        severity = "bg-red-600 animate-bounce scale-[1.2]";
    }

    return (
        <>
            <Badge className={severity}>
                {sd.percentage}% {sd.remarks}
            </Badge>
        </>
    );
}
