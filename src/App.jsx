import React, { useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AppRoutes from './components/AppRoutes'

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  )
}

export default App
