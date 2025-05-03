import { connectDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDatabase();
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const userId = searchParams.get("userId");

    const users = await User.find({
      _id: { $ne: userId },
    })
      .select("name username _id email profilePhoto")
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
