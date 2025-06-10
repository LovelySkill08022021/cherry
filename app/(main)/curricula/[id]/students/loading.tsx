import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <div>
            <Skeleton className="h-[35px] w-[35px] mb-7" />
            <Skeleton className="h-[25px] w-[300px] mb-7" />
            <div className="mb-3 flex justify-between">
                <Skeleton className="h-[25px] w-[100px]" />
                <Skeleton className="h-[25px] w-[100px]" />
            </div>
            <Skeleton className="h-[300px] mb-7" />
            <Skeleton className="h-[40px] w-[120px]" />
        </div>
    );
}
