# Easebuzz Integration - Troubleshooting Guide

## 🔧 Common Issues & Solutions

---

## Authentication Issues

### Issue: User redirected to /login when accessing /wallet

**Cause:** User session expired or not authenticated

**Solution:**
```typescript
// 1. Ensure user is logged in
// 2. Check Firebase Auth state

// In browser console:
import { auth } from "@/lib/firebase";
console.log(auth.currentUser);
// Should show user object, not null
```

**Steps:**
1. Log in with valid credentials
2. Check browser cookies for Firebase auth token
3. Verify Firebase Auth is configured

---

## Environment Variables

### Issue: "Missing Easebuzz environment variables"

**Cause:** Environment variables not configured

**Solution:**

**Local Development:**
```bash
# 1. Create .env.local in project root
# 2. Add these variables:
EASEBUZZ_KEY=your_key_here
EASEBUZZ_SALT=your_salt_here
EASEBUZZ_ENV=test
EASEBUZZ_BASE_URL=https://testpay.easebuzz.in
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_EASEBUZZ_SALT=your_salt_here

# 3. Restart dev server:
npm run dev
```

**Vercel Production:**
```
1. Go to Vercel project dashboard
2. Settings > Environment Variables
3. Add all variables from .env.local
4. Redeploy
```

**Verify Variables are Set:**
```javascript
// In browser console (client-side vars only):
console.log(process.env.NEXT_PUBLIC_APP_URL)
// Should log: http://localhost:3000

// Check server-side vars in /api/payment
// Look at request logs
```

---

## API Errors

### Issue: "Failed to create payment link"

**Cause:** Invalid Easebuzz credentials or wrong API endpoint

**Solution:**

**Step 1: Verify Credentials**
```bash
# Check these values in Easebuzz dashboard:
# Settings > API Keys
# - Key ID matches EASEBUZZ_KEY
# - Salt matches EASEBUZZ_SALT
```

**Step 2: Check API Endpoint**
```
For test environment:
EASEBUZZ_BASE_URL=https://testpay.easebuzz.in

For production:
EASEBUZZ_BASE_URL=https://pay.easebuzz.in
```

**Step 3: Debug API Response**
```javascript
// In browser DevTools:
// 1. Open Network tab
// 2. Make payment
// 3. Check POST /api/payment
// 4. Look at Response tab
// 5. Should see: { success: true, payment_url: "..." }
// 6. If error, check error message
```

**Step 4: Check Server Logs**
```bash
# In terminal running dev server:
# Look for error messages like:
# "Easebuzz API error: 400"
# "Failed to create payment link"
```

---

## Hash Verification Issues

### Issue: "Payment verification failed: Invalid hash"

**Cause:** Hash calculation mismatch

**Solution:**

**Step 1: Verify Salt**
```bash
# Make sure these match exactly:
EASEBUZZ_SALT=your_salt_from_easebuzz
NEXT_PUBLIC_EASEBUZZ_SALT=your_salt_from_easebuzz
# They should be identical character-by-character
```

**Step 2: Check for Extra Spaces**
```bash
# Don't include spaces in .env.local
# ✅ Correct:
EASEBUZZ_SALT=abc123xyz

# ❌ Wrong:
EASEBUZZ_SALT= abc123xyz 
EASEBUZZ_SALT=abc123xyz 
```

**Step 3: Debug Hash Calculation**
```javascript
// In success page, add debug log:
console.log("Received response:", responseData);
console.log("Is hash valid:", isHashValid);
console.log("Salt used:", salt);

// Check hash matches pattern:
// Should be 128 character hex string
```

**Step 4: Check Response Data**
```javascript
// On success page, verify Easebuzz response has:
// - txn_id
// - amount
// - status
// - hash
// All required fields must be present
```

---

## Payment URL Issues

### Issue: "Redirect loop" or "Payment page won't load"

**Cause:** Incorrect redirect URLs

**Solution:**

