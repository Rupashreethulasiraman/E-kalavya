"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Protected from "@/components/Protected";
import useAuth from "@/hooks/useAuth";
import { useUserEnrollments } from "@/hooks/useEnrollments";
import { useUserBookings } from "@/hooks/useBookings";
import { COURSE_BOARDS } from "@/lib/courses";
import { getWalletBalance, addToWallet } from "@/lib/walletClient";

export default function DashboardPage() {
  const { user } = useAuth();
  const { enrollments, loading: enrollmentsLoading } = useUserEnrollments(user);
  const { bookings, loading: bookingsLoading } = useUserBookings(user);

  const [walletBalance, setWalletBalance] = useState(0);
  const [walletLoading, setWalletLoading] = useState(true);

  /* ================= FETCH WALLET ================= */
 useEffect(() => {
  async function fetchWallet() {
    if (!user) {
      setWalletLoading(false);
      return;
    }

    const balance = await getWalletBalance(user.uid);
    setWalletBalance(balance);
    setWalletLoading(false);
  }

  fetchWallet();
}, [user]);


  /* ================= HELPERS ================= */
  const getCourseDetails = (slug: string) => {
    for (const board of COURSE_BOARDS) {
      const course = board.courses.find((c) => c.slug === slug);
      if (course) return course;
    }
    return null;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* ================= ADD WALLET MONEY ================= */
  async function handleAddMoney(amount: number) {
    if (!user) return;
    await addToWallet(user.uid, amount);
    const updated = await getWalletBalance(user.uid);
    setWalletBalance(updated);
  }

  return (
    <Protected>
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* ===== WELCOME ===== */}
          <div className="mb-12">
            <h1 className="text-4xl mb-2">
              <span className="font-extrabold text-gray-900">
                Welcome back,
              </span>{" "}
              <span className="font-extrabold text-violet-700">
                {user?.email?.split("@")[0] || "Learner"}!
              </span>
            </h1>

            <p className="text-lg text-gray-600">
              Track your learning, wallet & progress.
            </p>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Stat label="Courses Enrolled" value={enrollments.length} />
            <Stat label="Demo Bookings" value={bookings.length} />
            <Stat
              label="Pending Bookings"
              value={bookings.filter((b) => b.status === "pending").length}
            />
            <Stat
              label="Member Since"
              value={
                user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN")
                  : "Today"
              }
            />
          </div>

          {/* ===== WALLET ===== */}
          <div className="mb-14 bg-gradient-to-r from-violet-600 to-violet-700 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">💰 Your Wallet</h2>
            <p className="text-violet-100 mb-6">
              Use wallet balance to enroll in courses
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-violet-200">Available Balance</p>
                <p className="text-4xl font-extrabold">
                  {walletLoading ? "…" : `₹${walletBalance}`}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAddMoney(500)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
                >
                  ➕ Add ₹500
                </button>

                <button
                  onClick={() => handleAddMoney(1000)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
                >
                  ➕ Add ₹1000
                </button>
              </div>
            </div>
          </div>

          {/* ===== ENROLLED COURSES ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    <h2 className="text-3xl font-extrabold mb-6 text-purple-700">
      Your Enrolled Courses
    </h2>

    {enrollmentsLoading ? (
      <p className="text-gray-600">Loading...</p>
    ) : enrollments.length === 0 ? (
      <div className="bg-white border-2 border-dashed border-purple-300
                      rounded-xl p-10 text-center">
        <p className="mb-6 text-gray-600">
          You haven’t enrolled in any courses yet.
        </p>
        <Link
          href="/courses"
          className="inline-block bg-purple-700 hover:bg-purple-800
                     text-white px-6 py-3 rounded-lg font-semibold"
        >
          Browse Courses
        </Link>
      </div>
    ) : (
      <div className="space-y-4">
        {enrollments.map((en) => {
          const course = getCourseDetails(en.courseSlug);

          return (
            <div
              key={en.id}
              className="bg-white border-2 border-purple-200
                         rounded-xl p-6 shadow-sm"
            >
              {/* COURSE TITLE */}
              <h3 className="text-2xl font-extrabold text-purple-700 uppercase">
                {course?.title || en.courseSlug}
              </h3>

              {/* DATE */}
              <p className="text-sm text-gray-700 mt-2 font-medium">
                📅 Enrolled on {formatDate(en.purchasedAt)}
              </p>

              {/* PLAN (OPTIONAL) */}
              {en.plan && (
                <span
                  className="inline-block mt-3 bg-yellow-100
                             text-yellow-800 px-3 py-1 rounded-full
                             text-sm font-semibold"
                >
                  Plan: {en.plan.toUpperCase()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

          </div>

        </div>
    </Protected>
  );
}

/* ===== STAT CARD ===== */
function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold text-violet-700 mt-2">{value}</p>
    </div>
  );
}
