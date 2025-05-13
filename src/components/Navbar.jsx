import React from 'react';
import { Link, useLocation } from 'react-router'; // Ensure 'react-router' is the correct package
import Search from './Search';

function Navbar({ darkTheme, setDarkTheme }) {
  const location = useLocation(); // Get current location

  const getLinkClassName = (path) => {
    const baseClasses = "py-3 px-3 text-sm sm:text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap";
    if (location.pathname === path) {
      return `${baseClasses} text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium`;
    }
    return `${baseClasses} text-gray-700 dark:text-gray-300`;
  };

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
      {/* Top Bar: Logo, Search, Theme Toggle */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between space-x-4">
        <Link to="/" className="flex-shrink-0">
          <p className="text-xl sm:text-2xl bg-blue-500 font-bold text-white py-1 px-3 rounded dark:bg-gray-600 dark:text-gray-50 hover:shadow-md transition-shadow">
            Baheer
          </p>
        </Link>
        
        <div className="flex-grow max-w-xl lg:max-w-2xl mx-auto"> {/* Search bar takes up available space */}
          <Search />
        </div>
        
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="flex-shrink-0 text-xs sm:text-sm dark:bg-gray-700 dark:text-gray-200 bg-gray-100 border dark:border-gray-600 rounded-full px-3 py-1.5 hover:shadow-md transition-shadow"
          aria-label="Toggle theme"
        >
          {darkTheme ? 'Light ☀️' : 'Dark 🌙'}
        </button>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="px-2 sm:px-6 flex items-center space-x-1 sm:space-x-6 border-t border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        {/* Adjust left padding/margin for tabs if search bar is very wide or logo area is fixed */}
        {/* This div could be sm:pl-20 or similar if needed to align tabs past a wide logo/search */}
        <div className="flex overflow-x-auto">
            <Link to="/search" className={getLinkClassName("/search")}>
            All
            </Link>
            <Link to="/images" className={getLinkClassName("/images")}>
            Images
            </Link>
            <Link to="/videos" className={getLinkClassName("/videos")}>
            Videos
            </Link>
            <Link to="/news" className={getLinkClassName("/news")}>
            News
            </Link>
            {/* Example for shopping if API supports it and it's a route */}
            {/* <Link to="/shopping" className={getLinkClassName("/shopping")}>Shopping</Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
