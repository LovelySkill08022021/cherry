"use client";

export default function Child({
    itemvalue,
    children,
}: {
    itemvalue: number;
    children: React.ReactNode;
}) {
    return <div className="p-2 my-3 bg-blue-200">{children} {itemvalue}</div>;
}
