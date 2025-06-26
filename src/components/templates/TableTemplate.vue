<template>
  <div>
    <TableOrganism :columns="columns" :row-selection="rowSelection" />
    <ButtonAtom type="primary" @click="addPatient" style="margin-top: 16px"
      >Add Patient</ButtonAtom
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TableOrganism from './TableOrganism.vue';
import { usePatientStore } from '@/stores/patientStore';
import ButtonAtom from './ButtonAtom.vue';

const store = usePatientStore();
const columns = [
  { title: 'Select', dataIndex: 'select', key: 'select', width: 60 },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    customFilterDropdown: true,
    onFilter: (value: any, record: any) =>
      record.name.toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) setTimeout(() => searchInput.value?.focus(), 100);
    },
  },
  { title: 'Ngày tháng năm sinh', dataIndex: 'birthDate', key: 'birthDate' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  { title: 'Chỉnh sửa', key: 'edit', width: 100 },
  { title: 'Xóa', key: 'delete', width: 100 },
];
const rowSelection = {
  onChange: (selectedRowKeys: string[], selectedRows: any[]) =>
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    ),
};
const searchInput = ref();

const addPatient = () => {
  store.addPatient({
    name: `New Patient ${Date.now()}`,
    birthDate: '1990-01-01',
    status: 'Active',
  });
};
</script>
