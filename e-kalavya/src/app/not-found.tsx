"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-violet-50 to-white px-6">
      <h1 className="text-7xl font-extrabold text-violet-700 mb-4">404</h1>

      <p className="text-2xl font-semibold text-gray-900 mb-2">
        Page Not Found
      </p>

      <p className="text-gray-600 max-w-md mb-8">
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go Home
        </Link>

        <Link
          href="/courses"
          className="border-2 border-violet-700 text-violet-700 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50"
        >
          Browse Courses
        </Link>
      </div>
    </main>
  );
}
