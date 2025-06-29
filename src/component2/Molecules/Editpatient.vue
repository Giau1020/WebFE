<template>
  <a-modal
    v-model:open="isModalOpen"
    title="Edit Patient Information"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="Lưu"
    cancel-text="Hủy"
    :ok-button-props="{ disabled: !isFormValid }"
    :cancel-button-props="{ disabled: false }"
    width="700px"
    class="patient-modal"
  >
    <div class="form-wrapper">
      <a-form
        v-if="isModalOpen && props.patient"
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
        class="form"
      >
        <a-form-item label="ID" name="id">
          <InputField v-model:value="formState.id" disabled />
        </a-form-item>
        <a-form-item label="Username" name="username">
          <InputField v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="Full Name" name="fullName">
          <InputField v-model:value="formState.fullName" />
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
        <a-form-item class="grid-1-row" label="CCCD/CMND" name="cccd">
          <InputField v-model:value="formState.cccd" />
        </a-form-item>
        <a-form-item class="grid-1-row" label="Password">
          <template v-if="!showPasswordFields">
            <ButtonAtom
              label="Reset Password"
              type="link"
              @click="showPasswordFields = true"
            />
          </template>
          <template v-else>
            <a-form-item label="New Password" name="newPassword">
              <a-input-password v-model:value="formState.newPassword" />
            </a-form-item>
            <a-form-item label="Confirm Password" name="confirmPassword">
              <a-input-password v-model:value="formState.confirmPassword" />
            </a-form-item>
            <a-space>
              <ButtonAtom
                label="Đặt lại"
                type="primary"
                :disabled="!passwordsMatch"
                @click="showPasswordFields = false"
              />
              <ButtonAtom label="Đóng" @click="cancelPasswordReset" />
            </a-space>
          </template>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, defineProps, defineEmits } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Patient } from '@/stores/patientStore';
import type { RuleObject } from 'ant-design-vue/es/form';
import ButtonAtom from '../Atoms/ButtonAtom.vue';

// Định nghĩa props và emits
const props = defineProps<{
  open: boolean;
  patient: Patient | null;
}>();
const emit = defineEmits(['update:open', 'save']);

// Khởi tạo trạng thái
const formRef = ref();
const isModalOpen = ref(props.open);
const showPasswordFields = ref(false);
const formState = ref({
  id: '',
  username: '',
  fullName: '',
  dob: undefined as Dayjs | undefined,
  bloodGroup: '',
  gender: '',
  cccd: '',
  newPassword: '',
  confirmPassword: '',
});

// Quy tắc kiểm tra form
const rules: { [k: string]: RuleObject | RuleObject[] } = {
  username: [{ required: true, message: 'Please input username!' }],
  fullName: [{ required: true, message: 'Please input full name!' }],
  dob: [{ required: true, message: 'Please select date of birth!' }],
  bloodGroup: [{ required: true, message: 'Please select blood group!' }],
  gender: [{ required: true, message: 'Please select gender!' }],
  cccd: [{ required: true, message: 'Please input CCCD/CMND!' }],
  newPassword: [
    {
      validator: () => {
        if (!showPasswordFields.value || formState.value.newPassword) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Please input new password!'));
      },
    },
  ],
  confirmPassword: [
    {
      validator: () => {
        if (!showPasswordFields.value || formState.value.confirmPassword) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Please confirm password!'));
      },
    },
    {
      validator: () => {
        if (
          !showPasswordFields.value ||
          !formState.value.confirmPassword ||
          formState.value.newPassword === formState.value.confirmPassword
        ) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match!'));
      },
    },
  ],
};

// Tính toán trạng thái form
const isFormValid = computed(() => {
  if (showPasswordFields.value) {
    return (
      formState.value.newPassword &&
      formState.value.confirmPassword &&
      formState.value.newPassword === formState.value.confirmPassword
    );
  }
  return true;
});

