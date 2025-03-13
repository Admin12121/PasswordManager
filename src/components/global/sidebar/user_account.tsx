"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, LogOut } from "lucide-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import Link from "next/link";

interface AccountSwitcherProps {
  isCollapsed: boolean;
}

export function AccountSwitcher({ isCollapsed }: AccountSwitcherProps) {
  const { signOut, user } = useAuthUser();

  const Logout = () => {
    toast.success("Logout Succed");
    signOut();
  };
  return (
    <div className="flex items-center gap-2 px-2 flex-col">
      <div className="w-full h-12 flex items-center justify-between gap-2 bg-primary/10 dark:bg-neutral-800/50 rounded-lg px-1 backdrop-blur-lg">
        <Link href={"/dashboard/settings/profile"} className="flex items-center gap-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={user?.image || ""} alt={user?.name||"profile"} />
            <AvatarFallback>
              <UserRound className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email ? user.email : ""}
              </p>
            </div>
          )}
        </Link>
        <LogOut
          onClick={() => Logout()}
          className="w-5 h-5 stroke-default-500 hover:stroke-white mr-2 cursor-pointer transition-all duration-500"
        />
      </div>
      <span className="my-1 h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}
