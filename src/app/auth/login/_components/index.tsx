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
    <div className="w-full h-auto border-0 shadow-none px-5 py-10 bg-neutral-950 rounded-[26px]">
      <div className="w-full flex flex-col items-center justify-center mb-5 pb-5">
        <Image src="/profile.png" width={50} height={50} alt="logo" />
        <h5 className="mt-3 font-light text-3xl dark:text-themeTextWhite">
          Welcome back
        </h5>
        <p className="text-neutral-950/80 text-base dark:text-white/50 leading-tight">
          please enter yout details to sign in.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <Button
          size="lg"
          className="w-full dark:bg-neutral-900 text-white rounded-xl justify-start gap-5 px-2 h-16"
          onClick={() => onClick("google")}
        >
          <span className="bg-neutral-950 p-3 rounded-xl">
            <Google />
          </span>
          Continue with Google
        </Button>
        <Button
          size="lg"
          className="w-full dark:bg-neutral-900 text-white rounded-xl justify-start gap-5 px-2 h-16"
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
  );
};

export default Login;
