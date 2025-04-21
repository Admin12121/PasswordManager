import React from "react";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  UserRound,
  NotepadText,
  ArrowUpFromLine,
} from "lucide-react";

const Empty = () => {
  return (
    <div className="flex">
      <div className="relative w-[159px] border-r p-1 max-lg:hidden 2xl:flex-1">
        <div
          className="h-full w-full border-2 border-dashed"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      <div className="container mx-auto pt-16 h-[95.8dvh] pb-12 text-center md:pt-20 lg:pt-28 justify-center flex flex-col">
        <h1 className="mx-auto">Your vault is empty</h1>
        <p className="text-muted-foreground mx-auto max-w-[500px] leading-[1.5] tracking-[-0.32px]">
          Let&apos;s get you started by creating your first item
        </p>
        <div className="flex flex-col space-y-2 items-center justify-center mt-6">
          <Button className="min-w-[300px] hover:text-white">
            <UserRound className="w-5 h-5 absolute left-4" />
            Create Login
          </Button>
          <Button className="min-w-[300px] hover:text-white">
            <CreditCard className="w-5 h-5 absolute left-4" />
            Create a Credit Card
          </Button>
          <Button className="min-w-[300px] hover:text-white">
            <NotepadText className="w-5 h-5 absolute left-4" />
            Create an encrypted note
          </Button>
          <Button className="min-w-[300px] hover:text-white">
            <ArrowUpFromLine className="w-5 h-5 absolute left-4" />
            Import passwords
          </Button>
        </div>
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
  );
};

export default Empty;
