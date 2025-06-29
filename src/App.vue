<script setup lang="ts">
import Table from '@/component2/Templates/Patientlayout.vue';
import AdminPage from './pages/AdminPage.vue';
</script>

<template>
  <div class="app">
    <!-- <router-view /> -->
    <!-- <Table /> -->
    <AdminPage>
      <Table />
    </AdminPage>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}
</style>
