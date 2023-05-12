import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC9sTyjSg-uw1-Hj2-x7Y3oFL2t6r-nbBo",
  authDomain: "travel-db-2c05b.firebaseapp.com",
  projectId: "travel-db-2c05b",
  storageBucket: "travel-db-2c05b.appspot.com",
  messagingSenderId: "37008433162",
  appId: "1:37008433162:web:a5574befb08b9c0a7e7ff3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export {db, auth}