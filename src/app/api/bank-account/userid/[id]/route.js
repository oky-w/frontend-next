import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const token = req.cookies.get("token")?.value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bank-accounts/by-user-id/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data } = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
