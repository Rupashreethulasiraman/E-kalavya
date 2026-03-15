import crypto from "crypto";

/**
 * Easebuzz hash generation for payment links
 * Using SHA512 algorithm with key|data|salt pattern
 */
export function generateEasebuzzHash(
  data: Record<string, string | number>,
  salt: string
): string {
  // Sort keys alphabetically and create query string
  const keys = Object.keys(data).sort();
  const queryString = keys.map((key) => `${key}=${data[key]}`).join("&");

  // Hash: SHA512(key|querystring|salt)
  const hash = crypto
    .createHash("sha512")
    .update(`${queryString}|${salt}`)
    .digest("hex");

  return hash;
}

/**
 * Verify Easebuzz response hash for success/failure pages
 */
export function verifyEasebuzzHash(
  responseData: Record<string, string>,
  salt: string
): boolean {
  try {
    // Extract hash from response
    const receivedHash = responseData.hash;
    if (!receivedHash) return false;

    // Create hash string from response params (excluding hash itself)
    const dataToHash = { ...responseData };
    delete dataToHash.hash;

    // Sort keys alphabetically
    const keys = Object.keys(dataToHash).sort();
    const hashString = keys.map((key) => `${key}=${dataToHash[key]}`).join("|");

    // Generate hash: SHA512(hashString|salt)
    const calculatedHash = crypto
      .createHash("sha512")
      .update(`${hashString}|${salt}`)
      .digest("hex");

    return calculatedHash === receivedHash;
  } catch {
    return false;
  }
}

/**
 * Create Easebuzz payment link request payload
 */
export function createPaymentLinkPayload(
  userId: string,
  email: string,
  amount: number,
  purpose: string,
  key: string,
  salt: string
) {
  const txnId = `TXN_${userId}_${Date.now()}`;

  const payload = {
    key,
    txn_id: txnId,
    amount: amount.toString(),
    email,
    phone: "0000000000", // Placeholder - can be updated if user has phone
    purpose,
    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/wallet/success`,
    s2_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/wallet/failure`,
  };

  // Generate hash
  const hash = generateEasebuzzHash(
    {
      key: payload.key,
      txn_id: payload.txn_id,
      amount: payload.amount,
      email: payload.email,
      phone: payload.phone,
      purpose: payload.purpose,
      redirect_url: payload.redirect_url,
      s2_url: payload.s2_url,
    },
    salt
  );

  return {
    ...payload,
    hash,
  };
}
