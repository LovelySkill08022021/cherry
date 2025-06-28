import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="w-full">
                <div className="p-5 w-full bg-gray-100 h-screen overflow-y-auto ">
                    <SidebarTrigger />
                    <div className="px-10 pt-5">{children}</div>
                    {/* <main className="p-3 border-s-1"></main> */}
                </div>
            </div>
        </SidebarProvider>
    );
}
