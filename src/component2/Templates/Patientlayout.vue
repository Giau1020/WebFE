<template>
  <div class="patients-page">
    <PatientTableOrganism />
  </div>
</template>

<script setup lang="ts">
import PatientTableOrganism from '../organisms/PatientTable.vue';
</script>

<style scoped>
.patients-page {
  padding: 20px;
  /* margin: 20px; */
  border-radius: 15px;
  background-color: white;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #d3d3d390;
  max-height: 100%;
}
</style>
