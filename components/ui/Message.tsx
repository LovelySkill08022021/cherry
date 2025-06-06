import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Message({
    variant,
    title,
    description,
    icon,
}: {
    variant: "success" | "error";
    title: string;
    description: string;
    icon: React.ReactNode;
}) {
    if (variant == "success") {
        return (
            <Alert className="border-none bg-[#eef7ee] text-[#2d502c]">
                {icon}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription className="text-[#2d502c]">
                    {description}
                </AlertDescription>
            </Alert>
        );
    }

    if (variant == "error") {
        return (
            <Alert className="border-none bg-red-50 text-red-800">
                {icon}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription className="text-red-800">
                    {description}
                </AlertDescription>
            </Alert>
        );
    }
}
