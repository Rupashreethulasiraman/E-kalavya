"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, IndianRupee, ChevronRight } from "lucide-react";

interface BoardCourseCardProps {
  title: string;
  slug: string;
  subjects?: string[];
  price?:
    | { monthly?: number; annual?: number }
    | number;
}

export default function BoardCourseCard({
  title,
  slug,
  subjects = [],
  price,
}: BoardCourseCardProps) {
  const [modal, setModal] = useState<null | "subjects" | "enroll">(null);

  const monthly =
    typeof price === "object" && price !== null
      ? price.monthly
      : typeof price === "number"
      ? price
      : undefined;
  const annual =
    typeof price === "object" && price !== null ? price.annual : undefined;

  const hasPrice = monthly !== undefined || annual !== undefined;

  const subjectIcons: Record<string, string> = {
    English: "📖", Maths: "📐", Science: "🔬", Social: "🌍",
    Physics: "⚛️", Chemistry: "🧪", Biology: "🧬", Computer: "💻",
    History: "📜", Geography: "🗺️", Tamil: "✍️", Hindi: "🇮🇳",
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(124,58,237,0.15)" }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl flex flex-col"
        style={{
          background: "white",
          border: "1.5px solid #ede9fe",
          boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
          height: "200px",
        }}
      >
        <div
          className="h-1.5 rounded-t-2xl flex-shrink-0"
          style={{ background: "linear-gradient(90deg,#7c3aed,#f59e0b)" }}
        />

        <div className="flex flex-col flex-1 p-5 justify-between">
          <h3 className="font-extrabold text-base leading-snug" style={{ color: "#1e0a3c" }}>
            {title}
          </h3>

          <div className="flex gap-2 mt-auto pt-4">
            <button
              onClick={() => setModal("subjects")}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl border-2 transition-all duration-200"
              style={{ borderColor: "#7c3aed", color: "#7c3aed", background: "white" }}
            >
              <BookOpen size={13} /> View Subjects
            </button>

            <button
              onClick={() => setModal("enroll")}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#1a0a00" }}
            >
              Enroll Now <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(30,10,60,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setModal(null)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ background: "white", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}
              onClick={e => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: "linear-gradient(135deg,#6d28d9,#4c1d95)" }}
              >
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#c4b5fd" }}>
                    {modal === "subjects" ? "Course Curriculum" : "Enrollment & Fees"}
                  </p>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">{title}</h3>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                >
                  <X size={16} />
                </button>
              </div>

              {modal === "subjects" && (
                <div className="p-6">
                  <p className="text-sm font-semibold mb-4" style={{ color: "#6b7280" }}>
                    {subjects.length} subject{subjects.length !== 1 ? "s" : ""} included
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {subjects.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 rounded-xl px-4 py-3"
                        style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
                      >
                        <span className="text-lg">{subjectIcons[s] ?? "📚"}</span>
                        <span className="text-sm font-bold" style={{ color: "#4c1d95" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setModal("enroll")}
                    className="mt-5 w-full py-3 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#1a0a00" }}
                  >
                    Proceed to Enroll →
                  </button>
                </div>
              )}

              {modal === "enroll" && (
                <div className="p-6">
                  {hasPrice ? (
                    <>
                      <p className="text-sm font-bold mb-4 flex items-center gap-1" style={{ color: "#6d28d9" }}>
                        <IndianRupee size={14} /> Choose your plan
                      </p>
                      <div className="space-y-3 mb-5">
                        {monthly !== undefined && (
                          <div
                            className="flex items-center justify-between rounded-xl px-5 py-4"
                            style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd" }}
                          >
                            <div>
                              <p className="font-extrabold text-sm" style={{ color: "#1e0a3c" }}>Monthly Plan</p>
                              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>Billed every month</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-extrabold" style={{ color: "#7c3aed" }}>₹{monthly.toLocaleString("en-IN")}</p>
                              <p className="text-xs" style={{ color: "#6b7280" }}>/month</p>
                            </div>
                          </div>
                        )}
                        {annual !== undefined && (
                          <div
                            className="flex items-center justify-between rounded-xl px-5 py-4 relative"
                            style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", border: "1.5px solid #7c3aed" }}
                          >
                            <span
                              className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "#dcfce7", color: "#16a34a" }}
                            >
                              Best Value
                            </span>
                            <div>
                              <p className="font-extrabold text-sm" style={{ color: "#1e0a3c" }}>Annual Plan</p>
                              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>Billed once a year</p>
                              {monthly !== undefined && (
                                <p className="text-xs mt-1 font-bold" style={{ color: "#16a34a" }}>
                                  Save ₹{(monthly * 12 - annual).toLocaleString("en-IN")}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-extrabold" style={{ color: "#7c3aed" }}>₹{annual.toLocaleString("en-IN")}</p>
                              <p className="text-xs" style={{ color: "#6b7280" }}>/year</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/courses/${encodeURIComponent(slug)}`}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          gap: "6px", width: "100%", padding: "14px", borderRadius: "12px",
                          background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                          color: "#ffffff", fontWeight: 800, fontSize: "0.9rem",
                          textDecoration: "none", boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                        }}
                        onClick={() => setModal(null)}
                      >
                        Pay & Enroll Now <ChevronRight size={16} />
                      </Link>
                      <p className="text-xs text-center mt-3" style={{ color: "#9ca3af" }}>
                        🔒 Secure payment via wallet · No hidden charges
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm mb-4" style={{ color: "#6b7280" }}>Contact us for pricing on this course.</p>
                      <Link
                        href={`/courses/${encodeURIComponent(slug)}`}
                        style={{
                          display: "inline-block", padding: "12px 32px", borderRadius: "12px",
                          background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                          color: "white", fontWeight: 700, textDecoration: "none",
                        }}
                        onClick={() => setModal(null)}
                      >
                        View Course Details
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}