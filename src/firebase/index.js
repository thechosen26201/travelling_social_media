import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U",
//   authDomain: "authenticate-a1ac1.firebaseapp.com",
//   databaseURL: "https://authenticate-a1ac1-default-rtdb.firebaseio.com",
//   projectId: "authenticate-a1ac1",
//   storageBucket: "authenticate-a1ac1.appspot.com",
//   messagingSenderId: "487267246251",
//   appId: "1:487267246251:web:8b211eaa5b006f75f657ee",
//   measurementId: "G-2K8DC0PNDX"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC9sTyjSg-uw1-Hj2-x7Y3oFL2t6r-nbBo",
  authDomain: "travel-db-2c05b.firebaseapp.com",
  projectId: "travel-db-2c05b",
  storageBucket: "travel-db-2c05b.appspot.com",
  messagingSenderId: "37008433162",
  appId: "1:37008433162:web:a5574befb08b9c0a7e7ff3"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}