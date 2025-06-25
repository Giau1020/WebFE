// src/services/http.ts
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import api from './api'; // axios instance bạn đã cấu hình interceptor, baseURL, v.v.

/**
 * Hàm gọi API duy nhất cho mọi phương thức.
 */
export async function request<T = unknown>(
  method: Method,
  url: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const res: AxiosResponse<T> = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return res.data;
  } catch (err: any) {
    console.error(`[${method.toUpperCase()}] ${url} —`, err);
    throw err;
  }
}

/* Convenience helpers */
export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>('get', url, undefined, config);

export const post = <T = unknown>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
) => request<T>('post', url, body, config);

export const put = <T = unknown>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
) => request<T>('put', url, body, config);

export const patch = <T = unknown>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig
) => request<T>('patch', url, body, config);

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>('delete', url, undefined, config);
