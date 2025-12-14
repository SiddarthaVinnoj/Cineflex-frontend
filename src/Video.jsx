import React from 'react'
import Navbar from './Navbar'

function Video() {
  return (
     <div className='video-size'>
      <Navbar />
      <video 
        style={{
         
        }}
        controls 
        autoPlay 
        loop 
        muted
      >
        <source src="/video/videos.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Video
