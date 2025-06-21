import { Subject } from "@/types";
import { JSX } from "react";

type Props = {
    subject: Subject;
    children: JSX.Element;
};

export default function SubjectMenuItem({ subject, children }: Props) {
    return (
        <div className="flex gap-2 items-start py-2 rounded-lg px-2">
            <div className="">{children}</div>
            <div className="leading-[15px] w-full">
                <div className="text-[.875rem] font-semibold">
                    {subject.code}
                </div>
                <div className="text-[.875rem] text-gray-500">
                    {subject.title}
                </div>
                <div className="text-[.875rem] text-gray-500">
                    <span className="text-red-600 font-semibold">
                        {subject.units}
                    </span>{" "}
                    units
                </div>
            </div>
        </div>
    );
}
