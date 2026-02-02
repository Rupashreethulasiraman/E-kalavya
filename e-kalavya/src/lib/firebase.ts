import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// IMPORTANT: Provide these env vars in a .env.local file at the project root (do NOT commit secrets):
// NEXT_PUBLIC_FIREBASE_API_KEY=
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=
// NEXT_PUBLIC_FIREBASE_APP_ID=
// (optional) NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDLp-qViFjijSKHA5VlFLoDQSVtXb17N5w",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "e-kalavya.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "e-kalavya",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1071548620000:web:837616388b296256254485",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "civil-eye-1cbc5.firebasestorage.app",
};

// Initialize or get existing app (safe on both server & client)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth tied to the app
export const auth = getAuth(app);

// Optional: initialize analytics on the client only
if (typeof window !== "undefined") {
  // dynamic import to avoid SSR issues
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      try {
        getAnalytics(app as any);
      } catch (e) {
        // analytics may be disabled or not available in the environment
        // swallow errors silently
      }
    })
    .catch(() => {
      /* ignore */
    });
}

export default app;
