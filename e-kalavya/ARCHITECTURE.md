# Easebuzz Integration - Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────┐                  ┌──────────────────────┐ │
│  │ /wallet Page         │                  │ useAuth Hook        │ │
│  │ - Add Money Form     │                  │ - User State        │ │
│  │ - Balance Display    │◄────────────────►│ - Auth Context      │ │
│  │ - Input Validation   │                  │                    │ │
│  └──────────┬───────────┘                  └──────────────────────┘ │
│             │                                                       │
│             │ POST /api/payment                                     │
│             │ {userId, email, amount, purpose}                     │
│             ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Session Storage                                             │  │
│  │ - Store: lastTransactionId                                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                         │                                           │
└─────────────────────────┼───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER (Node.js)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  POST /api/payment/route.ts                                        │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ 1. Validate Input                                            │ │
│  │    - Check userId, email, amount                            │ │
│  │    - Verify minimum amount (₹100)                           │ │
│  │                                                              │ │
│  │ 2. Load Environment Variables                               │ │
│  │    - EASEBUZZ_KEY                                           │ │
│  │    - EASEBUZZ_SALT                                          │ │
│  │    - EASEBUZZ_BASE_URL                                      │ │
│  │                                                              │ │
│  │ 3. Create Pending Transaction in Firestore ──────────┐     │ │
│  │    - userId, amount, status="pending"                │     │ │
│  │    - txn_id, purpose, createdAt                       │     │ │
│  │                                                       │     │ │
│  │ 4. Generate Easebuzz Hash                            │     │ │
│  │    - SHA512 hash generation                          │     │ │
│  │    - Secure signature                                │     │ │
│  │                                                       │     │ │
│  │ 5. Create Payment Link Payload                       │     │ │
│  │    - key, txn_id, amount, email, etc.               │     │ │
│  │    - hash (calculated)                               │     │ │
│  │                                                       │     │ │
│  │ 6. Call Easebuzz API                                 │     │ │
│  │    - POST to payment-link endpoint                   │     │ │
│  │    - Receive payment_url                             │     │ │
│  │                                                       │     │ │
│  │ 7. Return Response to Client                         │     │ │
│  │    - success: true                                   │     │ │
│  │    - payment_url: "https://..."                      │     │ │
│  │    - transaction_id                                  │     │ │
│  └──────────────────────────────────────────────────────┼──┐  │ │
│                                                          │  │  │ │
└──────────────────────────────────────────────────────────┼──┼──┘ │
                                                           │  │
                                                           ▼  │
                        ┌──────────────────────────────────┘  │
                        │                                     │
                        ▼                                     │
             ┌─────────────────────────┐                     │
             │  FIREBASE FIRESTORE     │                     │
             │                         │                     │
             │ Collections:            │                     │
             │ - transactions/         │                     │
             │ - wallets/              │                     │
             │ - enrollments/          │                     │
             └─────────────────────────┘                     │
                                                             │
        ┌────────────────────────────────────────────────────┴───┐
        │                                                        │
        ▼                                                        │
