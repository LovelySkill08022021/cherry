"use client";

import { Subject } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ActionDropDown from "./draggable-subject-components/ActionDropDown";

type Props = {
    drag_id: number;
    subject: Subject;
    onDrag?: (data: Subject) => void;
    className?: string;
    student_id: number;
    curriculum_id: number;
};

export default function DraggableSubject(props: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.drag_id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    function handleOnDrag() {
        if (props.onDrag) props.onDrag(props.subject);
    }

    return (
        <>
            <div
                className={`inline-flex overflow-hidden items-center text-nowrap me-1 text-sm text-left bg-red-200 rounded-[7px] mb-1 ${props.className}`}
                ref={setNodeRef}
            >
                <button
                    onMouseDown={handleOnDrag}
                    className={`text-nowrap bg-transparent text-sm text-left px-2 py-1 ms-1 cursor-[inherit]`}
                    style={style}
                    {...listeners}
                    {...attributes}
                >
                    {props.subject.code}
                </button>
                <ActionDropDown
                    subject={props.subject}
                    student_id={props.student_id}
                    curriculum_id={props.curriculum_id}
                />
            </div>
        </>
    );
}
