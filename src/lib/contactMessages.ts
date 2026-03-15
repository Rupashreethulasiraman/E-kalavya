import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  await addDoc(collection(db, "contactMessages"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}
