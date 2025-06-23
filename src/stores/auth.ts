import { defineStore } from 'pinia';
import { authService } from '@/services/authService';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<LoginResponse['user'] | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      token.value = response.token;
      user.value = response.user;
    } catch {
      error.value = 'Login failed. Please check your credentials.';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  return { token, user, loading, error, login, logout };
});
