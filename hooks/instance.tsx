// utils/api.ts
import axios from "axios";
import { API } from "./getEnv";

// Statik instance yaratamiz
export const api = axios.create({
  baseURL: API
});

// Client-side token interceptor
if (typeof window !== 'undefined') {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
      } catch (error) {
        console.error('Token olishda xato:', error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

// Eski instance funksiyasini saqlaymiz (mos kelish uchun)
export const instance = () => api;