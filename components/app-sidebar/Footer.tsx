import React from "react";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useInitials } from "@/hooks/use-initials";

export default function Footer() {
    const user = "Mark Justine Cudapas";

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton size="lg">
                                <UserInfo user={user} />
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="end">
                            <DropdownMenuItem>
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}

function UserInfo({ user }: { user: string }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{getInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm truncate">
                {user}
                {/* <span className="truncate font-medium">
                                        {user.first_name}{" "}
                                        {user.middle_name &&
                                            `${user.middle_name[0]}.`}{" "}
                                        {user.last_name}
                                    </span>
                                    {showEmail && (
                                        <span className="text-muted-foreground truncate text-xs">
                                            {user.email}
                                        </span>
                                    )} */}
                <span className="text-muted-foreground truncate text-xs">
                    markjustinecudapas@gmail.com
                </span>
            </div>
        </>
    );
}