┌────────────────────────────────────────────────────────────┐  │
│           EASEBUZZ PAYMENT GATEWAY                         │  │
├────────────────────────────────────────────────────────────┤  │
│                                                            │  │
│  Request:                                                 │  │
│  - key, txn_id, amount, email, purpose                   │  │
│  - redirect_url: /wallet/success                         │  │
│  - s2_url: /wallet/failure                               │  │
│  - hash (SHA512)                                          │  │
│                                                            │  │
│  Response:                                                │  │
│  - payment_url (payment link)                             │  │
│  - txn_id                                                 │  │
│  - status                                                 │  │
│                                                            │  │
└────────────────────────────────────────────────────────────┘  │
                        │                                       │
                        │ Redirect User                         │
                        ▼                                       │
        ┌─────────────────────────────┐                        │
        │  User at Easebuzz           │                        │
        │  Payment Page               │                        │
        │  - Select payment method    │                        │
        │  - Enter details            │                        │
        │  - Complete payment         │                        │
        └────────────┬────────────────┘                        │
                     │                                          │
         ┌───────────┴────────────┐                            │
         │                        │                            │
    SUCCESS                    FAILURE                         │
         │                        │                            │
         ▼                        ▼                            │
    Redirect to            Redirect to                        │
  /wallet/success        /wallet/failure                      │
         │                        │                            │
         └────────────┬───────────┘                            │
                      │                                        │
                      ▼                                        │
         ┌─────────────────────────────────────────┐          │
         │ Verification Page                       │          │
         │                                         │          │
         │ 1. Get Response Params                  │          │
         │ 2. Verify Hash ──┬─────────────────────┼──────────┘
         │ 3. Check Status  │                     │
         │ 4. Update Wallet │ On Success:         │
         │ 5. Update Trans. │ - Update Balance    │
         │                  │ - Mark Success      │
         │                  │ - Show Confirmation │
         │                  │ - Redirect Dashboard│
         │                  │                     │
         │                  │ On Failure:         │
         │                  │ - Mark Failed       │
         │                  │ - Show Error        │
         │                  │ - Offer Retry       │
         └─────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                    USER ACTION                                 │
