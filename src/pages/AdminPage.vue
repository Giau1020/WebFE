<template>
  <div class="layout">
    <Header class="header" />
    <div class="main-content">
      <Sidebar class="sidebar" />
      <div class="content">
        <HeaderAppointment />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue';
import Sidebar from '@/components/atoms/Sidebar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex-shrink: 0;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  flex-shrink: 0;
  width: 60px;
  background-color: #f0f2f5;
  border-right: 1px solid #e8e8e8;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
