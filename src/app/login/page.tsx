"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // ✅ IMPORTANT: Redirect to DASHBOARD
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-violet-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Login to continue learning with <b>E-Kalavya</b>
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-violet-700 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

/* INPUT STYLE */
const input =
  "w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";
