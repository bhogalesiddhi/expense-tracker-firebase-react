// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3uKsUFOVS3zZifgxvserbrFdxQbIVrPU",
  authDomain: "expense-tracker-fdb43.firebaseapp.com",
  projectId: "expense-tracker-fdb43",
  storageBucket: "expense-tracker-fdb43.appspot.com",
  messagingSenderId: "429795160745",
  appId: "1:429795160745:web:4c04023a9ff82c33b16fb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)