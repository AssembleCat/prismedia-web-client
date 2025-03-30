/**
 * 환경변수 설정
 * Vite에서는 VITE_ 접두사가 붙은 환경변수만 클라이언트에서 접근 가능
 */

// API 서버 URL (기본값: http://localhost:8080)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// OAuth2 리다이렉트 URI (기본값: http://localhost:3000/oauth2/redirect)
export const OAUTH2_REDIRECT_URI = import.meta.env.VITE_OAUTH2_REDIRECT_URI || 'http://localhost:3000/oauth2/redirect';

// Google OAuth 클라이언트 정보
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

// 환경 정보
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;
