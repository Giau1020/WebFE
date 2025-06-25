<template>
  <div class="sidebar-container" ref="sidebarRef">
    <a-menu
      mode="inline"
      :inline-collapsed="isCollapsed"
      :selected-keys="selectedKeys"
      :style="{ width: isCollapsed ? '60px' : '200px' }"
      class="sidebar"
      @click="handleMenuClick"
    >
      <!-- Toggle -->
      <a-menu-item key="1" class="toggle-item" title="">
        <a-tooltip
          v-if="isCollapsed"
          placement="right"
          title="Danh mục"
          overlay-class-name="custom-tooltip"
        >
          <MenuOutlined
            @click.stop="toggleCollapse"
            :style="{ marginLeft: 'auto' }"
          />
        </a-tooltip>
        <template v-else>
          <MenuOutlined @click.stop="toggleCollapse" />
        </template>
        <span v-if="!isCollapsed">Danh mục</span>
      </a-menu-item>

      <!-- Appointments -->
      <a-menu-item key="2" title="">
        <a-tooltip
          v-if="isCollapsed"
          placement="right"
          title="Appointments"
          overlay-class-name="custom-tooltip"
        >
          <CalendarOutlined />
        </a-tooltip>
        <template v-else>
          <CalendarOutlined />
        </template>
        <span v-if="!isCollapsed">Appointments</span>
      </a-menu-item>

      <!-- Patients -->
      <a-menu-item key="3" title="">
        <a-tooltip
          v-if="isCollapsed"
          placement="right"
          title="Patients"
          overlay-class-name="custom-tooltip"
        >
          <UserOutlined />
        </a-tooltip>
        <template v-else>
          <UserOutlined />
        </template>
        <span v-if="!isCollapsed">Patients</span>
      </a-menu-item>

      <!-- Staff & Doctor -->
      <a-menu-item key="4" title="">
        <a-tooltip
          v-if="isCollapsed"
          placement="right"
          title="Staffs & Doctors"
          overlay-class-name="custom-tooltip"
        >
          <TeamOutlined />
        </a-tooltip>
        <template v-else>
          <TeamOutlined />
        </template>
        <span v-if="!isCollapsed">Staffs & Doctors</span>
      </a-menu-item>

      <!-- Logout -->
      <a-menu-item key="5" class="logout-item" title="">
        <a-tooltip
          v-if="isCollapsed"
          placement="right"
          title="Đăng xuất"
          overlay-class-name="custom-tooltip"
        >
          <LogoutOutlined />
        </a-tooltip>
        <template v-else>
          <LogoutOutlined />
        </template>
        <span v-if="!isCollapsed">Đăng xuất</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  MenuOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';

const isCollapsed = ref(true);
const selectedKeys = ref<string[]>(['2']); // Mặc định chọn "Dashboard" (key="2")
const sidebarRef = ref<HTMLElement | null>(null);
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleMenuClick = (e: any) => {
  if (e.key === '1') {
    toggleCollapse();
    return;
  }

  if (e.key !== '1') {
    selectedKeys.value = [e.key];
  }
};

// Thu gọn khi click ra ngoài sidebar
const handleClickOutside = (e: MouseEvent) => {
  if (
    !isCollapsed.value &&
    sidebarRef.value &&
    !sidebarRef.value.contains(e.target as Node)
  ) {
    isCollapsed.value = true;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar {
  height: 100%;
  background-color: #f0f2f5;
  border-right: 1px solid #e8e8e8;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
}

:deep(.ant-menu-item) {
  height: 50px;
  width: 100%;
  line-height: 50px;
  display: flex;
  align-items: center;
  border-radius: 0px;
  margin: 0;
  padding: 0 16px;
  position: relative;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

:deep(.ant-menu-item .anticon) {
  font-size: 18px;
  margin-right: 8px;
}

:deep(.toggle-item:hover),
:deep(.toggle-item.ant-menu-item-active),
:deep(.toggle-item.ant-menu-item-selected) {
  background-color: transparent !important;
  color: inherit !important;
}

:deep(
  .ant-menu-item:not(.toggle-item):hover,
  .ant-menu-item:not(.toggle-item).ant-menu-item-active,
  .ant-menu-item:not(.toggle-item).ant-menu-item-selected
) {
  background-color: #e6f7ff;
  color: #1890ff;
}

:deep(.ant-menu-item:not(.toggle-item).ant-menu-item-selected)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #1890ff;
  transition: width 0.25s ease;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: none; /* Loại bỏ bóng hoặc hiệu ứng cong */
  transform: translateX(0); /* Đảm bảo viền sát mép */
}

/* ---------------- Sidebar thu gọn ---------------- */
/* Ẩn nền & viền khi collapsed, chỉ đổi màu icon */
:deep(.sidebar .ant-menu-inline-collapsed .ant-menu-item-selected) {
  background-color: transparent;
}

:deep(.sidebar .ant-menu-inline-collapsed .ant-menu-item-selected)::after {
  display: none;
}

:deep(.sidebar .ant-menu-inline-collapsed .ant-menu-item-selected .anticon) {
  color: #1890ff;
}

:deep(.logout-item) {
  margin-top: auto;
}

:deep(.custom-tooltip .ant-tooltip-inner) {
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.custom-tooltip .ant-tooltip-arrow) {
  border-color: #000 !important;
}

:deep(.ant-tooltip) {
  z-index: 1000;
}
</style>
