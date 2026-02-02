"use client";
import { useEffect } from "react";

export default function EnvDebug() {
  useEffect(() => {
    // simple, guaranteed log
    console.log("ENV-DEBUG: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ->", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    console.log("ENV-DEBUG: window.location.href ->", window.location.href);
  }, []);

  return null;
}
