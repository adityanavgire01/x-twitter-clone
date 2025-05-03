import { IUser } from "@/types";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import User from "./User";

const FollowUser = ({ users }: { users: IUser[] | undefined }) => {
  // If users is undefined, return early with a loading or empty state
  if (!users) {
    return (
      <div className="py-4 hidden lg:block w-[266px]">
        <div className="bg-neutral-800 rounded-xl">
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          </div>
          <div className="flex justify-center items-center h-24">
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="bg-neutral-800 rounded-xl">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <Link href="/explore">
            <Button className="h-[30px] p-0 w-fit px-3 text-sm">See all</Button>
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="flex justify-center items-center h-24">
            No users found to follow
          </div>
        ) : (
          <div>
            {users.map((user, index) => (
              <Link key={user._id || index} href={`/profile/${user._id}`}>
                <User user={user} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUser;
