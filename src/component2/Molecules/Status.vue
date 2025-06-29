<template>
  <TagAtom :text="status" :color="color" />
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import TagAtom from '@/component2/Atoms/TagAtom.vue';

const props = defineProps({
  status: { type: String, required: true },
});

const color = computed(() => {
  return props.status === 'In Surgery'
    ? 'red'
    : props.status === 'Discharge'
      ? 'green'
      : props.status === 'Ext. Hospitalism'
        ? 'orange'
        : 'blue';
});
</script>
