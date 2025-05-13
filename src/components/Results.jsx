import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';
import Pagination from './Pagination';

// Moved getDomain function to the component's top level scope
const getDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch (e) {
    console.error("Error parsing URL for favicon:", e); // Using the error variable from previous fix
    return null;
  }
};

function Results() {
  const {
    results,
    isLoading,
    loadingMore,
    searchTerm,
    getResults,
    error,
    currentPage,
    hasMoreResults,
    loadMoreResults,
    totalResults
  } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/search') getResults('websearch');
      if (location.pathname === '/images') getResults('image');
      if (location.pathname === '/videos') getResults('video');
      if (location.pathname === '/news') getResults('news');
      if (location.pathname === '/shopping') getResults('shopping');
    }
  }, [location.pathname, searchTerm, getResults]); // Added searchTerm and getResults to dependency array

  const renderResultsCount = () => {
    if (totalResults > 0) {
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 ml-4 sm:ml-56">
          About {totalResults.toLocaleString()} results
        </div>
      );
    }
    return null;
  };

  if (isLoading && !loadingMore) {
    let loadingType = 'websearch'; // Default to websearch skeleton
    if (location.pathname === '/images') loadingType = 'image'; // Will need ImageResultSkeleton
    else if (location.pathname === '/videos') loadingType = 'video'; // Will need VideoResultSkeleton
    else if (location.pathname === '/news') loadingType = 'news'; // Will need NewsResultSkeleton
    // Add other types if necessary, e.g., 'shopping'

    // For now, only 'websearch' has a skeleton. Others will fallback to spinner in Loading.jsx
    // As other skeletons are created, this logic will correctly pass their types.
    return <Loading type={loadingType} />;
  }

  if (!searchTerm) return (
    <div className="flex flex-col items-center justify-center h-72 text-center px-4">
      {/* Added an icon for "Enter search term" */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
      </svg>
      <h1 className="text-2xl mb-2 font-semibold">Enter a search term to begin</h1>
      <p className="text-gray-600 dark:text-gray-400">Let's find what you're looking for!</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-72 text-center px-4">
      <div className="bg-red-50 dark:bg-red-800/20 border border-red-300 dark:border-red-700 rounded-lg p-6 max-w-md shadow-lg"> {/* Enhanced shadow and adjusted colors */}
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 mb-3 text-red-500 dark:text-red-400"> {/* Applied color directly */}
            {/* Using a more prominent error icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="text-center"> {/* Centered text content */}
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Search Error</h3>
            <div className="text-sm text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md bg-red-100 dark:bg-red-800/50 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900" // Adjusted button style
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!results || results.length === 0) return (
    <div className="flex flex-col items-center justify-center h-72 text-center px-4 pt-8"> {/* Added some padding-top */}
      {/* Using a different icon for "No results found" for variety and clarity */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-400 dark:text-gray-500 mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.5 4.5 0 0018 14.25a4.5 4.5 0 00-7.5-3.182m0-3.182l-3.182 3.182m0 0a4.5 4.5 0 00-3.182 7.5M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
      <h1 className="text-3xl mb-3 font-semibold text-gray-700 dark:text-gray-300">No Results Found</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        We couldn't find any matches for your search. Please try different keywords or check for typos.
      </p>
    </div>
  );

  return (
    <>
      {renderResultsCount()}
      {loadingMore && (
        <div className="py-2">
          <Loading />
        </div>
      )}

      {(() => {
        switch (location.pathname) {
          case '/search': // Removed block scope and internal getDomain declaration
            return (
              <div className="flex flex-col items-center space-y-5 sm:px-4 md:px-8 lg:px-56 py-4">
                {results.map((result, index) => {
                  const domain = getDomain(result.link); 
                  return (
                    <div 
                      key={index} 
                      className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
                    >
                      <a href={result.link} target="_blank" rel="noreferrer" className="block">
                        <div className="flex items-center space-x-2 mb-2">
                          {domain && (
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                              alt="favicon"
                              className="w-4 h-4 object-contain flex-shrink-0"
                              onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                          )}
                          <p className="text-xs text-green-600 dark:text-green-400 truncate group-hover:underline">
                            {result.link}
                          </p>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:underline mb-1.5">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed"> {/* Added leading-relaxed */}
                          {result.description}
                        </p>
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          // Removed the extra closing brace that was here
          case '/images':
            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                {results.map((result, index) => { 
                  return ( 
                    <div 
                      key={index} 
                      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      {/* Link to the page containing the image */}
                      <a href={result.image?.contextLink} target="_blank" rel="noreferrer" className="block">
                        <img
                          src={result.image?.thumbnailLink || result.link} // Use thumbnail, fallback to full image link
                          alt={result.title}
                          loading="lazy"
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        <div className="p-3">
                          <p className="text-xs text-gray-700 dark:text-gray-300 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400" title={result.title}>
                            {result.title}
                          </p>
                        </div>
                      </a>
                    </div>
                  ); 
                })} 
              </div>
            );

          case '/videos':
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {results.map((video, index) => (
                  <div 
                    key={index} 
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                  >
                    {/* Video Card Content */}
                    {video.link && ReactPlayer.canPlay(video.link) ? (
                      // If ReactPlayer can likely play the URL (e.g., YouTube, Vimeo)
                      <>
                        <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-t-lg overflow-hidden relative">
                          <ReactPlayer
                            url={video.link}
                            controls
                            width="100%"
                            height="100%"
                            light={video.pagemap?.cse_thumbnail?.[0]?.src || video.pagemap?.cse_image?.[0]?.src || true}
                            className="transition-transform duration-300 group-hover:scale-105"
                            config={{ youtube: { playerVars: { showinfo: 0, modestbranding: 1 }}}}
                          />
                        </div>
                        <div className="p-4">
                          <a href={video.link} target="_blank" rel="noreferrer" className="block">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400" title={video.title}>
                              {video.title}
                            </p>
                          </a>
                        </div>
                      </>
                    ) : (
                      // Fallback for generic links that might be videos: show as a rich link with thumbnail
                      <a href={video.link} target="_blank" rel="noreferrer" className="block p-4">
                        {(video.pagemap?.cse_thumbnail?.[0]?.src || video.pagemap?.cse_image?.[0]?.src) && (
                          <img 
                            src={video.pagemap.cse_thumbnail[0].src || video.pagemap.cse_image[0].src} 
                            alt={video.title} 
                            className="w-full h-auto object-contain rounded-md mb-2 max-h-48 bg-gray-200 dark:bg-gray-700" 
                          />
                        )}
                        <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:underline mb-1" title={video.title}>
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{video.link}</p>
                        {video.snippet && <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{video.snippet}</p>}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            );

          case '/news':
            return (
              <div className="flex flex-col items-center space-y-5 sm:px-4 md:px-8 lg:px-56 py-4">
                {results.map((newsItem, index) => (
                  <div 
                    key={index} 
                    className="w-full max-w-3xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 group" // Changed max-w-2xl to max-w-3xl
                  >
                    <a href={newsItem.link} target="_blank" rel="noreferrer" className="block">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                        {newsItem.source?.name || "Unknown Source"}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:underline mb-2">
                        {newsItem.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed mb-2"> {/* Added leading-relaxed */}
                        {newsItem.snippet || newsItem.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {newsItem.published || "No publish date"}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            );

          default:
            return (
              <div className="flex items-center justify-center h-72">
                <h1 className="text-2xl">Error: Unknown route</h1>
              </div>
            );
        }
      })()}

      {/* Pass loadingMore to Pagination, it can decide how to display its own loading state */}
      {!isLoading && results.length > 0 && ( // Only show pagination if not initial loading and there are results
        <Pagination
          currentPage={currentPage}
          hasMoreResults={hasMoreResults}
          isLoading={loadingMore} // Pass loadingMore to Pagination
          loadMore={loadMoreResults}
        />
      )}
    </>
  );
}

export default Results;
