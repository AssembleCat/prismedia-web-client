import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, User } from '../types/auth';
import axios from 'axios';
import { API_URL } from '../config/env';

// 초기 인증 상태
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  logout: () => {}
});

// 액세스 토큰 갱신 함수
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/api/auth/refresh-token`, {}, {
      withCredentials: true
    });
    return true;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return false;
  }
};

// 인증 컨텍스트 제공자 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // API 요청 인터셉터 설정
  useEffect(() => {
    // 응답 인터셉터
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // 401 에러이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // 토큰 갱신 시도
          const refreshed = await refreshAccessToken();
          
          if (refreshed) {
            // 원래 요청 재시도
            return axios(originalRequest);
          } else {
            // 로그아웃 처리
            localStorage.removeItem('user');
            setState({
              isAuthenticated: false,
              user: null,
              loading: false,
              error: '인증이 만료되었습니다. 다시 로그인해주세요.'
            });
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    return () => {
      // 컴포넌트 언마운트 시 인터셉터 제거
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 사용자 정보 요청 (withCredentials 옵션 추가)
        const response = await axios.get(`${API_URL}/api/user/me`, {
          withCredentials: true
        });

        // 로컬 스토리지에 사용자 정보만 저장
        localStorage.setItem('user', JSON.stringify(response.data));
        
        setState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
          error: null
        });
      } catch (error) {
        // 로컬 스토리지에서 사용자 정보 제거
        localStorage.removeItem('user');
        
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null
        });
      }
    };

    // 로컬 스토리지에 사용자 정보가 있는지 확인
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
          loading: true
        }));
        
        // 서버에서 최신 사용자 정보와 인증 상태 확인
        checkAuth();
      } catch (e) {
        localStorage.removeItem('user');
        setState(prev => ({
          ...prev,
          loading: false
        }));
      }
    } else {
      setState(prev => ({
        ...prev,
        loading: false
      }));
    }
  }, []);

  // Google OAuth2 로그인
  const login = () => {
    window.location.href = `${API_URL}/oauth2/authorize/google`;
  };

  // 로그아웃
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    }
    
    // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem('user');
    
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 사용을 위한 훅
export const useAuth = () => useContext(AuthContext);
