"use client";

import { JSX } from "react";

export default function Parent({
    onSelectAction,
    children,
}: {
    onSelectAction: (val: number) => Promise<void>;
    children: JSX.Element[];
}) {
    async function handleClick(svalue: number) {
        await onSelectAction(svalue);
        console.log(svalue);
    }
    return (
        <div className="bg-red-100 p-4">
            <div className="text-lg">Parent</div>

            <div>
                {children.map((child, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => handleClick(child.props.itemvalue)}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
