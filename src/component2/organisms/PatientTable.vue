<template>
  <div>
    <h1>
      Patient List
      <a-space style="float: right">
        <InputField
          v-model:value="searchQuery"
          placeholder="Search by Name or Insurance ID"
          style="width: 200px; margin-right: 10px"
          @change="handleSearch"
        />
        <SelectField
          class="select-field"
          v-model="selectedStatus"
          placeholder="Filter by Status"
        >
          <a-select-option value="">All</a-select-option>
          <a-select-option value="Activated">Active</a-select-option>
          <a-select-option value="Inactive">Inactive</a-select-option>
        </SelectField>
        <ButtonAtom
          type="default"
          danger
          :disabled="selectedRowKeys.length === 0"
          label="Delete Selected"
          @click="deleteSelected"
        />
        <ButtonAtom type="default" danger label="Thêm" @click="AddPatient" />
      </a-space>
    </h1>
    <a-table
      class="table-wrapper"
      :columns="columns"
      :data-source="filteredPatients"
      :row-selection="rowSelection"
      :pagination="{ pageSize: 8, hideOnSinglePage: true }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <StatusMolecule :status="record.status" />
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <ButtonAtom
              label="✎"
              type="link"
              @click="showEditModal(record as Patient)"
            />

            <ButtonAtom
              label="🗑"
              type="link"
              @click="deletePatient(record as Patient)"
            />
          </a-space>
        </template>
      </template>
    </a-table>
    <EditPatientModal
      v-if="isModalOpen"
      :open="isModalOpen"
      :patient="selectedPatient || ({} as Patient)"
      @update:open="isModalOpen = $event"
      @save="handleSave"
    />
    <AddPatientModal
      v-if="isAddModalOpen"
      :open="isAddModalOpen"
      @update:open="isAddModalOpen = $event"
      @save="handleAddPatient"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePatientStore } from '@/stores/patientStore';
import { message } from 'ant-design-vue';
import type {
  ColumnType,
  TableRowSelection,
} from 'ant-design-vue/es/table/interface';
import StatusMolecule from '@/component2/Molecules/Status.vue';
import ButtonAtom from '@/component2/Atoms/ButtonAtom.vue';
import EditPatientModal from '@/component2/Molecules/Editpatient.vue';
import AddPatientModal from '@/component2/Molecules/AddPatient.vue';
import type { Patient } from '@/stores/patientStore';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import SelectField from '@/component2/Atoms/SelectField.vue';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const store = usePatientStore();

const patients = computed((): Patient[] => store.getPatients);
const selectedRowKeys = computed({
  get: () => [...store.getSelectedRowKeys], // Tạo bản sao để tránh read-only
  set: (keys: string[]) => store.setSelectedRowKeys(keys),
});

const searchQuery = ref('');
const isModalOpen = ref(false);
const selectedPatient = ref<Patient | null>(null);
const selectedStatus = ref<string>('');
const isAddModalOpen = ref(false);

const columns: ColumnType[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'CCCD/CMND', dataIndex: 'cccd', key: 'cccd' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions' },
];

const rowSelection = computed<TableRowSelection>(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (selectedKeys: (string | number)[]) => {
    selectedRowKeys.value = selectedKeys as string[];
  },
  getCheckboxProps: () => ({
    disabled: false,
  }),
  type: 'checkbox',
  selections: [
    {
      key: 'selectAll',
      text: 'Select All',
      onSelect: () => {
        selectedRowKeys.value = patients.value.map((p: Patient) => p.key);
      },
    },
  ],
}));

