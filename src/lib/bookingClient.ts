import { db } from "@/lib/firebaseClient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function bookDemo(
  userId: string,
  name: string,
  email: string,
  course: string
) {
  if (!userId || !name || !email || !course) {
    throw new Error("Missing booking details");
  }

  await addDoc(collection(db, "bookings"), {
    userId,
    name,
    email,
    course,
    createdAt: serverTimestamp(),
    status: "pending",
  });
}
