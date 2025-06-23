<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <a-row type="flex" justify="center" align="right" class="layout-row">
      <a-col :xs="22" :sm="16" :md="12" :lg="8">
        <div class="layout-container">
          <slot />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background-image: url(/src/assets/Background.svg);
  background-size: cover; /* phóng to/thu nhỏ vừa khung, giữ tỉ lệ */
  background-position: center; /* căn giữa */
  background-repeat: no-repeat; /* không lặp */
  display: flex;
  align-items: center;

  overflow: hidden;
}

.layout-row {
  width: 100%;
  height: 100%;
}

.layout-container {
  width: 100%;
  height: 100vh; /* Chiều cao 100% viewport */

  padding: 24px;
  border-radius: 0; /* Loại bỏ bo góc để gradient trông tự nhiên */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Căn giữa nội dung theo chiều dọc */
}
.ant-row {
  display: flex;
  justify-content: flex-start;
  position: relative;
  left: 200px;
}
:deep(.ant-col) {
  /* background-color: wheat; */
  width: 100%;
  max-width: 1000px;
}
</style>
