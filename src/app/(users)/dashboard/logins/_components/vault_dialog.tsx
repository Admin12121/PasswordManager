"use client";

import { Button } from "@/components/ui/button";
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


export default function VaultModal({security, children}:{security:boolean, children:React.ReactNode}) {
  const [inputValue, setInputValue] = useState("");
  const passwordValidation = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full h-full flex items-center">
          {children}
        </span>
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
