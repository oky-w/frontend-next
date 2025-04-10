import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    // Forward request to Go backend with token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bank-accounts/`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error("Error fetching bank account:", await response.text());
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await response.json();
    const data = res.data;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
