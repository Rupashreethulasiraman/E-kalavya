"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Clock, Users, CheckCircle2, Sparkles } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { bookDemo } from "@/lib/bookingClient";
import { motion } from "framer-motion";

export default function BookDemoPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      alert("Please login to book a demo");
      router.push("/login");
      return;
    }
    try {
      setLoading(true);
      await bookDemo(user.uid, name, email, course);
      alert("✅ Demo booked successfully!");
      router.push("/dashboard");
    } catch {
      alert("❌ Failed to book demo. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const perks = [
    { icon: <Clock size={18} />, title: "45-min Live Class", desc: "Real teaching, not a sales pitch" },
    { icon: <Users size={18} />, title: "Expert Teacher", desc: "1-on-1 academic counselling" },
    { icon: <CheckCircle2 size={18} />, title: "Zero Commitment", desc: "No payment required at all" },
  ];

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #f5f3ff 0%, #faf9ff 50%, #fef9ec 100%)" }}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: "-180px", right: "-120px",
            background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: "-120px", left: "-100px",
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Floating dots */}
        {[
          { top: "15%", left: "8%", size: 8, color: "rgba(124,58,237,0.2)" },
          { top: "70%", left: "5%", size: 5, color: "rgba(245,158,11,0.3)" },
          { top: "25%", right: "6%", size: 6, color: "rgba(124,58,237,0.15)" },
          { top: "80%", right: "8%", size: 10, color: "rgba(245,158,11,0.2)" },
          { top: "50%", left: "3%", size: 4, color: "rgba(167,139,250,0.3)" },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: dot.size, height: dot.size, background: dot.color, top: dot.top, left: (dot as any).left, right: (dot as any).right }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl relative z-10">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#ede9fe,#fef9ec)", border: "1.5px solid #c4b5fd", color: "#6d28d9" }}
          >
            <Sparkles size={15} style={{ color: "#f59e0b" }} />
            100% Free · No Credit Card · Limited Seats
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: INFO PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-5"
              style={{ color: "#1e0a3c", fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            >
              Book a<br />
              <span style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Free Demo
              </span>
            </h1>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "#4b4068", maxWidth: "380px" }}>
              Experience our teaching quality firsthand — before you ever pay a rupee.
            </p>

            {/* Perks */}
            <div className="space-y-4 mb-10">
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: "white", border: "1.5px solid #ede9fe", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", color: "#7c3aed" }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-sm" style={{ color: "#1e0a3c" }}>{p.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>

          {/* ── RIGHT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "white",
              border: "1.5px solid #ede9fe",
              boxShadow: "0 24px 64px rgba(124,58,237,0.12), 0 4px 16px rgba(124,58,237,0.06)",
            }}
          >
            {/* Form header */}
            <div
              className="px-8 py-6"
              style={{ background: "linear-gradient(135deg,#6d28d9,#5b21b6)", position: "relative", overflow: "hidden" }}
            >
              {/* subtle pattern in header */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <GraduationCap size={24} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Book a Free Demo</h2>
                  <p className="text-sm" style={{ color: "#c4b5fd" }}>Experience our teaching before you enroll</p>
                </div>
              </div>
            </div>

            {/* Form body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-xs font-extrabold mb-2 tracking-widest uppercase" style={{ color: "#6d28d9" }}>
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: "100%", padding: "13px 16px", borderRadius: "14px",
                      border: `2px solid ${focused === "name" ? "#7c3aed" : "#e9e3ff"}`,
                      background: focused === "name" ? "#faf8ff" : "#fdfcff",
                      fontSize: "0.95rem", color: "#1e0a3c", outline: "none",
                      boxShadow: focused === "name" ? "0 0 0 4px rgba(124,58,237,0.08)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-extrabold mb-2 tracking-widest uppercase" style={{ color: "#6d28d9" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: "100%", padding: "13px 16px", borderRadius: "14px",
                      border: `2px solid ${focused === "email" ? "#7c3aed" : "#e9e3ff"}`,
                      background: focused === "email" ? "#faf8ff" : "#fdfcff",
                      fontSize: "0.95rem", color: "#1e0a3c", outline: "none",
                      boxShadow: focused === "email" ? "0 0 0 4px rgba(124,58,237,0.08)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-xs font-extrabold mb-2 tracking-widest uppercase" style={{ color: "#6d28d9" }}>
                    Select Course
                  </label>
                  <select
                    required
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    onFocus={() => setFocused("course")}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: "100%", padding: "13px 16px", borderRadius: "14px",
                      border: `2px solid ${focused === "course" ? "#7c3aed" : "#e9e3ff"}`,
                      background: focused === "course" ? "#faf8ff" : "#fdfcff",
                      fontSize: "0.95rem", color: course ? "#1e0a3c" : "#9ca3af",
                      outline: "none",
                      boxShadow: focused === "course" ? "0 0 0 4px rgba(124,58,237,0.08)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <option value="">Choose your class / exam</option>
                    <option value="class-9">Class 9</option>
                    <option value="class-10">Class 10</option>
                    <option value="class-11">Class 11</option>
                    <option value="class-12">Class 12</option>
                    <option value="jee">JEE</option>
                    <option value="neet">NEET</option>
                    <option value="foundation">Foundation</option>
                  </select>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? "none" : "0 12px 36px rgba(245,158,11,0.45)" }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full font-extrabold py-4 rounded-2xl text-base"
                  style={{
                    background: loading ? "#e5e7eb" : "linear-gradient(135deg,#f59e0b,#d97706)",
                    color: loading ? "#9ca3af" : "#1a0a00",
                    border: "none",
                    boxShadow: loading ? "none" : "0 8px 24px rgba(245,158,11,0.35)",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20"/>
                      </svg>
                      Booking your demo...
                    </span>
                  ) : "🚀 Book My Free Demo Class"}
                </motion.button>

              </form>

              {/* Footer note */}
              <div
                className="mt-6 pt-5 flex items-center justify-center gap-4 text-xs font-semibold flex-wrap"
                style={{ borderTop: "1px solid #f3f0ff", color: "#9ca3af" }}
              >
                <span>🔒 No payment needed</span>
                <span style={{ color: "#e5e7eb" }}>|</span>
                <span>📅 Flexible timing</span>
                <span style={{ color: "#e5e7eb" }}>|</span>
                <span>✨ No spam ever</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}