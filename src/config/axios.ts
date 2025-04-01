import axios from 'axios';
import { API_URL } from './env';

// axios 기본 설정
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 모든 요청에 쿠키 포함
  headers: {
    'Content-Type': 'application/json'
  }
});

// CSRF 토큰 처리를 위한 인터셉터 (필요한 경우)
axiosInstance.interceptors.request.use(config => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
    
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  
  return config;
});

export default axiosInstance;
