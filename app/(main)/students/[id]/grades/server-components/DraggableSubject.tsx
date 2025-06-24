"use client";

import { Subject } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
    drag_id: number;
    subject: Subject;
    onDrag?: (data: Subject) => void;
    className?: string;
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
            <button
                onMouseDown={handleOnDrag}
                className={`text-nowrap me-1 text-xs text-left bg-red-200 rounded-md mb-1 px-2 py-1 ${props.className}`}
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
            >
                {props.subject.code}
            </button>
        </>
    );
}