**Check Redirect URLs:**
```bash
# In .env.local, verify:
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Should match your actual domain:
# Local: http://localhost:3000
# Staging: https://staging.domain.com
# Production: https://domain.com
```

**Update Vercel Configuration:**
```
1. Go to Vercel dashboard
2. Settings > Environment Variables
3. Update NEXT_PUBLIC_APP_URL to your domain
4. Redeploy
```

**Verify Pages Exist:**
```bash
# These pages must exist:
- /wallet/success  ✅
- /wallet/failure  ✅

# Check files exist:
src/app/wallet/success/page.tsx
src/app/wallet/failure/page.tsx
```

**Check Easebuzz Settings:**
```
1. Go to Easebuzz dashboard
2. Settings > Allowed URLs / Webhooks
3. Add your redirect URLs:
   - https://yourdomain.com/wallet/success
   - https://yourdomain.com/wallet/failure
```

---

## Firestore Issues

### Issue: "Wallet balance not updating" after successful payment

**Cause:** Firestore rules, authentication, or transaction error

**Solution:**

**Step 1: Check Firestore Rules**
```
In Firebase Console > Firestore > Rules:

match /wallets/{userId} {
  allow read: if request.auth.uid == userId;
  allow update: if request.auth.uid == userId;
  allow create: if request.auth.uid == userId;
}

match /transactions/{document=**} {
  allow read: if request.auth.uid == resource.data.userId;
  allow create: if request.auth.uid == request.resource.data.userId;
  allow update: if request.auth.uid == resource.data.userId;
}
```

**Step 2: Verify User Authentication**
```javascript
// In success page, check:
import useAuth from "@/hooks/useAuth";
const { user } = useAuth();
console.log("User:", user);
console.log("User UID:", user?.uid);
// Should have valid UID
```

**Step 3: Check Transaction Creation**
```
In Firestore Console:
1. Go to Collection: transactions
2. Find documents with your userId
3. Check for your recent transactions
4. Verify status field

Should see:
{
  userId: "your_uid",
  amount: 500,
  status: "success",
  ...
}
```

**Step 4: Check Wallet Document**
```
In Firestore Console:
1. Go to Collection: wallets
2. Find document: your_uid
3. Check balance field
4. Check updatedAt timestamp

Should see:
{
  balance: 500,
  updatedAt: Timestamp
}
```

**Step 5: Debug Response Verification**
```javascript
// In success page console:
console.log("User ID:", user?.uid);
console.log("Response user ID:", responseData.userId);
console.log("Amount:", responseData.amount);

// Make sure user ID matches
// Make sure amount is correct
```

---

## Payment Processing Issues

### Issue: "Insufficient wallet balance" when wallet was updated

**Cause:** Stale wallet balance in component state

**Solution:**
```typescript
// After successful payment, reload wallet:
const { user } = useAuth();
const balance = await getWalletBalance(user.uid);
setBalance(balance); // Update UI
```

### Issue: Transaction marked as pending but never updated to success

**Cause:** Payment verification not completing

**Solution:**
```
1. Check if success page is being called
2. Verify Easebuzz redirect is working
3. Check browser Network tab for redirects
4. Verify hash validation passing
5. Check console for errors
```

---

## Amount Validation Issues

### Issue: "Can't submit amount less than ₹100"

**This is expected behavior** - Minimum amount is ₹100

**To change minimum:**
```typescript
// In src/app/wallet/page.tsx

const amountNum = Number(addMoneyAmount);
if (amountNum <= 0 || amountNum < 100) {  // ← Change 100 to desired minimum
  setAddMoneyError("Minimum amount is ₹100");
  return;
}
```

---

## Testing & Debugging

### Enable Detailed Logging

**In `/api/payment/route.ts`:**
```typescript
console.log("Payment request:", body);
console.log("Easebuzz response:", easebuzzData);
```

**In `/wallet/success/page.tsx`:**
```typescript
console.log("Response data:", responseData);
console.log("Hash valid:", isHashValid);
console.log("Wallet updated:", success);
```

### Check Network Requests

