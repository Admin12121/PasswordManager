import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const items = [
  {
    value: "app",
    label: "Authentication app",
    description:
      "We'll recommend an app to download if you don't have one. It will generate a code you'll enter when you log in.7",
  },
  {
    value: "email",
    label: "Text message",
    description: "We'll send a code to the current used email.",
  },
];

const CORRECT_CODE = "6548";

const Two_factor_auth = () => {
  const [value, setValue] = useState("");
  const [hasGuessed, setHasGuessed] = useState<boolean | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("app");

  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasGuessed) closeButtonRef.current?.focus();
  }, [hasGuessed]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setHasGuessed(value === CORRECT_CODE);
    setValue("");

    setTimeout(() => {
      if (value === CORRECT_CODE) {
        setStep(2);
      }
      inputRef.current?.blur();
    }, 500);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group h-auto gap-4 py-3 text-left w-full  border-none rounded-none justify-between"
          variant="outline"
        >
          <div className="space-y-1">
            <h3>Two-factor authentication</h3>
          </div>
          <ChevronRightIcon
            className="opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[550px] !rounded-3xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <DialogHeader className="space-y-0">
                <p>vicky__tajpuriya.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Check your email
                </DialogTitle>
                <DialogDescription>
                  Enter the code we sent to v***********9@gmail.com
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-muted h-10"
                  placeholder="Enter OTP"
                  id="otp"
                  required
                />
              </div>

              {hasGuessed === false && (
                <p
                  className="text-muted-foreground text-center text-xs"
                  role="alert"
                >
                  Invalid code. Please try again.
                </p>
              )}

              <p className="text-sm">
                <a className="hover:underline flex items-center gap-2" href="#">
                  <ReloadIcon /> We can send a new code in 0.08
                </a>
              </p>

              <Button
                onClick={() => onSubmit()}
                className="w-full dark:hover:text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="password-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <DialogHeader className="space-y-0">
                <p>vicky__tajpuriya.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Add extra security to your account
                </DialogTitle>
                <DialogDescription>
                  Two-factor authentication protects your account by requesting
                  and additional code when you log in on a device we dont
                  recognize. Learn more
                </DialogDescription>
              </DialogHeader>

              <RadioGroup
                className="gap-0 -space-y-px rounded-2xl shadow-xs"
                value={selectedValue}
                onValueChange={setSelectedValue}
              >
                {items.map((item) => (
                  <div
                    key={`${item.value}`}
                    className={cn(
                      "border-input has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-2xl last:rounded-b-2xl has-data-[state=checked]:z-10",
                      selectedValue === item.value
                        ? "bg-primary/10 border-ring"
                        : ""
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
                        <p className="text-sm dark:text-neutral-400">
                          {item.value === "1" && (
                            <span className="dark:text-white">
                              Recommended •{" "}
                            </span>
                          )}
                          {item.description}
                        </p>
                      </div>
                      <RadioGroupItem
                        id={`${item.value}`}
                        value={item.value}
                        className="after:absolute after:inset-0"
                        aria-describedby={`${`${item.value}`}-price`}
                      />
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={() => setStep(3)} type="submit" className="w-full dark:hover:text-white">
                Next
              </Button>
            </motion.div>
          )}

          {step === 3 && (selectedValue === "app" ? (
            <motion.div
              key="verify-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <DialogHeader className="space-y-0">
                <p>vicky__tajpuriya.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Get your code from your authentication app
                </DialogTitle>
                <DialogDescription>
                  Enter the 6-digit code generated by your authentication app.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <Input
                  className="bg-muted h-10"
                  placeholder="Enter code"
                  id="code"
                  required
                />
              </div>
              <Button
                onClick={() => setStep(4)}
                className="w-full dark:hover:text-white"
              >
                Next
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="verify-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <DialogHeader className="space-y-0">
                <p>vicky__tajpuriya.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Enter confirmation code
                </DialogTitle>
                <DialogDescription>
                  Enter the 6-digit code we sent to v*********.com.
                </DialogDescription>
                <p>It may take up to a minute for you to receive this code.</p>
              </DialogHeader>
              <div className="flex justify-center">
                <Input
                  className="bg-muted h-10"
                  placeholder="Enter code"
                  id="code"
                  required
                />
              </div>
              <Button
              onClick={() => setStep(4)}
                className="w-full dark:hover:text-white"
              >
                Next
              </Button>
              <Button className="w-full dark:hover:text-white">
                Resend code
              </Button>
            </motion.div>
          ))}

          {step === 4 && (
            <motion.div
              key="final-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <DialogHeader className="space-y-0">
                <p>vicky__tajpuriya.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Two-factor authentication is on
                </DialogTitle>
                <DialogDescription>
                  We'll now ask for a login code anytime you log in on a device
                  we don't recognize. To change your contact info, go to the
                  Personal derails section in Settings.
                </DialogDescription>
              </DialogHeader>
              <Button
                className="w-full dark:hover:text-white"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Two_factor_auth;
