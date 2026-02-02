import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLp-qViFjijSKHA5VlFLoDQSVtXb17N5w",
  authDomain: "e-kalavya.firebaseapp.com",
  projectId: "e-kalavya",   
  storageBucket: "e-kalavya.appspot.com",
  messagingSenderId: "1024567890123",
  appId: "1:1024567890123:web:abcdef1234567890"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
