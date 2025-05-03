export interface IUser {
  createdAt: Date;
  username: string;
  email: string;
  name: string;
  profilePhoto: string;
  coverPhoto: string;
  updatedAt: Date;
  _id: string;
  bio: string;
  location: string;
  followers: string[];
  following: string[];
  hasNewNotifications: boolean;
  notifications: string[];
  isFollowing: boolean;
}

export interface IComment {
  _id: string;
  text: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  likes: string[];
}

export interface IPost {
  text: string;
  image: string;
  comments: IComment[];
  createdAt: string;
  likes: IUser[];
  updatedAt: string;
  user: IUser;
  _id: string;
  hasLiked: boolean;
}

import { Session } from "next-auth";

export interface ExtendedSession extends Session {
  currentUser?: IUser;
}
