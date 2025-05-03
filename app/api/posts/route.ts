import { connectDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDatabase();
    const { text, image, userId } = await req.json();

    const post = await Post.create({ text, image, user: userId });
    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDatabase();
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    const posts = await Post.find({})
      .populate("user")
      .populate("likes")
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDatabase();
    const { postId } = await req.json();

    await Post.findByIdAndDelete(postId);
    return NextResponse.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
