import { IPost, IUser } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileImageUpload from "./ProfileImageUpload";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Props {
  placeholder: string;
  user: IUser;
  setPosts: Dispatch<SetStateAction<IPost[]>>;
  postId?: string;
  isComment?: boolean;
  posts?: IPost[];
}
const Form = ({
  posts = [],
  placeholder,
  user,
  setPosts,
  isComment,
  postId,
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  // If user is not available, don't render the form
  if (!user || !user._id) {
    return null;
  }

  const onSubmit = async () => {
    if (!text.trim()) return;
    
    try {
      setIsLoading(true);
      if (isComment) {
        const { data } = await axios.post("/api/comments", {
          text,
          userId: user._id,
          postId,
        });
        const newComment = {
          ...data,
          user,
          likes: [],
          hasLiked: false,
        };

        setPosts((prev) => [newComment, ...prev]);
      } else {
        const { data } = await axios.post("/api/posts", {
          text,
          image,
          userId: user._id,
        });

        const newPost = {
          ...data,
          user,
          comments: [],
        };
        setPosts((prev) => [...prev, newPost]);
        setImage("");
      }
      setIsLoading(false);
      setText("");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (img: string) => {
    try {
      setIsLoading(true);
      setImage(img);
      router.refresh();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={user.profilePhoto || ''} />
          <AvatarFallback>{user.name ? user.name[0] : '?'}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <textarea
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
            placeholder={placeholder}
            disabled={isLoading}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && onSubmit()}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-0.5 w-full border-neutral-800 transition" />
          {!isComment && (
            <ProfileImageUpload
              image={image}
              setImage={setImage}
              onChange={(image: string) => handleImageUpload(image)}
              isPost={true}
            />
          )}
          <div className="mt-4 flex flex-row justify-end">
            <Button
              className="px-8"
              disabled={isLoading || !text.trim()}
              onClick={onSubmit}
            >
              {isComment ? "Reply" : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
