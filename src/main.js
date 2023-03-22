import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, faCircleUser, faBlog, faUser, faXmarkCircle, faCheckCircle } 
from '@fortawesome/free-solid-svg-icons';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U",
  authDomain: "authenticate-a1ac1.firebaseapp.com",
  databaseURL: "https://authenticate-a1ac1-default-rtdb.firebaseio.com",
  projectId: "authenticate-a1ac1",
  storageBucket: "authenticate-a1ac1.appspot.com",
  messagingSenderId: "487267246251",
  appId: "1:487267246251:web:8b211eaa5b006f75f657ee",
  measurementId: "G-2K8DC0PNDX"
};

// Initialize Firebase
initializeApp(firebaseConfig);
/* add icons to the library */
library.add(faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, faCircleUser, faBlog, faUser, faXmarkCircle, faCheckCircle);

const app = createApp(App)

app.use(router)
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
