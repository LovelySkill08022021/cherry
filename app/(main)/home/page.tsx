import React from "react";
import Parent from "./Parent";
import Child from "./Child";

export default function page() {
    async function handleSelectAction(val: number) {
        "use server";

        console.log(val);
    }

    const items = [
        { value: 10, label: "Ten" },
        { value: 20, label: "Twenty" },
        { value: 30, label: "thirty" },
        { value: 40, label: "Fouty" },
        { value: 50, label: "Fifthy" },
        { value: 60, label: "Sixty" },
        { value: 70, label: "Seventy" },
    ];
    return (
        <div>
            <div>Home Page</div>
            <div className="text-sm">Selected</div>
            <div>
                <Parent onSelectAction={handleSelectAction}>
                    {items.map((item) => (
                        <Child key={item.value} itemvalue={item.value}>
                            {item.label} {item.value}
                        </Child>
                    ))}
                </Parent>
            </div>
        </div>
    );
}
