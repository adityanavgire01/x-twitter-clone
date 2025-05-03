import { getUserById } from "@/actions/user.action";
import Header from "@/components/common/Header";
import ProfileBio from "@/components/users/ProfileBio";
import ProfileHero from "@/components/users/ProfileHero";
import UserPosts from "@/components/users/UserPosts";
import { getAuthServer } from "@/lib/authOptions";
import React from "react";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const session: any = await getAuthServer();

  const { userId } = await params;
  const getUserDetails = await getUserById(userId);

  return (
    <>
      <Header title="Home" />
      <ProfileHero user={JSON.parse(JSON.stringify(getUserDetails?.user))} />
      <ProfileBio
        user={JSON.parse(JSON.stringify(getUserDetails?.user))}
        userId={JSON.parse(JSON.stringify(session))?.currentUser?._id}
      />
      <UserPosts
        user={JSON.parse(JSON.stringify(getUserDetails?.user))}
        getPosts={getUserDetails?.posts || []}
      />
    </>
  );
};

export default ProfileUser;
