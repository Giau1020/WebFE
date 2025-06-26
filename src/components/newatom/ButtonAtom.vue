<template>
  <a-button :type="type" :size="size" :danger="danger" @click="handleClick">
    <template v-if="icon" #icon><component :is="icon" /></template>
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'middle' | 'large';
  danger?: boolean;
  icon?: any; // Component icon
}>();

const handleClick = (e: MouseEvent) => {
  if (typeof emit === 'function') emit('click', e);
};
const emit = defineEmits(['click']);
</script>
