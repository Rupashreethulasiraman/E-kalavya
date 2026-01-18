"use client";

import Link from "next/link";
import { COURSE_BOARDS } from "@/lib/courses";

/* ===== POPULAR COURSES ===== */
const POPULAR_COURSES = [
  { name: "JEE", slug: "jee", color: "purple" },
  { name: "NEET", slug: "neet", color: "yellow" },
  { name: "CBSE Maths", slug: "cbse-maths", color: "purple" },
  { name: "Physics", slug: "physics", color: "yellow" },
  { name: "Chemistry", slug: "chemistry", color: "purple" },
  { name: "1 to 1 Session", slug: "one-to-one", color: "yellow" },
  { name: "Foundation", slug: "foundation", color: "purple" },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-violet-700 mb-3">
            Our Courses
          </h1>
          <p className="text-lg text-gray-600">
            Choose your board and start your learning journey
          </p>
        </div>
        {/* ===== POPULAR COURSES ===== */}
<section className="mb-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
      🔥 Top Enrolled Courses
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {[
        "JEE",
        "NEET",
        "CBSE Tution",
        "Foundation",
      ].map((course) => (
        <div
          key={course}
          className="bg-purple-700 text-white
                     text-center font-semibold
                     py-3 rounded-lg
                     hover:bg-purple-800 transition"
        >
          {course}
        </div>
      ))}
    </div>
  </div>
</section>

        

        {/* ===== BOARD SECTIONS ===== */}
        <div className="space-y-20">
          {COURSE_BOARDS.map((board) => (
            <section key={board.board}>

              {/* BOARD HEADER */}
              <div className="flex justify-center mb-8">
                <div className="bg-yellow-500 px-8 py-3 rounded-full text-center">
                  <h2 className="text-xl md:text-2xl font-extrabold text-black">
                    {board.board}
                  </h2>
                  <p className="text-sm text-black/80 mt-1">
                    {board.description}
                  </p>
                </div>
              </div>

              {/* COURSES GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {board.courses.map((course) => (
    <div
      key={course.slug}
      className="bg-white rounded-2xl border shadow-sm
                 hover:shadow-lg transition p-6 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Subjects Included
        </p>

        <ul className="text-sm text-gray-700 mb-6 space-y-1">
          {course.subjects.map((sub) => (
            <li key={sub}>• {sub}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/courses/${course.slug}`}
          className="bg-violet-700 hover:bg-violet-800
                     text-white px-4 py-2 rounded-lg font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>


            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
