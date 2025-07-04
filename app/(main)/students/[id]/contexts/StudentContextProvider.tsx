"use client";

import { Grade, Prerequisite, Subject } from "@/types";
import { createContext, useContext } from "react";

type ContextType = {
    prereq_tree_deps_data: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    };
    student_grades: Grade[];
};

const StudentContext = createContext<ContextType | null>(null);

export default function StudentContextProvider(props: {
    children: React.ReactNode;
    prereq_tree_deps_data: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    };
    student_grades: Grade[];
}) {
    const value = {
        prereq_tree_deps_data: props.prereq_tree_deps_data,
        student_grades: props.student_grades,
    };

    return (
        <StudentContext.Provider value={value}>
            {props.children}
        </StudentContext.Provider>
    );
}

export function useStudentContext() {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error(
            "Student context must be used within StudentContextProvider"
        );
    }

    return context;
}
