import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { items } from "@/components/global/sites";

interface OptionProps {
  value: string;
  setValue: (value: string) => void;
  setTitle?: (title: string) => void;
  disabled?: boolean;
}

const Options = ({ value, setValue, setTitle, disabled }: OptionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(
    null
  );
  const getSelectedIcon = () => {
    if (!selectedItem) return <></>;
    const Icon = selectedItem.icon;
    return <Icon className="h-5 w-5 text-muted-foreground mr-2" />;
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setOpen(true);

    if (!newValue) {
      setSelectedItem(null);
      return;
    }

    const matchedItem = items.find((item) =>
      item.label.toLowerCase().includes(newValue.toLowerCase())
    );

    setSelectedItem(matchedItem || null);
  };

  return (
    <Command className="relative w-full overflow-visible">
      <CommandInput
        disabled={disabled}
        placeholder="https://example.com"
        container={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
        )}
        value={value}
        icon={getSelectedIcon()}
        onValueChange={handleValueChange}
      />
      {value && open && (
        <CommandList className="absolute z-50 w-full top-12 border border-input bg-background shadow-lg shadow-black/5 rounded-lg">
          <CommandEmpty>No service found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setSelectedItem(item);
                  if (setTitle) {
                    setTitle(item.label);
                  }
                  setOpen(false);
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default Options;
