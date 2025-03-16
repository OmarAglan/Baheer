import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { useResultContext } from '../contexts/ResultContextProvider';

function Search() {
  const { setSearchTerm, getResults } = useResultContext();
  const [text, setText] = useState('');
  const [debouncedValue] = useDebounce(text, 300);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedValue) {
      setSearchTerm(debouncedValue);

      // Determine which type of search to perform based on the current route
      let searchType = 'websearch';
      if (location.pathname === '/images') searchType = 'image';
      if (location.pathname === '/videos') searchType = 'video';
      if (location.pathname === '/news') searchType = 'news';

      getResults(searchType);
    }
  }, [debouncedValue, location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      setSearchTerm(text);
      // If not on the search route, navigate to it
      if (location.pathname !== '/search') {
        navigate('/search');
      } else {
        // Otherwise, just trigger a search
        getResults('websearch');
      }
    }
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          type="text"
          className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
          placeholder="Search Baheer or type URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Search
        </button>
        {text && (
          <button
            type="button"
            className="absolute right-24 top-1.5 text-2xl text-gray-500"
            onClick={() => setText('')}
          >
            ×
          </button>
        )}
      </form>
    </div>
  );
}

export default Search;