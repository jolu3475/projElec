// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gBefw07wfejf035NcINpTQqWFfCB6JQ",
  authDomain: "projelec-4f49e.firebaseapp.com",
  projectId: "projelec-4f49e",
  storageBucket: "projelec-4f49e.appspot.com",
  messagingSenderId: "1088597562973",
  appId: "1:1088597562973:web:4fd8430806ab08a2dddfb4",
  measurementId: "G-BZZKTRY0S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);