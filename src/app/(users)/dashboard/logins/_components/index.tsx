"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useGetLoginsQuery,
} from "@/lib/store/api/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  DropdownMenu as DropdownMenuNext,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge as Chip } from "@/components/ui/badge";
import { useRouter } from "nextjs-toploader/app";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Pointer } from "@/components/global/floating-mouse";
import { Files, Lock, LogIn } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { items } from "@/components/global/sites";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VaultModal, { DeleteModal } from "./vault_dialog";
import Link from "next/link";
import { useDecryptedData } from "@/hooks/dec-data";

const MainTable = dynamic(() => import("@/components/global/table"), {
  ssr: false,
});

const statusOptions = [
  { name: "Published", uid: "i_published" },
  { name: "Draft", uid: "draft" },
];

interface SiteProps {
  avatarProps: {
    src: string;
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
  description?: string;
  name: string;
  href: string;
}

interface Users {
  slug: string;
  title: string;
  website: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
  state: string;
  note: string;
  log: string;
  security: boolean;
}

export const labels = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "InActive",
  },
  {
    value: "blocked",
    label: "Blocked",
  },
];

const Website = ({
  avatarProps,
  classNames,
  description,
  name,
  href,
}: SiteProps) => {
  const matchedItem = items.find(
    (item) => item.label.toLowerCase() === name.toLowerCase()
  );
  const Icon: any = matchedItem?.icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            className="group flex justify-between items-center"
          >
            <div className={cn("flex gap-2", classNames?.base)}>
              <Avatar>
                <AvatarImage
                  src={avatarProps.src || ""}
                  alt={avatarProps.name}
                />
                <AvatarFallback className="bg-transparent">
                  {Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    avatarProps.name.slice(0, 2).toUpperCase()
                  )}
                </AvatarFallback>
              </Avatar>
              <span className={cn("flex items-center", classNames?.name)}>
                <h1>{name}</h1>
              </span>
            </div>
            <LogIn className="group-hover:opacity-100 opacity-0 transition-all duration-500 w-4 h-4" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const INITIAL_VISIBLE_COLUMNS = [
  "website",
  "username",
  "password",
  "updated_at",
  "actions",
];

const columns = [
  { name: "Website", uid: "website", sortable: true },
  { name: "Username", uid: "username", sortable: true },
  { name: "Password", uid: "password", sortable: true },
  { name: "Last Modified", uid: "updated_at", sortable: true },
  { name: "Actions", uid: "actions" },
];

export default function TaskPage() {
  const router = useRouter();
  const { accessToken } = useAuthUser();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const {
    data: encryptedData,
    isLoading,
    refetch,
  } = useGetLoginsQuery(
    { search, page_size: rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken }
  );

  const { data, loading } = useDecryptedData(encryptedData, isLoading);

  useEffect(() => {
    if(encryptedData){
      refetch();
    }
  },[])

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [search]);

  const renderCell = useCallback(
    (users: Users, columnKey: React.Key) => {
      const cellValue = users[columnKey as keyof Users];
      switch (columnKey) {
        case "website":
          return (
            <Website
              avatarProps={{
                src: users?.website as string,
                name: `${users.username.slice(0, 1)}`,
                classNames: {
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                  icon: "text-black/80",
                },
              }}
              classNames={{
                description: "text-default-500",
                name: "cursor-pointer",
              }}
              description={users.username}
              name={`${users.title}`}
              href={users.website}
            />
          );
        case "username":
          return (
            <div className="flex flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {users.security ? (
                      <VaultModal slug={users.slug} security={users.security} accessToken={accessToken}>
                        <p className="text-bold text-small flex gap-2">
                          Vault Password Required <Lock className="w-4 h-4" />
                        </p>
                      </VaultModal>
                    ) : (
                      <Link
                        href={`logins/${users.slug}`}
                        className="text-bold text-small"
                      >
                        {users.username}
                      </Link>
                    )}
                  </TooltipTrigger>
                  {!users.security && (
                    <TooltipContent>
                      <p>{users.username}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        case "password":
          const copyToClipboard = () => {
            if (users.password && !users.security) {
              navigator.clipboard.writeText(users.password);
              toast.success("Password copied to clipboard");
            }
          };
          return (
            <div className="flex flex-col">
              <Pointer
                onClick={copyToClipboard}
                name={
                  users.security ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                      <Files className="w-4 h-4 stroke-black" />
                    </span>
                  )
                }
                className="h-10 flex items-center"
              >
                <VaultModal slug={users.slug} security={users.security} accessToken={accessToken}>
                  <p className="text-foreground">
                    {!users.security && "*******************"}
                  </p>
                </VaultModal>
              </Pointer>
            </div>
          );
        case "updated_at":
          return (
            <Chip
              className={`capitalize border-none gap-1 text-default-600`}
              variant={users.state ? "secondary" : "outline"}
            >
              {format(users.updated_at, "dd MMM yyyy")}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <DropdownMenuNext>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem  onClick={() => router.push(`logins/${users.slug}`)}>View</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteModal refetch={refetch} slug={users.slug} token={accessToken}>
                    <Button variant="ghost" className="w-full rounded-md hover:bg-orange-600" size="sm">
                      Delete
                      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </Button>
                  </DeleteModal>
                </DropdownMenuContent>
              </DropdownMenuNext>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <MainTable
        SetExcludeBy={SetExcludeBy}
        exclude_by={exclude_by}
        page={page}
        isLoading={isLoading}
        searchLoading={searchLoading}
        setPage={setPage}
        data={data}
        setSearch={setSearch}
        dataperpage={setRowsPerPage}
        refetch={refetch}
        renderCell={renderCell}
        statusOptions={statusOptions}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        columns={columns}
        addlink="logins/add-login"
      />
    </div>
  );
}
