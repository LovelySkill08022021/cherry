"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Subject } from "@/types";
import { Plus, SearchIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import SubjectMenuItem from "../../SubjectMenuItem";
import Form from "./Form";
import StandingAsPrerequisite from "./StandingAsPrerequisite";

type Props = {
    className?: string;
    subject_id: number;
    curriculum_id: number;
    year_level: number;
    subjectsPromise: Promise<Subject[]>;
    hasStandingPrereq: boolean;
};
export default function SelectPrerequisite({
    className,
    subject_id,
    curriculum_id,
    year_level,
    subjectsPromise,
    hasStandingPrereq,
}: Props) {
    const [keyword, setKeyword] = useState("");
    const [search_subjects, setSearchSubjects] = useState<Subject[]>();

    const subjects = use(subjectsPromise);

    function searchSubject(val: string) {
        setKeyword(val);
        setSearchSubjects(
            subjects.filter((subject) => {
                return (
                    subject.code.toLowerCase().includes(val.toLowerCase()) ||
                    subject.title.toLowerCase().includes(val.toLowerCase())
                );
            })
        );
    }

    useEffect(() => {
        setSearchSubjects(subjects);
        searchSubject(keyword);
    }, [subjects]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="text-center">
                    <Button
                        className={`${className} w-[25px] h-[25px] text-red-500 hover:text-white hover:bg-red-700 mt-2 rounded-sm bg-gray-200`}
                        variant={"ghost"}
                        onClick={() => searchSubject(keyword)}
                    >
                        <Plus strokeWidth={3} size={15} className="" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent align="start" side="bottom">
                <div className="flex items-center bg-gray-100 rounded-md py-2 px-3 text-md gap-2 focus:bg-red-500 mb-3">
                    <SearchIcon className="size-4 shrink-0 opacity-50" />
                    <input
                        value={keyword}
                        type="text"
                        className="border-0 outline-0"
                        placeholder="Search subject"
                        onChange={(e) => searchSubject(e.target.value)}
                    />
                </div>
                {!hasStandingPrereq && (
                    <StandingAsPrerequisite
                        year_level={year_level}
                        subject_id={subject_id}
                        curriculum_id={curriculum_id}
                    />
                )}

                <div className="h-[350px] overflow-x-auto">
                    {search_subjects?.map((subject, index) => (
                        <SubjectMenuItem key={index} subject={subject}>
                            <Form
                                subject_id={subject_id}
                                prerequisite={subject.id}
                                curriculum_id={curriculum_id}
                            />
                        </SubjectMenuItem>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
