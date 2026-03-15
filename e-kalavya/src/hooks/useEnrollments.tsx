"use client";

import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient"; // ✅ CORRECT
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

/**
 * Enrollment type
 */
export type Enrollment = {
  id: string;
  courseSlug: string;
  userId: string;
  userEmail: string;
  purchasedAt: Timestamp;
  status: "active" | "completed" | "cancelled";
  plan?: "monthly" | "annual";
  price?: number;
};


/**
 * Enroll user in course (wallet-based or normal)
 */
export async function enrollCourse({
  courseSlug,
  user,
}: {
  courseSlug: string;
  user: User;
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "enrollments"), {
      courseSlug,
      userId: user.uid,
      userEmail: user.email || "",
      purchasedAt: Timestamp.now(),
      status: "active", // ✅ MATCHES TYPE
    });

    return docRef.id;
  } catch (error) {
    console.error("❌ Error enrolling in course:", error);
    throw error;
  }
}

/**
 * Hook: fetch only CURRENT USER enrollments
 */
export function useUserEnrollments(user: User | null) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!user) {
    setEnrollments([] as Enrollment[]);
    setLoading(false);
    return;
  }

  const q = query(
    collection(db, "enrollments"),
    where("userId", "==", user.uid)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const list: Enrollment[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Enrollment, "id">),
      }));

      list.sort(
        (a, b) =>
          b.purchasedAt.toDate().getTime() -
          a.purchasedAt.toDate().getTime()
      );

      setEnrollments(list);
      setLoading(false);
    },
    (err) => {
      console.error("Enrollment listener error:", err);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, [user]);


  return { enrollments, loading, error };
}
