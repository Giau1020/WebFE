// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/',
    redirect: '/login', // Redirect root to login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
