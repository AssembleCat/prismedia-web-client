import React from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch) onSearch(query);
  };

  return (
    <header className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-amber-800">PRISMEDIA</h1>
            </div>
            <nav className="ml-6 flex space-x-8">
              <a href="/" className="text-amber-900 font-medium hover:text-amber-700 px-3 py-2 rounded-md">
                Home
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="mr-4">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="border border-amber-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </form>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md mr-2">
              Subscribe
            </button>
            <button className="border border-amber-300 text-amber-700 font-medium py-2 px-4 rounded-md hover:bg-amber-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
