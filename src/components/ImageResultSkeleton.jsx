import React from 'react';

const ImageResultSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border dark:border-gray-700 animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div> {/* Image placeholder */}
      <div className="p-3">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div> {/* Title placeholder */}
      </div>
    </div>
  );
};

export default ImageResultSkeleton;
