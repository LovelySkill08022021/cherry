"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getOrdinal } from "@/lib/utils";
import { YearLevelData } from "./EnrollmentsServer";
import Semester from "./Semester";

type Props = {
    year_level_data: YearLevelData;
    dragging: boolean;
    student_id: number;
    curriculum_id: number;
};

export default function YearLevel(props: Props) {
    return (
        <Card className="w-full border-0 shadow-none year_level">
            <CardHeader>
                <CardTitle>
                    {getOrdinal(props.year_level_data.year_level)} Year
                </CardTitle>
                <CardDescription>{props.year_level_data.sy}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="flex 2xl:flex-row flex-col w-full gap-5">
                    {props.year_level_data.semesters.map((semester, index) => {
                        if (semester.semester < 3) {
                            return (
                                <Semester
                                    key={index}
                                    student_id={props.student_id}
                                    year_level={
                                        props.year_level_data.year_level
                                    }
                                    semester={semester}
                                    dragging={props.dragging}
                                    curriculum_id={props.curriculum_id}
                                />
                            );
                        }
                    })}
                </div>
                <div className="flex justify-center">
                    {props.year_level_data.semesters.map((semester, index) => {
                        if (semester.semester == 3) {
                            return (
                                <Semester
                                    key={index}
                                    student_id={props.student_id}
                                    year_level={
                                        props.year_level_data.year_level
                                    }
                                    semester={semester}
                                    dragging={props.dragging}
                                    curriculum_id={props.curriculum_id}
                                />
                            );
                        }
                    })}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-1">
                <CardTitle>
                    {getOrdinal(props.year_level_data.year_level)} Year
                </CardTitle>
                <CardDescription>{props.year_level_data.sy}</CardDescription>
            </CardFooter>
        </Card>
    );
}