│        Click "Add Money to Wallet" Button                      │
└──────────────────────┬─────────────────────────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │  Input Validation                    │
    │  - Check amount >= 100               │
    │  - Check user authenticated          │
    └──────────────┬───────────────────────┘
                   │ ✅ Valid
                   ▼
    ┌──────────────────────────────────────┐
    │  Prepare Request                     │
    │  - userId                            │
    │  - email                             │
    │  - amount                            │
    │  - purpose                           │
    └──────────────┬───────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │  POST /api/payment                   │
    └──────────────┬───────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────────────────────┐
    │  SERVER: /api/payment                               │
    │                                                      │
    │  1. Validate Request                                │
    │  2. Load Environment Variables                      │
    │  3. Create Transaction Record                       │
    │     {                                               │
    │       userId: "uid",                                │
    │       amount: 500,                                  │
    │       status: "pending",                            │
    │       easebuzz_txn_id: "TXN_uid_time",            │
    │       purpose: "Add Money to Wallet",              │
    │       createdAt: timestamp                          │
    │     }                                               │
    │  4. Generate Hash                                   │
    │     SHA512(data|salt)                              │
    │  5. Call Easebuzz API                              │
    │  6. Receive payment_url                            │
    │  7. Return Response                                │
    │     {                                               │
    │       success: true,                                │
    │       payment_url: "https://...",                   │
    │       transaction_id: "ref"                         │
    │     }                                               │
    └──────────────┬─────────────────────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │  Store Transaction ID                │
    │  sessionStorage.setItem(...)         │
    └──────────────┬───────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │  Redirect to Easebuzz                │
    │  window.location.href = payment_url  │
    └──────────────┬───────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │  USER: Completes Payment             │
    │  on Easebuzz Gateway                 │
    └──────────────┬───────────────────────┘
                   │
         ┌─────────┴────────────┐
         │                      │
         ▼                      ▼
    ┌─────────────────┐  ┌──────────────────┐
    │  SUCCESS        │  │  FAILURE         │
    │  Easebuzz       │  │  Payment Declined│
    │  redirects to   │  │  Easebuzz        │
    │  /wallet/       │  │  redirects to    │
    │  success?...    │  │  /wallet/failure?..
    └────────┬────────┘  └────────┬─────────┘
             │                    │
             ▼                    ▼
    ┌──────────────────────────────────────┐
    │  Success Page                        │
    │  - Get URL parameters                │
    │  - Verify Hash                       │
    │  - Check Status = "success"          │
    │  - Update Wallet Balance             │
    │    {                                 │
    │      balance: old + amount           │
    │    }                                 │
    │  - Update Transaction                │
    │    {                                 │
    │      status: "success"               │
    │      easebuzz_response: {...}        │
    │    }                                 │
    │  - Clear Session Storage             │
    │  - Show Confirmation                 │
    │  - Redirect /dashboard               │
    └──────────────┬───────────────────────┘
                   │
    ┌──────────────────────────────────────┐
    │  Failure Page                        │
    │  - Get URL parameters                │
    │  - Log Error                         │
    │  - Update Transaction                │
    │    {                                 │
    │      status: "failed"                │
    │      error_message: {...}            │
    │    }                                 │
    │  - Clear Session Storage             │
    │  - Show Error Message                │
    │  - Offer Retry Option                │
    └──────────────┬───────────────────────┘
                   │
                   ▼
         ┌────────────────────┐
         │  END USER JOURNEY  │
         └────────────────────┘
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   CLIENT REQUEST                            │
│                   POST /api/payment                         │
│                   {userId, email, amount, purpose}          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  SERVER PROCESSING                          │
│                                                              │
│  1. VALIDATE INPUT                                           │
│     ✅ Check userId not empty                              │
│     ✅ Check email valid                                   │
│     ✅ Check amount > 0 and >= 100                         │
│                                                              │
│  2. LOAD SECRETS (from environment)                          │
│     ✅ EASEBUZZ_KEY (never exposed to client)              │
│     ✅ EASEBUZZ_SALT (never exposed to client)             │
│                                                              │
│  3. GENERATE HASH                                            │
│     ✅ SHA512 algorithm                                     │
│     ✅ Parameters in correct order                          │
│     ✅ Include salt for signing                             │
│                                                              │
│     Hash = SHA512(key=X&amount=Y&...|salt)                 │
│                                                              │
│  4. CREATE TRANSACTION RECORD                                │
│     ✅ In Firestore (only server can create)               │
│     ✅ Status = "pending" (not "success" yet)              │
│     ✅ Include easebuzz_txn_id for tracking                │
│                                                              │
│  5. CALL EASEBUZZ SECURELY                                  │
│     ✅ HTTPS connection                                     │
│     ✅ Hash signature prevents tampering                    │
│     ✅ Only server makes this call                          │
│                                                              │
│  6. RETURN SAFE RESPONSE                                     │
│     ✅ Only return payment_url (no sensitive data)          │
│     ✅ Don't expose hash, keys, or secrets                  │
│     ✅ Include transaction_id for reference                 │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              PAYMENT SUCCESS/FAILURE                         │
│              Easebuzz redirects with params                  │
│                                                              │
│  SUCCESS: /wallet/success?txn_id=X&amount=Y&hash=Z...      │
│  FAILURE: /wallet/failure?reason=X&hash=Y...               │
│                                                              │
│  ⚠️ Parameters include hash for verification                │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  VERIFY RESPONSE                            │
│                  Client-side (browser)                       │
│                                                              │
│  1. EXTRACT PARAMETERS                                       │
│     ✅ Get all query parameters                             │
│     ✅ Get hash from parameters                             │
│                                                              │
│  2. VERIFY HASH                                              │
│     ✅ Use NEXT_PUBLIC_EASEBUZZ_SALT (public)              │
│     ✅ Recalculate hash from parameters                     │
│     ✅ Compare with received hash                           │
│                                                              │
│     Received Hash = Z                                        │
│     Calculated Hash = SHA512(data|salt)                      │
│                                                              │
│     if (Received === Calculated) ✅ Trust Response           │
│     if (Received !== Calculated) ❌ Reject Response          │
│                                                              │
│  3. CHECK TRANSACTION STATUS                                │
│     ✅ Verify status = "success" or "1"                    │
│     ✅ Verify amount matches request                        │
│     ✅ Get user from authentication (not parameter)         │
│                                                              │
│  4. UPDATE FIRESTORE SECURELY                               │
│     ✅ Use authenticated user (not from URL)               │
│     ✅ Update via verified transaction                      │
│     ✅ Atomic transaction (prevent race conditions)         │
│                                                              │
│  5. CLEAR SENSITIVE DATA                                     │
│     ✅ Clear session storage                                │
│     ✅ Clear temporary variables                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Component Dependencies

