import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

/* =========================
   GET WALLET BALANCE
========================= */
export async function getWalletBalance(userId: string): Promise<number> {
  const walletRef = doc(db, "wallets", userId);
  const snap = await getDoc(walletRef);

  if (!snap.exists()) {
    return 0;
  }

  return snap.data().balance ?? 0;
}

/* =========================
   ADD MONEY TO WALLET
   (TEMP – payment simulated)
========================= */
export async function addToWallet(userId: string, amount: number) {
  const walletRef = doc(db, "wallets", userId);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(walletRef);

    if (!snap.exists()) {
      throw new Error("Wallet not found");
    }

    const currentBalance = snap.data().balance || 0;

    transaction.update(walletRef, {
      balance: currentBalance + amount,
      updatedAt: serverTimestamp(),
    });
  });
}
