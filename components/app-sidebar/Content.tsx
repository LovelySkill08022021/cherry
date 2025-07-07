"use client";

import { FileText, Flag, Home, LibraryBig, User } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

export default function Content() {
    const pathname = usePathname();

    const items = [
        {
            title: "Home",
            url: "/home",
            icon: Home,
        },
        {
            title: "Students",
            url: "/students",
            icon: User,
        },
        {
            title: "Curricula",
            url: "/curricula",
            icon: FileText,
        },
        {
            title: "Subjects",
            url: "/subjects",
            icon: LibraryBig,
        },
        {
            title: "Reports",
            url: "/reports/subjects_student",
            icon: Flag,
        },
    ];
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    className={`transition duration-[100ms] ${
                                        pathname.split("/")[1] ==
                                        item.url.split("/")[1]
                                            ? "bg-[#ca254f] text-white hover:text-white hover:bg-[#ca254f]"
                                            : "hover:bg-[#ffe1b6]"
                                    }`}
                                    asChild
                                >
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
