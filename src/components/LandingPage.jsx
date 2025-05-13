import React, { useState } from 'react';
import { useNavigate } from 'react-router'; // Corrected import for react-router
import { useResultContext } from '../contexts/ResultContextProvider';

function LandingPage() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { setSearchTerm } = useResultContext();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    setSearchTerm(inputValue);
    navigate(`/search?q=${encodeURIComponent(inputValue)}`); // Navigate to search results page
  };

  // "I'm Feeling Lucky" could go to the first result, or just perform a normal search for now
  const handleFeelingLucky = () => {
    if (inputValue.trim() === '') return;
    setSearchTerm(inputValue);
    // For simplicity, let's make it a normal search.
    // A true "I'm Feeling Lucky" would require fetching results and redirecting.
    navigate(`/search?q=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200 p-4">
      <div className="flex flex-col items-center w-full max-w-xl">
        {/* Large Logo */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-500 dark:text-blue-400 mb-8">
          Baheer
        </h1>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="w-full mb-6">
          <div className="relative flex items-center">
            <svg 
              aria-hidden="true" 
              className="absolute left-4 w-5 h-5 text-gray-500 dark:text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-12 sm:h-14 px-12 py-3 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search Baheer or type URL"
            />
          </div>
        </form>

        {/* Search Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={handleSearchSubmit} // Also trigger form submission logic
            className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors"
          >
            Baheer Search
          </button>
          <button
            type="button"
            onClick={handleFeelingLucky}
            className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors"
          >
            I'm Feeling Lucky
          </button>
        </div>
      </div>
      
      {/* Minimal footer links (optional, can be added later if needed) */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Baheer</p>
        {/* Example links: */}
        {/* <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div> */}
      </footer>
    </div>
  );
}

export default LandingPage;
