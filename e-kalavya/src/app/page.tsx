"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { bookDemo } from "@/lib/bookingClient";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleDemoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!user) {
      alert("Please login to book a demo");
      router.push("/login");
      return;
    }

    try {
      await bookDemo(
        user.uid,
        formData.get("name") as string,
        formData.get("email") as string,
        formData.get("course") as string
      );
      alert("✅ Demo booked successfully!");
      form.reset();
    } catch {
      alert("❌ Failed to book demo");
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#faf9ff" }}>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
            style={{ background: "#ede9fe", color: "#6d28d9" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🎓 India's Most Loved Ed-Tech
          </motion.span>

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ color: "#1e0a3c", fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Learn Smarter,<br />
            <span style={{ color: "#7c3aed" }}>Achieve More</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "#4b4068", maxWidth: "480px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Live interactive classes for CBSE, ICSE, Matric, JEE &amp; NEET.
            Expert teachers. Real results.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/courses"
              className="btn-primary inline-block px-10 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "#ffffff" }}
            >
              View Courses →
            </Link>
          </motion.div>

          {/* TRUST BADGES */}
          <motion.div
            className="mt-10 flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {["10,000+ Students", "95% Success Rate", "Expert Faculty"].map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#6d28d9" }}>
                <span style={{ color: "#f59e0b" }}>✦</span> {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — DEMO CARD */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="rounded-3xl p-8 shadow-2xl border"
          style={{ background: "white", borderColor: "#ede9fe" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>
              🎯
            </div>
            <div>
              <h3 className="text-xl font-extrabold" style={{ color: "#1e0a3c" }}>
                Book a Free Live Demo
              </h3>
              <p className="text-xs" style={{ color: "#6b7280" }}>No payment required</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleDemoSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Student Name"
              required
              className="w-full rounded-xl px-4 py-3 border text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: "#e5e7eb", focusBorderColor: "#7c3aed" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-xl px-4 py-3 border text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              style={{ borderColor: "#e5e7eb" }}
            />
            <select
              name="course"
              required
              defaultValue=""
              className="w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              style={{ borderColor: "#e5e7eb", color: "#374151" }}
            >
              <option value="" disabled>Select Course</option>
              <option value="class-9">Class 9</option>
              <option value="class-10">Class 10</option>
              <option value="class-11">Class 11</option>
              <option value="class-12">Class 12</option>
              <option value="jee">JEE</option>
              <option value="neet">NEET</option>
              <option value="foundation">Foundation</option>
            </select>
            <button
              type="submit"
              className="w-full font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00" }}
            >
              Book Demo Class 🚀
            </button>
          </form>
          <p className="text-xs text-center mt-4" style={{ color: "#9ca3af" }}>
            Limited seats available · Join 10,000+ students
          </p>
        </motion.div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-3 gap-6">
          {[
            { number: "10,000+", label: "Happy Students", icon: "🎓" },
            { number: "500+", label: "Expert Teachers", icon: "👩‍🏫" },
            { number: "95%", label: "Success Rate", icon: "🏆" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 text-center shadow-md border"
              style={{ background: "white", borderColor: "#ede9fe" }}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-4xl font-extrabold" style={{ color: "#7c3aed" }}>{s.number}</p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#4b4068" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HELP BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 50%, #3b0764 100%)" }}
        >
          <div className="grid md:grid-cols-2 gap-0 items-center">

            {/* LEFT TEXT */}
            <motion.div
              className="p-12 md:p-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(245,158,11,0.2)", color: "#fcd34d" }}>
                Academic Support
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}>
                Happy to<br />Help You!
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#c4b5fd" }}>
                Need more details? Get perfect guidance with founder — at your pace.
              </p>
              <Link href="/expert-appointment" className="btn-yellow">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00" }}
                >
                  Speak to an Expert →
                </motion.button>
              </Link>
            </motion.div>
            {/* RIGHT IMAGE */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                  src="/BanuPriya.png"
                  alt="Expert Academic Counsellors"
                  width={460}
                  height={360}
                  className="object-contain"
                  style={{ maxHeight: "360px" }}
                  priority
                />
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ================= EXPERT TEACHERS ================= */}
      <section className="py-20" style={{ background: "#f5f3ff" }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4"
              style={{ background: "#ede9fe", color: "#6d28d9" }}>
              Meet the Team
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#1e0a3c", fontFamily: "'Georgia', serif" }}>
              Our Expert Teachers
            </h2>
            <p className="text-lg" style={{ color: "#4b4068", maxWidth: "520px", margin: "0 auto" }}>
              Highly qualified educators dedicated to student success.
            </p>
          </motion.div>

          {/* 5 TEACHERS — 3 top, 2 centered bottom */}
          <div className="space-y-8">
            {/* ROW 1 — 3 teachers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  name: "Ms. Kanimozhi",
                  degree: "M.Sc., Mathematics",
                  role: "Mathematics & English Expert",
                  img: "/kanimozhi.png",
                  emoji: "📐",
                },
                {
                  name: "Ms. Dharshini",
                  degree: "M.Sc., Ph.D – Physics",
                  role: "Physics Expert",
                  img: "/dharshini.png",
                  emoji: "⚛️",
                },
                {
                  name: "Ms. Ilakiya",
                  degree: "M.Sc., Biochemistry",
                  role: "Chemistry Expert",
                  img: "/ilakiya.png",
                  emoji: "🧪",
                },
              ].map((t, idx) => (
                <TeacherCard key={t.name} teacher={t} idx={idx} />
              ))}
            </div>

            {/* ROW 2 — 2 teachers centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                {
                  name: "Ms. Banu Priya",
                  degree: "M.Sc., B.Ed., CMT",
                  role: "Biology Expert",
                  img: "/founder-new.png",
                  emoji: "🧬",
                },
                {
                  name: "Ms. Subasree",
                  degree: "M.Sc., Mathematics",
                  role: "Mathematics & English Expert",
                  img: "/teacher5.png",
                  emoji: "📐",
                },
              ].map((t, idx) => (
                <TeacherCard key={t.name} teacher={t} idx={idx + 3} />
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function TeacherCard({ teacher, idx }: {
  teacher: { name: string; degree: string; role: string; img: string; emoji: string };
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center p-8 text-center transition-all duration-300 border"
      style={{ borderColor: "#ede9fe" }}
    >
      {/* IMAGE */}
      <div className="relative mb-5">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg"
          style={{ borderColor: "#7c3aed" }}>
          <img
            src={teacher.img}
            alt={teacher.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 text-xl w-9 h-9 rounded-full flex items-center justify-center shadow-md"
          style={{ background: "white", border: "2px solid #ede9fe" }}>
          {teacher.emoji}
        </span>
      </div>

      {/* NAME */}
      <h3 className="text-lg font-extrabold" style={{ color: "#1e0a3c" }}>
        {teacher.name}
      </h3>

      {/* DEGREE */}
      <p className="text-sm font-medium mt-1 mb-4" style={{ color: "#6b7280" }}>
        {teacher.degree}
      </p>

      {/* ROLE BADGE */}
      <span className="text-sm font-bold px-4 py-2 rounded-full shadow"
        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#1a0a00" }}>
        {teacher.role}
      </span>
    </motion.div>
  );
}