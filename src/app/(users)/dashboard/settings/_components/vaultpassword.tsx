"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Eye, EyeOff, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import Firststep from "./firststep";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Spinner from "@/components/ui/spinner";
import { useUpdatevaultpasswordMutation } from "@/lib/store/api/api";
import { UserData } from "@/schemas";

const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128),
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type Password = z.infer<typeof PasswordSchema>;

const defaultPasswordSchema: Password = {
  password: "",
  confirmpassword: "",
};

const ChangeVaultpassword = ({
  user,
  accessToken,
}: {
  user?: UserData;
  accessToken?: string;
}) => {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [updatevaultpassword] = useUpdatevaultpasswordMutation();
  const [generatingPasswordLoader, setGeneratingPasswordLoader] =
    useState(false);

  const vaultPasswordForm = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
    defaultValues: defaultPasswordSchema,
  });

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const toggleConfirmVisibility = () => setConfirmVisible((prev) => !prev);
  const { setValue, handleSubmit } = vaultPasswordForm;

  const generatePassword = () => {
    setGeneratingPasswordLoader(true);
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let newPassword = Array.from(
      { length: 40 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");

    setTimeout(() => {
      setValue("password", newPassword);
      setValue("confirmpassword", newPassword);
      setGeneratingPasswordLoader(false);
    }, 1000);
  };

  const onSubmitVaultPassword = async (data: Password) => {
    if (!accessToken) return;
    const toastId = toast.loading("Adding...", { position: "top-center" });

    try {
      const res = await updatevaultpassword({
        data,
        token: accessToken,
      });
      if (res.data) {
        toast.success("Vault Password Changed", {
          id: toastId,
          position: "top-center",
        });
      } else if (res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { error: string };
          toast.error(errorData.error, {
            id: toastId,
            position: "top-center",
          });
        } else {
          toast.error("An unknown error occurred", {
            id: toastId,
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unknown error occurred", {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group h-auto gap-4 py-3 text-left w-full border-none rounded-none justify-between"
          variant="outline"
        >
          <div className="space-y-1">
            <h3>Vault Password</h3>
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
          {step === 1 && accessToken && (
            <Firststep token={accessToken} user={user} setStep={setStep} />
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
              <Form {...vaultPasswordForm}>
                <form
                  onSubmit={handleSubmit(onSubmitVaultPassword)}
                  className="flex gap-3 w-full flex-col"
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

                  <FormField
                    control={vaultPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="pe-9 bg-muted h-10"
                              placeholder="New Password"
                              type={isVisible ? "text" : "password"}
                              {...field}
                              autoComplete="off"
                            />
                            <button
                              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                              type="button"
                              onClick={toggleVisibility}
                            >
                              {isVisible ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className="absolute inset-y-0 end-7 flex h-full w-9 items-center justify-center"
                                    type="button"
                                    onClick={generatePassword}
                                  >
                                    {generatingPasswordLoader ? (
                                      <Spinner
                                        size="sm"
                                        className="dark:!stroke-white"
                                      />
                                    ) : (
                                      <KeyRound size={16} />
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generate password</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={vaultPasswordForm.control}
                    name="confirmpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="bg-muted h-10 pe-9"
                              placeholder="Re-type new password"
                              type={confirmVisible ? "text" : "password"}
                              {...field}
                            />
                            <button
                              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                              type="button"
                              onClick={toggleConfirmVisibility}
                            >
                              {confirmVisible ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeVaultpassword;
