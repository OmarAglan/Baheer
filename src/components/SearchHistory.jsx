import React from 'react';
import { useResultContext } from '../contexts/ResultContextProvider';

function SearchHistory({ setInputText }) {
    const { searchHistory, setSearchHistory: setContextSearchHistory } = useResultContext(); // Removed unused setSearchTerm and getResults

    const handleHistoryClick = (term) => {
        // setInputText is now expected to handle setting the search term and triggering search
        // as defined in Search.jsx's handleHistoryItemClick
        setInputText(term); 
    };

    const clearHistory = () => {
        localStorage.removeItem('searchHistory');
        if (setContextSearchHistory) {
            setContextSearchHistory([]); // Clear history in context
        }
        // No page reload needed, component will re-render due to context change
    };

    if (!searchHistory || searchHistory.length === 0) {
        return null;
    }

    return (
        <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Recent Searches</h3>
                <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                    Clear All
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                    <button
                        key={index}
                        onClick={() => handleHistoryClick(term)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchHistory;
