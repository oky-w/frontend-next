import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("token")?.value;

  try {
    const body = await req.json();
    const { from_account_number, to_account_number, amount, transaction_type } =
      body;

    if (!transaction_type || amount < 10000) {
      return NextResponse.json(
        { message: "Invalid transaction input." },
        { status: 400 }
      );
    }

    if (from_account_number === to_account_number) {
      return NextResponse.json(
        { message: "Invalid transaction input." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transactions/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message },
        { status: res?.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    // Forward request to Go backend with token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transactions/`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error("Error fetching transactions:", await response.text());
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
