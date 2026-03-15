"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { updateTransactionStatus } from "@/lib/transactionClient";
import { verifyEasebuzzHash } from "@/lib/easebuzz";

function FailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [status, setStatus] = useState<"loading" | "displayed">("loading");
  const [failureReason, setFailureReason] = useState(
    "Payment could not be processed"
  );
  const [transactionDetails, setTransactionDetails] = useState<{
    txnId: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    async function handleFailure() {
      if (!user) {
        setStatus("displayed");
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

        // Try to verify hash (optional for failure)
        const salt = process.env.NEXT_PUBLIC_EASEBUZZ_SALT;
        if (salt) {
          const isHashValid = verifyEasebuzzHash(responseData, salt);
          if (!isHashValid) {
            console.warn("Invalid hash in failure response");
          }
        }

        // Extract failure reason
        const reason = responseData.error_message || responseData.reason;
        if (reason) {
          setFailureReason(reason);
        }

        // Update transaction status
        const transactionId = sessionStorage.getItem("lastTransactionId");
        const txnId = responseData.txn_id;
        const amount = Number(responseData.amount);

        if (transactionId) {
          await updateTransactionStatus(transactionId, "failed", {
            easebuzz_txn_id: txnId,
            easebuzz_response: responseData,
            error_message: reason,
          });
        }

        setTransactionDetails({
          txnId,
          amount,
          timestamp: new Date().toLocaleDateString(),
        });

        // Clear session storage
        sessionStorage.removeItem("lastTransactionId");
      } catch (err) {
        console.error("Failure page error:", err);
      } finally {
        setStatus("displayed");
      }
    }

    handleFailure();
  }, [user, searchParams]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <p className="text-gray-600">Please log in to view payment details</p>
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

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <div className="animate-spin">
                <svg
                  className="w-8 h-8 text-gray-600"
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
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center">
          {/* Error Icon */}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold text-red-600 mb-2">
            Payment Failed ❌
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-2">{failureReason}</p>
          <p className="text-sm text-gray-500 mb-6">
            Your payment could not be processed. No amount has been deducted from your account.
          </p>

          {/* Transaction Details */}
          {transactionDetails && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Attempted Amount:</span>
                  <span className="font-semibold text-red-600">
                    ₹{transactionDetails.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Transaction ID:</span>
                  <span className="text-gray-900 text-xs break-all">
                    {transactionDetails.txnId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="text-gray-900">{transactionDetails.timestamp}</span>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-yellow-800">
              <strong>What can you do?</strong>
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Try with a different payment method</li>
              <li>• Check your card/account details</li>
              <li>• Ensure sufficient balance</li>
              <li>• Contact support if the issue persists</li>
            </ul>
          </div>

          {/* Buttons */}
          <button
            onClick={() => router.push("/wallet")}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition mb-2"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
          >
            Back to Dashboard
          </button>

          {/* Contact Support */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@ekalavya.com"
              className="text-violet-600 hover:text-violet-700 font-semibold"
            >
              support@ekalavya.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function WalletFailurePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <FailureContent />
    </Suspense>
  );
}
