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
          component: () => import('../views/LatestView.vue')
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
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/AdminPage.vue')
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
router.beforeEach((to, from) => {
  if (to.name !== 'user-login' && !localStorage.getItem('token')) {
    return { name: 'user-login' }
  }
  else if(to.name === 'user-login' && localStorage.getItem('token')){
    return {name: 'latest'};
  }
  else {
    return;
  }
});

export default router
