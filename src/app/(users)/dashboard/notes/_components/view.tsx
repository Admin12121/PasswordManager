import { useEffect, useState, useCallback } from "react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import {
  useGetNotesQuery,
  useVerifyvaultpasswordMutation,
  useGetLoggedUserQuery,
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
  CircleAlert,
  File,
  EllipsisIcon,
  EllipsisVertical,
  Pin,
  Trash,
  EyeOff,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import LogoAnimation, {
  AnimatedNumber,
} from "@/components/global/logo_animation";
import { useAuthUser } from "@/hooks/use-auth-user";
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
import NoteEditorPlaceholder from "./editor";
import { encryptData } from "@/hooks/dec-data";
import { useDecryptedData } from "@/hooks/dec-data";
import { UserData } from "@/schemas";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";
import InfiniteScroll from "@/components/global/infinite-scroll";

const CustomDocument = Document.extend({
  content: "heading block*",
});

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

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  authtoken: boolean;
}

const formSchema = z.object({
  slug: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  note: z
    .string()
    .max(500, { message: "Note must be less than 500 characters" })
    .optional(),
  security: z.boolean().optional(),
  authtoken: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultFormValues: FormValues = {
  slug: "",
  title: "",
  note: "",
  security: false,
  authtoken: false,
};

const View = ({
  notes,
  refetch,
  isNew,
  setIsNew,
  loading,
  setLoading,
  page,
  setPage,
  hasMore,
}: {
  notes: VaultData[];
  refetch: any;
  isNew: boolean;
  setIsNew: any;
  loading: boolean;
  setLoading: any;
  page: number;
  setPage: any;
  hasMore: boolean;
}) => {
  const { accessToken, user } = useAuthUser();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [sec, setSec] = useState<boolean>(false);
  const [appauth, setAppauth] = useState(false);
  const [verified, setVerified] = useState(false);
  const [progress, setProgress] = useState(0);
  const [veruser, setVerUser] = useState<UserData>();

  const loadMoreProducts = useCallback(async () => {
    if (hasMore && !loading) {
      setLoading(true);
      await delay(1000);
      setPage((prev: number) => prev + 1);
    }
  }, [hasMore, loading, page]);

  useEffect(() => {
    if (sec || !selectedSlug) return;
    setProgress(0);
    let start = 0;
    const interval = setInterval(() => {
      const increment = start < 70 ? 5 : 1;
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [selectedSlug, sec]);

  const handleVerification = () => {
    setVerified(true);
    setSec(false);
  };

  const {
    data: encryptedUserData,
    isLoading: vaultloading,
    refetch: profilerefetch,
  } = useGetLoggedUserQuery({ token: accessToken }, { skip: !accessToken });

  const { data: userdata, loading: vaultLoader } = useDecryptedData(
    encryptedUserData,
    vaultloading,
  );

  useEffect(() => {
    if (userdata) {
      setVerUser(userdata);
    }
  }, [userdata, vaultLoader]);

  const handleSelectNote = ({
    slug,
    sec,
    authtoken,
  }: {
    slug: string;
    sec: boolean;
    authtoken: boolean;
  }) => {
    if (slug === selectedSlug) return;
    setIsNew(false);
    setSec(sec);
    setSelectedSlug(slug);
    setAppauth(authtoken);
    setVerified(false);
    setProgress(0);
  };

  useEffect(() => {
    if (isNew) {
      setSec(false);
      setSelectedSlug("default-note");
      setAppauth(false);
      setVerified(false);
      setProgress(0);
    }
  }, [isNew]);

  const renderContent = () => {
    if (!selectedSlug) {
      return (
        <div className="relative w-full h-full p-1">
          <div
            className="h-full w-full border-2 border-dashed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      );
    }
    if (appauth) {
      return (
        <Firststep
          token={accessToken}
          setStep={() => setAppauth(false)}
          user={user?.email || ""}
        />
      );
    } else if (sec && !verified) {
      return (
        <VerifyVaultSecurity
          token={accessToken!}
          slug={selectedSlug}
          onSuccess={handleVerification}
          user={user?.email || ""}
        />
      );
    } else if (progress < 100) {
      return (
        <LogoAnimation className="h-full font-normal flex items-center justify-center !text-sm">
          Sync Data{" "}
          <AnimatedNumber className="w-14 flex justify-end" value={progress} />%
        </LogoAnimation>
      );
    } else {
      return (
        selectedSlug && (
          <NoteEditorPlaceholder slug={selectedSlug} refetch={refetch} />
        )
      );
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-55px)] flex">
      <div className="relative w-[50%] h-full border-r py-1">
        <div className="flex gap-2 px-1 mt-2">
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
            {notes.map((data) => (
              <div
                onClick={() => {
                  handleSelectNote({
                    slug: data.slug,
                    sec: data.security,
                    authtoken: data.authtoken,
                  });
                }}
                key={data.slug}
                className={cn(
                  "flex h-14 w-full  p-2 gap-5 cursor-pointer",
                  selectedSlug == data.slug &&
                    "dark:bg-neutral-800/50 bg-neutral-200/50",
                )}
              >
                <div
                  className={cn(
                    "flex gap-2 bg-neutral-950 w-10 h-full items-center justify-center rounded-xl",
                  )}
                >
                  <Avatar>
                    <AvatarFallback className="bg-transparent">
                      <File className="w-6 h-6 stroke-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-left flex items-center cursor-pointer">
                  <span className="flex items-center gap-x-1 flex-nowrap">
                    <span className="text-ellipsis">{data.title}</span>
                  </span>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <div className="relative w-[50%] h-full py-1">{renderContent()}</div>
    </div>
  );
};

export default View;

const vaultPasswordSchema = z.object({
  vaultpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" }),
});
type VaultPassword = z.infer<typeof vaultPasswordSchema>;

const defaultVaultPasswordValues: VaultPassword = {
  vaultpassword: "",
};

const VerifyVaultSecurity = ({
  token,
  slug,
  onSuccess,
  user,
}: {
  token: string;
  slug: string;
  onSuccess: any;
  user: string;
}) => {
  const [verify] = useVerifyvaultpasswordMutation();

  const handleVerify = async (data: VaultPassword) => {
    const res = await verify({ data, token: token });
    if (res.data) {
      onSuccess();
      toast.success("Verified successfull", {
        position: "top-center",
      });
    } else {
      toast.error("Failed to unlock vault");
    }
  };

  const vaultPasswordForm = useForm<VaultPassword>({
    resolver: zodResolver(vaultPasswordSchema),
    mode: "onChange",
    defaultValues: defaultVaultPasswordValues,
  });

  return (
    <motion.div
      key="vault-step"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className={cn("flex items-center justify-center h-full")}
    >
      <Form {...vaultPasswordForm}>
        <form
          className="space-y-5 min-w-[495px]"
          onSubmit={vaultPasswordForm.handleSubmit(handleVerify)}
        >
          <div className="space-y-0">
            <p className="text-sm">{user}password_manager</p>
            <h1 className="text-2xl m-0">Enter the vault password</h1>
          </div>
          <FormField
            control={vaultPasswordForm.control}
            name="vaultpassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="vault Password"
                    type="password"
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
  );
};

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
  setStep,
}: {
  token?: string;
  user?: string;
  setStep: any;
}) => {
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
        setStep(2);
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

  return (
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
            <p>Enter the 6-digit code generated by your authentication app.</p>
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
  );
};
