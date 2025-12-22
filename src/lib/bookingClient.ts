import { db } from "@/lib/firebaseClient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function bookDemo(
  name: string,
  email: string,
  course: string
) {
  if (!name || !email || !course) {
    throw new Error("Missing booking details");
  }

  await addDoc(collection(db, "bookings"), {
    name,
    email,
    course,
    createdAt: serverTimestamp(),
    status: "pending",
  });
}
