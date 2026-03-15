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

  const linkClass = (active: boolean) =>
    `transition-all duration-300 font-semibold text-sm ${
      active
        ? "text-violet-700 border-b-2 border-violet-700 pb-0.5"
        : "text-slate-700 hover:text-violet-700"
    }`;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/book-demo", label: "Book Demo" },
    { href: "/study-materials", label: "Study Materials" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-sm bg-opacity-95 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* ✅ LOGO + BRAND */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="E-Kalavya Logo"
                width={40}
                height={40}
                priority
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent group-hover:from-violet-700 group-hover:to-violet-900 transition-all">
                E-Kalavya
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link href={link.href} className={linkClass(pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)))}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link
                href="/signup"
                className="hidden sm:inline-block px-5 py-2 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Link
                href="/login"
                className="hidden sm:inline-block px-5 py-2 rounded-full border-2 border-violet-700 text-violet-700 font-semibold hover:bg-violet-50 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden border-t border-gray-100 py-4 space-y-3 bg-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-all ${
                  pathname === link.href || pathname.startsWith(link.href)
                    ? "bg-violet-100 text-violet-700 font-semibold"
                    : "text-slate-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="block px-4 py-2 rounded-lg bg-violet-700 text-white font-semibold text-center hover:bg-violet-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 rounded-lg border-2 border-violet-700 text-violet-700 font-semibold text-center hover:bg-violet-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}