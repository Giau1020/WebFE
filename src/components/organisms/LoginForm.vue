<script setup lang="ts">
import FormItem from '@/components/molecules/FormItem.vue';
import InputField from '@/components/atoms/InputField.vue';
import PasswordField from '@/components/atoms/PasswordField.vue';
import SubmitButton from '@/components/atoms/SubmitButton.vue';

const formData = ref({
  username: '',
  password: '',
});

const loading = ref(false);
const error = ref<string | null>(null);

const rules = {
  username: [{ required: true, message: 'Hãy nhập username!' }],
  password: [{ required: true, message: 'Hãy nhập password!' }],
};

const handleSubmit = () => {
  loading.value = true;
  error.value = null;
  setTimeout(() => {
    if (!formData.value.username || !formData.value.password) {
      error.value = 'Không hợp lệ';
    } else {
      error.value = null;
      console.log('Login submitted:', formData.value);
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
      <submit-button :loading="loading" />
      <div class="register-link">
        Chưa có tài khoản?
        <router-link to="/register">Đăng ký ngay</router-link>
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
  /* background: linear-gradient(135deg, #ffffff, #e6f7ff); Gradient nền */
  border-radius: 12px;
  /* box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); Shadow sâu hơn */
  position: relative;
  overflow: hidden;
  border: 2px solid transparent; /* Chuẩn bị cho viền gradient */
  background-clip: padding-box; /* Ngăn gradient tràn ra viền */
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
  box-shadow: 0 0 8px rgba(64, 196, 255, 0.3); /* Hiệu ứng glow */
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
  box-shadow: 0 0 8px rgba(72, 98, 111, 0.3); /* Hiệu ứng glow */
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
