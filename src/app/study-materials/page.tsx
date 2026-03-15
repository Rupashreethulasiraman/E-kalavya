"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, BookOpen, ChevronDown, ClipboardList, FileText, HeartPulse, Layers, Search, School, Target, HelpCircle } from "lucide-react";

const STUDY_MATERIALS = [
  {
    class: "Matric Class 9",
    icon: <School size={22} />,
    color: "#7c3aed",
    board: "Matric",
  },
  {
    class: "Matric Class 10",
    icon: <School size={22} />,
    color: "#5b21b6",
    board: "Matric",
  },
  {
    class: "Matric Class 11 - PCMB",
    icon: <School size={22} />,
    color: "#4c1d95",
    board: "Matric",
  },
  {
    class: "Matric Class 11 - Commerce",
    icon: <School size={22} />,
    color: "#4c1d95",
    board: "Matric",
  },
  {
    class: "Matric Class 12 - PCMB",
    icon: <School size={22} />,
    color: "#2d1b69",
    board: "Matric",
  },
  {
    class: "Matric Class 12 - Commerce",
    icon: <School size={22} />,
    color: "#2d1b69",
    board: "Matric",
  },
  {
    class: "CBSE Class 9",
    icon: <BookOpen size={22} />,
    color: "#dc2626",
    board: "CBSE",
  },
  {
    class: "CBSE Class 10",
    icon: <BookOpen size={22} />,
    color: "#b91c1c",
    board: "CBSE",
  },
  {
    class: "CBSE Class 11",
    icon: <BookOpen size={22} />,
    color: "#991b1b",
    board: "CBSE",
  },
  {
    class: "CBSE Class 12",
    icon: <BookOpen size={22} />,
    color: "#7f1d1d",
    board: "CBSE",
  },
  {
    class: "ICSE Class 9",
    icon: <BookOpen size={22} />,
    color: "#059669",
    board: "ICSE",
  },
  {
    class: "ICSE Class 10",
    icon: <BookOpen size={22} />,
    color: "#047857",
    board: "ICSE",
  },
  {
    class: "ICSE Class 11",
    icon: <BookOpen size={22} />,
    color: "#065f46",
    board: "ICSE",
  },
  {
    class: "ICSE Class 12",
    icon: <BookOpen size={22} />,
    color: "#064e3b",
    board: "ICSE",
  },
  {
    class: "JEE",
    icon: <Atom size={22} />,
    color: "#f97316",
    board: "Competitive",
  },
  {
    class: "NEET",
    icon: <HeartPulse size={22} />,
    color: "#10b981",
    board: "Competitive",
  },
  {
    class: "Foundation",
    icon: <Layers size={22} />,
    color: "#3b82f6",
    board: "Competitive",
  },
];

export default function StudyMaterialsPage() {
  const [openClass, setOpenClass] = useState<string | null>("Matric Class 9");
  const [search, setSearch] = useState("");

  const filtered = STUDY_MATERIALS.filter(group =>
    group.class.toLowerCase().includes(search.toLowerCase()) ||
    group.board.toLowerCase().includes(search.toLowerCase())
  );

  const handleMaterialRequest = (className: string, type: string) => {
    const message = `Hello! I would like to request ${type} study material for ${className}`;
    const whatsappLink = `https://wa.me/917550101893?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

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
            Request study materials by type and get them delivered via WhatsApp.
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
                      color: group.color,
                    }}
                  >
                    {group.icon}
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
                      4 material types available
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
                    <div className="p-6 pt-2">
                      <p className="text-sm font-semibold mb-4" style={{ color: "#6b7280" }}>
                        Choose the type of study material you need:
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { type: "Theory", icon: <BookOpen size={20} />, color: "#7c3aed" },
                          { type: "Test Series", icon: <ClipboardList size={20} />, color: "#059669" },
                          { type: "Worksheet", icon: <FileText size={20} />, color: "#dc2626" },
                          { type: "MCQs", icon: <HelpCircle size={20} />, color: "#f59e0b" },
                        ].map((material, mi) => (
                          <motion.button
                            key={material.type}
                            onClick={() => handleMaterialRequest(group.class, material.type)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200"
                            style={{
                              background: "#faf9ff",
                              border: "1.5px solid #ede9fe",
                              boxShadow: "0 2px 8px rgba(124,58,237,0.04)",
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.background = "#f5f3ff";
                              (e.currentTarget as HTMLElement).style.borderColor = material.color;
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px rgba(${material.color === "#7c3aed" ? "124,58,237" : material.color === "#059669" ? "5,150,105" : material.color === "#dc2626" ? "220,38,38" : "245,158,11"},0.12)`;
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.background = "#faf9ff";
                              (e.currentTarget as HTMLElement).style.borderColor = "#ede9fe";
                              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(124,58,237,0.04)";
                            }}
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                              style={{ background: `linear-gradient(135deg,${material.color}20,${material.color}10)` }}
                            >
                              {material.icon}
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold" style={{ color: "#1e0a3c" }}>
                                {material.type}
                              </p>
                              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                                Tap to request
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
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
            <div className="mx-auto mb-4" style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(124,58,237,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Search size={32} style={{ color: "#7c3aed" }} />
            </div>
            <p className="font-bold text-lg" style={{ color:"#1e0a3c" }}>No materials found</p>
            <p className="text-sm mt-1" style={{ color:"#6b7280" }}>Try a different search term</p>
          </motion.div>
        )}

      </div>
    </main>
  );
}