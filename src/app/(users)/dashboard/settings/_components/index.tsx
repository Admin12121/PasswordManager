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
import { UserData } from "@/schemas";
import FeedBack from "./sendfeedback";

const MainSettings = () => {
  const { accessToken } = useAuthUser();
  const [user, setUser] = useState<UserData>();
  const { data: encryptedData, isLoading } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken },
  );
  const { data, loading } = useDecryptedData(encryptedData, isLoading);
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <section id="optimized-scheduling" className="">
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
      <div className="border-b">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Password Manager
          </h2>
        </div>
      </div>
      <div className="container border-x lg:!px-0 border-b-1 lg:border-b-0">
        <div dir="ltr" data-orientation="horizontal" className="">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="text-muted-foreground inline-flex items-center justify-center rounded-lg h-auto w-full bg-transparent p-0 max-lg:flex-col max-lg:divide-y lg:grid lg:grid-cols-3 lg:divide-x"
            tabIndex={0}
            data-orientation="horizontal"
            style={{ outline: "none" }}
          >
            <span className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground items-center justify-center text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate inline-block h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8">
              <Profile user={user} />
            </span>
            <span className="flex flex-col items-start justify-start ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8">
              <div className="flex gap-5">
                <Security />
                <span className="flex flex-col">
                  <h1 className="text-2xl">Password </h1>
                  <h1 className="text-lg">& Security</h1>
                </span>
              </div>

              <div className="rounded-lg w-full overflow-hidden mt-5 shadow-sm">
                <div className="divide-y">
                  <Changepassword user={user} accessToken={accessToken} />
                  <Two_factor_auth user={user} accessToken={accessToken} />
                  <ChangeVaultpassword user={user} accessToken={accessToken} />
                </div>
              </div>
              <Login_alerts />
            </span>
            <span className="flex flex-col items-start justify-start ring-offset-background focus-visible:ring-ring data-[state=active]:text-foreground text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8">
              <div className="flex gap-5 items-center">
                <CircleHelp className="w-[65px] h-[65px] stroke-[#2d3136]" />
                <span className="flex flex-col">
                  <h1 className="text-2xl">More info </h1>
                  <h1 className="text-lg">& support</h1>
                </span>
              </div>

              <div className="rounded-lg w-full overflow-hidden mt-5 shadow-sm">
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
            </span>
          </div>
        </div>
      </div>
      <div className="h-8 w-full border-b md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x" />
      </div>
    </section>
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
