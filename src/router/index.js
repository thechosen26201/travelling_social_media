import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/store";

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
          path: '/location',
          name: 'location',
          component: () => import('../views/LocationView.vue')
        },
      ]
    },
    {
      path: '/',
      name: 'user-login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'user-register',
      component: () => import('../views/RegisterView.vue')
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

router.beforeEach((to, from, next) => {
  // if(!store.getters.getAuth && to.meta.needsAuth) {
  //   next("/");
  // }
  if (!localStorage.getItem('token') && to.meta.needsAuth) {
    next("/");
  }
  else {
    next();
  }
})
export default router
