<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo1.svg" alt="Logo" />
      <SearchInput class="search-input" @search="handleSearch" />
    </div>
    <UserProfile />
  </div>
</template>

<script setup lang="ts">
import UserProfile from '@/components/atoms/UserProfile.vue';
import SearchInput from '@/components/atoms/SearchInput.vue';

const handleSearch = (value: string) => {
  console.log('Search term:', value);
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}
.logo img {
  height: 60px;
  width: auto;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.logo-text {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.search-input {
  width: 300px;
}
</style>
