import React from 'react';
import { CircleLoader } from 'react-spinners';
import WebResultSkeleton from './WebResultSkeleton';
import ImageResultSkeleton from './ImageResultSkeleton'; 
import VideoResultSkeleton from './VideoResultSkeleton';
import NewsResultSkeleton from './NewsResultSkeleton';

export const Loading = ({ type, count = 5 }) => {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'websearch':
          skeletons.push(<WebResultSkeleton key={i} />);
          break;
        case 'image':
          skeletons.push(<ImageResultSkeleton key={i} />);
          break;
        case 'video':
          skeletons.push(<VideoResultSkeleton key={i} />);
          break;
        case 'news':
          skeletons.push(<NewsResultSkeleton key={i} />);
          break;
        default:
          // Fallback for unspecified types or if only a generic loader is needed
          // Render a single spinner if type is not matched for skeleton
          if (i === 0) { // only push one spinner
            skeletons.push(
              <div key="spinner" className='flex justify-center items-center py-10'>
                <CircleLoader size={50} color="#1a23f7" speedMultiplier={0.5} />
              </div>
            );
          }
          // If default case is hit, we typically want to show the spinner, not 'count' spinners.
          // So, we break after pushing one.
          return <>{skeletons}</>; // Return immediately with the spinner
      }
    }

    // Apply specific wrapper layouts for each skeleton type
    if (type === 'websearch' || type === 'news') {
      return (
        <div className="flex flex-col items-center space-y-5 sm:px-4 md:px-8 lg:px-56 py-4">
          {skeletons}
        </div>
      );
    }
    if (type === 'image') {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
          {skeletons}
        </div>
      );
    }
    if (type === 'video') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {skeletons}
        </div>
      );
    }
    
    // Fallback if skeletons were generated but no specific wrapper matched (should not happen with current types)
    return <>{skeletons}</>; 
  };

  return renderSkeletons();
};
