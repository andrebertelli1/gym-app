// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbktzA2A76IAoW08ADNU4JtMspWkylINc",
  authDomain: "gym-app-45c53.firebaseapp.com",
  projectId: "gym-app-45c53",
  storageBucket: "gym-app-45c53.appspot.com",
  messagingSenderId: "1038977078049",
  appId: "1:1038977078049:web:f8d496aaf8738f8dafe460",
  measurementId: "G-VHS3ELDJFV"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }