import { getAuthServer } from "@/lib/authOptions";
import { connectDatabase } from "@/lib/connection";
import Comment from "@/models/comment.model";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectDatabase();
    const { postId } = await route.params;
    const session: any = await getAuthServer();
    const user = session?.user;
    const post = await Post.findById(postId)
      .populate("user")
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "user",
          model: User,
        },
      });

    const filteredComments = post?.comments?.length
      ? post?.comments.map((item: any) => ({
          text: item.text,
          createdAt: item.createdAt,
          user: {
            _id: item.user._id,
            name: item.user.name,
            username: item.user.username,
            profilePhoto: item.user.profilePhoto,
            email: item.user.email,
          },
          likes: item.likes.length,
          hasLiked: item.likes.includes(user?._id),
          _id: item._id,
        }))
      : [];
    return NextResponse.json({ post, comments: filteredComments });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
