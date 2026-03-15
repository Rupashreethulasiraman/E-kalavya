import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export async function enrollWithWallet(
  userId: string,
  userEmail: string,
  courseSlug: string,
  price: number,
  plan: "monthly" | "annual"
) {
  try {
    await runTransaction(db, async (transaction) => {
      /* ================= WALLET ================= */
      const walletRef = doc(db, "wallets", userId);
      const walletSnap = await transaction.get(walletRef);

      if (!walletSnap.exists()) {
        throw new Error("Wallet not found");
      }

      const balance = walletSnap.data().balance ?? 0;

      if (balance < price) {
        throw new Error("Insufficient wallet balance");
      }

      /* ================= DEDUCT MONEY ================= */
      transaction.update(walletRef, {
        balance: balance - price,
        updatedAt: serverTimestamp(),
      });

      /* ================= ENROLL USER ================= */
      const enrollmentRef = doc(db, "enrollments", `${userId}_${courseSlug}`);

      transaction.set(enrollmentRef, {
        userId,
        userEmail,
        courseSlug,
        plan, // ✅ store plan
        price, // ✅ store paid amount
        status: "active",
        purchasedAt: serverTimestamp(),
      });
    });

    return true;
  } catch (error) {
    console.error("❌ Wallet enrollment failed:", error);
    throw error;
  }
}
