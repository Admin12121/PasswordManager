import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const items = [
  {
    value: "app",
    label: "In-app notifications",
  },
  {
    value: "email",
    label: "Email",
  },
];

const Login_alerts = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group h-auto gap-4 py-3 text-left w-full border-none mt-1 justify-between"
          variant="outline"
        >
          <div className="space-y-1">
            <h3>Login alerts</h3>
          </div>
          <ChevronRightIcon
            className="opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[550px] !rounded-3xl">
        <DialogHeader className="space-y-0">
          <p>vicky__tajpuriya.password_manager</p>
          <DialogTitle className="text-2xl m-0">Login alerts</DialogTitle>
        </DialogHeader>
        <div className="rounded-lg overflow-hidden mt-5 shadow-sm">
          <div className="divide-y">
            {items.map((item) => (
              <div
                key={`${item.value}`}
                className={cn(
                  "border-input has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-2xl last:rounded-b-2xl has-data-[state=checked]:z-10",
                //   selectedValue === item.value
                //     ? "bg-primary/10 border-ring"
                //     : ""
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <Label
                      className="inline-flex items-start"
                      htmlFor={`${item.value}`}
                    >
                      {item.label}
                    </Label>
                  </div>
                  <Checkbox
                    id={`${item.value}`}
                    value={item.value}
                    className="after:absolute after:inset-0"
                    aria-describedby={`${`${item.value}`}-price`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login_alerts;
