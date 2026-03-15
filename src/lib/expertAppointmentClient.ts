import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseClient";

export async function bookExpertAppointment(
  name: string,
  email: string,
  date: string,
  timeSlot: string
) {
  await addDoc(collection(db, "expertAppointments"), {
    name,
    email,
    date,
    timeSlot,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
