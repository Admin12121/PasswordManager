"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/global/sidebar";
import { Links } from "./links";
import { cn } from "@/lib/utils";
import Header from "./header";
import ThemeSwitcher from "@/components/global/theme-switch";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Sidebar className="border-r">
      <SidebarContent container="!bg-transparent p-2" links={Links}>
        <SidebarHeader logo="/logo.svg" label="Password Manager" />
        <SidebarFooter className="border-t left-0">
          <div className="flex flex-row items-center p-2 w-full">
            <ThemeSwitcher/>
          </div>
        </SidebarFooter>
      </SidebarContent>
      <main className="h-svh p-2 w-full">
        <div
          className={cn(
            "relative flex h-full flex-1 flex-col ",
            " md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
            "rounded-xl overflow-y-auto"
          )}
        >
          <Header />
          {children}
        </div>
      </main>
    </Sidebar>
  );
};

export default Providers;
