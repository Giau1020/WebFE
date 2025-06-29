// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import AdminPage from '@/pages/AdminPage.vue';
import Table from '@/component2/Templates/Patientlayout.vue';

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
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Table,
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
