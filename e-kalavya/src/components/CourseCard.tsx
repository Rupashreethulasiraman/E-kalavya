"use client";

import React from "react";
import Link from "next/link";
import { CourseDoc } from "@/lib/firestoreClient";

interface CourseCardProps {
  course: CourseDoc;
}

export default function CourseCard({ course }: CourseCardProps) {
  /* ===============================
     SAFELY NORMALIZE SYLLABUS
     =============================== */
  let syllabus: string[] = [];

  if (Array.isArray(course.syllabus)) {
    syllabus = course.syllabus;
  } else if (course.syllabus != null) {
    syllabus = String(course.syllabus)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  /* ===============================
     SAFE DISPLAY VALUES
     =============================== */
  const priceText =
    typeof course.pricing?.monthly === "number" ? `₹${course.pricing.monthly}` : "Contact";

  const durationText =
    typeof course.duration === "string" ? course.duration : "TBA";

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <div className="bg-white border rounded-xl shadow hover:shadow-xl transition h-full overflow-hidden cursor-pointer group">
        {/* Thumbnail */}
        <div className="bg-gray-200 h-40 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={course.thumbnail || "https://via.placeholder.com/400x160"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {course.category && (
            <div className="mb-2">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-2 py-1 rounded">
                {course.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition">
            {course.title}
          </h3>

          {/* Short Description */}
          {course.short && (
            <p className="text-gray-600 text-sm mb-4">
              {course.short}
            </p>
          )}

          {/* Syllabus */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Topics:</p>
            <div className="flex flex-wrap gap-1">
              {syllabus.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-yellow-400 text-violet-900 px-2 py-1 rounded font-semibold"
                >
                  {topic}
                </span>
              ))}

              {syllabus.length > 3 && (
                <span className="text-xs bg-yellow-500 text-violet-900 px-2 py-1 rounded font-semibold">
                  +{syllabus.length - 3}
                </span>
              )}

              {syllabus.length === 0 && (
                <span className="text-xs text-gray-500">
                  Syllabus coming soon
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-gray-500 text-xs">Price</p>
              <p className="text-xl font-bold text-violet-700">
                {priceText}
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-xs">Duration</p>
              <p className="font-semibold text-gray-900">
                {durationText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
