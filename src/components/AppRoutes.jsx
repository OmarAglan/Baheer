import React from 'react'
import {Route, Routes, Navigate} from 'react-router'
import Results from './Results'

function AppRoutes() {
  return (
    <div className='p-4'>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<Results />} />
        <Route path="/images" element={<Results />} />
        <Route path="/videos" element={<Results />} />
        <Route path="/news" element={<Results />} />
        <Route path="/shopping" element={<Results />} />
      </Routes>
    </div>
  )
}

export default AppRoutes