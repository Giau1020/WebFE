<template>
  <a-select
    v-model:value="internalValue"
    :placeholder="placeholder || 'Chọn giá trị'"
    style="width: 100%; height: 50px"
    @change="(value) => handleChange(typeof value === 'string' ? value : '')"
  >
    <slot></slot>
    <!-- Slot để truyền options từ component cha -->
  </a-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string; // Giá trị hai chiều
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Khởi tạo internalValue với giá trị từ props.modelValue
const internalValue = ref<string>(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
    console.log('SelectField: props.modelValue changed to', newValue);
  }
);

const handleChange = (value: string) => {
  console.log('SelectField: Selected value', value); // Debug giá trị được chọn
  emit('update:modelValue', value);
};
</script>

<style scoped>
/* Tùy chỉnh select */
.ant-select {
  width: 100%;
  min-width: 150px;
}

/* Tùy chỉnh selector */
:deep(.ant-select-selector) {
  border-radius: 6px;
  border: 1px solid #b3e5fc !important;
  background-color: #fff;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

/* Hiệu ứng hover và focus */
:deep(.ant-select-selector:hover),
:deep(.ant-select-focused .ant-select-selector) {
  border-color: #40c4ff !important;
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3);
}

/* Tùy chỉnh dấu mũi tên dropdown (after) */
:deep(.ant-select-arrow) {
  min-width: 12px;
  margin-top: -14px;
  right: 12px;
  color: #666;
  transition: transform 0.3s ease;
}

/* Hiệu ứng xoay mũi tên khi select mở */
:deep(.ant-select-open .ant-select-arrow) {
  transform: rotate(180deg);
}

/* Tùy chỉnh nội dung item trong dropdown */
:deep(.ant-select-item-option-content) {
  color: #333;
  font-size: 14px;
}

/* Tùy chỉnh trạng thái disabled */
:deep(.ant-select-disabled .ant-select-selector) {
  background-color: #f5f5f5;
  border-color: #d9d9d9 !important;
  color: #999;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 576px) {
  .ant-select {
    height: 40px;
  }

  :deep(.ant-select-selector) {
    height: 40px !important;
  }
}
</style>
