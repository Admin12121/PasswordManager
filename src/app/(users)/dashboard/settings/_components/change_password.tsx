import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Spinner from "@/components/ui/spinner";
import { useChangepasswordMutation } from "@/lib/store/api/api";
import Firststep from "./firststep";
import { UserData } from "@/schemas";

const PasswordSchema = z
  .object({
    oldpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(128, { message: "Password must be less than 128 characters" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(128, { message: "Password must be less than 128 characters" }),

    confirmpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(128, { message: "Password must be less than 128 characters" }),

    log_out: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  })
  .refine((data) => data.oldpassword !== data.password, {
    message: "New password must be different from the old password",
    path: ["password"],
  });

type Password = z.infer<typeof PasswordSchema>;

const defaultPasswordSchema: Password = {
  oldpassword: "",
  password: "",
  confirmpassword: "",
  log_out: false,
};

const Changepassword = ({
  user,
  accessToken,
}: {
  user?: UserData;
  accessToken?: string;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [comfirmVisible, setComfirmVisible] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [generatingpasswordLoader, setGeneratePassword] =
    useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const toggleComfirmVisibility = () =>
    setComfirmVisible((prevState) => !prevState);
  const [change] = useChangepasswordMutation();

  const vaultPasswordForm = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
    defaultValues: defaultPasswordSchema,
  });

  const { setValue } = vaultPasswordForm;

  const generatePassword = () => {
    setGeneratePassword(true);
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charPool = "";
    charPool += letters;
    charPool += upperCase;
    charPool += numbers;
    charPool += symbols;

    if (!charPool) {
      setValue("password", "");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setTimeout(() => {
      setValue("password", newPassword);
      setValue("confirmpassword", newPassword);
      setGeneratePassword(false);
    }, 1000);
  };

  const onSubmitVaultPassword = async () => {
    if (!accessToken) return;
    const toastId = toast.loading("Adding...", { position: "top-center" });
    await delay(500);
    try {
      const data = vaultPasswordForm.getValues();
      const res = await change({ data, token: accessToken });
      if (res.data) {
        toast.success("Password Changed", {
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
            <h3>Change password</h3>
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
            <Firststep user={user} token={accessToken} setStep={setStep} />
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
                  onSubmit={vaultPasswordForm.handleSubmit(
                    onSubmitVaultPassword
                  )}
                  className="flex gap-3 w-full flex-col"
                >
                  <DialogHeader className="space-y-0">
                    <p>vicky__tajpuriya.password_manager</p>
                    <DialogTitle className="text-2xl m-0">
                      Change password
                    </DialogTitle>
                    <DialogDescription>
                      Your password must be at least 8 characters and include a
                      combination of numbers, letters, and special characters
                      (!$@%).
                    </DialogDescription>
                  </DialogHeader>
                  <FormField
                    control={vaultPasswordForm.control}
                    name="oldpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-muted h-10"
                            id="current_password"
                            placeholder="Current password"
                            type="password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label={
                                isVisible ? "Hide password" : "Show password"
                              }
                              aria-pressed={isVisible}
                              aria-controls="password"
                            >
                              {isVisible ? (
                                <EyeOff
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ) : (
                                <Eye
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className="absolute inset-y-0 end-7 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    type="button"
                                    onClick={() => generatePassword()}
                                    aria-label={
                                      isVisible
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                    aria-pressed={isVisible}
                                    aria-controls="password"
                                  >
                                    {generatingpasswordLoader ? (
                                      <Spinner
                                        size="sm"
                                        className="dark:!stroke-white"
                                      />
                                    ) : (
                                      <KeyRound
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
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
                              className="bg-muted h-10 pe-9 "
                              placeholder="Re-type new password"
                              type={comfirmVisible ? "text" : "password"}
                              required
                              {...field}
                            />
                            <button
                              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                              type="button"
                              onClick={toggleComfirmVisibility}
                              aria-label={
                                isVisible ? "Hide password" : "Show password"
                              }
                              aria-pressed={isVisible}
                              aria-controls="password"
                            >
                              {isVisible ? (
                                <EyeOff
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ) : (
                                <Eye
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <a className="text-sm hover:underline" href="#">
                      Forgot your password?
                    </a>
                    <div className="flex gap-2">
                      <FormField
                        control={vaultPasswordForm.control}
                        name="log_out"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormDescription>
                                Log out of other devices. Choose this if someone
                                else used your account.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full dark:hover:text-white"
                  >
                    Change password
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

export default Changepassword;
