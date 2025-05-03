"use server";

import axios from "axios";

export const getPosts = async (loading: boolean, limit: number) => {
  try {
    loading = true;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error, "error");
  } finally {
    loading = false;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`
    );
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};
