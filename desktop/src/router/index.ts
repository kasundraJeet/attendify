import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores'

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

router.beforeEach(async (to:any) => {
  const authStore = useAuthStore()

  const publicPages = [
    '/login',
    '/create-account'
  ]
  const authPage = !publicPages.includes(to.path)
  if (authPage && !authStore.sessionToken) {
    return '/login'
  }
  if (authStore.sessionToken && !authPage) {
    return '/'
  }
})


export default router;
