"use client";

import { Button } from "@/components/ui/button";
import {
  useDeleteLoginsMutation,
  useVerifyvaultpasswordMutation,
} from "@/lib/store/api/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
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
import { useRouter } from "nextjs-toploader/app";

const vaultPasswordSchema = z.object({
  vaultpassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" }),
  slug: z.string(),
});

type VaultPassword = z.infer<typeof vaultPasswordSchema>;

const defaultVaultPasswordValues: VaultPassword = {
  vaultpassword: "",
  slug: "",
};

export default function VaultModal({
  security,
  children,
  accessToken,
  slug,
}: {
  security: boolean;
  children: React.ReactNode;
  accessToken: string | undefined;
  slug: string;
}) {
  const router = useRouter();
  const [verify] = useVerifyvaultpasswordMutation();

  
  const handleVerify = async (data: VaultPassword) => {
    const res = await verify({ data, token: accessToken });
    if (res.data) {
      toast.success("Vault unlocked successfully");
      router.push(`logins/${res.data.slug}`);
    } else {
      toast.error("Failed to unlock vault");
    }
  };
  const vaultPasswordForm = useForm<VaultPassword>({
    resolver: zodResolver(vaultPasswordSchema),
    mode: "onChange",
    defaultValues: defaultVaultPasswordValues,
  });
  
  useEffect(() => {
    vaultPasswordForm.setValue("slug", slug);
  }, [slug]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full h-full flex items-center">{children}</span>
      </DialogTrigger>
      {security && (
        <DialogContent>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">
                Final confirmation
              </DialogTitle>
            </DialogHeader>
          </div>
          <Form {...vaultPasswordForm}>
            <form
              className="space-y-5"
              onSubmit={vaultPasswordForm.handleSubmit(handleVerify)}
            >
              <div className="space-y-2">
                <FormField
                  control={vaultPasswordForm.control}
                  name="vaultpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vault Password</FormLabel>
                      <FormControl>
                        <Input placeholder="vault Password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="flex-1"
                  disabled={vaultPasswordForm.getValues("vaultpassword") == ""}
                >
                  Unlock
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export function DeleteModal({
  children,
  slug,
  token,
  refetch,
}: {
  children: React.ReactNode;
  slug: string | null;
  token: string | undefined;
  refetch: () => void;
}) {
  const [deleteLogins] = useDeleteLoginsMutation();
  const handleDelete = async (slug: string | null) => {
    const res = await deleteLogins({ slug, token });
    if (res.data) {
      refetch();
      toast.success("Login deleted successfully");
    } else {
      toast.error("Failed to delete login");
    }
    refetch();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(slug)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
