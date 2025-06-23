<script setup lang="ts">
import RegisterForm from '@/components/organisms/RegisterForm.vue';
import AuthLayout from '@/components/templates/AuthLayout.vue';
</script>

<template>
  <auth-layout>
    <h1>Đăng Ký</h1>
    <register-form />
  </auth-layout>
</template>

<style scoped>
h1 {
  padding-bottom: 24px;
  font-size: 40px; /* Kích thước chữ lớn */
  font-weight: 700; /* Chữ đậm */
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif; /* Font hiện đại */
  text-align: center;
  background: linear-gradient(45deg, #3093c2, #032240);
  -webkit-background-clip: text; /* Áp gradient cho chữ */
  background-clip: text;
  color: transparent; /* Làm chữ trong suốt để hiện gradient */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow nhẹ */
}
</style>
