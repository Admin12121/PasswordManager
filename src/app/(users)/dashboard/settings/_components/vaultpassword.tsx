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

const CORRECT_CODE = "6548";

const ChangeVaultpassword = () => {
  const [value, setValue] = useState("");
  const [hasGuessed, setHasGuessed] = useState<boolean | undefined>(undefined);
  const [step, setStep] = useState(1);

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
            <h3>vault password</h3>
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
                  Create Vault Password
                </DialogTitle>
                <DialogDescription>
                  Your password must be at least 8 characters and include a
                  combination of numbers, letters, and special characters
                  (!$@%).
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4">
                <Input
                  className="bg-muted h-10"
                  id="new_password"
                  placeholder="New password"
                  type="password"
                  required
                />
                <Input
                  className="bg-muted h-10"
                  id="confirm_password"
                  placeholder="Re-type new password"
                  type="password"
                  required
                />
                <Button type="submit" className="w-full dark:hover:text-white">
                  Create new vault password
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeVaultpassword;
