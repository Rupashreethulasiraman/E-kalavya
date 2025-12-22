"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getWalletBalance, addToWallet } from "@/lib/walletClient";
import { enrollWithWallet } from "@/lib/enrollmentClient";

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const course = searchParams.get("course");
  const plan = searchParams.get("plan") as "monthly" | "annual";
  const amount = Number(searchParams.get("amount"));

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  /* ================= LOAD WALLET ================= */
  useEffect(() => {
    if (!user) return;

    async function loadWallet() {
      const bal = await getWalletBalance(user.uid);
      setBalance(bal);
      setLoading(false);
    }

    loadWallet();
  }, [user]);

  /* ================= ADD MONEY ================= */
  async function handleAddMoney(amount: number) {
    if (!user) return;
    await addToWallet(user.uid, amount);
    const updated = await getWalletBalance(user.uid);
    setBalance(updated);
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
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => handleAddMoney(500)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
          >
            + ₹500
          </button>

          <button
            onClick={() => handleAddMoney(1000)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
          >
            + ₹1000
          </button>
        </div>

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
