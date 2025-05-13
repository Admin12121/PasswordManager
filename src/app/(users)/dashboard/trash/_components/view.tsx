import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useRecoverLoginsMutation,
  useRecoverNotesMutation,
  useDeleteLoginsMutation,
  useDeleteNotesMutation,
} from "@/lib/store/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { items } from "@/components/global/sites";
import {
  ArrowUpDown,
  CreditCard,
  UserRound,
  NotepadText,
  History,
  LayoutGrid,
  File,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthUser } from "@/hooks/use-auth-user";

interface SiteProps {
  avatarProps: {
    name: string;
    icon?: any;
    classNames?: {
      base?: string;
      icon?: string;
    };
  };
  classNames?: {
    base?: string;
    description?: string;
    name?: string;
  };
  name: string;
}

const Website = ({ avatarProps, classNames, name }: SiteProps) => {
  const matchedItem = items.find(
    (item) => item.label.toLowerCase() === name.toLowerCase(),
  );
  const Icon: any = matchedItem?.icon;

  return (
    <div
      className={cn(
        "flex gap-2 bg-neutral-950 w-10 h-full items-center justify-center rounded-xl",
        classNames?.base,
      )}
    >
      <Avatar>
        <AvatarFallback className="bg-transparent">
          {Icon ? (
            <Icon className="w-8 h-8 fill-white" />
          ) : (
            avatarProps.name.slice(0, 2).toUpperCase()
          )}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  username: string;
  authtoken: boolean;
}

const View = ({
  logins,
  refetch,
  loading,
  setLoading,
  page,
  setPage,
  hasMore,
}: {
  logins: VaultData[];
  refetch: any;
  loading: boolean;
  setLoading: any;
  page: number;
  setPage: any;
  hasMore: boolean;
}) => {
  const [recovernote] = useRecoverNotesMutation();
  const [recoverlogins] = useRecoverLoginsMutation();
  const { accessToken, user } = useAuthUser();
  const [slug, setSlug] = useState<string>("");
  const [type, setType] = useState<"logins" | "notes" | null>(null);
  const loadMoreProducts = useCallback(async () => {
    if (hasMore && !loading) {
      setLoading(true);
      await delay(1000);
      setPage((prev: number) => prev + 1);
    }
  }, [hasMore, loading, page]);

  const onRecoverLogins = async (slug: string) => {
    if (!accessToken) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.loading("Recovering...", {
      id: toastId,
      position: "top-center",
    });
    await delay(500);
    try {
      const response = await recoverlogins({ slug, token: accessToken });
      if (response.data) {
        refetch();
        toast.success("Recovered", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onRecoverNotes = async (slug: string) => {
    if (!accessToken) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.loading("Recovering...", {
      id: toastId,
      position: "top-center",
    });
    await delay(500);
    try {
      const response = await recovernote({ slug, token: accessToken });
      if (response.data) {
        refetch();
        toast.success("Recovered", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative w-full h-dvh flex">
      <div className="relative w-[50%] h-full border-r py-1">
        <div className="flex gap-2 px-1 mt-2">
          <Select defaultValue="1">
            <SelectTrigger className="w-auto max-w-full min-w-48">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              <SelectItem value="1">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 opacity-60" />
                  All
                </div>
              </SelectItem>
              <SelectItem value="2">
                <div className="flex items-center gap-2">
                  <UserRound className="w-4 h-4 opacity-60" />
                  Login
                </div>
              </SelectItem>
              <SelectItem value="3" disabled>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 opacity-60" />
                  Credit Card
                </div>
              </SelectItem>
              <SelectItem value="4">
                <div className="flex items-center gap-2">
                  <NotepadText className="w-4 h-4 opacity-60" />
                  Note
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="1">
            <SelectTrigger className="w-auto max-w-full min-w-48">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              <SelectItem value="1">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 opacity-60" />
                  History
                </div>
              </SelectItem>
              <SelectItem value="2">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Alphabetical
                </div>
              </SelectItem>
              <SelectItem value="3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Newest to Oldest
                </div>
              </SelectItem>
              <SelectItem value="4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Oldest to Newest
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col mt-3">
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMoreProducts}
            className="w-full"
          >
            {logins.map((data) => (
              <div
                key={data.slug}
                className={cn(
                  "flex h-14 w-full p-2 gap-5 cursor-pointer",
                  "hover:dark:bg-neutral-800/50 hover:bg-neutral-200/50",
                )}
              >
                {data.username ? (
                  <Website
                    avatarProps={{
                      name: `${data.username.slice(0, 1)}`,
                      classNames: {
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                        icon: "text-black/80",
                      },
                    }}
                    classNames={{
                      description: "text-default-500",
                      name: "cursor-pointer",
                    }}
                    name={data.title}
                  />
                ) : (
                  <Avatar>
                    <AvatarFallback className="bg-black dark:bg-transparent">
                      <File className="w-6 h-6 stroke-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "text-left cursor-pointer flex-grow",
                    !data.username && "items-center flex",
                  )}
                >
                  <span className="flex items-center gap-x-1 flex-nowrap">
                    <span className="text-ellipsis">{data.title}</span>
                  </span>
                  {data.username && (
                    <div className="dark:text-neutral-300 block text-xs text-ellipsis">
                      {data.username}
                    </div>
                  )}
                </div>
                <div className="gap-2 flex">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      data.username
                        ? onRecoverLogins(data.slug)
                        : onRecoverNotes(data.slug)
                    }
                  >
                    Recover
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSlug(data.slug);
                      setType(data.username ? "logins" : "notes");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <div className="relative w-[50%] h-full py-1">
        <div className="relative w-full h-full py-1 pl-1">
          <div
            className="h-full w-full border-2 border-dashed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {slug != "" && (
              <Firststep
                token={accessToken}
                slug={slug}
                user={user?.email}
                setSlug={setSlug}
                type={type}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;

import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InfiniteScroll from "@/components/global/infinite-scroll";

const TotpSchema = z.object({
  token: z
    .string()
    .min(6, { message: "Code must be at least 6 characters long" })
    .max(6, { message: "Max character accept 6" }),
});
type Totpd = z.infer<typeof TotpSchema>;

const defaultTotpd: Totpd = {
  token: "",
};

const Firststep = ({
  token,
  user,
  slug,
  setSlug,
  type,
  refetch,
}: {
  token?: string;
  user?: string | undefined | null;
  slug: string;
  setSlug: any;
  type: "logins" | "notes" | null;
  refetch: any;
}) => {
  const [deleteLogins] = useDeleteLoginsMutation();
  const [deleteNotes] = useDeleteNotesMutation();

  const [verify, setVerify] = useState<boolean>(false);

  const form = useForm<Totpd>({
    resolver: zodResolver(TotpSchema),
    mode: "onChange",
    defaultValues: defaultTotpd,
  });

  const onSubmit = async (data: Totpd) => {
    const toastId = toast.loading("Verifying...", { position: "top-center" });
    await delay(500);
    try {
      const response = await fetch("/api/authenticator/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        const res = await response.json();
        setVerify(true);
        toast.success("Verified successfull", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDeletLogins = async () => {
    if (!token) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.loading("Deleting...", {
      id: toastId,
      position: "top-center",
    });
    await delay(500);
    try {
      const response = await deleteLogins({ slug, token });
      if (response.data) {
        setSlug("");
        refetch();
        toast.success("Deleted sucessfull", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch {
      console.log("error");
    }
  };

  const onDeleteNotes = async () => {
    if (!token) return;
    const toastId = toast.loading("Updating...", { position: "top-center" });
    await delay(500);
    toast.loading("Deleting...", {
      id: toastId,
      position: "top-center",
    });
    await delay(500);
    try {
      const response = await deleteNotes({ slug, token });
      if (response.data) {
        setSlug("");
        refetch();
        toast.success("Deleted sucessfull", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch {
      console.log("error");
    }
  };

  const deleteData = () => {
    if (type == "logins") {
      onDeletLogins();
    } else {
      onDeleteNotes();
    }
  };

  return (
    <>
      {!verify ? (
        <motion.div
          key="verify-step"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={cn("flex items-center justify-center h-full")}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex flex-col items-start"
            >
              <div className="space-y-0">
                <p className="text-sm">{user}.password_manager</p>
                <h1 className="text-2xl m-0">
                  Get your code from your authentication app
                </h1>
                <p>
                  Enter the 6-digit code generated by your authentication app.
                </p>
              </div>
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="bg-muted h-10 w-full"
                        placeholder="Enter code"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full dark:hover:text-white">Next</Button>
            </form>
          </Form>
        </motion.div>
      ) : (
        <motion.div
          key="verify-step"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={cn("flex items-center justify-center h-full")}
        >
          <div className="space-y-5 flex flex-col items-start">
            <div className="space-y-0">
              <h1 className="text-2xl m-0 text-center">Final confirmation</h1>
              <p>
                This action cannot be undone. To confirm, please click delete
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center w-full">
              <Button
                variant={"secondary"}
                onClick={() => deleteData()}
                className="w-full dark:hover:text-white"
              >
                detele
              </Button>
              <Button
                className="w-full dark:hover:text-white"
                onClick={() => setSlug("")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
