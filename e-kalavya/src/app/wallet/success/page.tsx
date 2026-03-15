"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getWalletBalance } from "@/lib/walletClient";
import { updateWalletBalance, updateTransactionStatus } from "@/lib/transactionClient";
import { verifyEasebuzzHash } from "@/lib/easebuzz";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState<{
    txnId: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      if (!user) {
        setStatus("error");
        setMessage("Please log in first");
        return;
      }

      try {
        // Get all search params as object
        const responseData: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
          if (value) {
            responseData[key] = value;
          }
        }

        // Verify hash
        const salt = process.env.NEXT_PUBLIC_EASEBUZZ_SALT;
        if (!salt) {
          console.error("Easebuzz salt not configured");
          setStatus("error");
          setMessage("Payment verification failed");
          return;
        }

        const isHashValid = verifyEasebuzzHash(responseData, salt);

        if (!isHashValid) {
          console.error("Invalid hash from Easebuzz");
          setStatus("error");
          setMessage("Payment verification failed: Invalid hash");
          return;
        }

        // Check transaction status
        const txnStatus = responseData.status;
        const txnId = responseData.txn_id;
        const amount = Number(responseData.amount);

        if (txnStatus !== "success" && txnStatus !== "1") {
          setStatus("error");
          setMessage("Payment was not successful");
          return;
        }

        // Get transaction ID from session
        const transactionId = sessionStorage.getItem("lastTransactionId");

        // Update wallet balance
        await updateWalletBalance(user.uid, amount);

        // Update transaction status
        if (transactionId) {
          await updateTransactionStatus(transactionId, "success", {
            easebuzz_txn_id: txnId,
            easebuzz_response: responseData,
          });
        }

        // Get updated balance
        const updatedBalance = await getWalletBalance(user.uid);
        setBalance(updatedBalance);

        setTransactionDetails({
          txnId,
          amount,
          timestamp: new Date().toLocaleDateString(),
        });

        // Clear session storage
        sessionStorage.removeItem("lastTransactionId");

        setStatus("success");
        setMessage(`Successfully added ₹${amount} to your wallet!`);
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "An error occurred during verification"
        );
      }
    }

    verifyPayment();
  }, [user, searchParams]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <p className="text-gray-600">Please log in to verify your payment</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-semibold"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {status === "loading" && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
                <div className="animate-spin">
                  <svg
                    className="w-8 h-8 text-violet-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m0 0h6"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                Verifying Payment...
              </h1>
              <p className="text-gray-600">Please wait while we confirm your payment</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-green-600 mb-2">
                Payment Successful! ✅
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>

              {transactionDetails && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Amount Added:</span>
                      <span className="font-semibold text-violet-600">
                        ₹{transactionDetails.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Transaction ID:</span>
                      <span className="text-gray-900 break-all">
                        {transactionDetails.txnId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">New Balance:</span>
                      <span className="font-semibold text-green-600">₹{balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="text-gray-900">{transactionDetails.timestamp}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => router.push("/wallet")}
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
              >
                View Wallet
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 0v2m0-6h4m-6 0H8"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-red-600 mb-2">
                Verification Failed ❌
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>

              <button
                onClick={() => router.push("/wallet")}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition mb-2"
              >
                Back to Wallet
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
              >
                Back to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function WalletSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
                <div className="animate-spin">
                  <svg
                    className="w-8 h-8 text-violet-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m0 0h6"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
