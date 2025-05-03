import { getPostById } from "@/actions/post.action";
import PostDetails from "@/components/post/PostDetails";
import React from "react";

const PostId = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  const response = await getPostById(postId);
  //   console.log(response, "response");

  return (
    <PostDetails
      getPost={response?.post}
      postComments={response?.comments}
      postId={postId}
    />
  );
};

export default PostId;
