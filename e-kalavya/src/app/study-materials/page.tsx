"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import MaterialContactModal from "@/components/MaterialContactModal";

const STUDY_MATERIALS = [
  {
    class: "Class 9",
    emoji: "9️⃣",
    color: "#7c3aed",
    subjects: [
      {
        name: "Mathematics",
        icon: "📐",
        materials: [
          "Algebra – Practice Problems",
          "Linear Equations – Notes",
          "Polynomials – Worksheet",
        ],
      },
      {
        name: "Physics",
        icon: "⚛️",
        materials: [
          "Motion – Key Concepts",
          "Force & Laws – Question Bank",
        ],
      },
    ],
  },
  {
    class: "Class 10",
    emoji: "🔟",
    color: "#5b21b6",
    subjects: [
      {
        name: "Chemistry",
        icon: "🧪",
        materials: [
          "Chemical Reactions – Notes",
          "Acids & Bases – Practice Set",
        ],
      },
    ],
  },
];

export default function StudyMaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [openClass, setOpenClass] = useState<string | null>("Class 9");
  const [search, setSearch] = useState("");

  const filtered = STUDY_MATERIALS.map(group => ({
    ...group,
    subjects: group.subjects.map(subject => ({
      ...subject,
      materials: subject.materials.filter(m =>
        m.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(s => s.materials.length > 0),
  })).filter(g => g.subjects.length > 0);

  return (
    <main
      className="min-h-screen py-16 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f5f3ff 0%,#faf9ff 60%,#fef9ec 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:-150, right:-150, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-100, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)" }}/>
        <svg className="absolute top-8 right-8 opacity-20" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 8"/>
        </svg>
        <svg className="absolute bottom-12 left-8 opacity-15" width="70" height="70" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="28" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 6"/>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── HERO HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm mb-6"
            style={{ background:"linear-gradient(135deg,#7c3aed,#5b21b6)", color:"white", boxShadow:"0 8px 24px rgba(124,58,237,0.3)" }}
          >
            <BookOpen size={15} /> Free Study Materials
          </motion.div>

          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
            style={{ color:"#1e0a3c", fontFamily:"'Georgia',serif", letterSpacing:"-0.03em" }}
          >
            Study{" "}
            <span style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Materials
            </span>
          </h1>
          <p className="text-lg" style={{ color:"#4b4068", maxWidth:480, margin:"0 auto" }}>
            Curated notes, worksheets & question banks prepared by our expert teachers.
          </p>
        </motion.div>

        {/* ── SEARCH BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-10"
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"#a78bfa" }} />
          <input
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width:"100%", padding:"14px 18px 14px 44px",
              borderRadius:"16px", border:"2px solid #ede9fe",
              background:"white", fontSize:"0.95rem", color:"#1e0a3c",
              outline:"none", boxShadow:"0 4px 16px rgba(124,58,237,0.06)",
              transition:"all 0.2s ease",
            }}
            onFocus={e => { e.currentTarget.style.borderColor="#7c3aed"; e.currentTarget.style.boxShadow="0 0 0 4px rgba(124,58,237,0.1)"; }}
            onBlur={e => { e.currentTarget.style.borderColor="#ede9fe"; e.currentTarget.style.boxShadow="0 4px 16px rgba(124,58,237,0.06)"; }}
          />
        </motion.div>

        {/* ── CLASS ACCORDION ── */}
        <div className="space-y-4">
          {filtered.map((group, gi) => (
            <motion.div
              key={group.class}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ border:"1.5px solid #ede9fe", boxShadow:"0 4px 20px rgba(124,58,237,0.06)" }}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setOpenClass(openClass === group.class ? null : group.class)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
                style={{
                  background: openClass === group.class
                    ? "linear-gradient(135deg,#6d28d9,#5b21b6)"
                    : "white",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                    style={{
                      background: openClass === group.class ? "rgba(255,255,255,0.2)" : "#f5f3ff",
                    }}
                  >
                    {group.emoji}
                  </span>
                  <div>
                    <h2
                      className="text-xl font-extrabold"
                      style={{ color: openClass === group.class ? "white" : "#1e0a3c" }}
                    >
                      {group.class}
                    </h2>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: openClass === group.class ? "#c4b5fd" : "#6b7280" }}
                    >
                      {group.subjects.reduce((a, s) => a + s.materials.length, 0)} materials available
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openClass === group.class ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={22} style={{ color: openClass === group.class ? "white" : "#7c3aed" }} />
                </motion.div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence>
                {openClass === group.class && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{ overflow: "hidden", background: "white" }}
                  >
                    <div className="p-6 pt-2 space-y-8">
                      {group.subjects.map((subject, si) => (
                        <motion.div
                          key={subject.name}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: si * 0.08 }}
                        >
                          {/* Subject header */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">{subject.icon}</span>
                            <h3 className="text-base font-extrabold" style={{ color:"#1e0a3c" }}>
                              {subject.name}
                            </h3>
                            <div className="flex-1 h-px ml-2" style={{ background:"#ede9fe" }} />
                          </div>

                          {/* Materials grid */}
                          <div className="grid md:grid-cols-2 gap-3">
                            {subject.materials.map((material, mi) => (
                              <motion.button
                                key={material}
                                onClick={() => setSelectedMaterial(material)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-left flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 group"
                                style={{
                                  background:"#faf9ff",
                                  border:"1.5px solid #ede9fe",
                                  boxShadow:"0 2px 8px rgba(124,58,237,0.04)",
                                  cursor:"pointer",
                                }}
                                onMouseEnter={e => {
                                  (e.currentTarget as HTMLElement).style.background = "#f5f3ff";
                                  (e.currentTarget as HTMLElement).style.borderColor = "#a78bfa";
                                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(124,58,237,0.12)";
                                }}
                                onMouseLeave={e => {
                                  (e.currentTarget as HTMLElement).style.background = "#faf9ff";
                                  (e.currentTarget as HTMLElement).style.borderColor = "#ede9fe";
                                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(124,58,237,0.04)";
                                }}
                              >
                                <div
                                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                                  style={{ background:"linear-gradient(135deg,#ede9fe,#ddd6fe)", color:"#7c3aed", fontWeight:700 }}
                                >
                                  📘
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold truncate" style={{ color:"#1e0a3c" }}>
                                    {material}
                                  </p>
                                  <p className="text-xs mt-0.5" style={{ color:"#9ca3af" }}>
                                    Tap to request
                                  </p>
                                </div>
                                <div
                                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background:"#f5f3ff", color:"#7c3aed" }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                  </svg>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-bold text-lg" style={{ color:"#1e0a3c" }}>No materials found</p>
            <p className="text-sm mt-1" style={{ color:"#6b7280" }}>Try a different search term</p>
          </motion.div>
        )}

      </div>

      <MaterialContactModal
        isOpen={selectedMaterial !== null}
        onClose={() => setSelectedMaterial(null)}
        materialName={selectedMaterial || ""}
      />
    </main>
  );
}