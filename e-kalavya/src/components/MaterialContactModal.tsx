"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MaterialContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialName: string;
}

export default function MaterialContactModal({
  isOpen,
  onClose,
  materialName,
}: MaterialContactModalProps) {
  const whatsappLink = `https://wa.me/917550101893?text=${encodeURIComponent(`Hello! I would like to request the study material: ${materialName}`)}`;
  const phoneLink = "tel:+917550101893";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(15,5,35,0.7)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 32 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Glow behind card */}
              <div style={{
                position: "absolute", inset: -2, borderRadius: 32,
                background: "linear-gradient(135deg,#7c3aed,#f59e0b,#7c3aed)",
                opacity: 0.4, filter: "blur(16px)", zIndex: -1,
              }} />

              {/* Card */}
              <div style={{
                background: "white", borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}>

                {/* TOP SECTION — material info */}
                <div style={{
                  padding: "28px 24px 24px",
                  background: "linear-gradient(160deg,#f5f3ff 0%,#ede9fe 100%)",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Decorative circles */}
                  <div style={{
                    position:"absolute", top:-40, right:-40,
                    width:140, height:140, borderRadius:"50%",
                    background:"rgba(124,58,237,0.1)",
                  }}/>
                  <div style={{
                    position:"absolute", bottom:-30, left:-20,
                    width:100, height:100, borderRadius:"50%",
                    background:"rgba(245,158,11,0.08)",
                  }}/>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    style={{
                      position:"absolute", top:16, right:16,
                      width:32, height:32, borderRadius:"50%",
                      background:"rgba(124,58,237,0.12)",
                      border:"none", cursor:"pointer",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#7c3aed", transition:"all 0.2s ease",
                    }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(124,58,237,0.2)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(124,58,237,0.12)";}}
                  >
                    <X size={15}/>
                  </button>

                  {/* Book icon */}
                  <div style={{
                    width:56, height:56, borderRadius:16,
                    background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"1.6rem", marginBottom:14,
                    boxShadow:"0 8px 24px rgba(124,58,237,0.35)",
                  }}>
                    📘
                  </div>

                  <p style={{
                    fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.1em",
                    textTransform:"uppercase", color:"#7c3aed", marginBottom:6,
                  }}>
                    Requested Material
                  </p>
                  <h2 style={{
                    fontSize:"1.15rem", fontWeight:900, color:"#1e0a3c",
                    lineHeight:1.3, fontFamily:"'Georgia',serif",
                    position:"relative", zIndex:1,
                  }}>
                    {materialName}
                  </h2>
                </div>

                {/* BOTTOM SECTION — actions */}
                <div style={{ padding:"24px" }}>
                  <p style={{
                    fontSize:"0.85rem", color:"#6b7280", textAlign:"center",
                    lineHeight:1.6, marginBottom:20,
                  }}>
                    Contact us to receive this material and get expert academic support.
                  </p>

                  {/* WhatsApp */}
                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"center",
                      gap:10, width:"100%", padding:"15px",
                      borderRadius:16, marginBottom:10,
                      background:"linear-gradient(135deg,#22c55e,#16a34a)",
                      color:"white", fontWeight:800, fontSize:"0.95rem",
                      textDecoration:"none",
                      boxShadow:"0 8px 28px rgba(34,197,94,0.4)",
                      transition:"box-shadow 0.2s ease",
                    }}
                  >
                    <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                      <path d="M20.52 3.48C18.25 1.28 15.16 0 11.85 0c-6.35 0-11.53 5.18-11.53 11.53 0 2.03.53 4.02 1.54 5.79L0 24l6.35-1.67c1.68.92 3.57 1.39 5.5 1.39 6.35 0 11.53-5.18 11.53-11.53 0-3.08-1.2-5.98-3.36-8.15zM11.85 21.1c-1.72 0-3.41-.46-4.9-1.32l-.35-.21-3.63.95.97-3.54-.23-.36c-1.06-1.68-1.62-3.62-1.62-5.62 0-5.29 4.31-9.6 9.6-9.6 2.56 0 4.97 1.0 6.78 2.81 1.81 1.81 2.81 4.22 2.81 6.78 0 5.29-4.31 9.6-9.6 9.6zm5.24-7.2c-.29-.14-1.7-.84-1.97-.94-.27-.1-.46-.14-.65.15-.19.29-.74.93-.91 1.12-.17.19-.33.22-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2.0-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.03-.5-.08-.14-.65-1.57-.89-2.15-.23-.56-.47-.49-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.27.29-1.0.98-1.0 2.4 0 1.42 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.6.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.08-.12-.26-.19-.55-.32z"/>
                    </svg>
                    Chat on WhatsApp
                  </motion.a>

                  {/* Call */}
                  <motion.a
                    href={phoneLink}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"center",
                      gap:10, width:"100%", padding:"14px",
                      borderRadius:16, marginBottom:10,
                      background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
                      color:"white", fontWeight:700, fontSize:"0.9rem",
                      textDecoration:"none",
                      boxShadow:"0 8px 24px rgba(124,58,237,0.35)",
                      transition:"box-shadow 0.2s ease",
                    }}
                  >
                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Call Us Now
                  </motion.a>

                  {/* Divider */}
                  <div style={{ display:"flex", alignItems:"center", gap:10, margin:"4px 0 12px" }}>
                    <div style={{ flex:1, height:1, background:"#f3f0ff" }}/>
                    <span style={{ fontSize:"0.7rem", color:"#c4b5fd", fontWeight:600 }}>or</span>
                    <div style={{ flex:1, height:1, background:"#f3f0ff" }}/>
                  </div>

                  {/* Maybe Later */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width:"100%", padding:"12px",
                      borderRadius:14, border:"1.5px solid #ede9fe",
                      background:"#faf9ff", color:"#6b7280",
                      fontWeight:600, fontSize:"0.85rem",
                      cursor:"pointer", transition:"all 0.2s ease",
                    }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#c4b5fd"; (e.currentTarget as HTMLElement).style.color="#7c3aed";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#ede9fe"; (e.currentTarget as HTMLElement).style.color="#6b7280";}}
                  >
                    Maybe Later
                  </motion.button>

                  {/* Footer */}
                  <p style={{
                    textAlign:"center", marginTop:14,
                    fontSize:"0.72rem", color:"#9ca3af",
                  }}>
                    ⏱️ Usually replies within <strong style={{color:"#4b4068"}}>1 hour</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}