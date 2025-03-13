import React, {useEffect} from 'react'
import { useLocation } from 'react-router'
import ReactPlayer from 'react-player'

import { useResultContext } from '../contexts/ResultContextProvider'
import { Loading } from './Loading'

function Results() {
  const { results, isLoading, searchTerm, getResults } = useResultContext();
  const location = useLocation();

  
  if(isLoading) return <Loading />;
  
  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results.map((result) => (
            <div key={result.id}>
              <p>{result.title}</p>
            </div>
          ))}
        </div>
      );
  
    default:
      return "Error";
  }
}

export default Results