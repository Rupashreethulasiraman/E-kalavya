import { NextResponse } from "next/server";
import { createPaymentLinkPayload } from "@/lib/easebuzz";
import { createTransaction } from "@/lib/transactionClient";

interface PaymentRequest {
  userId: string;
  email: string;
  amount: number;
  purpose?: string;
}

export async function POST(request: Request) {
  try {
    // Validate environment variables
    const key = process.env.EASEBUZZ_KEY;
    const salt = process.env.EASEBUZZ_SALT;
    const baseUrl = process.env.EASEBUZZ_BASE_URL;

    if (!key || !salt || !baseUrl) {
      console.error("Missing Easebuzz environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway not configured",
        },
        { status: 500 }
      );
    }

    const body: PaymentRequest = await request.json();

    const { userId, email, amount, purpose = "Add Money to Wallet" } = body;

    // Validate request
    if (!userId || !email || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request parameters",
        },
        { status: 400 }
      );
    }

    // Create transaction record
    const transactionId = await createTransaction({
      userId,
      amount,
      status: "pending",
      easebuzz_txn_id: `TXN_${userId}_${Date.now()}`,
      purpose,
    });

    // Create Easebuzz payment link payload
    const payload = createPaymentLinkPayload(
      userId,
      email,
      amount,
      purpose,
      key,
      salt
    );

    // Call Easebuzz payment-link API
    const easebuzzResponse = await fetch(
      `${baseUrl}/api/create_payment_link/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload as Record<string, string>).toString(),
      }
    );

    if (!easebuzzResponse.ok) {
      console.error("Easebuzz API error:", easebuzzResponse.status);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create payment link",
        },
        { status: 500 }
      );
    }

    const easebuzzData = await easebuzzResponse.json();

    // Check if payment link was created successfully
    if (easebuzzData.status !== 1 || !easebuzzData.data?.payment_url) {
      console.error("Easebuzz response error:", easebuzzData);
      return NextResponse.json(
        {
          success: false,
          message: easebuzzData.message || "Failed to create payment link",
        },
        { status: 400 }
      );
    }

    // Return payment URL
    return NextResponse.json(
      {
        success: true,
        payment_url: easebuzzData.data.payment_url,
        transaction_id: transactionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
