import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Routes from './components/Routes'

const App = () => {
  const [DarkTheme, setDarkTheme] = useState(false)
  return (
      <div className={DarkTheme ? 'Dark' : ''}>
        <div className="bg-amber-950">
          <Navbar />
          <Routes />
          <Footer />
        </div>
      </div>
  )
}

export default App
