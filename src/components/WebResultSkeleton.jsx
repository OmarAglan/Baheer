import React from 'react';

const WebResultSkeleton = () => {
  return (
    <div className="w-full max-w-2xl p-5 border dark:border-gray-700 border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800 animate-pulse">
      <div className="flex items-center space-x-2 mb-2.5"> {/* Increased mb slightly from mb-1.5 */}
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div> {/* Favicon placeholder */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div> {/* Link placeholder */}
      </div>
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div> {/* Title placeholder, increased mb from mb-1 */}
      <div className="space-y-1.5"> {/* Adjusted spacing for description lines */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div> {/* Description line 1 */}
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div> {/* Description line 2 */}
      </div>
    </div>
  );
};

export default WebResultSkeleton;
