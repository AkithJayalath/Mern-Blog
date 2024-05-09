// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7807e.firebaseapp.com",
  projectId: "mern-blog-7807e",
  storageBucket: "mern-blog-7807e.appspot.com",
  messagingSenderId: "618352716588",
  appId: "1:618352716588:web:7e9771d98cbec0525a1a89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
