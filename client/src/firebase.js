/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myblog-a289c.firebaseapp.com",
  projectId: "myblog-a289c",
  storageBucket: "myblog-a289c.appspot.com",
  messagingSenderId: "854703731513",
  appId: "1:854703731513:web:4d35b99e1bc67e04382ee8"
};


console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);