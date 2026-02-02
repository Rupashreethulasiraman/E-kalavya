"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Protected from "@/components/Protected";
import { getCourse, CourseDoc } from "@/lib/firestoreClient";

export default function EnrollPage() {
  const params = useParams<{ slug: string }>();
const slug = params.slug;

  const [course, setCourse] = useState<CourseDoc | null>(null);
  const [enrolled, setEnrolled] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [enrollLoading, setEnrollLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setEnrollLoading(false);
      setError("Missing course slug");
      return;
    }

    let mounted = true;

    async function fetchCourse() {
      try {
        const data = await getCourse(slug);
        if (mounted) {
          setCourse(data);
          setError(null);
          console.log("[EnrollPage] Loaded course:", data);
        }
      } catch (err) {
        console.error("[EnrollPage] Error fetching course:", err);
        if (mounted) setError("Failed to load course.");
      } finally {
        if (mounted) setEnrollLoading(false);
      }
    }

    fetchCourse();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleEnroll = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 700)); 
      setEnrolled(true);
    } catch (err) {
      setError("Enrollment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (enrollLoading) {
    return (
      <Protected>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading course…</p>
        </div>
      </Protected>
    );
  }

  if (!course) {
    return (
      <Protected>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700">
            Back to Courses
          </Link>
        </div>
      </Protected>
    );
  }

  return (
    <Protected>
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {enrolled ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold mb-4 text-green-600">
                Successfully Enrolled!
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                You are now enrolled in <strong>{course.title}</strong>
              </p>
              <p className="text-gray-600 mb-8">
                Check your email for onboarding instructions.
              </p>

              <div className="space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition"
                >
                  Browse More Courses
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold mb-2">Confirm Enrollment</h1>
              <p className="text-lg text-gray-600 mb-12">
                Review the course details and confirm your enrollment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-white border rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{course.title}</h2>

                    <div className="flex gap-4 mb-6 pb-6 border-b flex-wrap">
                      <div className="flex-1 min-w-32">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-900">{course.duration}</p>
                      </div>
                      <div className="flex-1 min-w-32">
                        <p className="text-sm text-gray-600">Difficulty</p>
                        <p className="font-semibold text-gray-900">{course.difficulty}</p>
                      </div>
                      <div className="flex-1 min-w-32">
                        <p className="text-sm text-gray-600">Instructor</p>
                        <p className="font-semibold text-gray-900">{course.instructor}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{course.long}</p>

                    <h3 className="text-lg font-semibold mb-4">What You will Learn</h3>
                    <ul className="space-y-2 mb-6">
                      {(course.syllabus || []).map((item) => (
                        <li key={item} className="flex items-start text-gray-700">
                          <span className="text-green-500 mr-3">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6 sticky top-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Enrollment Summary
                    </h3>

                    <div className="space-y-4 mb-6 pb-6 border-b">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Course Fee</span>
                        <span className="font-semibold">₹{course.pricing.monthly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Duration</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-blue-600">
                        ₹{course.pricing.monthly
}
                      </span>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleEnroll}
                      disabled={loading}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-3"
                    >
                      {loading ? "Enrolling..." : "Complete Enrollment"}
                    </button>

                    <button className="w-full px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Course
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
}
