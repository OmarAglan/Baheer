import React, { useState } from 'react';
import { useLocation } from 'react-router'; // Import useLocation
import AppRoutes from './components/AppRoutes';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className={`text-gray-900 dark:text-gray-200 min-h-screen flex flex-col ${isLandingPage ? 'bg-white dark:bg-gray-950' : 'bg-white dark:bg-gray-950'}`}>
        {!isLandingPage && <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
        <main className={`flex-grow ${isLandingPage ? '' : 'px-2 sm:px-4 py-4'}`}>
          <AppRoutes />
        </main>
        {!isLandingPage && <Footer />}
      </div>
    </div>
  );
}

export default App;
