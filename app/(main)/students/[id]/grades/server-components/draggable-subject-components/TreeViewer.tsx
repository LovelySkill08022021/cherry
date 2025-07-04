import PrerequisiteTreeChart from "@/components/PrerequisiteTreeChart";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Grade, Prerequisite, Subject } from "@/types";
import { useState } from "react";
import { useStudentContext } from "../../../contexts/StudentContextProvider";

export default function TreeViewer(props: {
    triggerComponent: React.ReactNode;
    subject: Subject;
    curriculum_id: number;
    student_id: number;
    className?: string;
}) {
    const student_context = useStudentContext();

    const [deps] = useState<{
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    }>(student_context.prereq_tree_deps_data);

    const [student_grades] = useState<Grade[]>(student_context.student_grades);

    return (
        <Dialog>
            <DialogTrigger asChild>{props.triggerComponent}</DialogTrigger>
            <DialogContent
                className={`flex flex-col w-full h-screen ${props.className}`}
            >
                <DialogHeader className="">
                    <DialogTitle>{props.subject.code}</DialogTitle>
                    <DialogDescription>{props.subject.title}</DialogDescription>
                </DialogHeader>
                <div className="w-full h-[100%] rounded-lg bg-gray-200">
                    <PrerequisiteTreeChart
                        grades={student_grades}
                        subject_id={props.subject.id}
                        tree_deps_data={deps}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
