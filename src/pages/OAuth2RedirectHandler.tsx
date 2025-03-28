import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/env';

const OAuth2RedirectHandler: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectTo, setRedirectTo] = useState<string>('/');

  useEffect(() => {
    const getToken = async () => {
      try {
        // URL에서 토큰 추출
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          setError('인증 토큰을 찾을 수 없습니다.');
          setRedirectTo('/login');
          setLoading(false);
          return;
        }

        // 토큰 저장
        localStorage.setItem('accessToken', token);
        
        // 사용자 정보 가져오기
        const response = await axios.get(`${API_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(response.data));
        
        setLoading(false);
      } catch (error) {
        console.error('OAuth 인증 처리 중 오류 발생:', error);
        setError('인증 처리 중 오류가 발생했습니다.');
        setRedirectTo('/login');
        setLoading(false);
      }
    };

    getToken();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">인증 처리 중입니다...</h2>
        <p className="text-gray-500 mt-2">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ 
          error: error,
          from: location 
        }} 
      />
    );
  }

  return <Navigate to={redirectTo} />;
};

export default OAuth2RedirectHandler;
