import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './interceptors/axios';
import './firebase/index';
import UUID from "vue3-uuid";

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, faCircleUser, faBlog, faUser, faXmarkCircle, faCheckCircle 
, faEllipsis, faPen, faCaretDown, faExclamationTriangle} 
from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, 
  faCircleUser, faBlog, faUser, faXmarkCircle, faCheckCircle, faEllipsis, faPen, faCaretDown, faExclamationTriangle);

const app = createApp(App)

app.use(router)
app.use(store);
app.use(UUID);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
