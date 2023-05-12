import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import store from '../store/store';
import { getDoc, doc } from 'firebase/firestore';
import {db, auth} from '../firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'user',
      component: () => import('../pages/UserPage.vue'),
      children: [
        {
          path: '/latest',
          name: 'latest',
          component: () => import('../views/LatestView.vue'),
          meta: {
            needsAuth: true,
          },
        },
        {
          path: '/location/:code',
          name: 'location',
          component: () => import('../views/LocationView.vue'),
          props: true,
        },
        {
          path: '/your-post',
          name: 'your-post',
          component: () => import('../views/YourPostView.vue')
        },
        {
          path: '/list_destination',
          name: 'list_destination',
          component: () => import('../views/ListDestinationsView.vue')
        },
      ]
    },
    {
      path: '/',
      name: 'user-login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/signup',
      name: 'user-register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('../views/ForgotPassword.vue')
    },
    
    {
      path: '/profile/:id',
      name: 'UserProfile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/UserProfile.vue')
    },

  ]
});
const checkAccount = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such data!');
  }
};
router.beforeEach((to, from, next) => {
  // if (!localStorage.getItem('token') && to.meta.needsAuth) {
  //   next("/");
  // }
  // else {
  //   next();
  // }
  onAuthStateChanged(auth, user => {
    if (user) { // Nếu có tồn tại user đang đăng nhập
      const res = checkAccount(user.uid);
      res.then((result) => {
        if (result.role === 1) {
          if (to.matched.some(record => record.meta.needsAuth)) { // Nếu route đó bắt buộc phải đăng nhập
            next();
            return;
          }
          else if (to.matched.some(record => record.meta.requiresVisitor)) { // Nếu quay trở lại trang login trong khi đã đăng nhập trước đó
            next({ name: "latest" });// thì sẽ đưa admin quay lại trang blog
            return;
          }
          else { next(); return; }
        }
        else {
          console.log("Vui lòng sử dụng đúng tài khoản của người dùng");
          store.dispatch('logOut');
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        console.log('Đăng nhập thành công');
      })
    }
    else {
      if(to.path === '/signup' || to.path === '/forgot') {
        next()
      }
      else if (to.path !== '/') {
        console.log('You do not have right to access this page');
        next({ name: "user-login" });
        return;
      }
      else {
        next();
        return;
      }
    }
  })
})
export default router
