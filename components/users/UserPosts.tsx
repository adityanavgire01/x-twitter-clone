"use client";
import { IPost, IUser } from "@/types";
import React, { useEffect, useState } from "react";
import PostCard from "../post/PostCard";

interface Props {
  user: IUser;
  getPosts: IPost[];
}
const UserPosts = ({ user, getPosts }: Props) => {
  const [posts, setPosts] = useState<IPost[]>(getPosts);

  useEffect(() => {
    setPosts(getPosts);
  }, [getPosts]);

  return !posts?.length ? (
    <div className="flex justify-center items-center h-24">No post exists</div>
  ) : (
    posts?.map((post) => (
      <PostCard
        key={post?._id}
        post={post}
        posts={posts}
        setPosts={setPosts}
        user={user}
      />
    ))
  );
};

export default UserPosts;
