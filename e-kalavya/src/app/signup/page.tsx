"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Create Auth user
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // 2️⃣ WAIT until auth is fully ready
      await new Promise<void>((resolve) => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsub();
            resolve();
          }
        });
      });

      const uid = auth.currentUser!.uid;

      // 3️⃣ Create user profile
      await setDoc(doc(db, "users", uid), {
        name,
        email: auth.currentUser!.email,
        createdAt: serverTimestamp(),
      });

      // 4️⃣ Create wallet
      await setDoc(doc(db, "wallets", uid), {
        balance: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 5️⃣ Redirect
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-violet-700">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join <span className="font-semibold">E-Kalavya</span> and start learning
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={input}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

const input =
  "w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500";