```
1. Open DevTools (F12)
2. Go to Network tab
3. Make a payment
4. Look for these requests:
   - POST /api/payment → Check response
   - GET /wallet/success?... → Check URL params
```

### Verify Firestore Data

```
1. Open Firebase Console
2. Go to Firestore Database
3. Look at Collections:
   - wallets/{userId} - Check balance
   - transactions/* - Check recent
4. Verify data updated
5. Check timestamps
```

---

## Performance Issues

### Issue: "Payment page is slow"

**Solution:**
```
1. Check network speed
2. Verify Easebuzz API response time
3. Check Firestore queries
4. Use DevTools Performance tab
5. Look for blocking operations
```

### Issue: "Payment sometimes fails"

**Possible Causes:**
```
- Network timeout
- Firestore quota exceeded
- Firebase session expired
- Easebuzz service down
```

**Solution:**
```
1. Implement retry logic
2. Add network error handling
3. Verify Easebuzz status
4. Check Firebase usage
5. Monitor error logs
```

---

## Mobile & Browser Issues

### Issue: "Payment not working on mobile"

**Solution:**
```
1. Ensure responsive design loaded
2. Check touch interactions work
3. Verify redirect works on mobile
4. Test on actual devices
5. Check mobile browser console
```

### Issue: "Payment works in Chrome but not Firefox"

**Cause:** Browser compatibility or security settings

**Solution:**
```
1. Check console for CORS errors
2. Verify SSL certificate (HTTPS)
3. Check browser security settings
4. Test in incognito mode
5. Clear browser cache
```

---

## Production Issues

### Issue: "Works locally but fails on Vercel"

**Common Causes:**
```
1. Environment variables not set
2. Different URLs between local and production
3. Firestore rules blocking requests
4. Firebase Auth not configured for domain
```

**Solution:**
```
1. Verify all env vars in Vercel dashboard
2. Check NEXT_PUBLIC_APP_URL matches domain
3. Review Firestore rules
4. Test Firebase Auth on production domain
5. Check Vercel function logs
```

### Issue: "CORS error on production"

**Solution:**
```
1. Verify EASEBUZZ_BASE_URL is correct
2. Check Easebuzz CORS settings
3. Use server-side fetch (not client)
4. Verify API route is on same origin
```

---

## Getting Help

### Debug Checklist

Before asking for help, verify:
- [ ] Environment variables are set
- [ ] Easebuzz credentials are valid
- [ ] Firebase is configured correctly
- [ ] User is authenticated
- [ ] Network requests successful (DevTools)
- [ ] Firestore has required collections
- [ ] All required pages exist
- [ ] No console errors

### Collect Information

When reporting issues, include:
```
1. Error message (exact)
2. Browser console output
3. Network request details
4. Firestore data state
5. Vercel logs (if production)
6. Steps to reproduce
7. Environment details
```

### Resources

- [Easebuzz Support](https://www.easebuzz.in/support)
- [Firebase Support](https://firebase.google.com/support)
- [Next.js Community](https://nextjs.org/docs)
- [Stack Overflow - Tag: easebuzz](https://stackoverflow.com/)

---

## Quick Reference

### File Locations
```
API Route:          src/app/api/payment/route.ts
Wallet Page:        src/app/wallet/page.tsx
Success Page:       src/app/wallet/success/page.tsx
Failure Page:       src/app/wallet/failure/page.tsx
Hash Utility:       src/lib/easebuzz.ts
Transaction Utils:  src/lib/transactionClient.ts
Config:             .env.local
```

### Key Functions
```
generateEasebuzzHash()      - Generate payment hash
verifyEasebuzzHash()        - Verify response hash
createPaymentLinkPayload()  - Create API payload
updateWalletBalance()       - Update wallet in Firestore
updateTransactionStatus()   - Update transaction status
```

### Important URLs
```
Local:      http://localhost:3000
Test API:   https://testpay.easebuzz.in
Prod API:   https://pay.easebuzz.in
```

---

**Last Updated:** January 21, 2026
**Version:** 1.0.0
