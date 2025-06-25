import type { LoginRequest, LoginResponse } from '@/types/auth';
import { post } from './http';

// export const authService = {
//   login: async (credentials: LoginRequest): Promise<LoginResponse> => {
//     try {
//       const response = await api.post<LoginResponse>(
//         '/auth/login',
//         credentials
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },
// };

export const authService = {
  login: (payload: LoginRequest) => post<LoginResponse>('/auth/login', payload),
  logout: () => post<void>('/auth/logout'),
};
