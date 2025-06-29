"use client";

import { getGradeRemarks } from "@/lib/utils";
import { Grade, Prerequisite, Subject } from "@/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RawNodeDatum } from "react-d3-tree";

const Tree = dynamic(() => import("react-d3-tree"), {
    ssr: false,
});

export default function PrerequisiteTreeChart({
    grades,
    subject_id,
    tree_deps_data,
}: {
    grades?: Grade[];
    subject_id: number;
    tree_deps_data: {
        prerequisite_list: Prerequisite[];
        subject_info: Subject[];
    };
}) {
    const [data, setData] = useState<RawNodeDatum>({
        name: String(subject_id),
    });

    function getSubjectPrereqs(root_node: RawNodeDatum) {
        // if (subject_info.length <= 0) {
        //     return { name: "ASHJSA" };
        // }

        const prereqs = tree_deps_data.prerequisite_list.filter((prereq) => {
            return prereq.subject_id == Number(root_node.name);
        });

        if (prereqs.length > 0) {
            root_node.children = prereqs.map((prereq) => {
                let attr: { Grade?: string; Remarks?: string } = {};

                let grade = 0;
                if (grades && grades.length > 0) {
                    const cd_grade = grades.filter((grade) => {
                        // console.log(grade.subject_id, prereq.subject_id);

                        return grade.subject_id == prereq.prerequisite;
                    });

                    if (cd_grade.length > 0) {
                        grade = cd_grade[0].value;
                    }

                    attr = {
                        Grade: grade == 0 ? "-----" : grade.toFixed(2),
                        Remarks:
                            grade == 0 ? "-----" : `${getGradeRemarks(grade)}`,
                    };
                }

                return {
                    name: String(prereq.prerequisite),
                    attributes: attr,
                };
            });

            for (const index in root_node.children) {
                root_node.children[index] = getSubjectPrereqs(
                    root_node.children[index]
                );
            }
        }
        const target_code = tree_deps_data.subject_info.filter((subject) => {
            return subject.id == Number(root_node.name);
        })[0];

        root_node.name = target_code.code;

        return root_node;
    }

    useEffect(() => {
        let attr: { Grade?: string; Remarks?: string } = {};
        let grade = 0;
        if (grades && grades.length > 0) {
            const cd_grade = grades.filter((grade) => {
                // console.log(grade.subject_id, prereq.subject_id);

                return grade.subject_id == subject_id;
            });

            if (cd_grade.length > 0) {
                grade = cd_grade[0].value;
            }

            attr = {
                Grade: grade == 0 ? "-----" : grade.toFixed(2),
                Remarks: grade == 0 ? "-----" : `${getGradeRemarks(grade)}`,
            };
        }

        let root_node: RawNodeDatum = {
            name: String(subject_id),
            attributes: attr,
        };

        setData(getSubjectPrereqs(root_node));
    }, []);

    return (
        <>
            <div className="w-full h-full">
                <Tree
                    data={data}
                    orientation="vertical"
                    translate={{
                        x: 400,
                        y: 100,
                    }}
                    rootNodeClassName="bg-red-500"
                />
            </div>
        </>
    );
}
