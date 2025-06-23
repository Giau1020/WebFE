import api from './api';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        '/auth/login',
        credentials
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};
