import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Prismedia Web Client</h1>
      </header>
      <main className="flex flex-col items-center">
        <div className="p-8 rounded-lg bg-white shadow-md dark:bg-gray-800">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            카운트: {count}
          </button>
          <p className="text-gray-700 dark:text-gray-300">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">src/App.tsx</code>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
