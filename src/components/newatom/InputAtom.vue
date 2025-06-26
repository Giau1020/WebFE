<template>
  <a-input
    ref="inputRef"
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="placeholder"
    @change="handleChange"
    @pressEnter="handlePressEnter"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputRef = ref();
const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();
const emit = defineEmits(['update:modelValue', 'pressEnter']);

const handleChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const handlePressEnter = () => {
  emit('pressEnter');
};
</script>
