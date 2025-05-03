import { IPost, IUser } from "@/types";
import { Heart, Loader2, MessageCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  posts: IPost[];
  post: IPost;
  user: IUser;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostCard = ({ posts, post, user, setPosts }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(
    post?.likes?.some((likeUser: IUser) => likeUser?._id == user?._id)
  );

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      setIsLoading(true);

      const { data } = await axios.put(`/api/likes`, {
        postId: post?._id,
        userId: user?._id,
        isLike: isLike ? false : true,
      });
      console.log(data, "data");

      if (data?.success) {
        setPosts((prev) =>
          prev?.map((item) =>
            item?._id === data?.post?._id ? data?.post : item
          )
        );
        setIsLike(
          data?.post?.likes?.some((likeUser: IUser) => likeUser?._id == user?._id)
        );
      }
      setIsLoading(false);
    } catch (err) {
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const goToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      setIsLoading(true);

      const { data } = await axios.delete(`/api/posts`, {
        data: { postId: post?._id },
      });

      if (data?.success) {
        setPosts(posts?.filter((item) => item?._id !== post?._id));
        return toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      }
    } catch (err) {
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = () => {
    router.push(`/posts/${post?._id}`);
  };
  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <Avatar onClick={() => goToProfile(post?.user?._id)}>
          <AvatarImage src={user.profilePhoto} />
          <AvatarFallback className="uppercase">{user.name[0]}</AvatarFallback>
        </Avatar>
        <div
          className="flex items-center gap-2"
          onClick={() => goToProfile(post?.user?._id)}
        >
          <p className="text-white font-semibold cursor-pointer hover:underline capitalize">
            {post?.user?.name}
          </p>
          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </span>
          <span className="text-neutral-500 text-sm">
            {formatDistanceToNowStrict(new Date(post?.createdAt))}
          </span>
        </div>
      </div>
      <div>
        <p className="text-white mt-1 text-xl" onClick={handlePost}>
          {post?.text}
        </p>
        <div className="h-80 max-h-96 w-full relative" onClick={handlePost}>
          {post?.image && (
            <Image
              src={post.image}
              alt={post?.text || "Post image"}
              fill
              className="object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex items-center mt-3 gap-10">
          <div className="flex text-neutral-500 items-center gap-2 cursor-pointer transition hover:text-sky-500">
            <MessageCircle size={20} />
            <p>{post?.comments?.length || 0}</p>
          </div>
          <div
            onClick={handleLike}
            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
          >
            <Heart size={20} color={isLike ? "red" : "gray"} />
            <p>{post?.likes?.length || 0}</p>
          </div>
          {post?.user?._id == user?._id && (
            <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
              onClick={handleDelete}
            >
              <Trash2 size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
