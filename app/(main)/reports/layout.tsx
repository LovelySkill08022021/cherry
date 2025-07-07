import { LinkIcon } from "lucide-react";
import NavButton from "../students/[id]/NavButton";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-10">
                <LinkIcon size={16} />
                <NavButton
                    label={`Subjects student`}
                    link={`/reports/subjects_student`}
                />
                <NavButton
                    label={`Regular students`}
                    link={`/reports/regular_students`}
                />
                <NavButton
                    label={`Irregular students`}
                    link={`/reports/irregular_students`}
                />
            </div>
            <div>{children}</div>
        </div>
    );
}
