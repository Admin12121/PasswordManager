"use client";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/navbar/header";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useGetLoggedUserQuery } from "@/lib/store/api/api";
import { useDecryptedData } from "@/hooks/dec-data";
import Image from "next/image";
import Link from "next/link";
import { UserData } from "@/schemas";
import Authenticationverify from "./_components";

export default function Home() {
  const { accessToken } = useAuthUser();
  const [user, setUser] = useState<UserData>();
  const { data: encryptedData, isLoading } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken }
  );
  const { data, loading } = useDecryptedData(encryptedData, isLoading);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    if (data) {
      setUser(data);
      if (!data.totp_secret) {
        setIsDialogOpen(true);
      }
    }
  }, [data]);
  return (
    <>
      {user && (
        <Authenticationverify
          user={user}
          isOpen={!!user && isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      )}
      <SiteHeader />
      <section className="w-full pb-16 text-center lg:pb-0">
        <div className="flex">
          <div className="relative w-[159px] border-r p-1 max-lg:hidden 2xl:flex-1">
            <div
              className="h-full w-full border-2 border-dashed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
          <div className="container mx-auto pt-16 pb-12 text-center md:pt-20 lg:pt-28">
            <h1 className="mx-auto max-w-[500px] text-[2.5rem] leading-[1.2] tracking-[-1.6px] text-balance md:text-[4rem] md:!leading-[1.15] md:tracking-[-4.32px] lg:text-7xl">
              Say Goodbye to Task Overload
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-[500px] leading-[1.5] tracking-[-0.32px] md:mt-6">
              Securely manage, generate, and organize your passwords with ease.
              Built for speed, privacy, and total control.
            </p>
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-zinc-600 h-9 px-4 py-2 mt-6 gap-1 md:mt-8 lg:mt-10"
              href="/dashboard"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right size-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
          <div className="relative w-[159px] p-1 max-lg:hidden border-r-0 border-l 2xl:flex-1">
            <div
              className="h-full w-full border-2 border-dashed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex h-8 gap-1 max-lg:hidden">
          <div className="flex-1 border" />
          <div
            className="h-full border-2 border-dashed w-52"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="w-24 border" />
          <div
            className="h-full border-2 border-dashed w-52"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="w-24 border" />
          <div
            className="h-full border-2 border-dashed w-52"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="flex-1 border" />
        </div>
        <div className="flex">
          <div className="relative w-[159px] border-r p-1 max-lg:hidden 2xl:flex-1" />
          <div className="container !pt-0 lg:!p-1.5">
            <Image
              src={"/media/dashboard.png"}
              alt="Hero"
              width={1000}
              height={600}
              className="mx-auto p-2 rounded-xl border object-contain shadow-lg 2xl:max-w-[1092px] "
              style={{ color: "transparent" }}
            />
          </div>
          <div className="relative w-[159px] p-1 max-lg:hidden border-r-0 border-l 2xl:flex-1" />
        </div>
        <div className="flex max-lg:hidden">
          <div className="h-8 flex-1 border" />
          <div className="h-[96px] w-[min(753px,55vw)] -translate-y-1.5">
            <div
              className="h-full w-full border-2 border-dashed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
          <div className="h-8 flex-1 border" />
        </div>
      </section>
      <section className="container flex flex-wrap items-center justify-between gap-12 py-12 lg:py-20">
        <p className="text-primary text-lg leading-[140%] tracking-[-0.32px]">
          Build by using Best tech
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale lg:gap-[60px]">
          <div className="flex items-center justify-center">
            <Image
              alt="Notion logo"
              loading="lazy"
              width={109}
              height={48}
              decoding="async"
              data-nimg={1}
              className="object-contain"
              style={{ color: "transparent" }}
              src="/media/tech/next.svg"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="GitHub logo"
              loading="lazy"
              width={109}
              height={48}
              decoding="async"
              data-nimg={1}
              className="object-contain"
              style={{ color: "transparent" }}
              src="/media/tech/Django.svg"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Slack logo"
              loading="lazy"
              width={109}
              height={48}
              decoding="async"
              data-nimg={1}
              className="object-contain"
              style={{ color: "transparent" }}
              src="/media/tech/mysql.svg"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Loom logo"
              loading="lazy"
              width={109}
              height={48}
              decoding="async"
              data-nimg={1}
              className="object-contain"
              style={{ color: "transparent" }}
              src="/images/partners/loom.svg"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Figma logo"
              loading="lazy"
              width={109}
              height={48}
              decoding="async"
              data-nimg={1}
              className="object-contain"
              style={{ color: "transparent" }}
              src="/images/partners/figma.svg"
            />
          </div>
        </div>
      </section>
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x" />
        </div>
      <section>
        <div className="">
          <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
            <div className="inline-flex items-center rounded-md border py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-card w-fit gap-1 px-3 text-sm font-normal tracking-tight shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle-question size-4"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px]">
              Looking for quick answers? Check out our{/* */}{" "}
              <span className="underline">FAQ section</span>.
            </p>
          </div>
        </div>
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x"></div>
        </div>
      </section>
      <footer className="border-t">
        <div className="flex items-center justify-between text-muted-foreground-subtle container border-x border-t border-b py-4 text-sm tracking-[-0.28px] lg:py-8">
          <p>
            © {/* */}2025{/* */} Relative. All rights reserved.
          </p>
        </div>
        <div className="container h-6 border-x flex items-center justify-center">
          <h1>
            Design and development by{" "}
            <a href="https://vickytajpuriya.com" target="_blank">
              Vicky Tajpuriya
            </a>
          </h1>
        </div>
      </footer>
    </>
  );
}