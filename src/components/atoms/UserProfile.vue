<template>
  <div class="user-section">
    <a-dropdown>
      <div class="user-info">
        <a-avatar src="https://i.pravatar.cc/40?img=3" />
        <span class="user-name">Guy Hawkins</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">Profile</a-menu-item>
          <a-menu-item key="2">Logout</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.user-section {
  display: flex;
  align-items: center;
}

.bell-icon {
  font-size: 18px;
  color: #666;
  margin-right: 16px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 30px;
}

.user-name {
  margin-left: 8px;
  color: #333;
}
</style>
