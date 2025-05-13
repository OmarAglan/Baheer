import React from 'react';

const VideoResultSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border dark:border-gray-700 animate-pulse">
      <div className="aspect-video bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div> {/* Video player placeholder */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div> {/* Title placeholder */}
      </div>
    </div>
  );
};

export default VideoResultSkeleton;
