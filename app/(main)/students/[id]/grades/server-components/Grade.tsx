import { Badge } from "@/components/ui/badge";
import { BookmarkX, Check, Loader, TriangleAlert, X } from "lucide-react";
import AddGradeForm from "../client-components/AddGradeForm";
import { SubjectWithGrade } from "./EnrollmentsServer";

type Props = {
    subject_with_grade: SubjectWithGrade;
    student_id: number;
};

export default function Grade(props: Props) {
    return (
        <>
            <div className="flex flex-col gap-1 items-center justify-end">
                {props.subject_with_grade.grades.map((student_grade, index) => {
                    let badge_color = "bg-green-600";
                    if (student_grade.value == 4 || student_grade.value == 6) {
                        badge_color = "bg-amber-500";
                    } else if (
                        student_grade.value == 5 ||
                        student_grade.value == 8
                    ) {
                        badge_color = "bg-red-600";
                    } else if (student_grade.value == 7) {
                        badge_color = "bg-blue-500";
                    }
                    return (
                        <Badge
                            key={index}
                            className={`text-white ${badge_color}`}
                        >
                            <GradeIcon value={student_grade.value} />
                            <GradeValueRenderer value={student_grade.value} />
                        </Badge>
                    );
                })}

                <AddGradeForm
                    student_id={props.student_id}
                    subject={props.subject_with_grade.subject}
                    student_grades={props.subject_with_grade.grades}
                    enrollment_id={props.subject_with_grade.enrollment_id}
                />
            </div>
        </>
    );
}

function GradeValueRenderer({ value }: { value: number }) {
    if (value <= 5) {
        return value.toFixed(2);
    }

    if (value == 6) {
        return "INC";
    }

    if (value == 7) {
        return "IP";
    }

    if (value == 8) {
        return "DRP";
    }
}

function GradeIcon({ value }: { value: number }) {
    if (value <= 3) {
        return <Check strokeWidth={3} />;
    }

    if (value == 5) {
        return <X strokeWidth={3} />;
    }

    if (value == 6 || value == 4) {
        return <TriangleAlert strokeWidth={3} />;
    }

    if (value == 7) {
        return <Loader strokeWidth={3} />;
    }

    if (value == 8) {
        return <BookmarkX strokeWidth={3} />;
    }
}
