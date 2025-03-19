"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, CircleHelp } from "lucide-react";
import Profile from "./profile";
import { useState, useEffect } from "react";
import { useGetLoggedUserQuery } from "@/lib/store/api/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useDecryptedData } from "@/hooks/dec-data";
import Changepassword from "./change_password";
import Two_factor_auth from "./two_factor_authentication";
import Login_alerts from "./login_alerts";
import ChangeVaultpassword from "./vaultpassword";
import Authenticationverify from "./authentication_verify";
import { UserData } from "@/schemas";
import FeedBack from "./sendfeedback";

const MainSettings = () => {
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
    <div className="flex items-start gap-5 flex-wrap">
      {user && isDialogOpen && (
        <Authenticationverify
          user={user}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      )}
      <Profile user={user} />
      <div className="group w-full overflow-hidden max-w-md p-6 rounded-2xl dark:bg-[#1212128a] shadow-xl relative before:border-t-1 before:border-[#fff]">
        <div className="absolute top-0 left-1/2 w-4/5 h-[1px] rounded-full bg-gradient-to-r from-transparent via-[#ffffff95] dark:via-[#ffffff95] to-transparent transform -translate-x-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(255,255,255,0.1),_transparent_60%)] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="flex gap-5">
          <Security />
          <span className="flex flex-col">
            <h1 className="text-2xl">Password </h1>
            <h1 className="text-lg">& Security</h1>
          </span>
        </div>

        <div className="rounded-lg overflow-hidden mt-5 shadow-sm">
          <div className="divide-y">
            <Changepassword user={user} accessToken={accessToken} />
            <Two_factor_auth user={user} accessToken={accessToken} />
            <ChangeVaultpassword user={user} accessToken={accessToken} />
          </div>
        </div>
        <Login_alerts />
      </div>
      <div className="group w-full overflow-hidden max-w-md p-6 rounded-2xl dark:bg-[#1212128a] shadow-xl relative before:border-t-1 before:border-[#fff]">
        <div className="absolute top-0 left-1/2 w-4/5 h-[1px] rounded-full bg-gradient-to-r from-transparent via-[#ffffff95] dark:via-[#ffffff95] to-transparent transform -translate-x-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(255,255,255,0.1),_transparent_60%)] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="flex gap-5 items-center">
          <CircleHelp className="w-[65px] h-[65px] stroke-[#2d3136]" />
          <span className="flex flex-col">
            <h1 className="text-2xl">More info </h1>
            <h1 className="text-lg">& support</h1>
          </span>
        </div>

        <div className="rounded-lg overflow-hidden mt-5 shadow-sm">
          <div className="divide-y">
            <Button
              className="group h-auto gap-4 py-3 text-left w-full border-none rounded-none justify-between"
              variant="outline"
            >
              <div className="space-y-1">
                <h3>Help Center</h3>
              </div>
              <ChevronRightIcon
                className="opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Button>
            <Button
              className="group h-auto gap-4 py-3 text-left w-full  border-none rounded-none justify-between"
              variant="outline"
            >
              <div className="space-y-1">
                <h3>Privacy and security help</h3>
              </div>
              <ChevronRightIcon
                className="opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Button>
            <FeedBack />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSettings;

const Security = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65px"
      height="65px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.3281 5.67L6.58813 17.41C6.14813 17.85 5.40813 17.79 5.04813 17.27C3.80813 15.46 3.07812 13.32 3.07812 11.12V6.73C3.07812 5.91 3.69813 4.98 4.45813 4.67L10.0281 2.39C11.2881 1.87 12.6881 1.87 13.9481 2.39L17.9981 4.04C18.6581 4.31 18.8281 5.17 18.3281 5.67Z"
        fill="#292D32"
      />
      <path
        d="M19.27 7.04159C19.92 6.49159 20.91 6.96159 20.91 7.81159V11.1216C20.91 16.0116 17.36 20.5916 12.51 21.9316C12.18 22.0216 11.82 22.0216 11.48 21.9316C10.06 21.5316 8.74001 20.8616 7.61001 19.9816C7.13001 19.6116 7.08001 18.9116 7.50001 18.4816C9.68001 16.2516 16.06 9.75159 19.27 7.04159Z"
        fill="#292D32"
      />
    </svg>
  );
};
