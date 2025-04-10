import convertTime from "@/lib/utils/convertTime";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Forward request to Go backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      const result = await response.json();

      return NextResponse.json(
        { message: result.message },
        { status: result.code }
      );
    }

    const result = await response.json();

    const { data } = result;

    const res = NextResponse.json({ success: true, data });

    res.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: convertTime(data.expires_at),
    });

    res.cookies.set("role", data.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: convertTime(data.expires_at),
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
