"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/book-demo", label: "Book Demo" },
    { href: "/study-materials", label: "Study Materials" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "white", borderColor: "#ede9fe", boxShadow: "0 2px 20px rgba(124,58,237,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="flex items-center gap-2 group" style={{ color: "inherit" }}>
              <Image
                src="/logo-new.png"
                alt="E-Kalavya Logo"
                width={38}
                height={38}
                priority
                className="transition-transform duration-300 group-hover:rotate-6"
              />
              <span
                className="text-xl font-extrabold tracking-tight"
                style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                E-Kalavya
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  style={{
                    color: isActive(link.href) ? "#7c3aed" : "#374151",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    borderBottom: isActive(link.href) ? "2px solid #7c3aed" : "2px solid transparent",
                    paddingBottom: "2px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isActive(link.href)) (e.target as HTMLElement).style.color = "#7c3aed"; }}
                  onMouseLeave={e => { if (!isActive(link.href)) (e.target as HTMLElement).style.color = "#374151"; }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="hidden sm:block"
            >
              <Link
                href="/signup"
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(124,58,237,0.5)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(124,58,237,0.35)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                Sign up
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="hidden sm:block"
            >
              <Link
                href="/login"
                style={{
                  display: "inline-block",
                  padding: "7px 20px",
                  borderRadius: "9999px",
                  border: "2px solid #7c3aed",
                  color: "#7c3aed",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  background: "transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f3ff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                Login
              </Link>
            </motion.div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#7c3aed" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            className="md:hidden border-t py-4 space-y-2"
            style={{ borderColor: "#ede9fe", background: "white" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: isActive(link.href) ? "#7c3aed" : "#374151",
                  background: isActive(link.href) ? "#f5f3ff" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "10px 16px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                color: "#ffffff",
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "9px 16px",
                borderRadius: "10px",
                border: "2px solid #7c3aed",
                color: "#7c3aed",
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}