import { connectDatabase } from "@/lib/connection";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectDatabase();
    const { userId, currentUserId, isFollow } = await req.json();

    await User.findByIdAndUpdate(
      userId,
      isFollow
        ? { $pull: { followers: currentUserId } }
        : { $push: { followers: currentUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      currentUserId,
      isFollow
        ? { $pull: { following: userId } }
        : { $push: { following: userId } },
      { new: true }
    );

    if (!isFollow) {
      const notification = await Notification.create({
        text: `Someone Followed you!`,
        user: String(userId),
      });
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { notification: notification?._id },
          hasNewNotifications: true,
        },
        { new: true }
      );
    }
    return NextResponse.json({
      success: true,
      message: `${isFollow ? "User Unfollowed" : "you are following the user"}`,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const state = searchParams.get("state");

    const user = await User.findById(userId);
    if (state == "following") {
      const following = await User.find({ _id: { $in: user?.following } });
      return NextResponse.json(following);
    } else if (state == "followers") {
      const followers = await User.find({ _id: { $in: user?.followers } });
      return NextResponse.json(followers);
    }
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