const passwordsMatch = computed(() => {
  return (
    !showPasswordFields.value ||
    (formState.value.newPassword &&
      formState.value.newPassword === formState.value.confirmPassword)
  );
});

// Đồng bộ dữ liệu khi mở modal
watchEffect(() => {
  isModalOpen.value = props.open;
  if (props.open && props.patient) {
    formState.value = {
      id: props.patient.key,
      username: props.patient.username || '',
      fullName: props.patient.name || '',
      dob: props.patient.dob
        ? dayjs(props.patient.dob, 'DD/MM/YYYY')
        : undefined,
      bloodGroup: props.patient.bloodGroup || '',
      gender: props.patient.gender || '',
      cccd: props.patient.cccd || '',
      newPassword: '',
      confirmPassword: '',
    };
  }
});

// Xử lý sự kiện
const handleOk = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        emit('save', { ...formState.value });
        isModalOpen.value = false;
        emit('update:open', false);
      })
      .catch((error: Error) => {
        console.log('Validation failed:', error);
      });
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
  emit('update:open', false);
};

const cancelPasswordReset = () => {
  formState.value.newPassword = '';
  formState.value.confirmPassword = '';
  showPasswordFields.value = false;
};
</script>

<style scoped>
/* Container cho modal */
.patient-modal .form-wrapper {
  /* Giữ cuộn riêng & padding cũ */
  max-height: 500px;
  overflow-y: auto;
  padding: 16px;
}
.form {
  display: grid;
  gap: 16px 24px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
}

.patient-modal :deep(.ant-form-item) {
  margin: 0;
}
.grid-1-row {
  grid-column: 1 / -1; /* chiếm hết hàng */
}

/* Tùy chỉnh các trường nhập liệu */
.patient-modal .ant-form-item {
  margin-bottom: 16px;
}

.patient-modal .ant-form-item-label > label {
  font-weight: 500;
  color: #333;
}

.patient-modal .ant-input,
.patient-modal .ant-select,
.patient-modal .ant-picker {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.patient-modal .ant-input:hover,
.patient-modal .ant-select:hover,
.patient-modal .ant-picker:hover {
  border-color: #1890ff;
  box-shadow: 0 0 4px rgba(24, 144, 255, 0.2);
}

.patient-modal .ant-input:focus,
.patient-modal .ant-input-focused,
.patient-modal .ant-select-focused,
.patient-modal .ant-picker-focused {
  border-color: #1890ff;
  box-shadow: 0 0 6px rgba(24, 144, 255, 0.3);
}

.patient-modal .ant-input[disabled] {
  background-color: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}

/* Tùy chỉnh nút trong a-space */
.patient-modal .ant-space {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.patient-modal .ant-space .ant-btn {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.patient-modal .ant-space .ant-btn-primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

.patient-modal .ant-space .ant-btn-primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.patient-modal .ant-space .ant-btn-primary[disabled] {
  background-color: #91d5ff;
  border-color: #91d5ff;
  cursor: not-allowed;
}

.patient-modal .ant-space .ant-btn-default {
  border-color: #d9d9d9;
  color: #333;
}

.patient-modal .ant-space .ant-btn-default:hover {
  border-color: #1890ff;
  color: #1890ff;
}

/* Tùy chỉnh nút Reset Password */
.patient-modal .ant-btn-link {
  color: #1890ff;
  padding: 0;
  font-weight: 500;
}

.patient-modal .ant-btn-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}

/* Tùy chỉnh modal footer */
.patient-modal .ant-modal-footer {
  padding: 16px;
  border-top: 1px solid #d9d9d9;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.patient-modal .ant-modal-footer .ant-btn {
  border-radius: 4px;
}

/* Responsive design */
@media (max-width: 576px) {
  .patient-modal .ant-modal {
    width: 90% !important;
    margin: 0 auto;
  }

  .patient-modal .form-wrapper {
    padding: 8px;
  }

  .patient-modal .ant-form-item {
    margin-bottom: 12px;
  }
}
</style>
