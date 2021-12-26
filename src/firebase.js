// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import Firebase from "firebase";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQz4SUG3OsoHJv4UGAhUPRMJIkDKyQT20",
  authDomain: "movie-d0249.firebaseapp.com",
  projectId: "movie-d0249",
  storageBucket: "movie-d0249.appspot.com",
  messagingSenderId: "790773216267",
  appId: "1:790773216267:web:ec5abc5ac164477af8830e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const database=getDatabase(app);