import React from 'react';

const NewsResultSkeleton = () => {
  return (
    <div className="w-full max-w-2xl p-5 border dark:border-gray-700 border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800 animate-pulse">
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div> {/* Source placeholder */}
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2.5"></div> {/* Title placeholder */}
      <div className="space-y-1.5 mb-2.5">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div> {/* Snippet line 1 */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div> {/* Snippet line 2 */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div> {/* Snippet line 3 */}
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div> {/* Date placeholder */}
    </div>
  );
};

export default NewsResultSkeleton;
