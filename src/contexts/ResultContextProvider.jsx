import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const resultContext = createContext();
const baseURL = 'https://google-api31.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [error, setError] = useState(null);

  const getResults = async (type, page = 1) => {
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'POST',
      url: `${baseURL}/${type}`,
      headers: {
        'x-rapidapi-key': '09a8787087msh76d546d0ae9de7ep1acec0jsn80212352ffa5',
        'x-rapidapi-host': 'google-api31.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        text: searchTerm,
        safesearch: 'off',
        timelimit: '',
        region: 'wt-wt',
        max_results: 10,
        page: page
      }
    };

    try {
      const response = await axios.request(options);

      // Check if the API returned an error
      if (response.data.error) {
        throw new Error(response.data.error.message || 'API returned an error');
      }

      // Handle different response structures based on the type
      let newResults = [];
      if (type === 'websearch') {
        newResults = response.data.results || [];
        setTotalResults(response.data.total_results || 0);
      } else if (type === 'image') {
        newResults = response.data.image_results || [];
        setTotalResults(response.data.total_results || 0);
      } else if (type === 'video') {
        newResults = response.data.video_results || [];
        setTotalResults(response.data.total_results || 0);
      } else if (type === 'news') {
        newResults = response.data.news_results || [];
        setTotalResults(response.data.total_results || 0);
      } else {
        newResults = response.data.results || [];
        setTotalResults(response.data.total_results || 0);
      }

      // Check if there are more results available
      setHasMoreResults(newResults.length === 10);

      // If it's the first page, replace results, otherwise append
      if (page === 1) {
        setResults(newResults);
      } else {
        setResults(prevResults => [...prevResults, ...newResults]);
      }

    } catch (error) {
      console.error('Error fetching results:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error: No response received from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message || 'Unknown error occurred'}`);
      }
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <resultContext.Provider value={{
      results,
      isLoading,
      searchTerm,
      setSearchTerm,
      getResults,
      error,
      setError,
    }}>
      {children}
    </resultContext.Provider>
  );
};

export const useResultContext = () => useContext(resultContext);