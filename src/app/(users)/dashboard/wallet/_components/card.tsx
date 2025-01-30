"use client";

import { useState, useEffect, useCallback } from "react";
import { useAllUsersQuery } from "@/lib/store/api/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  DropdownMenu as DropdownMenuNext,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge as Chip } from "@/components/ui/badge";
import { useRouter } from "nextjs-toploader/app";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

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
}

interface Users {
  id: number;
  title: string;
  card_name: string;
  card_pin: string;
  card_number: string;
  valid_thru: string;
  ccv_cvc: string;
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

const Website = ({ avatarProps, classNames, description, name }: SiteProps) => {
  return (
    <div className={cn("flex gap-2", classNames?.base)}>
      <Avatar>
        <AvatarImage src={avatarProps.src || ""} alt={avatarProps.name} />
        <AvatarFallback>
          {avatarProps?.icon || avatarProps.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className={cn("", classNames?.name)}>
        <h1>{name}</h1>
        <p className={cn("", classNames?.description)}>{description}</p>
      </span>
    </div>
  );
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "card_name",
  "valid_thru",
  "updated_at",
  "actions",
];

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Card", uid: "title", sortable: true },
  { name: "Name on Card", uid: "card_name", sortable: true },
  { name: "Valid Thru", uid: "valid_thru", sortable: true },
  { name: "Last Modified", uid: "updated_at", sortable: true },
  { name: "Actions", uid: "actions" },
];

export default function CardPage() {
  const { accessToken } = useAuthUser();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const { data, isLoading, refetch } = useAllUsersQuery(
    { search, rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken }
  );

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
        case "card":
          return (
            <Website
              avatarProps={{
                src: users?.title as string,
                name: `${users.title.slice(0, 1)}`,
                // icon: `${(<AvatarIcon />)}`,
                classNames: {
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                  icon: "text-black/80",
                },
              }}
              classNames={{
                description: "text-default-500",
                name: "cursor-pointer",
              }}
              description={users.card_name}
              name={`${users.title}`}
            />
          );
        case "nameoncard":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {users.card_name}
              </p>
            </div>
          );
        case "valid_thru":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {users.valid_thru || ""}
              </p>
            </div>
          );
        case "last Modified":
          return (
            <Chip
              className={`capitalize border-none gap-1 text-default-600`}
              variant={users.state ? "secondary" : "outline"}
            >
              {users.state}
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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push(`/users/${users.card_number}`)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>State</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={users.state}>
                        {labels.map((label) => (
                          <DropdownMenuRadioItem
                            key={label.value}
                            value={label.value}
                          >
                            {label.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
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
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cards</h2>
        </div>
      </div>
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
      />
    </div>
  );
}
