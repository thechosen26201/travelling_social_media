import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'user',
      component: () => import('../pages/UserPage.vue')
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
})

export default router
