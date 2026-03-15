import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Kalavya",
  description: "E-Kalavya - Learn and grow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
        min-h-screen flex flex-col antialiased
        bg-gray-50 text-slate-900`}
      >
        <AuthProvider>
          {/* HEADER */}
          <Header />

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <Container>{children}</Container>
          </main>

          {/* FOOTER (contains policy links) */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
