"use client";
import { IPost, IUser } from "@/types";
import React, { useEffect, useState } from "react";
import PostCard from "../post/PostCard";

interface Props {
  user: IUser;
  getPosts: IPost[];
}
const UserPosts = ({ user, getPosts = [] }: Props) => {
  const [posts, setPosts] = useState<IPost[]>(getPosts || []);

  useEffect(() => {
    if (Array.isArray(getPosts)) {
      setPosts(getPosts);
    }
  }, [getPosts]);

  // If user is not valid, show an error
  if (!user || !user._id) {
    return (
      <div className="flex justify-center items-center h-24 text-neutral-500">
        User data unavailable
      </div>
    );
  }

  // Check if posts array is valid
  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-24 text-neutral-500">
        No posts available
      </div>
    );
  }

  return (
    <div className="mt-10">
      {posts.map((post) => (
        <PostCard
          key={post._id || Math.random().toString()}
          post={post}
          posts={posts}
          setPosts={setPosts}
          user={user}
        />
      ))}
    </div>
  );
};

export default UserPosts;
