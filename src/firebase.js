import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDCJ5C-pJL2-q10Uq8ukKU2_ywC-vxDReY",
  authDomain: "kchats-47503.firebaseapp.com",
  projectId: "kchats-47503",
  storageBucket: "kchats-47503.appspot.com",
  messagingSenderId: "304896384525",
  appId: "1:304896384525:web:29046ad6c5229527e97f44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()