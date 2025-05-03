"use server";

import { getAuthServer } from "@/lib/authOptions";
import axios from "axios";

export const getUsers = async (limit: number) => {
  try {
    const session: any = await getAuthServer();
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users?limit=${limit}&userId=${session?.currentUser?._id}`
    );
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const session: any = await getAuthServer();
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}?currentUserId=${session?.currentUser?._id}`
    );

    const updatedData = {
      ...data,
      user: {
        ...data.user,
        followers: data?.user.followers?.length || 0,
        following: data?.user.following?.length || 0,
        isFollowing:
          data?.user.followers?.includes(
            session?.currentUser?._id?.toString()
          ) || false,
      },
    };
    return updatedData;
  } catch (error) {
    console.log(error, "error");
  }
};
