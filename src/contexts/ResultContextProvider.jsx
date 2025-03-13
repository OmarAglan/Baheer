import React, { createContext, useContext, useState } from 'react';

const resultContext = createContext();
const baseURL = "https://google-api31.p.rapidapi.com";


export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async ({ type }) => {
    setIsLoading(true);
    const response = await fetch(`${baseURL}/${type}`, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '09a8787087msh76d546d0ae9de7ep1acec0jsn80212352ffa5',
        'x-rapidapi-host': 'google-api31.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchTerm })
    });
    const data = await response.json();
    setResults(data);
    setIsLoading(false);
  }

  return (
    <resultContext.Provider value={{ results, isLoading, searchTerm, setSearchTerm, getResults }}>
      {children}
    </resultContext.Provider>
  )
}

export const useResultContext = () => useContext(resultContext);

