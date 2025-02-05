"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Mail, Eye, EyeOff, KeyRound } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { useAuthUser } from "@/hooks/use-auth-user";
import { usePostLoginsMutation } from "@/lib/store/api/api";
import Options from "./options";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

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
  security: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultFormValues: FormValues = {
  title: "",
  app: "",
  username: "",
  password: "",
  note: "",
  security: false,
};

const LoginForm = () => {
  const { accessToken } = useAuthUser();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [generatingpasswordLoader, setGeneratePassword] =
    useState<boolean>(false);
  const [addLogins] = usePostLoginsMutation();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const { reset, setValue } = form;

  const onSubmit = useCallback(async (data: FormValues) => {
    const toastId = toast.loading("Adding...", { position: "top-center" });
    await delay(500);
    console.log(data);
    // const res = await addLogins({ actualData: data, token: accessToken });
    // if ("data" in res) {
    //   reset();
    //   toast.success("Added successfully", {
    //     id: toastId,
    //     position: "top-center",
    //   });
    // } else {
    //   toast.error("Something went wrong", {
    //     id: toastId,
    //     position: "top-center",
    //   });
    // }
  }, []);

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
      setGeneratePassword(false);
    }, 1000);
  };

  return (
    <div className="flex gap-3 w-full items-center flex-col lg:flex-row ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-3 space-y-2 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input id="input-01" placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="app"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="select-45">Website/App</FormLabel>
                  <FormControl>
                    <Options
                      value={field.value}
                      setValue={(value) => setValue("app", value)}
                      setTitle={(title) => setValue("title", title)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="input-10"
                        className="peer pe-9"
                        placeholder="vickytajpuriya@gmail.com"
                        {...field}
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Mail size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="input-23"
                        className="pe-9"
                        placeholder="Password"
                        type={isVisible ? "text" : "password"}
                        {...field}
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
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
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
                                isVisible ? "Hide password" : "Show password"
                              }
                              aria-pressed={isVisible}
                              aria-controls="password"
                            >
                              {generatingpasswordLoader ? (
                                <Spinner size="sm"/>
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
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea id="textarea-01" placeholder="Note" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button variant="secondary" className="absolute right-0 top-0">save</Button>  
        </form>
        <div className="w-full h-full">
          <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring">
            <FormField
              control={form.control}
              name="security"
              render={({ field }) => (
                <FormItem className="order-1 after:absolute">
                  <FormControl>
                    <Switch
                      id="switch-07"
                      className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
                    />
                  </FormControl>
                </FormItem>
              )}
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
      </Form>
    </div>
  );
};

export default LoginForm;
