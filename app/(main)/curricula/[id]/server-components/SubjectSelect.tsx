"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Subject } from "@/types";
import { Plus, SearchIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import AddSubjectForm from "./AddSubjectForm";
import SubjectMenuItem from "./SubjectMenuItem";

type Props = {
    className?: string;
    subjectsPromise: Promise<Subject[]>;
    curriculum_id: number;
    year_level: number;
    semester: number;
};
export default function SubjectSelect({
    className,
    subjectsPromise,
    curriculum_id,
    year_level,
    semester,
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button
                            className={className}
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => searchSubject(keyword)}
                        >
                            <Plus />
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add subject</p>
                </TooltipContent>
            </Tooltip>
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
                <div className="h-[350px] overflow-x-auto">
                    {search_subjects?.map((subject, index) => (
                        <SubjectMenuItem key={index} subject={subject}>
                            <AddSubjectForm
                                subject={subject}
                                curriculum_id={curriculum_id}
                                year_level={year_level}
                                semester={semester}
                            />
                        </SubjectMenuItem>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
