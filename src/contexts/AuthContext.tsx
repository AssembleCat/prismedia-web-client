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
  // 로컬 스토리지에 사용자 정보가 없으면 토큰 갱신을 시도하지 않음
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    console.log('사용자 정보가 없어 토큰 갱신을 시도하지 않습니다.');
    return false;
  }

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
    // 요청 인터셉터 - 인증 토큰이 필요한 요청에만 withCredentials 추가
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // 인증이 필요한 API 요청인 경우에만 withCredentials 설정
        if (config.url?.includes('/api/') && !config.url.includes('/api/news/')) {
          config.withCredentials = true;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // 401 에러이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          // 로그인 페이지나 공개 API에 대한 요청은 토큰 갱신을 시도하지 않음
          if (originalRequest.url?.includes('/api/auth/me') || 
              originalRequest.url?.includes('/api/auth/refresh-token')) {
            console.log('인증 관련 API 요청에 대한 401 응답입니다. 토큰 갱신을 시도하지 않습니다.');
            return Promise.reject(error);
          }
          
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
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      console.log('인증 상태 확인 시작');
      
      // 로컬 스토리지에 사용자 정보가 있는지 먼저 확인
      const userStr = localStorage.getItem('user');
      if (userStr) {
        console.log('로컬 스토리지에 사용자 정보 있음');
        try {
          // 로컬 스토리지의 사용자 정보로 먼저 상태 설정
          const user = JSON.parse(userStr);
          setState(prev => ({
            ...prev,
            isAuthenticated: true,
            user,
            loading: true
          }));
          
          // 서버에서 최신 사용자 정보 확인
          try {
            console.log('서버에 사용자 정보 요청 시작');
            const response = await axios.get(`${API_URL}/api/auth/me`, {
              withCredentials: true
            });

            if (response.data) {
              // 로컬 스토리지 업데이트
              localStorage.setItem('user', JSON.stringify(response.data));
              
              setState({
                isAuthenticated: true,
                user: response.data,
                loading: false,
                error: null
              });
              console.log('사용자 인증 성공:', response.data);
            }
          } catch (error: any) {
            console.error('서버에서 사용자 정보 가져오기 실패:', error);
            console.error('오류 응답:', error.response?.data);
            console.error('오류 상태:', error.response?.status);
            
            // 401 오류인 경우 토큰 갱신 시도
            if (error.response?.status === 401) {
              console.log('토큰 갱신 시도');
              const refreshed = await refreshAccessToken();
              
              if (refreshed) {
                // 토큰 갱신 성공 시 다시 사용자 정보 요청
                try {
                  const newResponse = await axios.get(`${API_URL}/api/auth/me`, {
                    withCredentials: true
                  });
                  
                  if (newResponse.data) {
                    localStorage.setItem('user', JSON.stringify(newResponse.data));
                    setState({
                      isAuthenticated: true,
                      user: newResponse.data,
                      loading: false,
                      error: null
                    });
                    console.log('토큰 갱신 후 사용자 인증 성공:', newResponse.data);
                    return;
                  }
                } catch (refreshError) {
                  console.error('토큰 갱신 후 사용자 정보 요청 실패:', refreshError);
                }
              }
              
              // 토큰 갱신 실패 또는 갱신 후 요청 실패 시 로그아웃 처리
              localStorage.removeItem('user');
              setState({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: '인증이 만료되었습니다. 다시 로그인해주세요.'
              });
            } else {
              // 401 이외의 오류는 로컬 정보로 인증 상태 유지
              setState(prev => ({
                ...prev,
                loading: false
              }));
            }
          }
        } catch (e) {
          console.error('로컬 스토리지 사용자 정보 파싱 오류:', e);
          localStorage.removeItem('user');
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null
          });
        }
      } else {
        console.log('로컬 스토리지에 사용자 정보 없음, 쿠키로 인증 시도');
        
        // 로컬 스토리지에 사용자 정보가 없어도 쿠키가 있을 수 있으므로 서버에 확인
        try {
          const response = await axios.get(`${API_URL}/api/auth/me`, {
            withCredentials: true
          });
          
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setState({
              isAuthenticated: true,
              user: response.data,
              loading: false,
              error: null
            });
            console.log('쿠키로 사용자 인증 성공:', response.data);
          } else {
            setState({
              isAuthenticated: false,
              user: null,
              loading: false,
              error: null
            });
          }
        } catch (error) {
          console.log('쿠키로 인증 실패, 비로그인 상태로 설정');
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null
          });
        }
      }
    };

    // 페이지 로드 시 인증 상태 확인
    checkAuth();
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
      
      // 로컬 스토리지에서 사용자 정보 제거
      localStorage.removeItem('user');
      
      // 인증 상태 초기화
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      });
      
      // 홈페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      
      // 오류가 발생해도 로컬 상태는 초기화
      localStorage.removeItem('user');
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: '로그아웃 처리 중 오류가 발생했습니다.'
      });
    }
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
