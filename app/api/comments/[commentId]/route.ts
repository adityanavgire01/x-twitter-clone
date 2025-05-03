import { connectDatabase } from "@/lib/connection";
import Comment from "@/models/comment.model";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  route: { params: { commentId: string } }
) {
  try {
    await connectDatabase();
    const { commentId } = await route.params;
    console.log(commentId, "commentId");
    await Comment.findByIdAndDelete(commentId);

    return NextResponse.json({ message: "Comment deleted", success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
