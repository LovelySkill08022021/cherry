"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
    subject_id: number;
    children: React.ReactNode;
    className?: string;
};

export default function DraggableSubject(props: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.subject_id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button
            className={` me-1 text-xs text-left bg-red-200 rounded-md mb-1 px-2 py-1 ${props.className}`}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </button>
    );
}
