// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYvq3UaURXQrOk0T4vRj5Oknu5r6m5XmU",
  authDomain: "front-chat-1f2d4.firebaseapp.com",
  projectId: "front-chat-1f2d4",
  storageBucket: "front-chat-1f2d4.appspot.com",
  messagingSenderId: "426102738699",
  appId: "1:426102738699:web:4fc1a329d93c79821e5c0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Activate Authorization
export const auth = getAuth(app);

//google authorization
export const provider = new GoogleAuthProvider();

//activate  database

export const db = getFirestore(app);
