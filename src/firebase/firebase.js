// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWX7rlw0T57U6ZDvgMSo6qFrh4Z5dMb6w",
  authDomain: "react-login-321d0.firebaseapp.com",
  projectId: "react-login-321d0",
  storageBucket: "react-login-321d0.appspot.com",
  messagingSenderId: "866496840777",
  appId: "1:866496840777:web:aaa2df28072171a28ceb98",
  measurementId: "G-XMQS0RCW19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = new Firestore(app);
//const db = getFirestore();

//const analytics = getAnalytics(app);

export {app, firestore, auth}