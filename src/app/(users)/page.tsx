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
    { skip: !accessToken },
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
              Prioritize, automate, and stay ahead—AI simplifies your tasks so
              you can focus on what matters most.
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
              className="mx-auto rounded-xl border object-contain p-1 shadow-lg 2xl:max-w-[1092px] "
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
              src="/images/partners/notion.svg"
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
              src="/images/partners/github.svg"
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
              src="/images/partners/slack.svg"
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
      <section id="smart-productivity" className="pt-12 lg:pt-20">
        <div className="border-y">
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
                className="lucide lucide-pocket-knife size-4"
              >
                <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
                <path d="M18 6h.01" />
                <path d="M6 18h.01" />
                <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
                <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
              </svg>
              <span>Features</span>
            </div>
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
              Smart productivity with AI
            </h2>
            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px]">
              Unlock smarter productivity with features that help you manage
              tasks, time, and focus—seamlessly.
            </p>
          </div>
        </div>
        <div className="container border-x lg:!px-0">
          <div
            dir="ltr"
            data-orientation="horizontal"
            className="flex items-center max-lg:flex-col lg:divide-x"
          >
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="text-muted-foreground items-center justify-center rounded-lg flex h-auto flex-1 flex-col bg-transparent p-0 max-lg:border-x lg:border-t"
              tabIndex={0}
              data-orientation="horizontal"
              style={{ outline: "none" }}
            >
              <button
                type="button"
                role="tab"
                aria-selected="true"
                aria-controls="radix-:R13flb:-content-Smart Task Management"
                data-state="active"
                id="radix-:R13flb:-trigger-Smart Task Management"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative border-b px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none lg:px-8"
                tabIndex={0}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 z-10 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div className="">
                  <div className="flex items-center gap-1.5">
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
                      className="lucide lucide-square-pen size-4"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </svg>
                    <h3 className="text-lg tracking-[-0.36px]">
                      Smart Task Management
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2.5 tracking-[-0.32px]">
                    Create, prioritize, and delegate tasks effortlessly. AI
                    helps you identify what matters most with smart
                    recommendations and automated workflows.
                  </p>
                </div>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-:R13flb:-content-Automated Scheduling"
                data-state="inactive"
                id="radix-:R13flb:-trigger-Automated Scheduling"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative border-b px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none lg:px-8"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 z-10 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div className="">
                  <div className="flex items-center gap-1.5">
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
                      className="lucide lucide-calendar-clock size-4"
                    >
                      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M3 10h5" />
                      <path d="M17.5 17.5 16 16.3V14" />
                      <circle cx={16} cy={16} r={6} />
                    </svg>
                    <h3 className="text-lg tracking-[-0.36px]">
                      Automated Scheduling
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2.5 tracking-[-0.32px]">
                    Let AI find the best time slots for meetings, reminders, and
                    tasks based on your calendar and working habits. Stay
                    organized without the hassle.
                  </p>
                </div>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-:R13flb:-content-Personalized Insights"
                data-state="inactive"
                id="radix-:R13flb:-trigger-Personalized Insights"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative border-b px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none lg:px-8"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 z-10 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div className="">
                  <div className="flex items-center gap-1.5">
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
                      className="lucide lucide-chart-bar size-4"
                    >
                      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                      <path d="M7 16h8" />
                      <path d="M7 11h12" />
                      <path d="M7 6h3" />
                    </svg>
                    <h3 className="text-lg tracking-[-0.36px]">
                      Personalized Insights
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2.5 tracking-[-0.32px]">
                    Track your productivity with AI-powered insights. Get weekly
                    summaries and actionable tips to improve your workflow and
                    manage workloads better.
                  </p>
                </div>
              </button>
            </div>
            <div className="flex-1">
              <div
                data-state="active"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R13flb:-trigger-Smart Task Management"
                id="radix-:R13flb:-content-Smart Task Management"
                tabIndex={0}
                className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none m-0 px-6 py-[38px] max-lg:border-x"
                style={{}}
              >
                <div className="flex justify-center">
                  <div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <div
                        className="border-2 border-dashed h-full w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <Image
                        src="/media/card.jpg"
                        alt="Smart Task Management"
                        width={400}
                        height={510}
                        data-nimg={1}
                        className="m-3 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                        style={{ color: "transparent" }}
                      />
                      <div
                        className="h-full border-2 border-dashed w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R13flb:-trigger-Automated Scheduling"
                id="radix-:R13flb:-content-Automated Scheduling"
                tabIndex={0}
                className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none m-0 px-6 py-[38px] max-lg:border-x"
              />
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R13flb:-trigger-Personalized Insights"
                id="radix-:R13flb:-content-Personalized Insights"
                tabIndex={0}
                className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none m-0 px-6 py-[38px] max-lg:border-x"
              />
            </div>
          </div>
        </div>
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x" />
        </div>
      </section>
      <section id="optimized-scheduling" className="">
        <div className="border-b">
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
                className="lucide lucide-eye size-4"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx={12} cy={12} r={3} />
              </svg>
              <span>Optimize</span>
            </div>
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
              Optimize every aspect of your day
            </h2>
            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px]">
              Achieve seamless productivity with intelligent scheduling,
              insightful analytics, and effortless integrations.
            </p>
          </div>
        </div>
        <div className="container border-x lg:!px-0">
          <div dir="ltr" data-orientation="horizontal" className="">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="text-muted-foreground inline-flex items-center justify-center rounded-lg h-auto w-full bg-transparent p-0 max-lg:flex-col max-lg:divide-y lg:grid lg:grid-cols-3 lg:divide-x"
              tabIndex={0}
              data-orientation="horizontal"
              style={{ outline: "none" }}
            >
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-:R15flb:-content-Unified Scheduling"
                data-state="inactive"
                id="radix-:R15flb:-trigger-Unified Scheduling"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground items-center justify-center text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate inline-block h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div className="flex items-center gap-2">
                  <div className="relative size-6">
                    <div className="to-border absolute inset-0 -rotate-45 rounded-full bg-gradient-to-l from-blue-600 via-sky-300 to-50% transition-all duration-1000 group-data-[state=inactive]:opacity-0" />
                    <div className="absolute inset-[0.75px] rounded-full bg-gray-100" />
                    <div className="bg-border absolute inset-[1.25px] grid place-items-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-help"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl tracking-[-0.36px]">
                    Unified Scheduling
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-lg tracking-[-0.32px]">
                  Keep all your appointments and events in sync with seamless
                  cross-platform calendar connectivity.
                </p>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="radix-:R15flb:-content-Insightful Performance"
                data-state="inactive"
                id="radix-:R15flb:-trigger-Insightful Performance"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground items-center justify-center text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate inline-block h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8"
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div className="flex items-center gap-2">
                  <div className="relative size-6">
                    <div className="to-border absolute inset-0 -rotate-45 rounded-full bg-gradient-to-l from-blue-600 via-sky-300 to-50% transition-all duration-1000 group-data-[state=inactive]:opacity-0" />
                    <div className="absolute inset-[0.75px] rounded-full bg-gray-100" />
                    <div className="bg-border absolute inset-[1.25px] grid place-items-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-volume2"
                      >
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        <path d="M16 9a5 5 0 0 1 0 6" />
                        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl tracking-[-0.36px]">
                    Insightful Performance
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-lg tracking-[-0.32px]">
                  Get clear, real-time analytics tracking your progress, key
                  milestones, focus hours, and completed tasks.
                </p>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected="true"
                aria-controls="radix-:R15flb:-content-Effortless Tool Integrations"
                data-state="active"
                id="radix-:R15flb:-trigger-Effortless Tool Integrations"
                className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground items-center justify-center text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group relative isolate inline-block h-full w-full rounded-none px-1 py-5 text-start whitespace-normal data-[state=active]:shadow-none max-lg:border-x last:max-lg:!border-b lg:border-b lg:px-8"
                tabIndex={0}
                data-orientation="horizontal"
                data-radix-collection-item=""
              >
                <div className="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-gradient-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div
                  className="size-2 rounded-[1px] bg-red-400 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.04%, rgba(0, 0, 0, 0.06) 100%), hsl(var(--background))",
                    boxShadow:
                      "0px 0px 0px 0.1px rgba(0, 0, 0, 0.05), 0px 0.5px 1px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <div className="flex items-center gap-2">
                  <div className="relative size-6">
                    <div className="to-border absolute inset-0 -rotate-45 rounded-full bg-gradient-to-l from-blue-600 via-sky-300 to-50% transition-all duration-1000 group-data-[state=inactive]:opacity-0" />
                    <div className="absolute inset-[0.75px] rounded-full bg-gray-100" />
                    <div className="bg-border absolute inset-[1.25px] grid place-items-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lightbulb"
                      >
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl tracking-[-0.36px]">
                    Effortless Tool Integrations
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-lg tracking-[-0.32px]">
                  Link your favorite apps and services to streamline work
                  without switching between platforms.
                </p>
              </button>
            </div>
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="radix-:R15flb:-trigger-Unified Scheduling"
              id="radix-:R15flb:-content-Unified Scheduling"
              tabIndex={0}
              className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none mt-0"
              style={{}}
            />
            <div
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="radix-:R15flb:-trigger-Insightful Performance"
              id="radix-:R15flb:-content-Insightful Performance"
              tabIndex={0}
              className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none mt-0"
            />
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby="radix-:R15flb:-trigger-Effortless Tool Integrations"
              id="radix-:R15flb:-content-Effortless Tool Integrations"
              tabIndex={0}
              className="ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none mt-0"
            >
              <div className="flex flex-1 flex-col px-2 py-4 max-lg:border-x items-center justify-center">
                <div
                  className="w-full border-2 border-dashed h-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <Image
                  src="/media/conf.jpg"
                  alt="Effortless Tool Integrations"
                  loading="lazy"
                  width={1312}
                  height="743"
                  decoding="async"
                  data-nimg={1}
                  className="my-2 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                  style={{ color: "transparent" }}
                />
                <div
                  className="w-full border-2 border-dashed h-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x" />
        </div>
      </section>
      <section id="accelerate-planning" className="">
        <div className="border-b">
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
                className="lucide lucide-rocket size-4"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
              <span>Accelerate</span>
            </div>
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
              Accelerate your planning journey
            </h2>
            <p className="text-muted-foreground max-w-[600px] tracking-[-0.32px]">
              Take control of your workflow step-by-step with smart tools,
              actionable insights, and seamless collaboration
            </p>
          </div>
        </div>
        <div className="container border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:!pt-20">
          <div className="relative flex">
            <div className="flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10  ">
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">Get Organized</h3>
                <p className="text-muted-foreground mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance ml-auto">
                  Start strong by syncing your calendars and tools like Google
                  Calendar, Trello, and Slack in one place.
                </p>
              </div>
              <div className="bg-background z-[-1] size-fit -translate-y-5 p-4 max-lg:-translate-x-4">
                <div className="bg-card rounded-[10px] border p-[5px] shadow-md">
                  <div className="bg-muted size-fit rounded-md border p-1">
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
                      className="lucide lucide-layout-list size-4 shrink-0"
                    >
                      <rect width={7} height={7} x={3} y={3} rx={1} />
                      <rect width={7} height={7} x={3} y={14} rx={1} />
                      <path d="M14 4h7" />
                      <path d="M14 9h7" />
                      <path d="M14 15h7" />
                      <path d="M14 20h7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">Get Organized</h3>
                  <p className="text-muted-foreground mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance">
                    Start strong by syncing your calendars and tools like Google
                    Calendar, Trello, and Slack in one place.
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className=" ">
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <div
                        className="border-2 border-dashed h-full w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <Image
                        src="/media/card.jpg"
                        alt="Get Organized"
                        loading="lazy"
                        width={400}
                        height={500}
                        decoding="async"
                        data-nimg={1}
                        className="m-2 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                        style={{ color: "transparent" }}
                      />
                      <div
                        className="h-full border-2 border-dashed w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 bg-foreground/10">
              <div className="to-foreground/10 h-4 w-[3px] -translate-y-full bg-gradient-to-b from-transparent" />
            </div>
          </div>
          <div className="relative flex">
            <div className="flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 lg:flex-row-reverse lg:text-start ">
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">Track Progress</h3>
                <p className="text-muted-foreground mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance ">
                  Monitor your performance with real-time dashboards and
                  detailed analytics. Stay ahead with automated reports.
                </p>
              </div>
              <div className="bg-background z-[-1] size-fit -translate-y-5 p-4 max-lg:-translate-x-4">
                <div className="bg-card rounded-[10px] border p-[5px] shadow-md">
                  <div className="bg-muted size-fit rounded-md border p-1">
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
                      className="lucide lucide-locate-fixed size-4 shrink-0"
                    >
                      <line x1={2} x2={5} y1={12} y2={12} />
                      <line x1={19} x2={22} y1={12} y2={12} />
                      <line x1={12} x2={12} y1={2} y2={5} />
                      <line x1={12} x2={12} y1={19} y2={22} />
                      <circle cx={12} cy={12} r={7} />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">
                    Track Progress
                  </h3>
                  <p className="text-muted-foreground mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance">
                    Monitor your performance with real-time dashboards and
                    detailed analytics. Stay ahead with automated reports.
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className=" lg:ml-auto">
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <div
                        className="border-2 border-dashed h-full w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <Image
                        src="/media/card.jpg"
                        alt="Get Organized"
                        loading="lazy"
                        width={400}
                        height={500}
                        decoding="async"
                        data-nimg={1}
                        className="m-2 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                        style={{ color: "transparent" }}
                      />
                      <div
                        className="h-full border-2 border-dashed w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 bg-foreground/10"></div>
          </div>
          <div className="relative flex">
            <div className="flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10  ">
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">
                  Collaborate Seamlessly
                </h3>
                <p className="text-muted-foreground mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance ml-auto">
                  Empower your team with shared dashboards and instant
                  communication tools. Keep everyone aligned with integrated
                  platforms.
                </p>
              </div>
              <div className="bg-background z-[-1] size-fit -translate-y-5 p-4 max-lg:-translate-x-4">
                <div className="bg-card rounded-[10px] border p-[5px] shadow-md">
                  <div className="bg-muted size-fit rounded-md border p-1">
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
                      className="lucide lucide-users size-4 shrink-0"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">
                    Collaborate Seamlessly
                  </h3>
                  <p className="text-muted-foreground mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance">
                    Empower your team with shared dashboards and instant
                    communication tools. Keep everyone aligned with integrated
                    platforms.
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className=" ">
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <div
                        className="border-2 border-dashed h-full w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <Image
                        src="/media/card.jpg"
                        alt="Get Organized"
                        loading="lazy"
                        width={400}
                        height={500}
                        decoding="async"
                        data-nimg={1}
                        className="m-2 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                        style={{ color: "transparent" }}
                      />
                      <div
                        className="h-full border-2 border-dashed w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 bg-foreground/10"></div>
          </div>
          <div className="relative flex">
            <div className="flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 lg:flex-row-reverse lg:text-start ">
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">
                  Integrate Seamlessly
                </h3>
                <p className="text-muted-foreground mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance ">
                  Integrate seamlessly across multiple platforms to enable
                  smooth, automated task handovers.
                </p>
              </div>
              <div className="bg-background z-[-1] size-fit -translate-y-5 p-4 max-lg:-translate-x-4">
                <div className="bg-card rounded-[10px] border p-[5px] shadow-md">
                  <div className="bg-muted size-fit rounded-md border p-1">
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
                      className="lucide lucide-cpu size-4 shrink-0"
                    >
                      <rect width={16} height={16} x={4} y={4} rx={2} />
                      <rect width={6} height={6} x={9} y={9} rx={1} />
                      <path d="M15 2v2" />
                      <path d="M15 20v2" />
                      <path d="M2 15h2" />
                      <path d="M2 9h2" />
                      <path d="M20 15h2" />
                      <path d="M20 9h2" />
                      <path d="M9 2v2" />
                      <path d="M9 20v2" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">
                    Integrate Seamlessly
                  </h3>
                  <p className="text-muted-foreground mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance">
                    Integrate seamlessly across multiple platforms to enable
                    smooth, automated task handovers.
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className=" lg:ml-auto">
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <div
                        className="border-2 border-dashed h-full w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                      <Image
                        src="/media/card.jpg"
                        alt="Get Organized"
                        loading="lazy"
                        width={400}
                        height={500}
                        decoding="async"
                        data-nimg={1}
                        className="m-2 rounded-md object-contain shadow-md lg:rounded-xl lg:shadow-lg "
                        style={{ color: "transparent" }}
                      />
                      <div
                        className="h-full border-2 border-dashed w-6 lg:w-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                    <div className="px-6 lg:px-10">
                      <div
                        className="w-full border-2 border-dashed h-6 lg:h-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 from-foreground/10 via-foreground/10 bg-gradient-to-b to-transparent"></div>
          </div>
        </div>
        <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
          <div className="container h-full w-full border-x" />
        </div>
      </section>
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
        <div className="container flex justify-between gap-8 border-x py-4 max-md:flex-col lg:py-8">
          <div className="mb-8 flex-1">
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
              <span className="text-2xl leading-0 font-semibold">Relative</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-between gap-8 max-sm:flex-col">
            <div>
              <h3 className="text-muted-foreground-subtle text-sm tracking-[-0.28px]">
                Product
              </h3>
              <ul className="mt-6 space-y-6 text-sm tracking-[-0.28px] lg:mt-8 lg:space-y-8">
                <li className="hover:text-primary">
                  <Link href="#">Features</Link>
                </li>
                <li className="hover:text-primary">
                  <Link href="#">Pricing</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-muted-foreground-subtle text-sm tracking-[-0.28px]">
                Company
              </h3>
              <ul className="mt-6 space-y-6 text-sm tracking-[-0.28px] lg:mt-8 lg:space-y-8">
                <li className="hover:text-primary">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="hover:text-primary">
                  <Link href="#">Faq</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-muted-foreground-subtle text-sm tracking-[-0.28px]">
                Legal
              </h3>
              <ul className="mt-6 space-y-6 text-sm tracking-[-0.28px] lg:mt-8 lg:space-y-8">
                <li className="hover:text-primary">
                  <Link href="/terms-of-service">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-muted-foreground-subtle text-sm tracking-[-0.28px]">
                Social
              </h3>
              <div className="text-muted-foreground-subtle mt-6 flex gap-3 lg:mt-8">
                <Link aria-label="Instagram" href="https://instagram.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link aria-label="Twitter" href="https://twitter.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link aria-label="Linkedin" href="https://Linkedin.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width={4} height={12} x={2} y={9} />
                    <circle cx={4} cy={4} r={2} />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground-subtle container border-x border-t border-b py-4 text-sm tracking-[-0.28px] lg:py-8">
          <p>
            © {/* */}2025{/* */} Relative. All rights reserved.
          </p>
        </div>
        <div className="container h-6 border-x" />
      </footer>
    </>
  );
}
