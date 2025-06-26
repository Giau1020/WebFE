<template>
  <div style="padding: 8px">
    <InputAtom
      ref="searchInput"
      v-model="selectedKeys"
      :placeholder="`Search ${dataIndex}`"
      style="width: 188px; margin-bottom: 8px; display: block"
      @pressEnter="handleSearch"
    />
    <ButtonAtom
      type="primary"
      size="small"
      style="width: 90px; margin-right: 8px"
      @click="handleSearch"
    >
      <template #icon><SearchOutlined /></template>
      Search
    </ButtonAtom>
    <ButtonAtom size="small" style="width: 90px" @click="handleReset"
      >Reset</ButtonAtom
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import InputAtom from '../newatom/InputAtom.vue';
import ButtonAtom from '../newatom/ButtonAtom.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { usePatientStore } from '@/stores/patientStore';

const props = defineProps<{
  setSelectedKeys: (keys: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
  column: any;
  dataIndex: string;
}>();

const emit = defineEmits(['search', 'reset']);
const searchInput = ref();
const store = usePatientStore();

const handleSearch = () => {
  props.confirm();
  emit('search', props.selectedKeys);
  store.patients.value = store.patients.value.filter((p: any) =>
    p[props.dataIndex]
      .toLowerCase()
      .includes(props.selectedKeys[0].toLowerCase())
  );
};

const handleReset = () => {
  props.clearFilters();
  emit('reset');
  store.fetchPatients(); // Lấy lại dữ liệu gốc
};
</script>
