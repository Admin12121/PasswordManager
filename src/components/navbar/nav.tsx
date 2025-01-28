import React from "react";
import  Link  from "next/link";
import { cn } from "@/lib/utils";
import "./style.css";
import Image from "next/image";

const Nav = () => {
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
          <img
            src="https://alignui.com/images/landing/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-[37px]"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
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
              fill="none"
              viewBox="0 0 20 20"
              className="size-5"
            >
              <path
                fill="#1ABCFE"
                fillRule="evenodd"
                d="M10 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0"
                clipRule="evenodd"
              ></path>
              <path
                fill="#0ACF83"
                fillRule="evenodd"
                d="M5 15a2.5 2.5 0 0 1 2.5-2.5H10V15a2.5 2.5 0 0 1-5 0"
                clipRule="evenodd"
              ></path>
              <path
                fill="#FF7262"
                fillRule="evenodd"
                d="M10 2.5v5h2.5a2.5 2.5 0 0 0 0-5z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#F24E1E"
                fillRule="evenodd"
                d="M5 5a2.5 2.5 0 0 0 2.5 2.5H10v-5H7.5A2.5 2.5 0 0 0 5 5"
                clipRule="evenodd"
              ></path>
              <path
                fill="#A259FF"
                fillRule="evenodd"
                d="M5 10a2.5 2.5 0 0 0 2.5 2.5H10v-5H7.5A2.5 2.5 0 0 0 5 10"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="hidden text-ln-label-sm text-ln-gray-600 lg:inline">
              Up-to-date Figma file synced with code library!
            </span>
            <span className="flex-1 text-ln-paragraph-sm text-ln-gray-600 lg:hidden">
              Up-to-date{" "}
              <span className="font-medium text-ln-gray-800">Figma</span> file
              synced with code<span className="hidden md:inline"> library</span>
              !
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
          <img
            src="https://alignui.com/images/landing/dot.png"
            width="9"
            height="9"
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -right-[37px] left-auto"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
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
