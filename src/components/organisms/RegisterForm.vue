<script setup lang="ts">
import FormItem from '@/components/molecules/FormItem.vue';
import InputField from '@/components/atoms/InputField.vue';
import PasswordField from '@/components/atoms/PasswordField.vue';
import SubmitButton from '@/components/atoms/SubmitButton.vue';
import DatePickerField from '@/components/atoms/DatePickerField.vue';
import SelectField from '@/components/atoms/SelectField.vue';
import { ref } from 'vue';

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  birthDate: '', // Sẽ lưu dưới dạng YYYY-MM-DD
  gender: '', // Sẽ chọn từ "Nam" hoặc "Nữ"
  CCCD: '',
});

const loading = ref(false);
const error = ref<string | null>(null);

const rules = {
  username: [{ required: true, message: 'Hãy nhập username!' }],
  password: [{ required: true, message: 'Hãy nhập password!' }],
  confirmPassword: [{ required: true, message: 'Hãy nhập lại mật khẩu!' }],
  fullName: [{ required: true, message: 'Hãy nhập họ và tên!' }],
  birthDate: [
    { required: true, message: 'Hãy nhập ngày tháng năm sinh!' },
    { type: 'date', message: 'Vui lòng chọn ngày hợp lệ!' },
  ],
  gender: [{ required: true, message: 'Hãy chọn giới tính!' }],
  CCCD: [{ required: true, message: 'Hãy nhập số CMND/CCCD!' }],
};

const handleSubmit = () => {
  loading.value = true;
  error.value = null;
  setTimeout(() => {
    if (
      !formData.value.username ||
      !formData.value.password ||
      !formData.value.confirmPassword ||
      !formData.value.fullName ||
      !formData.value.birthDate ||
      !formData.value.gender ||
      !formData.value.CCCD
    ) {
      error.value = 'Không hợp lệ';
    } else {
      error.value = null;
    }
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="login-form">
    <a-alert v-if="error" type="error" :message="error" class="alert" />
    <a-form :model="formData" layout="vertical" @finish="handleSubmit">
      <form-item label="Tên đăng nhập" name="username" :rules="rules.username">
        <input-field v-model:value="formData.username" />
      </form-item>
      <form-item label="Mật khẩu" name="password" :rules="rules.password">
        <password-field v-model:value="formData.password" />
      </form-item>
      <form-item
        label="Nhập lại Mật khẩu"
        name="confirm-password"
        :rules="rules.confirmPassword"
      >
        <password-field v-model:value="formData.confirmPassword" />
      </form-item>
      <form-item label="Họ và tên" name="fullName" :rules="rules.fullName">
        <input-field v-model:value="formData.fullName" />
      </form-item>
      <form-item
        label="Ngày tháng năm sinh"
        name="birthDate"
        :rules="rules.birthDate"
      >
        <date-picker-field
          v-model:modelValue="formData.birthDate"
          placeholder="Chọn ngày sinh"
        />
      </form-item>
      <form-item label="Giới tính" name="gender" :rules="rules.gender">
        <select-field
          v-model:modelValue="formData.gender"
          placeholder="Chọn giới tính"
        >
          <a-select-option value="Nam">Nam</a-select-option>
          <a-select-option value="Nữ">Nữ</a-select-option>
        </select-field>
      </form-item>
      <form-item label="CMND/CCCD" name="CCCD" :rules="rules.CCCD">
        <input-field v-model:value="formData.CCCD" />
      </form-item>
      <submit-button :loading="loading" />
      <div class="register-link">
        Đã có tài khoản? <router-link to="/login">Đăng nhập ngay</router-link>
      </div>
    </a-form>
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
}

/* Viền gradient động */
.login-form::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #40c4ff, #0288d1, #40c4ff);
  z-index: -1;
  border-radius: 14px;
  animation: gradientBorder 3s linear infinite;
}

@keyframes gradientBorder {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.alert {
  margin-bottom: 16px;
  border-radius: 6px;
}

.password-field {
  font-size: 20px;
  height: 50px;
}

:deep(.ant-input) {
  font-size: 17px;
  border-radius: 6px;
  border: 1px solid #b3e5fc;
  transition: all 0.3s ease;
  height: 50px;
}

:deep(.ant-input):hover,
:deep(.ant-input):focus {
  border-color: #40c4ff;
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3);
}

:deep(.ant-btn-primary) {
  background: #032240;
  color: white;
  border-color: #032240;
  border-radius: 6px;
  height: 40px;
  width: 100%;
  font-size: 16px;
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary):hover {
  background: #011e2e;
  border-color: #0288d1;
  box-shadow: 0 0 8px rgba(72, 98, 111, 0.3);
}

:deep(.ant-form-item-label > label) {
  font-weight: 600;
  font-size: 18px;
  color: #333;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
  color: #333;
}

.register-link a {
  color: #40c4ff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-link a:hover {
  color: #0288d1;
  text-decoration: underline;
}
</style>
