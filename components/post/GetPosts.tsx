"use client";
import { ExtendedSession, IPost } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { Loader2 } from "lucide-react";
import Form from "./Form";
import PostCard from "./PostCard";

const GetPosts = ({ posts, loading }: { posts: IPost[] | undefined; loading: boolean }) => {
  const [postList, setPostList] = useState<IPost[]>(posts || []);
  const { data: session, status } = useSession();
  const user = (session as ExtendedSession)?.currentUser;

  useEffect(() => {
    if (posts) {
      setPostList(posts);
    }
  }, [posts]);

  return (
    <>
      <Header title="Home" />
      {loading || status === "loading" || !user ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Form
            placeholder="What's on your mind?"
            user={user}
            setPosts={setPostList}
            posts={postList}
          />
          {postList && postList.length > 0 ? (
            postList.map((post) => (
              <PostCard
                key={post?._id}
                post={post}
                user={user}
                setPosts={setPostList}
                posts={postList}
              />
            ))
          ) : (
            <div className="p-4 text-center text-neutral-500">
              No posts to display. Create your first post!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GetPosts;
