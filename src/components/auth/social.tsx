"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Default_Login_Redirect } from "@/routes";
import { Google} from "@/icons/google";
import { Github } from "@/icons/github";

const Social = () => {
  const onClick = async (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: Default_Login_Redirect,
    });
  };
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full rounded-lg fancy-button"
        onClick={() => onClick("google")}
      >
        <Google />
      </Button>
      <Button
        size="lg"
        className="w-full rounded-lg fancy-button"
        onClick={() => onClick("github")}
      >
        <Github/>
      </Button>
    </div>
  );
};

export default Social;
