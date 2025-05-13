import React from 'react';
import { Route, Routes } from 'react-router'; // Removed Navigate for now, might not be needed if / is landing
import Results from './Results';
import LandingPage from './LandingPage'; // Import LandingPage

function AppRoutes() {
  return (
    // Removed the p-4 div wrapper, as LandingPage and Results might want full control of their padding
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* Root path now shows LandingPage */}
      <Route path="/search" element={<Results />} />
      <Route path="/images" element={<Results />} />
      <Route path="/videos" element={<Results />} />
      <Route path="/news" element={<Results />} />
      <Route path="/shopping" element={<Results />} /> {/* Assuming /shopping is a valid results type */}
    </Routes>
  );
}

export default AppRoutes;
