import React from 'react';

function Pagination({ currentPage, hasMoreResults, isLoading, loadMore }) {
    return (
        <div className="flex justify-center my-10">
            {hasMoreResults && (
                <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                        </>
                    ) : (
                        <>Load More Results</>
                    )}
                </button>
            )}
            {currentPage > 1 && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Page {currentPage}
                </div>
            )}
        </div>
    );
}

export default Pagination;