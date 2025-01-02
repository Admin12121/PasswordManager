"use client";
import React from "react";
import Link from "next/link";
import { UserNav } from "./usernav";
import { ArchiveRestore, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useAuthUser } from "@/hooks/use-auth-user";
import { MainNav } from "@/components/navbar/main-nav";
import { ModeSwitcher } from "@/components/navbar/mood-switcher";
import dynamic from 'next/dynamic'

const SiteBanner = dynamic(() => import('../site-banner'), { ssr: false })

export function SiteHeader({ children }: { children: React.ReactNode }) {
  // const { status } = useAuthUser();

  return (
    <>
      <SiteBanner />
      <header className="sticky flex justify-center top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
        <nav className="max-w-[95rem] flex h-16 items-center px-2 md:px-4 w-full">
          <MainNav />
          <div className="hidden md:flex flex-1 items-center justify-end gap-2 md:justify-end">
            <div className="flex items-center gap-1 w-full justify-end">
              <ModeSwitcher />
              {/* {status ? (
                <UserNav />
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-20 px-1">
                  <Link href="/auth/login">Sign Up</Link>
                </Button>
              )} */}
            </div>
          </div>
        </nav>
      </header>
      {children}
      {/* <footer className="w-full">
        <Footer />
        <div className="hidden lg:flex h-10 bottom-0 z-50 w-full border-t-1  dark:!border-neutral-900 justify-center items-center">
          <div className="max-w-[95rem] w-full h-full flex justify-between items-center px-5">
            <span className="flex gap-2">
              <CurrencySelector className="flex !border-0 !ring-0 !ring-offset-0 !shadow-none" />
              <Icons
                className="justify-start"
                icons={["esewa", "visa", "mastercard", "amex", "paypal"]}
              />
            </span>
            <span className="text-xs font- flex gap-2">
              <Link href="/terms-of-service">Terms of Service</Link>
              <p>.</p>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </span>
          </div>
        </div>
        <div className="max-w-[95rem] flex md:hidden h-16 bottom-0 fixed z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none border-0">
          <div className="flex w-full h-full items-center px-4 gap-2 justify-between">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Link
                href="/collections"
                rel="noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <ArchiveRestore className="h-4 w-4" />
                <span className="sr-only">collections</span>
              </Link>
            </Button>
            <CurrencySelector className="flex !border-0 !ring-0 !ring-offset-0 !shadow-none" />
            {status ? (
              <UserNav align="center" />
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-20 px-1">
                <Link href="/auth/login">Sign Up</Link>
              </Button>
            )}
            <Cart />
            <ModeSwitcher />
          </div>
        </div>
      </footer> */}
    </>
  );
}
