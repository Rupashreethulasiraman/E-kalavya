import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: integrate wallet / payment logic here
    console.log("Payment request:", body);

    return NextResponse.json(
      { success: true, message: "Payment initiated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Payment failed" },
      { status: 500 }
    );
  }
}
