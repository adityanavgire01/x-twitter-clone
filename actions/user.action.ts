"use server";

import { getAuthServer } from "@/lib/authOptions";
import axios from "axios";
import { ExtendedSession, IUser } from "@/types";

export const getUsers = async (limit: number): Promise<IUser[]> => {
  try {
    const session = await getAuthServer() as ExtendedSession;
    
    if (!session?.currentUser?._id) {
      console.log("No user session found");
      return [];
    }
    
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users?limit=${limit}&userId=${session.currentUser._id}`
    );
    
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (userId: string) => {
  try {
    const session = await getAuthServer() as ExtendedSession;
    
    if (!session?.currentUser?._id) {
      console.log("No user session found");
      return { user: null, posts: [] };
    }
    
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}?currentUserId=${session.currentUser._id}`
    );

    if (!data || !data.user) {
      return { user: null, posts: [] };
    }

    const updatedData = {
      ...data,
      user: {
        ...data.user,
        followers: data.user.followers?.length || 0,
        following: data.user.following?.length || 0,
        isFollowing:
          data.user.followers?.includes(
            session.currentUser._id.toString()
          ) || false,
      },
    };
    return updatedData;
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    return { user: null, posts: [] };
  }
};
