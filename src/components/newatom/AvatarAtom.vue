<template>
  <a-avatar
    :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
    :src="src"
  />
</template>

<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>
