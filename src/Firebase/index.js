// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0m0vQ5cwLWSQdw9s44OfIqRvMCPPu2A8",
  authDomain: "actor-hiring-system.firebaseapp.com",
  projectId: "actor-hiring-system",
  storageBucket: "actor-hiring-system.firebasestorage.app",
  messagingSenderId: "842393862290",
  appId: "1:842393862290:web:fe78da4d79ab665c93664b",
  databaseURL: "https://actor-hiring-system-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;