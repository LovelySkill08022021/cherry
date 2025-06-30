import {
    getPrereqTreeDepsData,
    getStudentGrades,
} from "@/actions/server_utils";
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
import { useEffect, useState } from "react";

export default function TreeViewer(props: {
    triggerComponent: React.ReactNode;
    subject: Subject;
    curriculum_id: number;
    student_id: number;
    className?: string;
}) {
    const [deps, setDeps] = useState<{
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    }>({ prerequisite_list: [], subject_info: [] });

    const [student_grades, setStudentGrades] = useState<Grade[]>([]);

    useEffect(() => {
        getPrereqTreeDepsData(props.curriculum_id).then((res) => {
            setDeps(res);
        });

        getStudentGrades(props.student_id).then((res) => {
            setStudentGrades(res);
        });
    }, []);
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
