"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getWalletBalance } from "@/lib/walletClient";
import { enrollWithWallet } from "@/lib/enrollmentClient";

function WalletContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const course = searchParams.get("course");
  const plan = searchParams.get("plan") as "monthly" | "annual";
  const amount = Number(searchParams.get("amount"));

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [addingMoney, setAddingMoney] = useState(false);
  const [addMoneyError, setAddMoneyError] = useState("");

  /* ================= LOAD WALLET ================= */
  useEffect(() => {
    async function loadWallet() {
      if (!user) {
        setLoading(false);
        return;
      }
      const bal = await getWalletBalance(user.uid);
      setBalance(bal);
      setLoading(false);
    }

    loadWallet();
  }, [user]);

  /* ================= ADD MONEY VIA EASEBUZZ ================= */
  async function handleAddMoneyViaEasebuzz() {
    if (!user || !addMoneyAmount) return;

    const amountNum = Number(addMoneyAmount);
    if (amountNum <= 0 || amountNum < 100) {
      setAddMoneyError("Minimum amount is ₹100");
      return;
    }

    setAddingMoney(true);
    setAddMoneyError("");

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          amount: amountNum,
          purpose: "Add Money to Wallet",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setAddMoneyError(data.message || "Failed to create payment link");
        return;
      }

      // Store transaction ID in session storage for verification later
      sessionStorage.setItem("lastTransactionId", data.transaction_id);

      // Redirect to Easebuzz payment link
      window.location.href = data.payment_url;
    } catch (err) {
      console.error(err);
      setAddMoneyError("Failed to process request. Please try again.");
    } finally {
      setAddingMoney(false);
    }
  }

  /* ================= PAY & ENROLL ================= */
  async function handlePayAndEnroll() {
    if (!user || !course || !amount) return;

    if (balance < amount) {
      alert("❌ Insufficient wallet balance");
      return;
    }

    try {
      setPaying(true);

      await enrollWithWallet(
        user.uid,
        user.email!,
        course,
        amount,
        plan
      );

      alert("✅ Enrollment successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    } finally {
      setPaying(false);
    }
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          💰 Wallet
        </h1>

        {/* BALANCE */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-700">
            Available Balance
          </p>
          <p className="text-4xl font-extrabold text-gray-900 mt-1">
            {loading ? "…" : `₹${balance}`}
          </p>
        </div>

        {/* ADD MONEY */}
        {!showAddMoney ? (
          <div className="mb-8">
            <button
              onClick={() => setShowAddMoney(true)}
              className="w-full bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white px-4 py-3 rounded-lg font-semibold transition duration-200"
            >
              + Add Money to Wallet
            </button>
          </div>
        ) : (
          <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Amount (₹)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                min="100"
                step="100"
                value={addMoneyAmount}
                onChange={(e) => {
                  setAddMoneyAmount(e.target.value);
                  setAddMoneyError("");
                }}
                placeholder="Minimum ₹100"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Quick amount buttons */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => {
                  setAddMoneyAmount("500");
                  setAddMoneyError("");
                }}
                className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                  addMoneyAmount === "500"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ₹500
              </button>
              <button
                onClick={() => {
                  setAddMoneyAmount("1000");
                  setAddMoneyError("");
                }}
                className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                  addMoneyAmount === "1000"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ₹1000
              </button>
              <button
                onClick={() => {
                  setAddMoneyAmount("5000");
                  setAddMoneyError("");
                }}
                className={`px-3 py-2 text-sm rounded-lg font-semibold transition ${
                  addMoneyAmount === "5000"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ₹5000
              </button>
            </div>

            {/* Error */}
            {addMoneyError && (
              <p className="text-sm text-red-600 mb-3">{addMoneyError}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddMoneyViaEasebuzz}
                disabled={addingMoney || !addMoneyAmount}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  addingMoney || !addMoneyAmount
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
              >
                {addingMoney ? "Processing..." : "Proceed to Payment"}
              </button>
              <button
                onClick={() => {
                  setShowAddMoney(false);
                  setAddMoneyAmount("");
                  setAddMoneyError("");
                }}
                className="flex-1 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* COURSE INFO */}
        {course && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              Course
            </p>

            <p className="text-base font-semibold text-gray-900 mt-1">
              {course}
            </p>

            <p className="mt-2 text-xl font-extrabold text-purple-700">
              ₹{amount}
            </p>
          </div>
        )}

        {/* PAY & ENROLL */}
        <button
          onClick={handlePayAndEnroll}
          disabled={paying || balance < amount}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              balance < amount
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
        >
          {paying ? "Processing..." : "Pay & Enroll"}
        </button>

        {/* INSUFFICIENT BALANCE WARNING */}
        {balance < amount && (
          <p className="text-sm text-red-600 text-center mt-3">
            Insufficient wallet balance
          </p>
        )}

      </div>
    </main>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <WalletContent />
    </Suspense>
  );
}
