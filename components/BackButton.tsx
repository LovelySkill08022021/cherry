import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton({ className }: { className?: string }) {
    return (
        <Button
            variant={"outline"}
            size={"icon"}
            className={`bg-gray-200 hover:bg-gray-300 shadow-none border-0 ${className}`}
        >
            <ChevronLeft />
        </Button>
    );
}
