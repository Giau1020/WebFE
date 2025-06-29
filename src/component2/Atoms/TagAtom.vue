<template>
  <a-tag :color="color">{{ text }}</a-tag>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  text: { type: String, required: true },
  color: { type: String, default: 'blue' },
});
</script>
