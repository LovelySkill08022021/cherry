"use client";

import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Item = {
    value: string;
    label: string;
};

type Props = {
    disabled?: boolean;
    className?: string;
    items: Item[];
    buttonPlaceholder: string;
    inputPlaceholder: string;
    emptyMessage: string;
    onSelectAction: (value: string) => void;
};

export function Combobox({
    disabled,
    className,
    items,
    buttonPlaceholder,
    inputPlaceholder,
    emptyMessage,
    onSelectAction,
}: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [seached_items, setSearchItems] = useState<Item[]>(items);

    function searchItem(keyword: string) {
        setSearchItems(
            items.filter((item) => {
                return item.label.toLowerCase().includes(keyword.toLowerCase());
            })
        );
    }

    function handleItemSelect(currentValue: string) {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        onSelectAction(currentValue);
        setSearchItems(items);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`justify-between ${className}`}
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : buttonPlaceholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <div
                        data-slot="command-input-wrapper"
                        className="flex h-9 items-center gap-2 border-b px-3"
                    >
                        <SearchIcon className="size-4 shrink-0 opacity-50" />
                        <input
                            onChange={(e) => searchItem(e.target.value)}
                            data-slot="command-input"
                            className={
                                "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                            }
                            placeholder={inputPlaceholder}
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {seached_items.map((item, index) => (
                                <CommandItem
                                    key={index}
                                    value={item.value}
                                    onSelect={handleItemSelect}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
