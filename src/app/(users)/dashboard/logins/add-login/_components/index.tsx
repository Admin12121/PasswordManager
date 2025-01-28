"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Mail, Eye, EyeOff } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Blocks,
  Brain,
  Cpu,
  Database,
  Globe,
  Layout,
  LineChart,
  Network,
  Search,
  Server,
} from "lucide-react";

const items = [
  {
    value: "analytics platform",
    label: "Analytics Platform",
    icon: LineChart,
    number: 2451,
  },
  {
    value: "ai services",
    label: "AI Services",
    icon: Brain,
    number: 1832,
  },
  {
    value: "database systems",
    label: "Database Systems",
    icon: Database,
    number: 1654,
  },
  {
    value: "compute resources",
    label: "Compute Resources",
    icon: Cpu,
    number: 943,
  },
  {
    value: "network services",
    label: "Network Services",
    icon: Network,
    number: 832,
  },
  {
    value: "web services",
    label: "Web Services",
    icon: Globe,
    number: 654,
  },
  {
    value: "monitoring tools",
    label: "Monitoring Tools",
    icon: Search,
    number: 432,
  },
  {
    value: "server management",
    label: "Server Management",
    icon: Server,
    number: 321,
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
    icon: Blocks,
    number: 234,
  },
  {
    value: "frontend services",
    label: "Frontend Services",
    icon: Layout,
    number: 123,
  },
];

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  app: z
    .string()
    .min(1, { message: "App name is required" })
    .max(50, { message: "App name must be less than 50 characters" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Username must be less than 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" }),
  note: z
    .string()
    .max(500, { message: "Note must be less than 500 characters" })
    .optional(),
});

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <div className="flex gap-3 w-full items-center flex-col lg:flex-row ">
      <form className="p-3 space-y-2 w-full">
        <div className="space-y-2">
          <Label htmlFor="input-01">Title</Label>
          <Input id="input-01" placeholder="Email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="select-45">Website/App</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="select-45"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
              >
                {value ? (
                  <span className="flex min-w-0 items-center gap-2">
                    {(() => {
                      const selectedItem = items.find(
                        (item) => item.value === value
                      );
                      if (selectedItem) {
                        const Icon = selectedItem.icon;
                        return (
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        );
                      }
                      return null;
                    })()}
                    <span className="truncate">
                      {items.find((item) => item.value === value)?.label}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Select service category
                  </span>
                )}
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-muted-foreground/80"
                  aria-hidden="true"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Search services..." />
                <CommandList>
                  <CommandEmpty>No service found.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          {item.label}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.number.toLocaleString()}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="input-10">Email</Label>
          <div className="relative">
            <Input
              id="input-10"
              className="peer pe-9"
              placeholder="Email"
              type="email"
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="input-23">Password</Label>
          <div className="relative">
            <Input
              id="input-23"
              className="pe-9"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
            />
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
            <button
              className="absolute inset-y-0 end-7 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="textarea-01">Note</Label>
          <Textarea id="textarea-01" placeholder="Leave a comment" />
        </div>
      </form>
      <div className="w-full h-full">
        <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring">
          <Switch
            id="switch-07"
            className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
          />
          <div className="grid grow gap-2">
            <Label htmlFor="checkbox-13">Vault password required</Label>
            <p
              id="checkbox-13-description"
              className="text-xs text-muted-foreground"
            >
              Always require your vault password before filling or accessing
              this login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
