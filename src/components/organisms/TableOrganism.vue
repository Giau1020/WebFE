<template>
  <div>
    <div v-if="selectedRowKeys.length > 0" style="margin-bottom: 16px">
      <a-button
        type="primary"
        danger
        @click="showBatchDeleteConfirm"
        :disabled="!selectedRowKeys.length"
      >
        <DeleteOutlined /> Xóa Hàng Loạt ({{ selectedRowKeys.length }})
      </a-button>
      <a-button
        type="primary"
        style="margin-left: 8px"
        @click="showBatchEditModal"
        :disabled="!selectedRowKeys.length"
      >
        <EditOutlined /> Chỉnh Sửa Hàng Loạt ({{ selectedRowKeys.length }})
      </a-button>
    </div>
    <a-table
      :data-source="store.patients"
      :columns="columns"
      :row-selection="rowSelection"
      :loading="store.loading"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span style="color: #1890ff">Name</span>
        </template>
      </template>
      <template #customFilterDropdown="slotProps">
        <FilterDropdownMolecule
          v-bind="slotProps"
          :data-index="slotProps.column.dataIndex"
          @search="handleSearch"
          @reset="handleReset"
        />
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
            <AvatarAtom :src="record.avatar" />
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
          <AvatarAtom :src="record.avatar" />
          {{ text }}
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag :color="text === 'Active' ? 'green' : 'red'">{{ text }}</a-tag>
        </template>
        <template v-else-if="column.key === 'edit'">
          <ButtonAtom type="link" @click="showModal(record)">
            <EditOutlined />
          </ButtonAtom>
        </template>
        <template v-else-if="column.key === 'delete'">
          <a-popconfirm
            title="Are you sure?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDelete(record)"
          >
            <ButtonAtom type="link" danger>
              <DeleteOutlined />
            </ButtonAtom>
          </a-popconfirm>
        </template>
        <template v-else>{{ text }}</template>
      </template>
    </a-table>
    <a-modal
      v-model:open="open"
      :title="`Edit ${selectedRecord?.name || 'Record'}`"
      @ok="handleOk"
    >
      <a-form :model="formState" @finish="handleUpdate">
        <a-form-item label="Name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Birth Date">
          <a-input v-model:value="formState.birthDate" />
        </a-form-item>
        <a-form-item label="Status">
          <a-select v-model:value="formState.status">
            <a-select-option value="Active">Active</a-select-option>
            <a-select-option value="Inactive">Inactive</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="batchEditOpen"
      title="Chỉnh Sửa Hàng Loạt"
      @ok="handleBatchEditOk"
    >
      <a-form :model="batchFormState" @finish="handleBatchUpdate">
        <a-form-item label="Status">
          <a-select v-model:value="batchFormState.status">
            <a-select-option value="Active">Active</a-select-option>
            <a-select-option value="Inactive">Inactive</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, watch } from 'vue';
import AvatarAtom from '../newatom/AvatarAtom.vue';
import ButtonAtom from '../newatom/ButtonAtom.vue';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';
import { usePatientStore } from '@/stores/patientStore';
import { message } from 'ant-design-vue';

const props = defineProps<{
  columns: any[];
  rowSelection: any;
}>();

const emit = defineEmits(['search', 'reset', 'delete', 'edit']);
const store = usePatientStore();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const open = ref<boolean>(false);
const batchEditOpen = ref<boolean>(false);
const selectedRecord = ref<any>(null);
const formState = ref<any>({});
const batchFormState = ref<any>({ status: 'Active' });
const selectedRowKeys = ref<any[]>([]);

watch(
  () => selectedRecord.value,
  (newRecord) => {
    if (newRecord) formState.value = { ...newRecord };
  },
  { immediate: true }
);

// Update rowSelection to track selected rows
const rowSelection = computed(() => ({
  ...props.rowSelection,
  onChange: (keys: any[]) => {
    selectedRowKeys.value = keys;
    props.rowSelection?.onChange?.(keys);
  },
}));

const handleSearch = (selectedKeys: any) => {
  state.searchText = selectedKeys[0];
  state.searchedColumn = props.columns.find(
    (col) => col.customFilterDropdown
  )?.dataIndex;
  emit('search', selectedKeys);
};

const handleReset = () => {
  state.searchText = '';
  state.searchedColumn = '';
  emit('reset');
  store.fetchPatients();
};

const showModal = (record: any) => {
  selectedRecord.value = record;
  open.value = true;
};

const handleOk = () => {
  open.value = false;
};

const handleUpdate = () => {
  store.updatePatient(formState.value);
  open.value = false;
};

const handleDelete = (record: any) => {
  store.deletePatient(record.key);
};

const showBatchDeleteConfirm = () => {
  aModal.confirm({
    title: `Bạn có chắc muốn xóa ${selectedRowKeys.value.length} bệnh nhân?`,
    content: 'Hành động này không thể hoàn tác.',
    okText: 'Xóa',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk() {
      store.batchDeletePatients(selectedRowKeys.value);
      selectedRowKeys.value = [];
      message.success('Đã xóa các bệnh nhân được chọn');
    },
  });
};

const showBatchEditModal = () => {
  batchEditOpen.value = true;
};

const handleBatchEditOk = () => {
  batchEditOpen.value = false;
};

const handleBatchUpdate = () => {
  store.updatePatient(selectedRowKeys.value, {
    status: batchFormState.value.status,
  });
  batchEditOpen.value = false;
  selectedRowKeys.value = [];
  message.success('Đã cập nhật trạng thái cho các bệnh nhân được chọn');
};
</script>

<style scoped>
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
.highlight {
  background-color: #fff3cd;
  padding: 2px 4px;
  border-radius: 4px;
}
:deep(.ant-table-selection-column .ant-checkbox-wrapper) {
  margin-left: 8px;
}
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
@media (max-width: 768px) {
  :deep(.ant-table) {
    font-size: 14px;
  }
  :deep(.ant-table-thead > tr > th),
  :deep(.ant-table-tbody > tr > td) {
    padding: 8px;
  }
}
:deep(.ant-table-tbody > tr > td) .ant-avatar {
  margin-right: 8px;
  vertical-align: middle;
}
</style>
