import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

/* ================= COURSE TYPE ================= */
export type CourseDoc = {
  slug: string;
  title: string;
  short: string;
  long?: string;

  instructor: string; // ✅ REQUIRED (FIX)

  pricing: {
    monthly: number;
    annual: number;
  };

  duration?: string;
  difficulty?: string;
  category?: string;
  syllabus: string[];
  thumbnail?: string;
};

/* ================= GET SINGLE COURSE ================= */
export async function getCourse(slug: string): Promise<CourseDoc | null> {
  const ref = doc(db, "courses", slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as CourseDoc;
}
