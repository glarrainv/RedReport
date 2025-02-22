import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Cloud Firestore
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgb8B9AqcsHLkcU9WX8cRbt8qMgSveT1k",
  authDomain: "redreport-29023.firebaseapp.com",
  projectId: "redreport-29023",
  storageBucket: "redreport-29023.firebasestorage.app",
  messagingSenderId: "1016256516850",
  appId: "1:1016256516850:web:5b902e0616dfc3c926766b",
  measurementId: "G-S4C6LSBB9G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // For Cloud Firestore
const auth = getAuth(app);
export { db, auth };