```
wallet/page.tsx (Client Component)
    ├─ useAuth() → AuthContext → Firebase Auth
    ├─ useRouter() → Next.js Navigation
    ├─ getWalletBalance() → firebaseClient → Firestore
    └─ POST /api/payment
        └─ easebuzz.ts
            ├─ generateEasebuzzHash()
            ├─ createPaymentLinkPayload()
            └─ Easebuzz API


wallet/success/page.tsx (Client Component)
    ├─ useAuth() → AuthContext → Firebase Auth
    ├─ useRouter() → Next.js Navigation
    ├─ getWalletBalance() → firebaseClient → Firestore
    ├─ updateWalletBalance() → transactionClient
    ├─ updateTransactionStatus() → transactionClient
    └─ verifyEasebuzzHash() → easebuzz.ts


wallet/failure/page.tsx (Client Component)
    ├─ useAuth() → AuthContext → Firebase Auth
    ├─ useRouter() → Next.js Navigation
    └─ updateTransactionStatus() → transactionClient


api/payment/route.ts (Server API)
    ├─ easebuzz.ts
    │   ├─ generateEasebuzzHash()
    │   └─ createPaymentLinkPayload()
    ├─ transactionClient.ts
    │   └─ createTransaction()
    └─ Easebuzz Payment Link API


lib/easebuzz.ts (Utilities)
    └─ Node.js crypto module


lib/transactionClient.ts (Firebase Operations)
    ├─ firebaseClient.ts → Firestore instance
    └─ Firebase Admin SDK


lib/walletClient.ts (Existing - unchanged)
    ├─ firebaseClient.ts → Firestore instance
    └─ Firebase Client SDK
```

---

## 🔄 State Management

```
Client State (React):
├─ AuthContext
│  └─ user: User | null
│
├─ Wallet Page
│  ├─ balance: number
│  ├─ loading: boolean
│  ├─ addMoneyAmount: string
│  ├─ addingMoney: boolean
│  ├─ showAddMoney: boolean
│  └─ addMoneyError: string
│
├─ Success Page
│  ├─ status: "loading" | "success" | "error"
│  ├─ message: string
│  ├─ balance: number
│  └─ transactionDetails: object
│
└─ Failure Page
   ├─ status: "loading" | "displayed"
   ├─ failureReason: string
   └─ transactionDetails: object

Server State (Firestore):
├─ wallets/{userId}
│  ├─ balance: number
│  ├─ createdAt: timestamp
│  └─ updatedAt: timestamp
│
└─ transactions/{userId}_{timestamp}
   ├─ userId: string
   ├─ amount: number
   ├─ status: "pending" | "success" | "failed"
   ├─ easebuzz_txn_id: string
   ├─ purpose: string
   ├─ createdAt: timestamp
   ├─ updatedAt: timestamp
   ├─ easebuzz_response: object
   └─ error_message: string

Browser Session Storage:
└─ lastTransactionId: string (cleared after verification)
```

---

## 🌐 Network Requests

```
1️⃣ Frontend → Backend
   POST /api/payment
   Headers: Content-Type: application/json
   Body: {userId, email, amount, purpose}
   Response: {success, payment_url, transaction_id}

2️⃣ Backend → Easebuzz
   POST https://testpay.easebuzz.in/api/create_payment_link/
   Headers: Content-Type: application/x-www-form-urlencoded
   Body: key, txn_id, amount, email, phone, purpose, redirect_url, s2_url, hash
   Response: {status, data:{payment_url}, message}

3️⃣ Easebuzz → Browser (User)
   Redirect to payment page
   User completes payment

4️⃣ Easebuzz → Browser (Redirect)
   GET /wallet/success?txn_id=X&amount=Y&status=Z&hash=H...
   or
   GET /wallet/failure?error_message=X&reason=Y&hash=H...

5️⃣ Frontend → Firestore
   Update wallets/{userId}
   Update transactions/{id}
   GET wallets/{userId}

All secure endpoints:
- Uses Firebase Auth
- Validates user before operations
- Uses Firestore security rules
- Hash verification prevents tampering
```

---

**Architecture Diagram Created:** January 21, 2026
**Version:** 1.0.0
