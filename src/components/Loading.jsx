import React from 'react'
import {CircleLoader} from 'react-spinners'

export const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <CircleLoader
        size={50}
        color="#1a23f7"
        speedMultiplier={0.5}
       />
    </div>
  )
}
