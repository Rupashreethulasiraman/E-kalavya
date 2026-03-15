"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer style={{ background: "#1e0a3c", color: "#ffffff" }} className="relative overflow-hidden">

      {/* Subtle decorative orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

      {/* TOP ACCENT LINE */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7c3aed, #f59e0b, #7c3aed)" }} />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >

          {/* BRAND */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="group">
              <h3 className="text-3xl font-extrabold mb-3 transition-colors duration-300"
                style={{ color: "#f59e0b", fontFamily: "'Georgia', serif" }}>
                E-Kalavya
              </h3>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#c4b5fd" }}>
              India's trusted online learning platform for CBSE, ICSE, Matric, JEE &amp; NEET.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
                { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-xl transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.25)", color: "#c4b5fd" }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124,58,237,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants}>
            <h4 className="font-extrabold text-base mb-6 tracking-wide" style={{ color: "#f59e0b" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/courses" },
                { label: "Book Demo", href: "/book-demo" },
                { label: "Study Materials", href: "/study-materials" },
                { label: "Inspiration", href: "/inspiration" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium flex items-center gap-2 transition-all duration-300 group"
                    style={{ color: "#e2d9f3" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full transition-colors duration-300 group-hover:bg-yellow-400"
                      style={{ background: "#7c3aed", flexShrink: 0 }} />
                    <span className="group-hover:text-yellow-400 transition-colors duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COMPANY */}
          <motion.div variants={itemVariants}>
            <h4 className="font-extrabold text-base mb-6 tracking-wide" style={{ color: "#f59e0b" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Shipping Policy", href: "/shipping-policy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium flex items-center gap-2 transition-all duration-300 group"
                    style={{ color: "#e2d9f3" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full transition-colors duration-300 group-hover:bg-yellow-400"
                      style={{ background: "#7c3aed", flexShrink: 0 }} />
                    <span className="group-hover:text-yellow-400 transition-colors duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={itemVariants}>
            <h4 className="font-extrabold text-base mb-6 tracking-wide" style={{ color: "#f59e0b" }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917550101893"
                  className="flex items-start gap-3 text-sm transition-all duration-300 group"
                  style={{ color: "#e2d9f3" }}>
                  <Phone size={17} className="mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }} />
                  <span className="group-hover:text-yellow-400 transition-colors duration-300 font-medium">
                    +91 75501 01893
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:ekalavyavirtualclasses@gmail.com"
                  className="flex items-start gap-3 text-sm transition-all duration-300 group"
                  style={{ color: "#e2d9f3" }}>
                  <Mail size={17} className="mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }} />
                  <span className="group-hover:text-yellow-400 transition-colors duration-300 font-medium break-all">
                    ekalavyavirtualclasses@gmail.com
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: "#e2d9f3" }}>
                <MapPin size={17} className="mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }} />
                <span className="font-medium">Tamil Nadu, India</span>
              </li>
            </ul>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg"
                style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white" }}
              >
                Send us a Message
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>

        {/* DIVIDER */}
        <div className="h-px w-full mb-8" style={{ background: "rgba(124,58,237,0.3)" }} />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p style={{ color: "#a78bfa" }} className="font-medium">
            © {new Date().getFullYear()} E-Kalavya. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Terms", href: "/terms-and-conditions" },
              { label: "Refund", href: "/refund-policy" },
            ].map((link) => (
              <Link key={link.label} href={link.href}
                className="transition-colors duration-300 font-medium hover:text-yellow-400"
                style={{ color: "#a78bfa" }}>
                {link.label}
              </Link>
            ))}
          </div>
          <p style={{ color: "#7c3aed" }} className="font-medium">
            Made with ❤️ for student success
          </p>
        </div>

      </div>
    </footer>
  );
}