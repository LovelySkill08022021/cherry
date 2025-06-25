"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavButton(props: { label: string; link: string }) {
    const pathname = usePathname();
    return (
        <Link href={props.link}>
            <Button
                variant={"ghost"}
                className={` ${props.link == pathname ? "underline hover:bg-transparent" : "hover:bg-gray-300 bg-transparent"}`}
            >
                {props.label}
            </Button>
        </Link>
    );
}
