// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfGfLwpdJ1yYlGfq6HnU2kDfoP0wqaN9g",
  authDomain: "react-oauth-df25e.firebaseapp.com",
  projectId: "react-oauth-df25e",
  storageBucket: "react-oauth-df25e.appspot.com",
  messagingSenderId: "1067621916320",
  appId: "1:1067621916320:web:519afaaa541b746bb173c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);