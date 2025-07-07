"use client";

import { getCurriculumYearLevels } from "@/actions/reports/subject-students/get-curriculum-year-levels";
import { getYearLevelSemesters } from "@/actions/reports/subject-students/get-year-level-semesters";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getOrdinal } from "@/lib/utils";
import { Curriculum } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export type FormState = {
    curriculum_id: number | "";
    year_level: number | "";
    semester: number | "";
};

type Props = {
    form_pending: boolean;
    curricula: Curriculum[];
    onSearchAction: (data: FormState) => Promise<void>;
};

export default function SubjectStudentsForm(props: Props) {
    const [year_levels, setYearLevels] = useState<number[]>();
    const [semesters, setSemesters] = useState<number[]>();

    const [form, setForm] = useState<FormState>({
        curriculum_id: "",
        year_level: "",
        semester: "",
    });

    const [year_level_pending, startSelectYearLevelTransition] =
        useTransition();
    function handleCurriculumSelectAction(value: string) {
        setForm({
            ...form,
            curriculum_id: Number(value),
            // year_level: "",
        });
        startSelectYearLevelTransition(async () => {
            const response = await getCurriculumYearLevels(Number(value));
            setYearLevels(response.data);
        });
    }

    const [semester_pending, startSelectSemesterTransition] = useTransition();
    function handleYearLevelSelect(value: string) {
        setForm({
            ...form,
            year_level: Number(value),
            // semester: "",
        });

        startSelectSemesterTransition(async () => {
            if (form.curriculum_id == "") {
                toast.warning("No curriculum selected");
                return;
            }

            const response = await getYearLevelSemesters(
                form.curriculum_id,
                Number(value)
            );

            setSemesters(response.data);
        });
    }

    function handleSemesterSelect(value: string): void {
        setForm({
            ...form,
            semester: Number(value),
        });
    }

    return (
        <>
            {JSON.stringify(form)}
            <div className="flex w-full gap-2">
                <div className="w-full">
                    <Combobox
                        disabled={props.form_pending}
                        className="w-full"
                        onSelectAction={handleCurriculumSelectAction}
                        items={props.curricula.map((curriculum) => {
                            return {
                                value: String(curriculum.id),
                                label: curriculum.label,
                            };
                        })}
                        buttonPlaceholder={"Select curriculum"}
                        inputPlaceholder={"Search curriculum"}
                        emptyMessage={"No curriculum found"}
                    />
                </div>
                <div className="w-full">
                    <Select
                        value={String(form.year_level)}
                        onValueChange={handleYearLevelSelect}
                    >
                        <SelectTrigger
                            className="bg-white w-full"
                            disabled={year_level_pending || props.form_pending}
                        >
                            <SelectValue
                                placeholder={
                                    year_level_pending
                                        ? "Updating..."
                                        : `Select year level`
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {year_levels?.map((year_level, index) => (
                                <SelectItem
                                    value={String(year_level)}
                                    key={index}
                                >
                                    {`${getOrdinal(year_level)} year`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <Select
                        value={String(form.semester)}
                        onValueChange={handleSemesterSelect}
                    >
                        <SelectTrigger
                            className="bg-white w-full"
                            disabled={semester_pending || props.form_pending}
                        >
                            <SelectValue
                                placeholder={
                                    semester_pending
                                        ? "Updating..."
                                        : `Select semester`
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {semesters?.map((semester, index) => (
                                <SelectItem
                                    value={String(semester)}
                                    key={index}
                                >
                                    {semester < 3
                                        ? `${getOrdinal(semester)} semester`
                                        : "Mid year"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <Button
                        disabled={props.form_pending}
                        onClick={() => props.onSearchAction(form)}
                    >
                        {props.form_pending ? (
                            <>
                                <LoaderCircle
                                    className="animate-spin"
                                    strokeWidth={3}
                                />{" "}
                                Searching...
                            </>
                        ) : (
                            "Search"
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
