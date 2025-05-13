import React from 'react'

function Footer() {
  return (
    <footer className='text-center p-4 mt-auto border-t dark:border-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-800'>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        © {new Date().getFullYear()} Baheer. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
