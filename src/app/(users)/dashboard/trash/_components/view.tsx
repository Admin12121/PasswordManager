import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useDeleteLoginsMutation,
  useVerifyvaultpasswordMutation,
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
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import LogoAnimation, {
  AnimatedNumber,
} from "@/components/global/logo_animation";
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

const View = ({ logins }: { logins: VaultData[] }) => {
  const { accessToken } = useAuthUser();
  const [slug, setSlug] = useState(logins.length > 0 ? logins[0].slug : "");
  const [sec, setSec] = useState<boolean>(
    logins.length > 0 ? logins[0].security : false,
  );
  const [appauth, setAppauth] = useState(
    logins.length > 0 ? logins[0].authtoken : false,
  );
  const [verified, setVerified] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sec || !slug) return;
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
  }, [slug, sec]);

  const handleVerification = ({ slug }: { slug: string }) => {
    setVerified(true);
    setSec(false);
  };

  const ToggleData = ({
    slug,
    sec,
    authtoken,
  }: {
    slug: string;
    sec: boolean;
    authtoken: boolean;
  }) => {
    setSec(sec);
    setSlug(slug);
    setAppauth(authtoken);
    setVerified(false);
    setProgress(0);
  };

  return (
    <div className="relative w-full h-dvh flex">
      <div className="relative w-[50%] h-full py-1 pr-1">
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
              <SelectItem value="3">
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
          <Button className="hover:text-white">Clear</Button>
        </div>
        <div className="flex flex-col mt-3">
          {logins.map((data) => (
            <div
              onClick={() => {
                ToggleData({
                  slug: data.slug,
                  sec: data.security,
                  authtoken: data.authtoken,
                });
              }}
              key={data.slug}
              className={cn(
                "flex h-14 w-full  p-2 gap-5 cursor-pointer",
                slug == data.slug && "dark:bg-neutral-800/50 bg-neutral-200/50",
              )}
            >
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
              <div className="text-left cursor-pointer">
                <span className="flex items-center gap-x-1 flex-nowrap">
                  <span className="text-ellipsis">{data.title}</span>
                </span>
                <div className="dark:text-neutral-300 block text-xs text-ellipsis">
                  {data.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-[50%] h-full py-1">
        <div
          className="h-full w-full border-2 border-dashed"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
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
      onSuccess(slug);
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
