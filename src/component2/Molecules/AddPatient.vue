<template>
  <a-modal
    v-model:open="isModalOpen"
    title="Add New Patient"
    @ok="handleOk"
    @cancel="handleCancel"
    :ok-button-props="{ disabled: !isFormValid }"
    :cancel-button-props="{ disabled: false }"
    class="patient-modal"
  >
    <div class="form-wrapper">
      <a-form
        v-if="isModalOpen"
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
      >
        <a-form-item label="Username" name="username">
          <InputField v-model:modelValue="formState.username" />
        </a-form-item>
        <a-form-item label="Full Name" name="name">
          <InputField v-model:modelValue="formState.name" />
        </a-form-item>
        <a-form-item label="Date of Birth" name="dob">
          <a-date-picker v-model:value="formState.dob" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Blood Group" name="bloodGroup">
          <a-select v-model:value="formState.bloodGroup" style="width: 100%">
            <a-select-option value="A+">A+</a-select-option>
            <a-select-option value="A-">A-</a-select-option>
            <a-select-option value="B+">B+</a-select-option>
            <a-select-option value="B-">B-</a-select-option>
            <a-select-option value="AB+">AB+</a-select-option>
            <a-select-option value="AB-">AB-</a-select-option>
            <a-select-option value="O+">O+</a-select-option>
            <a-select-option value="O-">O-</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Gender" name="gender">
          <a-select v-model:value="formState.gender" style="width: 100%">
            <a-select-option value="Male">Male</a-select-option>
            <a-select-option value="Female">Female</a-select-option>
            <a-select-option value="Other">Other</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="CCCD/CMND" name="cccd">
          <InputField v-model:modelValue="formState.cccd" />
        </a-form-item>
        <a-form-item label="Password" name="Password">
          <InputField v-model:modelValue="formState.password" />
        </a-form-item>
        <a-form-item label="Confirm Password" name="Confirm Password">
          <InputField v-model:modelValue="formState.confirmPassword" />
        </a-form-item>
        <a-form-item label="Status" name="status">
          <a-select v-model:value="formState.status" style="width: 100%">
            <a-select-option value="Activated">Active</a-select-option>
            <a-select-option value="Inactive">Inactive</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Dayjs } from 'dayjs';
import type { Patient } from '@/stores/patientStore';
import type { RuleObject } from 'ant-design-vue/es/form';
import InputField from '../Atoms/InputField.vue';

// Định nghĩa props và emits
const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(['update:open', 'save']);

// Khởi tạo trạng thái
const formRef = ref();
const isModalOpen = ref(props.open);
const formState = ref({
  username: '',
  name: '',
  dob: undefined as Dayjs | undefined,
  bloodGroup: '',
  gender: '',
  cccd: '',
  password: '',
  confirmPassword: '',
  status: 'Activated',
});

// Quy tắc kiểm tra form
const rules: { [k: string]: RuleObject | RuleObject[] } = {
  username: [{ required: true, message: 'Please input username!' }],
  name: [{ required: true, message: 'Please input full name!' }],
  dob: [{ required: true, message: 'Please select date of birth!' }],
  bloodGroup: [{ required: true, message: 'Please select blood group!' }],
  gender: [{ required: true, message: 'Please select gender!' }],
  cccd: [{ required: true, message: 'Please input CCCD/CMND!' }],
  password: [{ required: true, message: 'Please input Password!' }],
  confirmPassword: [
    { required: true, message: 'Please confirm password!' },
    {
      validator: (_, value) =>
        value === formState.value.password
          ? Promise.resolve()
          : Promise.reject('Passwords do not match!'),
    },
  ],
  status: [{ required: true, message: 'Please select status!' }],
};

// Tính toán trạng thái form
const isFormValid = computed(() => {
  return (
    formState.value.username &&
    formState.value.name &&
    formState.value.dob &&
    formState.value.bloodGroup &&
    formState.value.gender &&
    formState.value.cccd &&
    formState.value.password &&
    formState.value.status
  );
});

// Đồng bộ trạng thái modal
watchEffect(() => {
  isModalOpen.value = props.open;
  if (!props.open) {
    formState.value = {
      username: '',
      name: '',
      dob: undefined,
      bloodGroup: '',
      gender: '',
      cccd: '',
      password: '',
      confirmPassword: '',
      status: 'Activated',
    };
  }
});

