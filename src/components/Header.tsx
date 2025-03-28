import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="text-2xl font-bold">PRISMEDIA</Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/" className="hover:text-amber-200">홈</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {user?.imageUrl && (
                    <img 
                      src={user.imageUrl} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-white text-amber-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-amber-50"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-amber-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-amber-50"
              >
                로그인
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
