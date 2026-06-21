import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email, provider } = await req.json();
    if (!email || !provider) {
      return NextResponse.json({ error: "Missing email or provider" }, { status: 400 });
    }

    await connectToDatabase();
    // Upsert user to avoid duplicates
    const user = await User.findOneAndUpdate(
      { email },
      { email, provider },
      { upsert: true, new: true }
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
