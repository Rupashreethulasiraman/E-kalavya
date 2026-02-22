"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourse, CourseDoc } from "@/lib/firestoreClient";
import { COURSE_BOARDS } from "@/lib/courses";
import { enrollWithWallet } from "@/lib/enrollmentClient";
import useAuth from "@/hooks/useAuth";
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
  const [enrolling, setEnrolling] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourse(decodedSlug);
        setCourse(data);
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
      ? course.pricing.monthly
      : course.pricing.annual;

  /* ================= ENROLL LOGIC ================= */
  async function handleEnroll() {
  if (!user) {
    router.push("/login");
    return;
  }

  if (!course) {
    alert("Course data missing");
    return;
  }

  try {
    setEnrolling(true);

    const walletBalance = await getWalletBalance(user.uid);

    if (walletBalance < price) {
      alert("❌ Insufficient wallet balance. Please add money.");

      router.push(
        `/wallet?course=${course.slug}&plan=${plan}&amount=${price}`
      );
      return;
    }

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
    <main className="min-h-screen py-20 px-6">

      {/* ===== TITLE ===== */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4 text-center">
        {course.title}
      </h1>

      <p className="text-center text-gray-600 mt-2">
        {course.short}
      </p>

      {/* ===== CONDITIONAL: Board-only courses show subjects only ===== */}
      {
        (() => {
          const BOARD_NAMES = ["Matric Board", "CBSE Board", "ICSE Board"];

          const slugToCheck = course.slug || decodedSlug;

          const isBoardCourse = COURSE_BOARDS.some((b) =>
            BOARD_NAMES.includes(b.board) && b.courses.some((c) => c.slug === slugToCheck)
          ) || /^(matric-|cbse-|icse-)/.test(slugToCheck);

          const subjects = (course.syllabus && course.syllabus.length)
            ? course.syllabus
            : (() => {
                for (const b of COURSE_BOARDS) {
                  // typed to only read slug & subjects (these fields exist in our data)
                  for (const c of b.courses as { slug: string; subjects?: string[] }[]) {
                    if (c.slug === slugToCheck && Array.isArray(c.subjects)) return c.subjects as string[];
                  }
                }
                return [] as string[];
              })();

          if (isBoardCourse) {
            return (
              <section className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Subjects</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {subjects && subjects.length ? (
                    subjects.map((s) => (
                      <div key={s} className="bg-white rounded-xl border shadow-sm p-3 text-center text-violet-700 font-semibold">
                        {s}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No subjects listed.</p>
                  )}
                </div>

                <div className="text-center mt-8">
                  <Link href="/courses" className="text-purple-700 font-semibold hover:underline">← Back to courses</Link>
                </div>
              </section>
            );
          }

          return (
            <>
              {/* ===== PLAN SELECTOR ===== */}
              <div className="flex justify-center gap-4 mt-10 mb-10">
                <button
                  onClick={() => setPlan("monthly")}
                  className={`px-8 py-3 rounded-lg font-semibold transition
            ${
              plan === "monthly"
                ? "bg-yellow-500 text-black"
                : "bg-yellow-100 text-yellow-800"
            }`}
                >
                  Monthly ₹{course.pricing.monthly}
                </button>

                <button
                  onClick={() => setPlan("annual")}
                  className={`px-8 py-3 rounded-lg font-semibold transition
            ${
              plan === "annual"
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-800"
            }`}
                >
                  Annual ₹{course.pricing.annual}
                </button>
              </div>

              {/* ===== ENROLL BUTTON ===== */}
              <div className="flex justify-center mt-8 mb-16">
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className={`px-12 py-4 rounded-xl font-semibold transition
            ${
              plan === "monthly"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
                >
                  {enrolling ? "Processing..." : `Enroll ₹${price}`}
                </button>
              </div>

              <div className="text-center mt-8">
                <Link href="/courses" className="text-purple-700 font-semibold hover:underline">← Back to courses</Link>
              </div>
            </>
          );
        })()
      }
    </main>
  );
}
