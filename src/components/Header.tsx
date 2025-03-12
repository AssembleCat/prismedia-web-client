import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="text-2xl font-bold">PRISMEDIA</Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/" className="hover:text-amber-200">홈</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
