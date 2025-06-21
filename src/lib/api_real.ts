import axios from 'axios';

// URL base da API - usa variável de ambiente ou fallback para desenvolvimento
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

// Configuração base do axios
const createAPIInstance = (endpoint: string) => {
  return axios.create({
    baseURL: `${API_BASE_URL}${endpoint}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Instâncias da API para cada módulo
export const authAPI = createAPIInstance('/auth');
export const tokenAPI = createAPIInstance('/tokens');
export const contentAPI = createAPIInstance('/content');
export const configAPI = createAPIInstance('/config');
export const newsletterAPI = createAPIInstance('/newsletter');
export const adminAPI = createAPIInstance('/admin');

// Interceptors para tratamento de erros globais
const setupInterceptors = (apiInstance: any) => {
  apiInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
};

// Aplicar interceptors a todas as instâncias
setupInterceptors(authAPI);
setupInterceptors(tokenAPI);
setupInterceptors(contentAPI);
setupInterceptors(configAPI);
setupInterceptors(newsletterAPI);
setupInterceptors(adminAPI);

