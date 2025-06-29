<template>
  <a-button :type="type" @click="onClick">{{ label }}</a-button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ButtonType } from 'ant-design-vue/es/button';

defineProps<{
  type?: ButtonType;
  label: string;
}>();

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>
