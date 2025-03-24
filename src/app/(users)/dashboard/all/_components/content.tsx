"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  useGetLoginsQuery,
  useDeleteLoginsMutation,
} from "@/lib/store/api/api";
import { useDecryptedData } from "@/hooks/dec-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import {
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  Files,
  MailIcon,
  Globe,
  EllipsisVertical,
  Pin,
  Trash,
} from "lucide-react";
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
import Options from "./options";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { encryptData } from "@/hooks/dec-data";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  slug: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  website: z
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
  slug: "",
  title: "",
  website: "",
  username: "",
  password: "",
  note: "",
  security: false,
};

interface ViewLoginProps {
  slug: string;
}

const ContentData = ({ slug }: ViewLoginProps) => {
  const { accessToken } = useAuthUser();
  const {
    data: encryptedData,
    error,
    isLoading,
    refetch,
  } = useGetLoginsQuery({ slug, token: accessToken }, { skip: !slug });
  const [deleteLogins] = useDeleteLoginsMutation();
  const { data, loading } = useDecryptedData(encryptedData, isLoading);
  const [update, setUpdate] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [preVisible, setpreVisible] = useState<boolean>(false);
  const [generatingpasswordLoader, setGeneratePassword] =
    useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const togglePreVisibility = () => setpreVisible((prevState) => !prevState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        slug: data.slug,
        username: data.username,
        title: data.title,
        website: data.website,
        password: data.password,
        note: data.note,
        security: data.security,
      });
    }
  }, [data, form]);

  const { reset, setValue } = form;

  const onSubmit = useCallback(async (data: FormValues) => {
    if (!accessToken) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.success("Encrypting Data...", {
      id: toastId,
      position: "top-center",
    });
    const newData = encryptData(data, accessToken);
    await delay(500);
    try {
      const response = await fetch("/api/vault/logins/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ data: newData }),
      });
      if (response.ok) {
        reset();
        toast.success("Updated SuccessFull", {
          id: toastId,
          position: "top-center",
        });
        refetch();
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Form {...form}>
      {!update && (
        <div className="flex flex-col mt-2 px-2">
          <h1 className="text-2xl">{data?.title}</h1>
          <div className="mt-3 w-full h-32 rounded-xl border overflow-hidden">
            <div
              onClick={() => {
                copyToClipboard(data.username);
              }}
              className="cursor-pointer h-16 border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3"
            >
              <MailIcon className="opacity-60 w-5 h-5" />
              <div className="flex flex-col">
                <p className="text-xs dark:text-neutral-400">Email</p>
                <p className="text-sm">{data?.username}</p>
              </div>
            </div>
            <div
              onClick={() => {
                copyToClipboard(data.password);
              }}
              className="cursor-pointer h-16 border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3"
            >
              <KeyRound className="opacity-60 w-5 h-5" />
              <div className="relative flex flex-col w-full">
                <p className="text-xs dark:text-neutral-400">Password</p>
                <p>{preVisible ? data.password : "*****************"}</p>
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={togglePreVisibility}
                  aria-label={preVisible ? "Hide password" : "Show password"}
                  aria-pressed={preVisible}
                  aria-controls="password"
                >
                  {preVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full h-16 rounded-xl border overflow-hidden cursor-pointer border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3">
            <Globe className="opacity-60 w-5 h-5" />
            <div className="flex flex-col">
              <p className="text-xs dark:text-neutral-400">Websites</p>
              <p className="text-sm hover:underline">{data?.website}</p>
            </div>
          </div>
          <div className="mt-2 w-full h-48 rounded-xl border overflow-hidden">
            <div className="cursor-pointer h-16 border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3"></div>
            <div className="cursor-pointer h-16 border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3"></div>
            <div className="cursor-pointer h-16 border-b-1 dark:bg-neutral-800/30 dark:hover:bg-neutral-950/50 hover:bg-neutral-200/50 flex items-center px-3 gap-3"></div>
          </div>
        </div>
      )}
      {update && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-3 w-full items-center flex-col mt-5"
        >
          <div className="p-3 space-y-2 w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!update}
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="select-45">Website/App</FormLabel>
                    <FormControl>
                      <Options
                        value={field.value}
                        setValue={(value) => setValue("website", value)}
                        setTitle={(title) => setValue("title", title)}
                        disabled={!update}
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
                          disabled={!update}
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
                          disabled={!update}
                          className="pe-9"
                          placeholder="Password"
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
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                          )}
                        </button>

                        {!update && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="absolute inset-y-0 end-7 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                  type="button"
                                  onClick={() => copyToClipboard(field.value)}
                                  aria-label={
                                    isVisible
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                  aria-pressed={isVisible}
                                  aria-controls="password"
                                >
                                  <Files
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}

                        {update && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="absolute inset-y-0 end-7 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                  type="button"
                                  // onClick={() => generatePassword()}
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
                        )}
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
                      <Textarea
                        disabled={!update}
                        placeholder="Note"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {update && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute right-24 top-0"
                  onClick={() => setUpdate(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="absolute right-0 top-0"
                >
                  Update
                </Button>
              </>
            )}
          </div>
          <div className="w-full h-full">
            <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring">
              <FormField
                control={form.control}
                name="security"
                render={({ field }) => (
                  <FormItem className="order-1 after:absolute">
                    <FormControl>
                      <Switch
                        disabled={!update}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grow gap-2">
                <Label htmlFor="checkbox-13">Vault password required</Label>
                <p className="text-xs text-muted-foreground">
                  Always require your vault password before filling or accessing
                  this login.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
      {!update && (
        <>
          <Button
            type="button"
            variant="secondary"
            className="absolute right-10 top-2"
            onClick={() => setUpdate(true)}
          >
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                type="button"
                variant="secondary"
                className="absolute right-0 top-2"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pin className="w-4 h-4 rotate-45" />
                Pin item
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="w-4 h-4" />
                Move to Trash
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOff className="w-4 h-4" />
                Exclude from monitoring
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </Form>
  );
};

export default ContentData;
