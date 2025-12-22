"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourse, CourseDoc } from "@/lib/firestoreClient";
import { enrollWithWallet } from "@/lib/enrollmentClient";
import useAuth from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { getWalletBalance } from "@/lib/walletClient";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);

  const router = useRouter();
  const { user } = useAuth();

  const [course, setCourse] = useState<CourseDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourse(decodedSlug);
      setCourse(data);
      setLoading(false);
    }
    fetchCourse();
  }, [decodedSlug]);

  /* ================= CHECK ENROLLMENT ================= */
  useEffect(() => {
  async function fetchCourse() {
    try {
      const data = await getCourse(decodedSlug);

      if (!data) {
        console.error("Course not found in Firestore:", decodedSlug);
        setCourse(null);
      } else {
        setCourse(data);
      }
    } catch (err) {
      console.error("Failed to fetch course:", err);
      setCourse(null);
    } finally {
      setLoading(false); 
    }
  }

  fetchCourse();
}, [decodedSlug]);


  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!course) {
    return (
      <p className="text-center mt-20 text-red-600">Course not found</p>
    );
  }

  /* ================= PRICE ================= */
 const price =
  plan === "monthly"
    ? course.pricing?.monthly ?? course.price
    : course.pricing?.annual ?? course.price;


  /* ================= ENROLL LOGIC ================= */
  async function handleEnroll() {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!price) {
      alert("Pricing not available");
      return;
    }

    try {
      setEnrolling(true);

      // 1️⃣ Check wallet balance
      const walletBalance = await getWalletBalance(user.uid);

      // 2️⃣ If insufficient → redirect to wallet page
      if (walletBalance < price) {
        alert("❌ Insufficient wallet balance. Please add money.");

        router.push(
          `/wallet?course=${course.slug}&plan=${plan}&amount=${price}`
        );
        return;
      }

      // 3️⃣ Enough balance → enroll
      await enrollWithWallet(
        user.uid,
        user.email!,
        course.slug,
        price,
        plan
      );

      alert("✅ Enrollment successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <main className="min-h-screen py-20">

      {/* ===== TITLE ===== */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4 text-center">
        {course.title}
      </h1>

      <p className="text-center text-gray-600 mt-2">
        {course.short}
      </p>

      {/* ===== PLAN SELECTOR ===== */}
      <div className="flex justify-center gap-4 mt-10 mb-10">
        {/* MONTHLY */}
        <button
          onClick={() => setPlan("monthly")}
          className={`px-8 py-3 rounded-lg font-semibold transition
            ${
              plan === "monthly"
                ? "bg-yellow-500 text-black"
                : "bg-yellow-100 text-yellow-800"
            }`}
        >
          Monthly ₹{course.pricing?.monthly ?? "course.price"}

        </button>

        {/* ANNUAL */}
        <button
          onClick={() => setPlan("annual")}
          className={`px-8 py-3 rounded-lg font-semibold transition
            ${
              plan === "annual"
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-800"
            }`}
        >
         Annual ₹{course.pricing?.annual ?? course.price}

        </button>
      </div>

      {/* ===== ENROLL BUTTON ===== */}
      <div className="flex justify-center mt-8 mb-16">
        <button
          onClick={handleEnroll}
          disabled={isEnrolled || enrolling}
          className={`px-12 py-4 rounded-xl font-semibold transition
            ${
              isEnrolled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : plan === "monthly"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
        >
          {isEnrolled
            ? "Already Enrolled ✅"
            : enrolling
            ? "Processing..."
            : `Enroll ₹${price}`}
        </button>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/courses"
          className="text-purple-700 font-semibold hover:underline"
        >
          ← Back to courses
        </Link>
      </div>
    </main>
  );
}
