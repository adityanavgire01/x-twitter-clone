"use client";
import { IUser } from "@/types";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import ProfileImageUpload from "../post/ProfileImageUpload";
import { boolean } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditModal = ({ user }: { user: IUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coverPhoto, setCoverPhoto] = useState(user?.coverPhoto || "");
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  const router = useRouter();

  const handleImageUpload = async (image: string, isProfileImage?: boolean) => {
    try {
      await axios.put(`/api/users/${user?._id}?type=updateImage`, {
        [isProfileImage ? "profilePhoto" : "coverPhoto"]: image,
      });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      )}

      <ProfileImageUpload
        image={coverPhoto}
        setImage={setCoverPhoto}
        onChange={(image: string) => handleImageUpload(image, false)}
        isCover={true}
      />
      <ProfileImageUpload
        image={profilePhoto}
        setImage={setProfilePhoto}
        onChange={(image: string) => handleImageUpload(image, true)}
      />
    </>
  );
};

export default EditModal;
