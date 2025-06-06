import { Cherry, ChevronsUpDown } from "lucide-react";
import localFont from "next/font/local";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

const myFont = localFont({
    src: "../../lib/fonts/qurova-font-family/QurovaDEMO-Regular-BF67a5c637a5dc9.otf",
});
export default function Header() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                // size="lg"
                                className={`${myFont.className} flex items-center text-xl`}
                            >
                                <span>
                                    <Cherry
                                        className="text-red-700"
                                        size={24}
                                    />
                                </span>
                                Cherry
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="right"
                            align="start"
                            // sideOffset={0}
                        >
                            <DropdownMenuItem>
                                <span>Acme Inc</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Acme Corp.</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Acme Corp.</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Acme Corp.</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    );
}
