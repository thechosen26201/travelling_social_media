import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, faCircleUser, faBlog, faUser } 
from '@fortawesome/free-solid-svg-icons'

// const store = createStore({
//     state () {
//       return {
//         name: 'Khanh'
//       }
//     },
//   });
/* add icons to the library */
library.add(faUserSecret, faBars, faBell, faMessage, faTv, faXmark, faThumbsUp, faComment, faShare, faCircleUser, faBlog, faUser)

const app = createApp(App)

app.use(router)
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
