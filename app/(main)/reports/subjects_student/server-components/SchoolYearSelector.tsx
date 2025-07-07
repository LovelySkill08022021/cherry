"use client";

import { getScoolYears } from "@/actions/reports/subject-students/get-school-years";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function SchoolYearSelector(props: {
    current_sy: string;
    onSySelect: (sy: string) => void;
}) {
    const [school_years, setSchoolYears] = useState<string[]>([]);
    useEffect(() => {
        getScoolYears().then((sys) => setSchoolYears(sys));
    }, []);

    return (
        <Card className="shadow-none border-0">
            <CardHeader>
                <CardTitle>School years</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto space-y-1">
                {/* {JSON.stringify(school_years)} */}
                {school_years.map((sy, index) => (
                    <div
                        key={index}
                        onClick={() => props.onSySelect(sy)}
                        className={`${sy == props.current_sy ? "bg-rose-700 text-white" : "bg-gray-200 hover:bg-gray-300"}
                            px-2 py-1 rounded-md cursor-pointer text-sm block w-full duration-100`}
                    >
                        {sy}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