// Xử lý sự kiện
const handleOk = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        const newPatient: Omit<Patient, 'key' | 'date'> = {
          username: formState.value.username,
          name: formState.value.name,
          dob: formState.value.dob
            ? formState.value.dob.format('DD/MM/YYYY')
            : '',
          bloodGroup: formState.value.bloodGroup,
          gender: formState.value.gender,
          cccd: formState.value.cccd,
          password: formState.value.password,
          status: formState.value.status,
        };
        emit('save', newPatient);
        isModalOpen.value = false;
        formRef.value.resetFields();
      })
      .catch((error: Error) => {
        console.log('Validation failed:', error);
      });
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
  emit('update:open', false);
  formRef.value.resetFields();
};
</script>

<style scoped>
/* Container chính của modal */
.patient-modal {
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

/* Tiêu đề modal */
:deep(.ant-modal-header) {
  background: linear-gradient(90deg, #e6f0fa 0%, #d0e1f7 100%);
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 24px;
  border-radius: 12px 12px 0 0;
}

:deep(.ant-modal-title) {
  font-weight: 600;
  color: #2c3e50;
  font-size: 18px;
}

/* Form container */
.form-wrapper {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  margin: 0 16px;
}

/* Tùy chỉnh form item */
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

:deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #34495e;
  font-size: 14px;
  line-height: 1.5;
}

/* Tùy chỉnh input, select, date-picker */
:deep(.ant-input),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: 6px;
  border: 1px solid #b3e5fc;
  background: #fff;
  height: 40px;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #34495e;
}

:deep(.ant-input:hover),
:deep(.ant-select-selector:hover),
:deep(.ant-picker:hover) {
  border-color: #40c4ff;
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3);
}

:deep(.ant-input:focus),
:deep(.ant-input-focused),
:deep(.ant-select-focused .ant-select-selector),
:deep(.ant-picker-focused) {
  border-color: #1890ff;
  box-shadow: 0 0 8px rgba(24, 144, 255, 0.4);
}

/* Tùy chỉnh mũi tên dropdown của select */
:deep(.ant-select-arrow) {
  color: #666;
  transition: transform 0.3s ease;
}

:deep(.ant-select-open .ant-select-arrow) {
  transform: rotate(180deg);
}

/* Tùy chỉnh item trong dropdown */
:deep(.ant-select-item-option-content) {
  color: #34495e;
  font-size: 14px;
}

/* Tùy chỉnh date-picker */
:deep(.ant-picker-input > input) {
  color: #34495e;
}

/* Tùy chỉnh thông báo lỗi */
:deep(.ant-form-item-explain-error) {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
}

/* Tùy chỉnh footer */
:deep(.ant-modal-footer) {
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Tùy chỉnh nút */
:deep(.ant-btn) {
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary) {
  background: linear-gradient(90deg, #1890ff 0%, #40c4ff 100%);
  border: none;
}

:deep(.ant-btn-primary:hover) {
  background: linear-gradient(90deg, #40c4ff 0%, #1890ff 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.ant-btn-default) {
  border: 1px solid #b3e5fc;
  color: #34495e;
}

:deep(.ant-btn-default:hover) {
  border-color: #1890ff;
  color: #1890ff;
}

/* Responsive design */
@media (max-width: 576px) {
  .patient-modal {
    width: 95% !important;
    margin: 0 auto;
  }

  .form-wrapper {
    padding: 16px;
    margin: 0 8px;
  }

  :deep(.ant-form-item) {
    margin-bottom: 16px;
  }

  :deep(.ant-input),
  :deep(.ant-select-selector),
  :deep(.ant-picker) {
    height: 36px;
    font-size: 13px;
  }

  :deep(.ant-modal-header) {
    padding: 12px 16px;
  }

  :deep(.ant-modal-footer) {
    padding: 12px 16px;
    gap: 8px;
  }

  :deep(.ant-btn) {
    padding: 6px 12px;
    font-size: 14px;
  }
}

/* Hiệu ứng mở modal */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
