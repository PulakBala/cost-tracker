// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDotsgdG0n45HnrAsKQH8EbqgKEW8uTto",
  authDomain: "cost-tracker-b781f.firebaseapp.com",
  projectId: "cost-tracker-b781f",
  storageBucket: "cost-tracker-b781f.appspot.com",
  messagingSenderId: "704879958958",
  appId: "1:704879958958:web:449d731def73343ef4463f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);