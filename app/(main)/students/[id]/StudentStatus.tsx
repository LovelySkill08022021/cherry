import { getStudentRegularity } from "@/actions/server_utils";
import { Badge } from "@/components/ui/badge";

export default async function StudentStatus(props: { student_id: number }) {
    const student_regularity = await getStudentRegularity(props.student_id);

    return (
        <Badge
            className={`${student_regularity == "Regular" ? "bg-green-600" : "bg-amber-500"}`}
        >
            {student_regularity}
        </Badge>
    );
}
