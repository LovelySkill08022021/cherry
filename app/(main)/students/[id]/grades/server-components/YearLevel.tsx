"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdinal } from "@/lib/utils";
import React from "react";
import { YearLevelData } from "./EnrollmentsServer";
import Semester from "./Semester";

type Props = {
    year_level_data: YearLevelData;
    dragging: boolean;
    student_id: number;
};

export default function YearLevel(props: Props) {
    return (
        <React.Fragment>
            <Card className="w-full  border-0 shadow-none year_level">
                <CardHeader>
                    <CardTitle>
                        {getOrdinal(props.year_level_data.year_level)} Year
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="flex w-full gap-5">
                        {props.year_level_data.semesters.map(
                            (semester, index) => {
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
                                        />
                                    );
                                }
                            }
                        )}
                    </div>
                    <div className="flex justify-center">
                        {props.year_level_data.semesters.length >= 3 && (
                            <Semester
                                student_id={props.student_id}
                                year_level={props.year_level_data.year_level}
                                semester={props.year_level_data.semesters[2]}
                                dragging={props.dragging}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
