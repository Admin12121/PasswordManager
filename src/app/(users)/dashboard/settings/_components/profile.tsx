import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/schemas";

const Profile = ({ user }: { user?: UserData }) => {
  return (
    <>
      <div className="flex mb-6 items-center gap-5">
        <div className="relative">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage
              src={user?.profile || ""}
              alt={user?.username || "profile"}
            />
            <AvatarFallback>
              <span className="w-16 h-16 animate-pulse bg-neutral-600" />
            </AvatarFallback>
          </Avatar>
        </div>
        <span className="flex flex-col">
          <h1 className="text-2xl">{user?.username}</h1>
          <h1 className="text-lg">{user?.email}</h1>
        </span>
      </div>

      <div className="flex items-center gap-2 bg-[#2a1e10] text-orange-500 p-3 rounded-lg mb-6">
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
        <p className="text-sm">
          Check your inbox with an email that has the details!
        </p>
      </div>
      <div className="h-px bg-[#222222] my-4"></div>
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">history</p>
        <div className="space-y-3 min-h-[196px]">
          <div className="flex justify-center items-center h-[196px]">
            <p>log not found</p>
          </div>
          {/* <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Arnold Wisozk"
              />
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>
            <p>Arnold Wisozk</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Irvin Satterfield"
              />
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>
            <p>Irvin Satterfield</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Ira Ledner"
              />
              <AvatarFallback>IL</AvatarFallback>
            </Avatar>
            <p>Ira Ledner</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Jenny Mueller"
              />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <p>Jenny Mueller</p>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="bg-[#2a2a2a] text-white border-none hover:bg-[#333333]"
        >
          View more logs
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Profile;
