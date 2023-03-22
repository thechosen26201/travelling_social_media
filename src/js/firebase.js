// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U",
  authDomain: "authenticate-a1ac1.firebaseapp.com",
  projectId: "authenticate-a1ac1",
  storageBucket: "authenticate-a1ac1.appspot.com",
  messagingSenderId: "487267246251",
  appId: "1:487267246251:web:c048b85daf36818bf657ee",
  measurementId: "G-RG1BX08VNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);