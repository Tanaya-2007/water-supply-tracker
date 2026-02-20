import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUw4uubz7wVFkBwNWUmGqhcCDL7vHrlt4",
  authDomain: "water-supply-tracker-8cad0.firebaseapp.com",
  projectId: "water-supply-tracker-8cad0",
  storageBucket: "water-supply-tracker-8cad0.firebasestorage.app",
  messagingSenderId: "1350709633597",
  appId: "1:1350709633597:web:723ce969de89575c0e8fc4",
};

const app = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app);