const filteredPatients = computed((): Patient[] => {
  let result = [...patients.value];
  if (searchQuery.value) {
    result = result.filter(
      (p: Patient) =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.cccd.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  if (selectedStatus.value !== '') {
    result = result.filter((p: Patient) => p.status === selectedStatus.value);
  }
  return result;
});

// const filteredPatients = computed((): Patient[] => {
//   return [...patients.value]; // Dữ liệu đã được fetch từ API theo phân trang
// });

// const pagination = computed<TablePaginationConfig>(() => ({
//   current: currentPage.value,
//   pageSize: pageSize.value,
//   total: store.getTotal,
//   showSizeChanger: true,
//   pageSizeOptions: ['10', '20', '50'],
//   onChange: (page: number) => {
//     currentPage.value = page;
//     fetchData();
//   },
//   onShowSizeChange: (current: number, size: number) => {
//     currentPage.value = current;
//     pageSize.value = size;
//     fetchData();
//   },
// }));

// const fetchData = async () => {
//   await store.fetchPatients(currentPage.value, pageSize.value, searchQuery.value, selectedStatus.value);
// };

// // Watch để tự động fetch khi searchQuery hoặc selectedStatus thay đổi
// watch([searchQuery, selectedStatus], () => {
//   currentPage.value = 1; // Reset về trang 1 khi lọc
//   fetchData();
// }, { immediate: true });

// const handleSave = async (updatedPatient: Patient) => {
//   if (selectedPatient.value) {
//     await store.updatePatient(selectedPatient.value.key, updatedPatient);
//     message.success(`Patient ${updatedPatient.name} updated successfully!`);
//   }
//   isModalOpen.value = false;
// };

// const deletePatient = async (record: Patient) => {
//   await store.deletePatient(record.key);
//   message.success(`Deleted ${record.name}`);
// };

// const deleteSelected = async () => {
//   if (selectedRowKeys.value.length > 0) {
//     await store.deleteSelectedPatients();
//     message.success(
//       `Deleted ${selectedRowKeys.value.length} selected patients`
//     );
//   }
// };

const showEditModal = (record: Patient) => {
  selectedPatient.value = record;
  isModalOpen.value = true;
};

const handleSave = (updatedPatient: Patient) => {
  if (selectedPatient.value) {
    const index = patients.value.findIndex(
      (p: Patient) => p.key === selectedPatient.value!.key
    );
    if (index !== -1) {
      store.patients[index] = { ...store.patients[index], ...updatedPatient };
      message.success(`Patient ${updatedPatient.name} updated successfully!`);
    }
  }
  isModalOpen.value = false;
};

const AddPatient = () => {
  isAddModalOpen.value = true;
};

const handleAddPatient = async (newPatient: Patient) => {
  try {
    await store.addPatient(newPatient);
    // await store.fetchPatients(); // Làm mới danh sách
    message.success(`Patient ${newPatient.name} added successfully!`);
    isAddModalOpen.value = false;
  } catch (error) {
    message.error('Failed to add patient. Please try again.' + error);
  }
};

const deletePatient = (record: Patient) => {
  store.deletePatient(record.key);
  message.success(`Deleted ${record.name}`);
};

const deleteSelected = () => {
  if (selectedRowKeys.value.length > 0) {
    store.deleteSelectedPatients();
    message.success(
      `Deleted ${selectedRowKeys.value.length} selected patients`
    );
  }
};

const handleSearch = () => {
  // Có thể thêm logic lọc bổ sung nếu cần
};

const handleTableChange = () => {
  // Handle pagination if needed
};
</script>

<style scoped>
.custom-table :deep(.ant-table) {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  animation: expandIn 0.6s ease-out;
}

.custom-table :deep(.ant-table-thead > tr > th) {
  background: linear-gradient(90deg, #fafafa 0%, #f0f0f0 100%);
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #e0e0e0;
  padding: 14px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.custom-table :deep(.ant-table-tbody > tr > td) {
  padding: 14px;
  border-bottom: 1px solid #eee;
  color: #34495e;
  transition: all 0.3s ease;
}

.custom-table :deep(.ant-table-tbody > tr:hover > td) {
  background: linear-gradient(90deg, #e6f0fa 0%, #d0e1f7 100%);
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.custom-table :deep(.ant-table-row-selected > td) {
  background: linear-gradient(90deg, #d9edf7 0%, #c3e0f5 100%);
}

.custom-table :deep(.ant-table-selection-column) {
  padding: 14px;
}

.custom-table :deep(.ant-btn-link) {
  padding: 6px 10px;
  color: #3498db;
  font-size: 16px;
}

.custom-table :deep(.ant-btn-link:hover) {
  color: #2980b9;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

@keyframes expandIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.select-field {
  position: relative;
  top: 9px;
}
</style>
