import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import googleLogo from '../assets/google-logo.svg';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            프리즈미디어에 오신 것을 환영합니다
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            뉴스 클러스터링 서비스를 이용하려면 로그인이 필요합니다.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={login}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <img src={googleLogo} alt="Google 로고" className="h-5 w-5" />
              </span>
              Google 계정으로 계속하기
            </button>
          </div>
          <div className="text-center text-sm">
            <p className="text-gray-500">
              Google 계정으로 로그인하면 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
            </p>
            <Link to="/" className="mt-4 inline-block text-amber-600 hover:text-amber-500">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
