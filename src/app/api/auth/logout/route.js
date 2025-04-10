import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.json(
    { message: "Logged out successfully", status: 200 },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          "token=; Max-Age=0; Path=/; HttpOnly; Secure",
          "role=; Max-Age=0; Path=/; HttpOnly; Secure",
        ],
      },
    }
  );
}
