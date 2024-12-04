import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/LoginView.vue')
    },
    {
      path: '/create-account',
      name: 'createAccount',
      component: () => import('@/view/CreateAccountView.vue')
    }
  ]
});

export default router;
