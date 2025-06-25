<template>
  <a-input-search
    v-model:value="searchStore.searchTerm"
    placeholder="Tìm kiếm..."
    class="search-input"
    @search="handleSearch"
  >
    <template #prefix>
      <!-- <SearchOutlined class="search-icon" /> -->
    </template>
  </a-input-search>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();

const handleSearch = (value: string) => {
  console.log('Search term:', value);
  // Có thể thêm logic xử lý tìm kiếm nếu cần
};
</script>

<style scoped>
.search-input {
  max-width: 300px;
}

.search-icon {
  color: #666;
  margin-right: 8px;
}

:deep(.ant-input-search-button) {
  background-color: none;
  border-color: none;
  color: #fff;
}

:deep(.ant-input-search-button:hover) {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
