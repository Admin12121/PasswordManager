"use client";

import { Button } from "@/components/ui/button";
import { useDeleteLoginsMutation } from "@/lib/store/api/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
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

export default function VaultModal({
  security,
  children,
}: {
  security: boolean;
  children: React.ReactNode;
}) {
  const [inputValue, setInputValue] = useState("");
  const passwordValidation = () => {};
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
          <form className="space-y-5">
            <div className="space-y-2">
              <Label>Vault Password</Label>
              <Input type="password" placeholder="Enter Vault Password" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="flex-1"
                disabled={inputValue == ""}
              >
                Unlock
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export function DeleteModal({
  children,
  slug,
  token,
  refetch
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
          <AlertDialogAction onClick={()=>handleDelete(slug)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
