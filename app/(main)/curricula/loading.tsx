import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
    return (
        <div className="space-y-5 w-[500px]">
            <div className="flex gap-5 pe-2">
                <Skeleton className="w-full h-[35px]" />
                <Skeleton className="w-[40px] h-[35px]" />
            </div>
            <div className="flex gap-5 pe-2">
                <Skeleton className="w-full h-[35px]" />
                <Skeleton className="w-[40px] h-[35px]" />
            </div>
            <div className="flex gap-5 pe-2">
                <Skeleton className="w-full h-[35px]" />
                <Skeleton className="w-[40px] h-[35px]" />
            </div>
            <div className="flex gap-5 pe-2">
                <Skeleton className="w-full h-[35px]" />
                <Skeleton className="w-[40px] h-[35px]" />
            </div>
            <div className="flex gap-5 pe-2">
                <Skeleton className="w-full h-[35px]" />
                <Skeleton className="w-[40px] h-[35px]" />
            </div>
        </div>
    );
}
