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

// 인증 컨텍스트 제공자 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setState({
          ...initialState,
          loading: false
        });
        return;
      }

      try {
        // 사용자 정보 요청
        const response = await axios.get(`${API_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
          error: null
        });
      } catch (error) {
        // 토큰이 유효하지 않은 경우
        localStorage.removeItem('accessToken');
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: '인증이 만료되었습니다. 다시 로그인해주세요.'
        });
      }
    };

    checkAuth();
  }, []);

  // Google OAuth2 로그인
  const login = () => {
    window.location.href = `${API_URL}/oauth2/authorize/google`;
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('accessToken');
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
