# Easebuzz Payment Gateway Integration

This document outlines the environment variables and configuration needed for the Easebuzz payment gateway integration.

## Environment Variables Required

Add the following variables to your `.env.local` file:

### Easebuzz Configuration

```bash
# Easebuzz API Key (from your Easebuzz merchant dashboard)
EASEBUZZ_KEY=your_easebuzz_key_here

# Easebuzz Salt (from your Easebuzz merchant dashboard)
EASEBUZZ_SALT=your_easebuzz_salt_here

# Easebuzz Environment (test or prod)
EASEBUZZ_ENV=test

# Easebuzz Base URL
# For testing: https://testpay.easebuzz.in
# For production: https://pay.easebuzz.in
EASEBUZZ_BASE_URL=https://testpay.easebuzz.in

# Public App URL (used for redirect URLs after payment)
# For local development: http://localhost:3000
# For production: your_domain_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Public Easebuzz Salt (used in client-side hash verification)
# Note: This is the same as EASEBUZZ_SALT but exposed to client for hash verification
NEXT_PUBLIC_EASEBUZZ_SALT=your_easebuzz_salt_here
```

## Getting Easebuzz Credentials

1. Sign up at [Easebuzz.in](https://www.easebuzz.in)
2. Complete KYC verification
3. Go to **Settings > API Keys** in your merchant dashboard
4. You'll find:
   - **Key ID** (use for `EASEBUZZ_KEY`)
   - **Salt** (use for `EASEBUZZ_SALT`)
5. You'll also see API endpoints for test and production

## Environment Setup Guide

### Local Development

```bash
# .env.local
EASEBUZZ_KEY=your_test_key
EASEBUZZ_SALT=your_test_salt
EASEBUZZ_ENV=test
EASEBUZZ_BASE_URL=https://testpay.easebuzz.in
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_EASEBUZZ_SALT=your_test_salt
```

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add all the variables above
4. Make sure to use production values:
   - `EASEBUZZ_ENV=prod`
   - `EASEBUZZ_BASE_URL=https://pay.easebuzz.in`
   - `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

## Important Notes

⚠️ **Security Considerations:**

- Never commit `.env.local` to version control
- Keep `EASEBUZZ_KEY` and `EASEBUZZ_SALT` secret
- Use `.env.local` for local development only
- Use Vercel's environment variables for production
- The `NEXT_PUBLIC_*` variables are exposed to the client but are safe (they're needed for hash verification)

## Payment Flow

1. User clicks "Add Money to Wallet" on `/wallet` page
2. User enters amount and clicks "Proceed to Payment"
3. Frontend calls `/api/payment` with user details and amount
4. Backend:
   - Creates pending transaction in Firestore
   - Generates Easebuzz hash
   - Calls Easebuzz API to create payment link
   - Returns payment URL to frontend
5. Frontend redirects user to Easebuzz payment page
6. User completes payment on Easebuzz
7. Easebuzz redirects to:
   - `/wallet/success` if payment succeeds
   - `/wallet/failure` if payment fails
8. Success page:
   - Verifies Easebuzz response hash
   - Updates wallet balance in Firestore
   - Updates transaction status
   - Shows confirmation

## Testing

### Test Cards (when using test environment)

Easebuzz provides test cards for testing. Check your Easebuzz merchant dashboard for:
- Test card numbers
- Expiry dates
- CVV codes

### Sample Test Credentials

- Amount: Any amount
- Email: Any valid email
- Phone: Any 10-digit number

## Firestore Collections Structure

### `wallets` Collection

```
wallets/
  {userId}/
    - balance: number
    - createdAt: timestamp
    - updatedAt: timestamp
```

### `transactions` Collection

```
transactions/
  {userId}_{timestamp}/
    - userId: string
    - amount: number
    - status: "success" | "pending" | "failed"
    - easebuzz_txn_id: string
    - purpose: string
    - createdAt: timestamp
    - updatedAt: timestamp
    - easebuzz_response: object (optional)
    - error_message: string (optional)
```

## Troubleshooting

### Hash Mismatch Error

- Verify that `EASEBUZZ_SALT` is correct
- Check that parameters are in the correct order
- Ensure no extra spaces or special characters in the salt

### Payment Link Not Created

- Check that `EASEBUZZ_KEY` is valid
- Verify `EASEBUZZ_BASE_URL` is correct for your environment
- Check that the request format matches Easebuzz API specification

### Redirect Loop

- Verify that `NEXT_PUBLIC_APP_URL` matches your domain
- Check that `/wallet/success` and `/wallet/failure` pages exist
- Ensure redirect URLs are whitelisted in Easebuzz settings

### Wallet Balance Not Updating

- Check Firebase rules allow updates to `wallets` collection
- Verify user is authenticated
- Check Firestore console for any errors

## API Reference

### POST /api/payment

**Request:**
```json
{
  "userId": "firebase_uid",
  "email": "user@example.com",
  "amount": 500,
  "purpose": "Add Money to Wallet"
}
```

**Response (Success):**
```json
{
  "success": true,
  "payment_url": "https://testpay.easebuzz.in/...",
  "transaction_id": "TXN_uid_timestamp"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Additional Resources

- [Easebuzz Documentation](https://developer.easebuzz.in/)
- [Payment Link API Guide](https://developer.easebuzz.in/docs/payment-link/)
- [Hash Generation Guide](https://developer.easebuzz.in/docs/hash-generation/)
