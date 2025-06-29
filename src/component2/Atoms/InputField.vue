<template>
  <input
    :value="modelValue"
    :disabled="disabled"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

defineEmits(['update:modelValue']);
</script>
<style scoped>
:deep(.ant-input) {
  border-radius: 8px;
  border-color: #d9d9d9;
  transition: border-color 0.3s ease;
}

:deep(.ant-input:focus) {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}
</style>
