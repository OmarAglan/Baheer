import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { useResultContext } from '../contexts/ResultContextProvider';
import SearchHistory from './SearchHistory'; // Import SearchHistory

function Search() {
  const { setSearchTerm, getResults } = useResultContext();
  const [text, setText] = useState('');
  const [showHistory, setShowHistory] = useState(false); // State for history visibility
  const [debouncedValue] = useDebounce(text, 300);
  const location = useLocation();
  const navigate = useNavigate();
  const searchContainerRef = useRef(null); // Ref for click outside detection

  useEffect(() => {
    if (debouncedValue) {
      setSearchTerm(debouncedValue);
      let searchType = 'websearch';
      if (location.pathname === '/images') searchType = 'image';
      if (location.pathname === '/videos') searchType = 'video';
      if (location.pathname === '/news') searchType = 'news';
      getResults(searchType);
    }
  }, [debouncedValue, location.pathname, getResults, setSearchTerm]);

  // Effect to handle clicks outside the search container to close history
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHistory(false); // Hide history on submit
    if (text) {
      setSearchTerm(text);
      if (location.pathname !== '/search') {
        navigate('/search');
      } else {
        getResults('websearch');
      }
    }
  };

  const handleInputFocus = () => {
    setShowHistory(true);
  };

  // Wrapper function for SearchHistory's setInputText to also hide history
  // and ensure search is triggered correctly.
  const handleHistoryItemClick = (term) => {
    setText(term); // Update input text
    setSearchTerm(term); // Set search term in context immediately
    setShowHistory(false); // Hide history
    
    // Determine current search type and trigger search
    let searchType = 'websearch';
    if (location.pathname === '/images') searchType = 'image';
    if (location.pathname === '/videos') searchType = 'video';
    if (location.pathname === '/news') searchType = 'news';
    
    if (location.pathname.startsWith('/')) { // Check if it's a valid search route
        getResults(searchType, term); // Pass term directly if needed by getResults
    } else {
        navigate('/search'); // Navigate to default search if on an unknown path
        getResults('websearch', term);
    }
  };

  return (
    <div className="relative w-full my-2 sm:my-0" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          type="text"
          className="flex-grow h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Search Baheer or type URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleInputFocus} // Show history on focus
        />
        {text && (
          <button
            type="button"
            className="absolute right-20 sm:right-24 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => {
              setText('');
              // Optionally clear search results when X is clicked if desired
              // setSearchTerm(''); 
              // setResults([]); // If setResults is available from context or managed locally
            }}
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="ml-3 p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      {showHistory && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto"> {/* Added max-h and overflow for scroll */}
          <SearchHistory setInputText={handleHistoryItemClick} />
        </div>
      )}
    </div>
  );
}

export default Search;
