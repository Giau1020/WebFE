<script setup lang="ts">
import { Input } from 'ant-design-vue';

defineProps<{
  value: string;
}>();

defineEmits<{
  (e: 'update:value', value: string): void;
}>();
</script>

<template>
  <a-input
    :value="value"
    placeholder="Enter username"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<style scoped>
.a-input {
  width: 100%;
}
</style>
