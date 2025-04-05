import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/env';

const OAuth2RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectTo, setRedirectTo] = useState<string>('/');

  useEffect(() => {
    const handleRedirect = async () => {
      console.log('OAuth 리다이렉트 처리 시작');
      
      // URL에서 auth_success 파라미터 확인 (옵션)
      const params = new URLSearchParams(location.search);
      const authSuccess = params.get('auth_success');
      
      console.log('인증 성공 파라미터:', authSuccess);
      
      // 파라미터가 없어도 인증 처리 시도
      try {
        console.log('사용자 정보 요청 시작');
        
        // 사용자 정보 가져오기 (withCredentials 옵션 추가)
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true  // 쿠키를 요청에 포함
        });
        
        console.log('사용자 정보 응답:', response.data);
        
        // 사용자 정보만 저장
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('로컬 스토리지에 사용자 정보 저장 완료');
        
        setRedirectTo('/');
        setLoading(false);
      } catch (error: any) {
        console.error('OAuth 인증 처리 중 오류 발생:', error);
        console.error('오류 응답:', error.response?.data);
        console.error('오류 상태:', error.response?.status);
        setError('인증 처리 중 오류가 발생했습니다.');
        setRedirectTo('/login');
        setLoading(false);
      }
    };

    handleRedirect();
  }, [location, navigate]);

  useEffect(() => {
    if (!loading) {
      navigate(redirectTo);
    }
  }, [loading, navigate, redirectTo]);

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate('/login')}
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return null;
};

export default OAuth2RedirectHandler;
