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
import { delay } from "@/lib/utils";
import Firststep from "./firststep";
import { UserData } from "@/schemas";
import Image from "next/image";

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

const TotpSchema = z.object({
  token: z
    .string()
    .min(6, { message: "Code must be at least 6 characters long" })
    .max(6, { message: "Max character accept 6" }),
  secret: z
    .string()
    .min(20, { message: "Code must be at least 6 characters long" })
    .max(200, { message: "Max character accept 6" }),
});

type Totpd = z.infer<typeof TotpSchema>;

const defaultVaultPasswordValues: Totpd = {
  token: "",
  secret: "",
};

function xorEncryptDecrypt(data: string, key: string) {
  return Array.from(data)
    .map((char: string, index: number) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
}

function encryptData(data: Record<string, any>, key: string): string {
  const token = key.slice(0, 32);
  const jsonData = JSON.stringify(data);
  const encrypted = xorEncryptDecrypt(jsonData, token);
  return btoa(encrypted);
}

const Two_factor_auth = ({
  user,
  accessToken,
}: {
  user?: UserData;
  accessToken?: string;
}) => {
  const [step, setStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("app");
  const [data, setData] = useState({ qrCode: null, secret: null });

  const form = useForm<Totpd>({
    resolver: zodResolver(TotpSchema),
    mode: "onChange",
    defaultValues: defaultVaultPasswordValues,
  });

  const { setValue } = form;

  const onSubmit = async (data: Totpd) => {
    if (!accessToken) return;
    const toastId = toast.loading("Verifying...", { position: "top-center" });
    await delay(500);
    try {
      const newData = encryptData(data, accessToken);
      const response = await fetch("/api/authenticator/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ data: newData }),
      });
      if (response.ok) {
        const res = await response.json();
        setStep(5);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await delay(500);
        const response = await fetch("/api/authenticator/generate/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok && accessToken) {
          const res = await response.json();
          const key = accessToken.slice(0, 32);
          const decodedData = atob(res.data);
          const decrypted = xorEncryptDecrypt(decodedData, key);
          const data = JSON.parse(decrypted);
          setData({ qrCode: data.qrCode, secret: data.secret });
          setValue("secret", data.secret);
        } else {
          toast.error("Something went wrong", {
            position: "top-center",
          });
        }
      } catch (error: any) {
        console.log(error);
        toast.error("An error occurred", {
          position: "top-center",
        });
      }
    };
    if (step === 3 && selectedValue === "app") {
      fetchData();
    }
  }, [step]);

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
              <Button
                onClick={() => setStep(3)}
                type="submit"
                className="w-full dark:hover:text-white"
              >
                {selectedValue == "app" ? "Update" : "Next"}
              </Button>
            </motion.div>
          )}

          {step === 3 &&
            (selectedValue === "app" ? (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-2 flex flex-col gap-2"
              >
                <DialogHeader className="space-y-0">
                  <p className="text-sm">{user?.username}.password_manager</p>
                  <DialogTitle className="text-2xl m-0">
                    Instructions for setup
                  </DialogTitle>
                </DialogHeader>

                <span className="">
                  <h1>1. Download as authentication app</h1>
                  <p className="text-sm dark:text-neutral-300">
                    We recommend downloading Duo Mobile or Google Authenticator
                    if you don't have one installed.
                  </p>
                </span>

                <span>
                  <h1>2. Scan this barcode/Qr code</h1>
                  <p className="text-sm dark:text-neutral-300">
                    Scan this barcode/Qr code in the authentication app.
                  </p>
                </span>

                {data.qrCode ? (
                  <Image
                    src={data.qrCode}
                    height={200}
                    width={200}
                    className="w-52 h-52 object-cover ring-4 ring-neutral-400/50 rounded-xl"
                    alt="Qrcode"
                  />
                ) : (
                  <span className=" w-52 h-52 object-cover ring-4 ring-neutral-400/50 rounded-xl bg-neutral-400/50 animate-pulse" />
                )}

                <span>
                  <h1>3. Copy and enter 6-digit code</h1>
                  <p className="text-sm dark:text-neutral-300">
                    After the barcode/Qr code is scanned, your authentication
                    app will generate a 6-digit code. Copy the code and then
                    come back to Password Manager to enter it.
                  </p>
                </span>
                <Button onClick={() => setStep(4)} disabled={!data.qrCode}>
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
                  <p>
                    It may take up to a minute for you to receive this code.
                  </p>
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

          {step === 4 && (selectedValue === "app" ? (
            <motion.div
              key="verify-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 flex flex-col items-start"
                >
                  <DialogHeader className="space-y-0">
                    <p className="text-sm">{user?.username}.password_manager</p>
                    <DialogTitle className="text-2xl m-0">
                      Get your code from your authentication app
                    </DialogTitle>
                    <DialogDescription>
                      Enter the 6-digit code generated by your authentication
                      app.
                    </DialogDescription>
                  </DialogHeader>
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
              <Button className="w-full dark:hover:text-white">Done</Button>
            </motion.div>
          ))}

          {step === 5 && (selectedValue === "app" && (
            <motion.div
              key="final-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <DialogHeader className="space-y-0">
                <p>{user?.username}.password_manager</p>
                <DialogTitle className="text-2xl m-0">
                  Authentication App added.
                </DialogTitle>
                <DialogDescription>
                  We'll now ask for a login code anytime you log in on a device
                  we don't recognize. To change your contact info, go to the
                  Personal derails section in Settings.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => {
                  // setIsOpen(false);
                }}
                className="w-full dark:hover:text-white"
              >
                Done
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Two_factor_auth;
