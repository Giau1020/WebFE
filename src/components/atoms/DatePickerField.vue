<!-- src/components/atoms/DatePickerField.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Dayjs } from 'dayjs';
import dayjs from 'ant-design-vue/es/calendar';

const props = defineProps<{
  modelValue: string | null | Dayjs | undefined; // Giá trị hai chiều
  placeholder?: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null | Dayjs | undefined): void;
}>();

const internalValue = ref<Dayjs | undefined>(undefined);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === null || newValue === undefined) {
      internalValue.value = undefined;
    } else if (typeof newValue === 'string') {
      internalValue.value = dayjs(newValue, 'YYYY-MM-DD', true).isValid()
        ? dayjs(newValue, 'YYYY-MM-DD')
        : undefined; // Chuyển string thành Dayjs, kiểm tra hợp lệ
    } else {
      internalValue.value = newValue; // Nếu đã là Dayjs
    }
  }
);

const handleChange = (date: any, dateString: string) => {
  emit('update:modelValue', dateString || null);
};
</script>

<template>
  <a-date-picker
    v-model:value="internalValue"
    format="DD/MM/YYYY"
    value-format="YYYY-MM-DD"
    :placeholder="placeholder || 'Chọn ngày'"
    style="width: 100%; height: 50px"
    @change="handleChange"
  />
</template>

<style scoped>
/* Style mặc định, có thể ghi đè ở component cha */
:deep(.ant-picker) {
  border-radius: 6px;
  border: 1px solid #b3e5fc;
  transition: all 0.3s ease;
  height: 50px;
}

:deep(.ant-picker:hover),
:deep(.ant-picker-focused) {
  border-color: #40c4ff;
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3);
}
</style>
