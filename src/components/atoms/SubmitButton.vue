<script setup lang="ts">
import { Button } from 'ant-design-vue';

defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <a-button type="primary" html-type="submit" :loading="loading"
    >Đăng Nhập</a-button
  >
</template>

<style scoped>
.a-button {
  width: 100%;
}
</style>
