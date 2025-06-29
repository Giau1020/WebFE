<template>
  <a-space>
    <ButtonAtom type="link" label="Edit" @click="emit('edit', record)" />
    <ButtonAtom type="link" label="Delete" @click="emit('delete', record)" />
  </a-space>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ButtonAtom from '../Atoms/ButtonAtom.vue';

defineProps({
  record: { type: Object, required: true },
});

const emit = defineEmits(['edit', 'delete']);
</script>
