"use client";

import { isGradePassed } from "@/lib/utils";
import { SubjectWithGrade } from "./EnrollmentsServer";

export default function GWA({
    subjects_with_grades,
}: {
    subjects_with_grades: SubjectWithGrade[];
}) {
    let gwa = 0;
    let total_units = 0;

    for (const subject of subjects_with_grades) {
        if (subject.grades.length <= 0) continue;

        const subject_latest_grade =
            subject.grades[subject.grades.length - 1].value;
        const subject_units = subject.subject.units;

        if (isGradePassed(subject_latest_grade)) {
            gwa += subject_latest_grade * subject_units;
            total_units += subject_units;
        }
    }

    return (
        <span className="font-bold text-red-600">
            {gwa == 0 ? "N/A" : (gwa / total_units).toFixed(3)}
        </span>
    );
}
