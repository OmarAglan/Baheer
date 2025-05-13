import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const resultContext = createContext();
const baseURL = 'https://www.googleapis.com/customsearch/v1';

const MAX_HISTORY_ITEMS = 10;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const getResults = useCallback(async (type, page = 1, currentSearchTermForCall = searchTerm) => {
    const effectiveSearchTerm = page === 1 ? currentSearchTermForCall : searchTerm;

    if (!effectiveSearchTerm || effectiveSearchTerm.trim() === '') {
      setResults([]);
      setTotalResults(0);
      setIsLoading(false);
      setLoadingMore(false);
      return;
    }

    if (page === 1) setIsLoading(true);
    else setLoadingMore(true);
    setCurrentPage(page); // Set current page when fetching
    setError(null);

    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const googleCxId = import.meta.env.VITE_GOOGLE_CX_ID;

    if (!googleApiKey || !googleCxId) {
      const missingKeyError = "Google API Key or CX ID is missing. Please set them in your .env file.";
      console.error(missingKeyError);
      setError(missingKeyError);
      setIsLoading(false);
      setLoadingMore(false);
      setResults([]);
      return;
    }

    const cacheKey = `googleCSECache_${type}_${effectiveSearchTerm}_${page}`;
    try {
      const cachedItem = localStorage.getItem(cacheKey);
      if (cachedItem) {
        const { timestamp, data } = JSON.parse(cachedItem);
        if (Date.now() - timestamp < CACHE_DURATION_MS) {
          console.log('Serving from Google CSE cache:', cacheKey);
          
          let cachedDataResults = [];
          if (type === 'websearch' && data.web_results) cachedDataResults = data.web_results;
          else if (type === 'image' && data.image_results) cachedDataResults = data.image_results;
          else if (type === 'video' && data.video_results) cachedDataResults = data.video_results;
          else if (type === 'news' && data.news_results) cachedDataResults = data.news_results;
          else if (data.items) cachedDataResults = data.items; // Google API uses 'items'
          else if (data.results) cachedDataResults = data.results; // Fallback for older cache structure

          if (page === 1) {
            setResults(cachedDataResults);
          } else {
            setResults(prevResults => [...prevResults, ...cachedDataResults]);
          }
          setTotalResults(parseInt(data.searchInformation?.totalResults || "0", 10));
          setHasMoreResults((cachedDataResults || []).length === 10 && (parseInt(data.searchInformation?.totalResults || "0", 10) > page * 10));
          setIsLoading(false);
          setLoadingMore(false);
          return; 
        } else {
          localStorage.removeItem(cacheKey); 
          console.log('Stale Google CSE cache removed:', cacheKey);
        }
      }
    } catch (e) {
      console.error('Error reading from Google CSE cache:', e);
      localStorage.removeItem(cacheKey); 
    }
    
    const params = {
      key: googleApiKey,
      cx: googleCxId,
      q: effectiveSearchTerm,
      start: (page - 1) * 10 + 1,
      num: 10,
    };

    if (type === 'image') {
      params.searchType = 'image';
    }

    try {
      const response = await axios.get(baseURL, { params });
      const responseData = response.data;

      const newApiResults = responseData.items || [];
      const apiTotalResults = parseInt(responseData.searchInformation?.totalResults || "0", 10);

      setHasMoreResults(newApiResults.length === 10 && (apiTotalResults > page * 10));
      setTotalResults(apiTotalResults);

      if (page === 1) {
        setResults(newApiResults);
      } else {
        setResults(prevResults => [...prevResults, ...newApiResults]);
      }

      try {
        const dataToCache = {
          items: newApiResults, // Google API uses 'items'
          searchInformation: responseData.searchInformation,
        };
        // Store specific result types if needed for cache structure, though 'items' is general
        if (type === 'websearch') dataToCache.web_results = newApiResults;
        else if (type === 'image') dataToCache.image_results = newApiResults;
        else if (type === 'video') dataToCache.video_results = newApiResults;
        else if (type === 'news') dataToCache.news_results = newApiResults;
        
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: dataToCache }));
        console.log('Saved to Google CSE cache:', cacheKey);
      } catch (e) {
        console.error('Error saving to Google CSE cache:', e);
      }

    } catch (err) {
      console.error('Error fetching Google CSE results:', err);
      let errorMessage = `Error: ${err.message || 'Unknown error occurred'}`;
      if (err.response) {
        const googleError = err.response.data?.error?.message;
        errorMessage = `Google API Error: ${googleError || err.response.statusText || 'Unknown API error'}`;
        if (err.response.status === 403) errorMessage = "Forbidden: Check API Key restrictions or billing.";
        if (err.response.status === 400) errorMessage = `Bad Request: ${googleError || "Check CX ID or query."}`;
      } else if (err.request) {
        errorMessage = 'Network error: Could not connect to Google API.';
      }
      setError(errorMessage);
      if (page === 1) setResults([]);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  }, [searchTerm, setIsLoading, setCurrentPage, setLoadingMore, setError, setResults, setTotalResults, setHasMoreResults]); // useCallback for getResults

  const loadMoreResults = useCallback(() => {
    const nextPage = currentPage + 1;
    let type = 'websearch'; 
    const path = window.location.pathname;
    if (path.includes('/images')) type = 'image';
    else if (path.includes('/news')) type = 'websearch'; 
    else if (path.includes('/videos')) type = 'websearch'; 
    
    getResults(type, nextPage, searchTerm);
  }, [currentPage, searchTerm, getResults]); // useCallback for loadMoreResults

  const clearError = useCallback(() => setError(null), [setError]); // useCallback for clearError

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      try { setSearchHistory(JSON.parse(storedHistory)); }
      catch (e) { console.error('Error parsing search history:', e); localStorage.removeItem('searchHistory'); }
    }
  }, []); // Empty dependency array: runs once on mount

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '') {
      setSearchHistory(prevHistory => {
        const newHistory = [searchTerm, ...prevHistory.filter(term => term !== searchTerm)].slice(0, MAX_HISTORY_ITEMS);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [searchTerm]); // Runs when searchTerm changes

  return (
    <resultContext.Provider value={{
      results, isLoading, loadingMore, searchTerm, setSearchTerm, getResults,
      error, setError, clearError, currentPage, totalResults, hasMoreResults,
      searchHistory, setSearchHistory, loadMoreResults
    }}>
      {children}
    </resultContext.Provider>
  );
};

export const useResultContext = () => useContext(resultContext);
