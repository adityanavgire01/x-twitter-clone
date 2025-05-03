import { getUserById } from "@/actions/user.action";
import Header from "@/components/common/Header";
import ProfileBio from "@/components/users/ProfileBio";
import ProfileHero from "@/components/users/ProfileHero";
import UserPosts from "@/components/users/UserPosts";
import { getAuthServer } from "@/lib/authOptions";
import { ExtendedSession } from "@/types";
import React from "react";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  try {
    const session = await getAuthServer() as ExtendedSession;
    const { userId } = await params;
    
    if (!userId) {
      return (
        <>
          <Header title="Profile" />
          <div className="flex justify-center items-center h-24 text-white">
            User ID not provided
          </div>
        </>
      );
    }
    
    const userData = await getUserById(userId);
    
    if (!userData || !userData.user) {
      return (
        <>
          <Header title="Profile" />
          <div className="flex justify-center items-center h-24 text-white">
            User not found
          </div>
        </>
      );
    }
    
    // Using structured clone to safely serialize the data
    const safeUser = structuredClone(userData.user);
    const safePosts = structuredClone(userData.posts || []);
    const currentUserId = session?.currentUser?._id || '';
    
    return (
      <>
        <Header title="Profile" />
        <ProfileHero user={safeUser} />
        <ProfileBio
          user={safeUser}
          userId={currentUserId}
        />
        <UserPosts
          user={safeUser}
          getPosts={safePosts}
        />
      </>
    );
  } catch (error) {
    console.error("Error in profile page:", error);
    return (
      <>
        <Header title="Profile" />
        <div className="flex justify-center items-center h-24 text-white">
          Error loading profile
        </div>
      </>
    );
  }
};

export default ProfileUser;
