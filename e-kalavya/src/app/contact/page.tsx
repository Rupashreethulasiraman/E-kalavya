"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Send, MapPin } from "lucide-react";

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    const whatsappMessage = `📩 New Contact Message – E-Kalavya\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const whatsappURL = "https://wa.me/917550101893?text=" + encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  }

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "14px",
    border: `2px solid ${focused === field ? "#7c3aed" : "#ede9fe"}`,
    background: focused === field ? "#faf8ff" : "white",
    fontSize: "0.95rem",
    color: "#1e0a3c",
    outline: "none",
    boxShadow: focused === field ? "0 0 0 4px rgba(124,58,237,0.08)" : "none",
    transition: "all 0.25s ease",
  });

  const contactItems = [
    {
      icon: <Mail size={22} />,
      label: "Email Us",
      value: "ekalavyavirtualclasses@gmail.com",
      href: "mailto:ekalavyavirtualclasses@gmail.com?subject=Course Enquiry",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    {
      icon: <Phone size={22} />,
      label: "Call Us",
      value: "+91 75501 01893",
      href: "tel:+917550101893",
      color: "#059669",
      bg: "#f0fdf4",
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Tamil Nadu, India",
      href: null,
      color: "#d97706",
      bg: "#fffbeb",
    },
  ];

  return (
    <main
      className="min-h-screen py-16 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f5f3ff 0%,#faf9ff 60%,#fef9ec 100%)" }}
    >
      {/* Decorative BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:-160, right:-160, width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:-120, left:-120, width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)" }}/>
        <svg className="absolute top-10 left-10 opacity-20" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 8"/>
        </svg>
        <svg className="absolute bottom-10 right-10 opacity-15" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 6"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm mb-6"
            style={{ background:"linear-gradient(135deg,#7c3aed,#5b21b6)", color:"white", boxShadow:"0 8px 24px rgba(124,58,237,0.3)" }}
          >
            💬 We'd love to hear from you
          </motion.div>

          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
            style={{ color:"#1e0a3c", fontFamily:"'Georgia',serif", letterSpacing:"-0.03em" }}
          >
            Get in{" "}
            <span style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Touch
            </span>
          </h1>
          <p style={{ color:"#4b4068", fontSize:"1.1rem", maxWidth:480, margin:"0 auto" }}>
            Have questions about our courses? Our team is ready to help you every step of the way.
          </p>
        </motion.div>

        {/* ── CONTACT CARDS ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(124,58,237,0.12)" }}
              className="rounded-2xl p-6 text-center"
              style={{
                background: "white",
                border: "1.5px solid #ede9fe",
                boxShadow: "0 4px 16px rgba(124,58,237,0.06)",
                transition: "all 0.25s ease",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: item.bg, color: item.color }}
              >
                {item.icon}
              </div>
              <p className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-bold text-sm break-all"
                  style={{ color: item.color }}
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-bold text-sm" style={{ color: "#1e0a3c" }}>{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── MAIN LAYOUT: Form + Sidebar ── */}
        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* FORM — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="md:col-span-3 rounded-3xl overflow-hidden"
            style={{
              background: "white",
              border: "1.5px solid #ede9fe",
              boxShadow: "0 24px 60px rgba(124,58,237,0.1)",
            }}
          >
            {/* Form header */}
            <div
              className="px-8 py-6 flex items-center gap-3 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#6d28d9,#4c1d95)" }}
            >
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"18px 18px" }}
              />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10"
                style={{ background:"rgba(255,255,255,0.2)" }}>
                <Send size={20} color="white" />
              </div>
              <div className="relative z-10">
                <h2 className="text-lg font-extrabold text-white">Send us a Message</h2>
                <p className="text-xs" style={{ color:"#c4b5fd" }}>We'll reply within 1 hour on WhatsApp</p>
              </div>
            </div>

            {/* Form fields */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name:"name", label:"Your Name", type:"text", placeholder:"e.g. Riya Sharma", required:true },
                  { name:"email", label:"Email Address", type:"email", placeholder:"you@example.com", required:true },
                  { name:"phone", label:"Phone Number", type:"tel", placeholder:"+91 75501 01893", required:true },
                  { name:"subject", label:"Subject", type:"text", placeholder:"How can we help?", required:false },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:800, color:"#7c3aed", marginBottom:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(field.name)}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display:"block", fontSize:"0.72rem", fontWeight:800, color:"#7c3aed", marginBottom:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize:"none" }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width:"100%", padding:"15px",
                    borderRadius:"16px", border:"none",
                    background:"linear-gradient(135deg,#f59e0b,#d97706)",
                    color:"#1a0a00", fontWeight:800, fontSize:"1rem",
                    cursor:"pointer",
                    boxShadow:"0 10px 32px rgba(245,158,11,0.4)",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    transition:"all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" fill="#1a0a00" viewBox="0 0 24 24">
                    <path d="M20.52 3.48C18.25 1.28 15.16 0 11.85 0c-6.35 0-11.53 5.18-11.53 11.53 0 2.03.53 4.02 1.54 5.79L0 24l6.35-1.67c1.68.92 3.57 1.39 5.5 1.39 6.35 0 11.53-5.18 11.53-11.53 0-3.08-1.2-5.98-3.36-8.15zM11.85 21.1c-1.72 0-3.41-.46-4.9-1.32l-.35-.21-3.63.95.97-3.54-.23-.36c-1.06-1.68-1.62-3.62-1.62-5.62 0-5.29 4.31-9.6 9.6-9.6 2.56 0 4.97 1.0 6.78 2.81 1.81 1.81 2.81 4.22 2.81 6.78 0 5.29-4.31 9.6-9.6 9.6zm5.24-7.2c-.29-.14-1.7-.84-1.97-.94-.27-.1-.46-.14-.65.15-.19.29-.74.93-.91 1.12-.17.19-.33.22-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2.0-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.03-.5-.08-.14-.65-1.57-.89-2.15-.23-.56-.47-.49-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.27.29-1.0.98-1.0 2.4 0 1.42 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.6.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.08-.12-.26-.19-.55-.32z"/>
                  </svg>
                  Send via WhatsApp
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* SIDEBAR — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="md:col-span-2 space-y-5"
          >
            {/* Quick reply card */}
            <div
              className="rounded-2xl p-6"
              style={{ background:"linear-gradient(135deg,#6d28d9,#4c1d95)", boxShadow:"0 16px 40px rgba(124,58,237,0.3)" }}
            >
              <p className="text-2xl mb-3">⚡</p>
              <h3 className="font-extrabold text-white text-lg mb-2">Quick Response</h3>
              <p className="text-sm leading-relaxed" style={{ color:"#c4b5fd" }}>
                Our team typically responds within <strong style={{ color:"white" }}>1 hour</strong> on WhatsApp during working hours.
              </p>
            </div>

            {/* Social links */}
            <div
              className="rounded-2xl p-6"
              style={{ background:"white", border:"1.5px solid #ede9fe", boxShadow:"0 4px 16px rgba(124,58,237,0.06)" }}
            >
              <h3 className="font-extrabold text-sm uppercase tracking-widest mb-4" style={{ color:"#9ca3af" }}>
                Follow Us
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ background:"#faf5ff", textDecoration:"none" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#f5f3ff";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#faf5ff";}}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:"linear-gradient(135deg,#e1306c,#fd1d1d,#fcb045)" }}>
                    <Instagram size={17} color="white" />
                  </div>
                  <span className="font-bold text-sm" style={{ color:"#1e0a3c" }}>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ background:"#f0f9ff", textDecoration:"none" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#e0f2fe";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#f0f9ff";}}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:"#0077b5" }}>
                    <svg width="17" height="17" fill="white" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="font-bold text-sm" style={{ color:"#1e0a3c" }}>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Working hours */}
            <div
              className="rounded-2xl p-6"
              style={{ background:"#fffbeb", border:"1.5px solid #fde68a", boxShadow:"0 4px 16px rgba(245,158,11,0.08)" }}
            >
              <p className="text-xl mb-2">🕐</p>
              <h3 className="font-extrabold text-sm mb-3" style={{ color:"#1e0a3c" }}>Working Hours</h3>
              {[
                { day:"Mon – Fri", time:"9:00 AM – 7:00 PM" },
                { day:"Saturday", time:"10:00 AM – 5:00 PM" },
                { day:"Sunday", time:"Closed" },
              ].map(h => (
                <div key={h.day} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor:"#fde68a" }}>
                  <span className="text-xs font-semibold" style={{ color:"#92400e" }}>{h.day}</span>
                  <span className="text-xs font-bold" style={{ color: h.time === "Closed" ? "#ef4444" : "#1e0a3c" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}