import { doc, setDoc, serverTimestamp, runTransaction } from "firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export interface Transaction {
  userId: string;
  amount: number;
  status: "success" | "pending" | "failed";
  easebuzz_txn_id: string;
  purpose: string;
  createdAt: Timestamp | Date; // Firestore timestamp
  updatedAt?: Timestamp | Date;
}

/**
 * Create a transaction record in Firestore
 */
export async function createTransaction(
  transaction: Omit<Transaction, "createdAt" | "updatedAt">
): Promise<string> {
  const transactionRef = doc(
    db,
    "transactions",
    `${transaction.userId}_${Date.now()}`
  );

  await setDoc(transactionRef, {
    ...transaction,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return transactionRef.id;
}

/**
 * Update transaction status after payment confirmation
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: "success" | "failed",
  updatedData?: Record<string, string | number | Record<string, unknown>>
): Promise<void> {
  const transactionRef = doc(db, "transactions", transactionId);

  await setDoc(
    transactionRef,
    {
      status,
      updatedAt: serverTimestamp(),
      ...updatedData,
    },
    { merge: true }
  );
}

/**
 * Update wallet balance after successful payment
 */
export async function updateWalletBalance(
  userId: string,
  amount: number
): Promise<void> {
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

/**
 * Get transaction by ID
 */
export async function getTransactionById(
  transactionId: string
): Promise<Transaction | null> {
  const { getDoc } = await import("firebase/firestore");
  const transactionRef = doc(db, "transactions", transactionId);
  const snap = await getDoc(transactionRef);

  if (!snap.exists()) {
    return null;
  }

  return snap.data() as Transaction;
}
