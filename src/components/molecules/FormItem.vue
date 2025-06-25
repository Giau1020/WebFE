<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  rules?: Array<{ required?: boolean; message?: string }>;
}>();
</script>

<template>
  <a-form-item :label="label" :name="name" :rules="rules">
    <slot />
  </a-form-item>
</template>

<style scoped>
.a-form-item {
  margin-bottom: 16px;
}
</style>
