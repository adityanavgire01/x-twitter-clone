"use client";
import { IUser } from "@/types";
import { Loader2, LogOut, MoreHorizontal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
  const { data, status }: any = useSession();

  if (status == "loading") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin text-sky-500" />
      </div>
    );
  }
  return (
    <>
      {/* for mobile  */}
      <div
        className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
        onClick={() => signOut()}
      >
        <LogOut size={24} color="white" />
      </div>

      {/* for desktop  */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={data?.currentUser?.profilePhoto} />
                <AvatarFallback>{data?.currentUser?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>{data?.currentUser?.name}</p>
                {data?.currentUser?.username ? (
                  <p className="opacity-40">@{data?.currentUser?.username}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="bg-black border border-gray-600 rounded-2xl px-0 mb-3">
          <div
            className="font-bold text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition"
            onClick={() => signOut()}
          >
            Log out{" "}
            {data?.currentUser?.username
              ? `@${data?.currentUser?.username}`
              : data?.currentUser?.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;
