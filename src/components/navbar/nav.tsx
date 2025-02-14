import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./style.css";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserNav } from "./usernav";
import { useAuthUser } from "@/hooks/use-auth-user";

const Nav = () => {
  const router = useRouter();
  const { status } = useAuthUser();
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    for (const card of document.getElementsByClassName("nav")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      const cardElement = card as HTMLElement;
      cardElement.style.setProperty("--mouse-x", `${x}px`);
      cardElement.style.setProperty("--mouse-y", `${y}px`);
    }
  };
  return (
    <div className="relative z-50 w-full flex-col items-center mac:container lg:flex mac:mx-auto mac:mt-6">
      <div className="relative z-20 flex w-full items-center justify-center gap-8 lg:bg-transparent mac:justify-stretch">
        <div className="relative hidden h-px flex-1 bg-ln-gray-200 bleed-bg-l bleed-ln-gray-200 mac:flex">
          <Image
            src="/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-[37px]"
          />
          <Image
            src="/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -right-px -top-1"
          />
        </div>
        <header className="w-full mac:w-auto mac:min-w-[1000px] max-w-[1300px] z-50">
          <div className={cn("sticky top-0 w-full h-[75px] flex gap-5")}>
            <div className="py-2 w-full h-full px-3 mx-auto flex justify-between items-center">
              <div className="nav" onMouseMove={handleMouseMove}>
                <div className="nav_wrap">
                  <div className="logo">
                    <Link href="/">
                      <span>
                        <Image
                          width={40}
                          height={40}
                          src="/logo.svg"
                          alt="logo"
                          className="object-contain"
                        />
                      </span>
                    </Link>
                    <p>Password Manager</p>
                  </div>
                  <div className="flex items-center pr-0.5">
                    {status ? (
                      <UserNav />
                    ) : (
                      <Button
                        className="h-11 hover:bg-white hover:text-black"
                        size={"lg"}
                        variant={"ghost"}
                        onClick={() => router.push("/auth/login")}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            target="_blank"
            className="absolute left-1/2 transform -translate-x-1/2 -bottom-9 z-30 block px-2 lg:z-10 lg:px-0"
            href="https://figma.alignui.com"
          >
            <div className="hidden mac:flex items-center gap-1 shadow-ln-badge-gray min-[380px]:gap-3 min-[380px]:px-3 h-11 lg:gap-2 rounded-b-[18px] rounded-t-none border-x border-b bg-ln-gray-50 px-4 shadow-none bg-neutral-900/50 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="_x32_"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#fff"
              >
                <g>
                  <path
                    className="st0"
                    d="M432.531,229.906c-9.906,0-19.125,2.594-27.313,6.375v-51.656c0-42.938-34.922-77.875-77.859-77.875h-51.641   c3.781-8.156,6.375-17.375,6.375-27.281C282.094,35.656,246.438,0,202.625,0c-43.828,0-79.484,35.656-79.484,79.469   c0,9.906,2.594,19.125,6.359,27.281H77.875C34.938,106.75,0,141.688,0,184.625l0.047,23.828H0l0.078,33.781   c0,23.031,8.578,36.828,12.641,42.063c12.219,15.797,27.094,18.172,34.891,18.172c11.953,0,23.141-4.953,33.203-14.703l0.906-0.422   l1.516-2.141c1.391-1.359,6.328-5.484,14.016-5.5c16.344,0,29.656,13.297,29.656,29.672c0,16.344-13.313,29.656-29.672,29.656   c-7.672,0-12.609-4.125-14-5.5l-1.516-2.141l-0.906-0.422c-10.063-9.75-21.25-14.703-33.203-14.703   c-7.797,0.016-22.672,2.375-34.891,18.172c-4.063,5.25-12.641,19.031-12.641,42.063L0,410.281h0.047L0,434.063   C0,477.063,34.938,512,77.875,512h54.563v-0.063l3.047-0.016c23.016,0,36.828-8.563,42.063-12.641   c15.797-12.219,18.172-27.094,18.172-34.891c0-11.953-4.953-23.141-14.688-33.203l-0.438-0.906l-2.125-1.516   c-1.375-1.391-5.516-6.328-5.516-14.016c0-16.344,13.313-29.656,29.672-29.656c16.344,0,29.656,13.313,29.656,29.656   c0,7.688-4.141,12.625-5.5,14.016l-2.125,1.516l-0.438,0.906c-9.75,10.063-14.703,21.25-14.703,33.203   c0,7.797,2.359,22.672,18.172,34.891c5.25,4.078,19.031,12.641,42.063,12.641l17,0.047V512h40.609   c42.938,0,77.859-34.938,77.859-77.875v-51.641c8.188,3.766,17.406,6.375,27.313,6.375c43.813,0,79.469-35.656,79.469-79.484   C512,265.563,476.344,229.906,432.531,229.906z M432.531,356.375c-19.031,0-37.469-22.063-37.469-22.063   c-3.344-3.203-6.391-4.813-9.25-4.813c-2.844,0-5.469,1.609-7.938,4.813c0,0-5.125,5.891-5.125,19.313v80.5   c0,25.063-20.313,45.391-45.391,45.391h-23.813l-33.797-0.078c-15.438,0-22.188-5.875-22.188-5.875   c-3.703-2.859-5.563-5.875-5.563-9.172c0-3.266,1.859-6.797,5.563-10.594c0,0,17.219-13.891,17.219-39.047   c0-34.313-27.844-62.156-62.156-62.156c-34.344,0-62.156,27.844-62.156,62.156c0,25.156,17.219,39.047,17.219,39.047   c3.688,3.797,5.531,7.328,5.531,10.594c0,3.297-1.844,6.313-5.531,9.172c0,0-6.766,5.875-22.203,5.875l-33.797,0.078H77.875   c-25.063,0-45.375-20.328-45.375-45.391l0.094-48.203h-0.047l0.016-9.422c0-15.422,5.875-22.203,5.875-22.203   c2.859-3.703,5.875-5.531,9.156-5.531s6.813,1.828,10.609,5.531c0,0,13.891,17.234,39.047,17.234   c34.313-0.016,62.156-27.844,62.156-62.156c-0.016-34.344-27.844-62.156-62.156-62.156c-25.156,0-39.047,17.219-39.047,17.219   c-3.797,3.688-7.328,5.531-10.609,5.531s-6.297-1.828-9.156-5.531c0,0-5.875-6.781-5.875-22.203v-1.156h0.031L32.5,184.625   c0-25.063,20.313-45.375,45.375-45.375h80.5c13.422,0,19.313-5.125,19.313-5.125c6.422-4.938,6.422-10.531,0-17.188   c0,0-22.063-18.438-22.063-37.469c0-25.953,21.047-46.984,47-46.984c25.938,0,46.984,21.031,46.984,46.984   c0,19.031-22.047,37.469-22.047,37.469c-6.438,6.656-6.438,12.25,0,17.188c0,0,5.875,5.125,19.281,5.125h80.516   c25.078,0,45.391,20.313,45.391,45.375v80.516c0,13.422,5.125,19.297,5.125,19.297c2.469,3.219,5.094,4.813,7.938,4.813   c2.859,0,5.906-1.594,9.25-4.813c0,0,18.438-22.047,37.469-22.047c25.938,0,46.969,21.047,46.969,46.984   C479.5,335.344,458.469,356.375,432.531,356.375z"
                  />
                </g>
              </svg>
              <span className="hidden text-ln-label-sm text-ln-gray-600 lg:inline">
                Install Browser Extension
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="size-5 text-ln-gray-600 lg:hidden"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                  d="M14.5 12.204V6m0 0H8.296M14.5 6l-8 8"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="-mx-1 hidden size-5 text-ln-gray-400 lg:block"
              >
                <path
                  fill="currentColor"
                  d="M10.003 11.108a1.183 1.183 0 0 1-1.176-1.176c0-.644.532-1.176 1.176-1.176s1.176.532 1.176 1.176-.532 1.176-1.176 1.176"
                ></path>
              </svg>
              <div className="hidden items-center gap-0.5 text-ln-label-sm text-ln-gray-900 lg:flex">
                Preview
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="size-5 text-ln-gray-500"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeWidth="1.25"
                    d="M8.333 13.333 11.667 10 8.333 6.667"
                  ></path>
                </svg>
              </div>
            </div>
          </a>
        </header>
        <div className="relative hidden h-px flex-1 bg-ln-gray-200 bleed-bg-r bleed-ln-gray-200 mac:block">
          <Image
            src="/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -right-[37px] left-auto"
          />
          <Image
            src="/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-px"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
