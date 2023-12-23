// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqMqZyG72hAhvtQw2yJRN4vLCKZ7aYHoQ",
  authDomain: "mern-lms-2be54.firebaseapp.com",
  projectId: "mern-lms-2be54",
  storageBucket: "mern-lms-2be54.appspot.com",
  messagingSenderId: "28941814147",
  appId: "1:28941814147:web:6de76ad3cd58e6beb7ceb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);