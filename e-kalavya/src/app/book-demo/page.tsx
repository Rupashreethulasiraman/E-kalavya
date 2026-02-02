"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { bookDemo } from "@/lib/bookingClient";

export default function BookDemoPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      alert("Please login to book a demo");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      await bookDemo(
        user.uid,
        name,
        email,
        course
      );

      alert("✅ Demo booked successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Demo booking error:", error);
      alert("❌ Failed to book demo. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-violet-100 p-3 rounded-full mb-3">
            <GraduationCap className="text-violet-700 w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-violet-700">
            Book a Free Demo
          </h1>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Experience our teaching before you enroll
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={input}
          />

          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />

          <select
            required
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={input}
          >
            <option value="">Select Course</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
            <option>JEE</option>
            <option>NEET</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600
              disabled:opacity-50
              text-black font-semibold py-3 rounded-lg
              shadow-md transition"
          >
            {loading ? "Booking..." : "Book Demo"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-6">
          No payment required · Limited seats available
        </p>
      </div>
    </main>
  );
}

/* INPUT STYLE */
const input =
  "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";
