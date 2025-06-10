import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
    return (
        <>
            <div className="w-[500px] pe-2">
                <div className="mb-9">
                    <Skeleton className="w-[80px] h-[35px]" />
                </div>
                <div className="flex justify-between mb-7">
                    <Skeleton className="w-[100px] h-[25px]" />
                    <Skeleton className="w-[60px] h-[25px]" />
                </div>
            </div>
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
        </>
    );
}
