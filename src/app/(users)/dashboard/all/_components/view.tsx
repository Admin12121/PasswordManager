import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { items } from "@/components/global/sites";
import {
  ArrowUpDown,
  CreditCard,
  UserRound,
  NotepadText,
  History,
  LayoutGrid,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ContentData from "./content";
import LogoAnimation, {
  AnimatedNumber,
} from "@/components/global/logo_animation";

interface SiteProps {
  avatarProps: {
    name: string;
    icon?: any;
    classNames?: {
      base?: string;
      icon?: string;
    };
  };
  classNames?: {
    base?: string;
    description?: string;
    name?: string;
  };
  name: string;
}

const Website = ({ avatarProps, classNames, name }: SiteProps) => {
  const matchedItem = items.find(
    (item) => item.label.toLowerCase() === name.toLowerCase()
  );
  const Icon: any = matchedItem?.icon;

  return (
    <div
      className={cn(
        "flex gap-2 bg-neutral-950 w-10 h-full items-center justify-center rounded-xl",
        classNames?.base
      )}
    >
      <Avatar>
        <AvatarFallback className="bg-transparent">
          {Icon ? (
            <Icon className="w-8 h-8 fill-white" />
          ) : (
            avatarProps.name.slice(0, 2).toUpperCase()
          )}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

interface VaultData {
  security: boolean;
  slug: string;
  title: string;
  username: string;
}

const View = ({ logins }: { logins: VaultData[] }) => {
  const [slug, setSlug] = useState(logins.length > 0 ? logins[0].slug : "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;
    let start = 0;
    const interval = setInterval(() => {
      const increment = start < 70 ? 5 : 1;
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(start);
      }
    }, 30);
  }, [slug]);

  return (
    <div className="relative w-full h-dvh flex">
      <div className="relative w-[50%] h-full border-r py-1">
        <div className="flex gap-2 px-1 mt-2">
          <Select defaultValue="1">
            <SelectTrigger className="w-auto max-w-full min-w-48">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              <SelectItem value="1">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 opacity-60" />
                  All
                </div>
              </SelectItem>
              <SelectItem value="2">
                <div className="flex items-center gap-2">
                  <UserRound className="w-4 h-4 opacity-60" />
                  Login
                </div>
              </SelectItem>
              <SelectItem value="3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 opacity-60" />
                  Credit Card
                </div>
              </SelectItem>
              <SelectItem value="4">
                <div className="flex items-center gap-2">
                  <NotepadText className="w-4 h-4 opacity-60" />
                  Note
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="1">
            <SelectTrigger className="w-auto max-w-full min-w-48">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              <SelectItem value="1">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 opacity-60" />
                  History
                </div>
              </SelectItem>
              <SelectItem value="2">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Alphabetical
                </div>
              </SelectItem>
              <SelectItem value="3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Newest to Oldest
                </div>
              </SelectItem>
              <SelectItem value="4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 opacity-60" />
                  Oldest to Newest
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col mt-3">
          {logins.map((data) => (
            <div
              onClick={() => {
                setSlug(data.slug);
              }}
              key={Math.random()}
              className={cn("flex h-14 w-full  p-2 gap-5 cursor-pointer", slug == data.slug && "dark:bg-neutral-800/50")}
            >
              <Website
                avatarProps={{
                  name: `${data.username.slice(0, 1)}`,
                  classNames: {
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                    icon: "text-black/80",
                  },
                }}
                classNames={{
                  description: "text-default-500",
                  name: "cursor-pointer",
                }}
                name={data.title}
              />
              <div className="text-left cursor-pointer">
                <span className="flex items-center gap-x-1 flex-nowrap">
                  <span className="text-ellipsis">{data.title}</span>
                </span>
                <div className="dark:text-neutral-300 block text-xs text-ellipsis">
                  {data.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-[50%] h-full py-1">
        {progress < 100 ? (
          <LogoAnimation className="h-full font-normal flex items-center justify-center !text-sm">
            Sync Data
            <AnimatedNumber
              className="w-14 flex justify-end"
              springOptions={{ bounce: 0, duration: 1000 }}
              value={progress}
            />
            %
          </LogoAnimation>
        ) : (
          slug && <ContentData slug={slug} />
        )}
      </div>
    </div>
  );
};

export default View;
