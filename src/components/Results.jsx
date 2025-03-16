import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

function Results() {
  const { 
    results, 
    isLoading, 
    searchTerm, 
    getResults, 
    error
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
  }, [location.pathname]);

  if (isLoading) return <Loading />;
  
  if (!searchTerm) return (
    <div className="flex flex-col items-center justify-center h-72">
      <h1 className="text-2xl mb-4">Enter a search term to begin</h1>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-72">
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Search Error</h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md bg-red-50 dark:bg-red-900 px-2 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
    <div className="flex flex-col items-center justify-center h-72">
      <h1 className="text-2xl mb-4">No results found</h1>
      <p className="text-gray-600 dark:text-gray-400">Try adjusting your search term or try a different category</p>
    </div>
  );

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-center space-y-6 sm:px-56">
          {results.map((result, index) => (
            <div key={index} className="md:w-2/3 w-full p-4 border rounded-lg dark:border-gray-700 mb-4">
              <a href={result.link} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-sm text-green-600 dark:text-green-400">
                  {result.link && result.link.length > 30 ? `${result.link.substring(0, 30)}...` : result.link}
                </p>
                <p className="text-xl hover:underline text-blue-700 dark:text-blue-300">
                  {result.title}
                </p>
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      );
    
    case '/images':
      return (
        <div className="flex flex-wrap justify-center">
          {results.map((result, index) => (
            <a key={index} href={result.link?.href} target="_blank" rel="noreferrer" className="p-2">
              <img 
                src={result.image?.src} 
                alt={result.title} 
                loading="lazy" 
                className="h-60 rounded-lg hover:shadow-xl"
              />
              <p className="text-sm mt-2 w-36 break-words">{result.title}</p>
            </a>
          ))}
        </div>
      );
    
    case '/videos':
      return (
        <div className="flex flex-wrap justify-center">
          {results.map((video, index) => (
            <div key={index} className="p-2">
              {video.link && (
                <ReactPlayer 
                  url={video.link} 
                  controls 
                  width="355px" 
                  height="200px" 
                  className="rounded-lg"
                />
              )}
              <p className="text-sm mt-2 w-72">{video.title}</p>
            </div>
          ))}
        </div>
      );
    
    case '/news':
      return (
        <div className="flex flex-wrap justify-center space-y-6 sm:px-56">
          {results.map((news, index) => (
            <div key={index} className="md:w-2/3 w-full p-4 border rounded-lg dark:border-gray-700 mb-4">
              <a href={news.link} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-sm text-green-600 dark:text-green-400">
                  {news.source?.name || "Unknown Source"}
                </p>
                <p className="text-xl hover:underline text-blue-700 dark:text-blue-300">
                  {news.title}
                </p>
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {news.snippet || news.description}
              </p>
              <p className="text-xs text-gray-500">
                {news.published || "No publish date"}
              </p>
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
}

export default Results;