import { Grade, Prerequisite, Subject } from "@/types";
import { create } from "zustand";

type States = {
    student_grades: Grade[];
    prereq_tree_deps_data?: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    };
};

type Actions = {
    setStudentGrades: (grades: Grade[]) => void;
    setPrereqTreeDepsData: (data: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    }) => void;
};

export const useStudentStore = create<States & Actions>((set) => ({
    student_grades: [],
    prereq_tree_deps_data: undefined,
    setStudentGrades: (grades: Grade[]) => {
        set({ student_grades: grades });
    },
    setPrereqTreeDepsData: (data: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    }) => {
        set({ prereq_tree_deps_data: data });
    },
}));
