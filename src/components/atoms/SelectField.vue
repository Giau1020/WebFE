<!-- src/components/atoms/SelectField.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | null; // Giá trị hai chiều
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const internalValue = ref<string | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const handleChange = (value: string) => {
  emit('update:modelValue', value || null);
};
</script>

<template>
  <a-select
    v-model:value="internalValue"
    :placeholder="placeholder || 'Chọn giá trị'"
    style="width: 100%; height: 50px"
    @change="handleChange"
  >
    <slot></slot>
    <!-- Slot để truyền options từ component cha -->
  </a-select>
</template>

<style scoped>
/* Style mặc định, có thể ghi đè ở component cha */
:deep(.ant-select-selector) {
  border-radius: 6px;
  border: 1px solid #b3e5fc;
  transition: all 0.3s ease;
  height: 50px !important;
}

:deep(.ant-select-selector:hover),
:deep(.ant-select-focused .ant-select-selector) {
  border-color: #40c4ff;
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3);
}
</style>
