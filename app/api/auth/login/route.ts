import { connectDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  try {
    await connectDatabase();

    const { email, password } = await req.json();
    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return NextResponse.json(
        {
          error: "Email does not exist",
        },
        { status: 400 }
      );
    }

    const isMatch = bcrypt.compareSync(password, isExistingUser?.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, user: isExistingUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
