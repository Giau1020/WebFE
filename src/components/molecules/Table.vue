<template>
  <a-table :data-source="data" :columns="columns" row-selection="rowSelection">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span style="color: #1890ff">Name</span>
      </template>
    </template>
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ text, column, record }">
      <template
        v-if="
          column.key === 'name' &&
          state.searchText &&
          state.searchedColumn === column.dataIndex
        "
      >
        <span>
          <a-avatar
            :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
            :src="record.avatar"
          />
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(
                new RegExp(
                  `(?<=${state.searchText})|(?=${state.searchText})`,
                  'i'
                )
              )"
          >
            <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
      </template>
      <template v-else-if="column.key === 'name'">
        <a-avatar
          :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
          :src="record.avatar"
        />
        {{ text }}
      </template>
      <template v-else-if="column.key === 'status'">
        <a-tag :color="text === 'Active' ? 'green' : 'red'">
          {{ text }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'edit'">
        <a-button type="link" @click="showModal(record)">
          <EditOutlined />
        </a-button>
      </template>
      <template v-else-if="column.key === 'delete'">
        <a-popconfirm
          title="Are you sure?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleDelete(record)"
        >
          <a-button type="link" danger>
            <DeleteOutlined />
          </a-button>
        </a-popconfirm>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
  <a-modal
    v-model:open="open"
    :title="`Edit ${selectedRecord?.name || 'Record'}`"
    @ok="handleOk"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    birthDate: '1990-05-15',
    status: 'Active',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    key: '2',
    name: 'Joe Black',
    birthDate: '1980-03-22',
    status: 'Inactive',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    key: '3',
    name: 'Jim Green',
    birthDate: '1992-11-10',
    status: 'Active',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    key: '4',
    name: 'Jim Red',
    birthDate: '1988-07-30',
    status: 'Inactive',
    avatar: 'https://via.placeholder.com/100',
  },
]);

const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const searchInput = ref();
const open = ref<boolean>(false);
const selectedRecord = ref<any>(null);

const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
};

const columns = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    width: 60,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: 'Ngày tháng năm sinh',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Chỉnh sửa',
    key: 'edit',
    width: 100,
  },
  {
    title: 'Xóa',
    key: 'delete',
    width: 100,
  },
];

const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters: any) => {
  clearFilters({ confirm: true });
  state.searchText = '';
};

const showModal = (record: any) => {
  selectedRecord.value = record;
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e, 'Selected Record:', selectedRecord.value);
  open.value = false;
};

const handleDelete = (record: any) => {
  console.log('Delete record:', record);
  // Thêm logic xóa tại đây
  const index = data.value.findIndex((item) => item.key === record.key);
  if (index !== -1) {
    data.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* Sử dụng :deep() để áp dụng style cho các thành phần Ant Design */
:deep(.ant-table) {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f0f2f5;
  font-weight: 500;
  color: #333;
  border-bottom: 2px solid #e8e8e8;
  padding: 12px;
  text-align: left;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #fafafa;
}

/* Highlight text search */
.highlight {
  background-color: #fff3cd;
  padding: 2px 4px;
  border-radius: 4px;
}

/* Style cho checkbox */
:deep(.ant-table-selection-column .ant-checkbox-wrapper) {
  margin-left: 8px;
}

/* Style cho nút hành động */
:deep(.ant-btn-link) {
  padding: 4px;
  font-size: 14px;
}

:deep(.ant-btn-link:hover) {
  color: #1890ff;
}

:deep(.ant-btn-danger:hover) {
  color: #ff4d4f;
}

/* Responsive design */
@media (max-width: 768px) {
  :deep(.ant-table) {
    font-size: 14px;
  }
  :deep(.ant-table-thead > tr > th),
  :deep(.ant-table-tbody > tr > td) {
    padding: 8px;
  }
}

/* Điều chỉnh khoảng cách giữa avatar và tên */
:deep(.ant-table-tbody > tr > td) .ant-avatar {
  margin-right: 8px;
  vertical-align: middle;
}
</style>
