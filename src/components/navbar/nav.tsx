import React from "react";
import Link from "next/link";
import "./style.css";
import { UserNav } from "./usernav";
import { useAuthUser } from "@/hooks/use-auth-user";
import { ModeSwitcher } from "./mood-switcher";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const Nav = () => {
  const { status } = useAuthUser();
  return (
    <header className="w-full relative z-50 border-b backdrop-blur-sm flex items-center justify-center">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center gap-1" href="/">
            <Image
              alt="logo"
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              data-nimg={1}
              className=""
              style={{ color: "transparent" }}
              src="/logo.svg"
            />
            <span className="text-2xl leading-0 font-semibold">Password</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="transition-opacity duration-300 opacity-100">
              <ModeSwitcher showLabel variant="circle" start="bottom-right" />
            </div>
            <div className="text-muted-foreground-subtle items-center justify-center hidden lg:flex">
              <Link
                aria-label="Instagram"
                href="https://github.com/Admin12121/PasswordManager"
              >
                <Image
                  alt="logo"
                  loading="lazy"
                  width={32}
                  height={32}
                  decoding="async"
                  data-nimg={1}
                  className=""
                  style={{ color: "transparent" }}
                  src="/media/tech/github.svg"
                />
              </Link>
            </div>
            {status ? (
              <UserNav />
            ) : (
              <>
                <span className="block">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1"
                  >
                    Login
                    <ChevronRight size={10} />
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;