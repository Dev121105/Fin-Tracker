import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxqtcA1P0pSbYofDmRvsEND1SAGDEU7Ks",
  authDomain: "finance-tracker-4808a.firebaseapp.com",
  projectId: "finance-tracker-4808a",
  storageBucket: "finance-tracker-4808a.appspot.com",
  messagingSenderId: "617693703694",
  appId: "1:617693703694:web:4dfcde2b2ba46a3422965f",
  measurementId: "G-35K7D4BQFK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };


