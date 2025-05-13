"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";
import { Google } from "@/icons";
import { Github } from "@/icons/github";
import { signIn } from "next-auth/react";
import { Default_Login_Redirect } from "@/routes";

const Login = () => {
  const onClick = async (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: Default_Login_Redirect,
    });
  };

  return (
    <div className="w-full h-full relative">
      <div
        className="absolute dark:hidden h-full w-full border-2 border-dashed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="w-full h-auto border-0 dark:shadow-none px-5 py-10 bg-transparent dark:bg-neutral-950 rounded-[26px]">
        <div className="w-full flex flex-col items-center justify-center mb-5 pb-5">
          <Image src="/profile.png" width={50} height={50} alt="logo" />
          <h5 className="mt-3 font-light text-3xl text-neutral-950 dark:text-white">
            Welcome back
          </h5>
          <p className="text-neutral-950 text-base dark:text-white/50 leading-tight">
            please enter yout details to sign in.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <Button
            size="lg"
            className="w-full bg-neutral-700  hover:bg-neutral-900 dark:bg-neutral-900 text-white rounded-xl justify-start gap-5 px-2 h-16"
            onClick={() => onClick("google")}
          >
            <span className="bg-neutral-950 p-3 rounded-xl">
              <Google />
            </span>
            Continue with Google
          </Button>
          <Button
            size="lg"
            className="w-full bg-neutral-700  hover:bg-neutral-900 dark:bg-neutral-900 text-white rounded-xl justify-start gap-5 px-2 h-16"
            onClick={() => onClick("github")}
          >
            <span className="bg-neutral-950 p-3 rounded-xl">
              <Github />
            </span>
            Continue with Github
          </Button>
        </div>
        <div className="mt-5 px-10 text-center">
          <p>By Continue, you agree to our Term and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
