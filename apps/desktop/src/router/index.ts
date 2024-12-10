import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/view/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/LoginView.vue'),
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: () => import('@/view/CreateAccountView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
