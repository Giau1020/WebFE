<script setup lang="ts">
import LoginPage from '@/pages/LoginPage.vue';
</script>

<template>
  <div class="app">
    <login-page />
    <router-view />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}
</style>
