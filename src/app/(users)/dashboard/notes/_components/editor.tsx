"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  useGetLoginsQuery,
  useGetLoggedUserQuery,
  useDeleteLoginsMutation,
  useSetvaultpasswordMutation,
} from "@/lib/store/api/api";
import { Editor, EditorContent } from "@tiptap/react";
import "./style.css";
import { encryptData, useDecryptedData } from "@/hooks/dec-data";
import { useAuthUser } from "@/hooks/use-auth-user";
import { z } from "zod";
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
import { UserData } from "@/schemas";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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

export default function NoteEditorPlaceholder({
  editor,
  watch,
  setValue,
  editing,
}: {
  editor: Editor | null;
  watch: any;
  setValue: any;
  editing: boolean;
}) {
  const { accessToken } = useAuthUser();
  const [setvault] = useSetvaultpasswordMutation();
  const [user, setUser] = useState<UserData>();

  const security = watch("security"); // Watch the "security" field
  const authtoken = watch("authtoken");

  const vaultPasswordForm = useForm<VaultPassword>({
    resolver: zodResolver(vaultPasswordSchema),
    mode: "onChange",
    defaultValues: defaultVaultPasswordValues,
  });

  const {
    data: encryptedUserData,
    isLoading: vaultloading,
    refetch: profilerefetch,
  } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken && !security },
  );

  const { data: userdata, loading: vaultLoader } = useDecryptedData(
    encryptedUserData,
    vaultloading,
  );

  useEffect(() => {
    if (userdata) {
      setUser(userdata);
    }
  }, [userdata, vaultLoader]);

  const onSubmitVaultPassword = useCallback(async () => {
    if (!accessToken) return;
    const toastId = toast.loading("Adding...", { position: "top-center" });
    await delay(500);
    try {
      const data = vaultPasswordForm.getValues();
      const res = await setvault({ data, token: accessToken });
      if (res.data) {
        toast.success("Added SuccessFull", {
          id: toastId,
          position: "top-center",
        });
        profilerefetch();
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto">
        <EditorContent
          editor={editor}
          className="h-full overflow-auto w-full p-3 outline-none border-0 focus:outline-none"
        />
      </div>

      <div className="w-full h-auto">
        <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring">
          <Switch
            disabled={!editing}
            checked={security}
            onCheckedChange={(checked) => {
              setValue("security", checked);
            }}
            className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
          />

          <div className="grid grow gap-2">
            <Label htmlFor="checkbox-13">Vault password required</Label>
            <p className="text-xs text-muted-foreground">
              Always require your vault password before filling or accessing
              this login.
            </p>
          </div>
        </div>
        {user && !user?.vaultpassword && security && (
          <Form {...vaultPasswordForm}>
            <div className="flex gap-3 w-full items-center flex-col lg:flex-row p-4">
              <div className="space-y-2 relative w-full">
                <FormField
                  control={vaultPasswordForm.control}
                  name="vaultpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vault Password</FormLabel>
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
                <Button
                  type="button"
                  onClick={() => onSubmitVaultPassword()}
                  className="absolute right-0 hover:text-white"
                >
                  Set vault Password
                </Button>
              </div>
            </div>
          </Form>
        )}
        <div className="relative flex w-full items-start gap-2 rounded-lg p-4 has-[[data-state=checked]]:border-ring mt-5">
          <Switch
            disabled={!editing}
            checked={authtoken}
            onCheckedChange={(checked) => {
              setValue("authtoken", checked);
            }}
            className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
          />
          <div className="grid grow gap-2">
            <Label htmlFor="checkbox-13">
              Authentication app Token required
            </Label>
            <p className="text-xs text-muted-foreground">
              Always require your authentication app token before filling or
              accessing this login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
