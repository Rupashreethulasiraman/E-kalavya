"use client";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient"; 
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

/**
 * Type definition for a demo booking
 */
export type Booking = {
  id: string;
  courseSlug: string;
  userId: string;
  userEmail: string;
  date: Timestamp;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Timestamp;
};

/**
 * Create a new demo booking in Firestore
 * @param courseSlug - The course slug being booked for
 * @param date - The date of the demo (as Date or string)
 * @param message - Optional message/notes from user
 * @param user - Current authenticated Firebase user
 */
export async function createBooking({
  courseSlug,
  date,
  message,
  user,
}: {
  courseSlug?: string;
  date: Date | string;
  message: string;
  user: User;
}): Promise<string> {
  try {
    const bookingDate =
      typeof date === "string" ? new Date(date) : date;

    const docRef = await addDoc(collection(db, "bookings"), {
      courseSlug: courseSlug || "general",
      userId: user.uid,
      userEmail: user.email || "",
      date: Timestamp.fromDate(bookingDate),
      message,
      status: "pending",
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/**
 * React hook to fetch and subscribe to user's bookings in realtime
 * @returns Bookings array and loading state
 */
export function useUserBookings(user: User | null) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      // Query all bookings for this user
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );

      // Subscribe to realtime updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookingsList: Booking[] = [];
        querySnapshot.forEach((doc) => {
          bookingsList.push({
            id: doc.id,
            ...doc.data(),
          } as Booking);
        });

        // Sort by date descending (newest first)
        bookingsList.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());

        setBookings(bookingsList);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings");
      setLoading(false);
    }
  }, [user]);

  return { bookings, loading, error };
}
