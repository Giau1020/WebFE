<script setup lang="ts">
defineProps<{
  value: string;
}>();

defineEmits<{
  (e: 'update:value', value: string): void;
}>();
</script>

<template>
  <a-input-password
    :value="value"
    placeholder="Enter password"
    @input="$emit('update:value', $event.target.value ?? '')"
  />
</template>

<style scoped>
.a-input-password {
  width: 100%;
}
</style>
