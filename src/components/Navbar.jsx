import React from 'react'
import { Link } from 'react-router'
import Search from './Search'

function Navbar({ darkTheme, setDarkTheme }) {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-b-gray-700 border-gray-200">
      <div className='flex justify-between items-center space-x-5 w-screen'>
        <Link to="/">
          <p className='text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-500 dark:text-gray-900 hover:shadow-2xs'>Baheer</p>
        </Link>
        <button type='button' onClick={() => setDarkTheme(!darkTheme)} className='text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-2xl'>
          {darkTheme ? 'light' : 'dark'} Theme
        </button>
      </div>
      <Search />
    </div>
  )
}

export default Navbar