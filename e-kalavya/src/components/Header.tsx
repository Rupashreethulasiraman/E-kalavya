"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    `transition font-medium ${
      active
        ? "text-violet-700"
        : "text-slate-700 hover:text-violet-700"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* ✅ LOGO + BRAND */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="E-Kalavya Logo"
              width={36}
              height={36}
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
            <span className="text-2xl font-bold text-violet-700">
              e-kalavya
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={linkClass(pathname === "/")}>
              Home
            </Link>
            <Link
              href="/courses"
              className={linkClass(pathname.startsWith("/courses"))}
            >
              Courses
            </Link>
            <Link
              href="/book-demo"
              className={linkClass(pathname === "/book-demo")}
            >
              Book Demo
            </Link>
            <Link
              href="/study-materials"
              className={linkClass(pathname === "/study-materials")}
            >
              Study Materials
            </Link>
            <Link href="/about" className={linkClass(pathname === "/about")}>
              About
            </Link>
            <Link href="/contact" className={linkClass(pathname === "/contact")}>
              Contact
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/signup"
              className="px-5 py-2 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-violet-700 text-violet-700 font-semibold hover:bg-violet-50"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
