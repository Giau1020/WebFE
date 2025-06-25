<template>
  <a-layout-header class="dashboard-header">
    <a-row type="flex" align="middle">
      <!-- Tiêu đề -->
      <a-col>
        <span class="title">Lịch hẹn</span>
      </a-col>

      <!-- Bộ lọc bác sĩ -->
      <a-col style="margin-left: 20px">
        <a-select
          v-model:value="selectedDoctor"
          placeholder="Tất cả bác sĩ"
          style="width: 200px"
          allow-clear
        >
          <a-select-option
            v-for="doctor in doctors"
            :key="doctor.id"
            :value="doctor.id"
          >
            {{ doctor.name }}
          </a-select-option>
        </a-select>
      </a-col>

      <!-- Hiển thị & chọn ngày -->
      <!-- Hiển thị & chọn ngày -->
      <a-col flex="auto" style="text-align: center; position: relative">
        <!-- Ô hiển thị ngày – click để bật lịch -->
        <span class="date-display" @click="showPicker = true">
          <LeftOutlined class="arrow" @click.stop="shiftDate(-1)" />
          {{ formatDate(selectedDate) }}
          <RightOutlined class="arrow" @click.stop="shiftDate(1)" />
        </span>

        <!-- Date-picker ẩn input, chỉ dùng popup -->
        <a-date-picker
          v-model:value="selectedDate"
          :open="showPicker"
          @openChange="showPicker = $event"
          @change="onDateChange"
          ref="datePickerRef"
          inputReadOnly
          style="visibility: hidden; position: absolute; width: 0; height: 0"
          :format="'DD MMM YYYY'"
        />
      </a-col>

      <!-- Nút thêm lịch hẹn -->
      <a-col>
        <a-button type="primary" @click="addAppointment">
          Thêm lịch hẹn
        </a-button>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { useDoctorsStore } from '@/stores/doctor';
import { Select } from 'ant-design-vue';

/* ------------ store ------------ */
const doctorsStore = useDoctorsStore();

/* ------------ state ------------ */
const selectedDoctor = ref<string>;
const selectedDate = ref<Date>(new Date()); // Default to today's date: June 24, 2025, 11:24 PM +07
const showDateSelection = ref(false);

/* ref để focus vào <a-select> khi mở */
const dateSelectRef = ref<InstanceType<typeof Select> | null>(null);

/* ------------ computed ------------ */
const doctors = computed(() => doctorsStore.doctors);

// 7 ngày gần nhất (kể cả hôm nay)
const previousDates = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d;
  });
});

/* ------------ utils ------------ */
const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, '0')} ${date
    .toLocaleString('default', { month: 'short' })
    .toUpperCase()} ${date.getFullYear()}`;

/* ------------ methods ------------ */
const toggleDateSelection = () => {
  showDateSelection.value = !showDateSelection.value;
  if (showDateSelection.value) {
    nextTick(() => (dateSelectRef.value as any)?.focus?.()); // ép kiểu
  }
};

const handleDateChange = (date: Date) => {
  console.log('click');
  selectedDate.value = date;
  showDateSelection.value = false;
};

const addAppointment = () => {
  if (selectedDoctor.value && selectedDate.value) {
    console.log(
      'Add appointment:',
      selectedDoctor.value,
      selectedDate.value.toISOString().split('T')[0]
    );
  }
};
</script>

<style scoped>
.dashboard-header {
  background-color: rgba(224, 224, 224, 0.8);
  padding: 15px 20px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.date-display {
  cursor: pointer;
  font-size: 16px;
  color: #34495e;
  padding: 5px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  display: inline-block;
}
.date-display:hover {
  background: #f0f0f0;
}

.date-selection {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
