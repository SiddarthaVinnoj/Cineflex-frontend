import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import Movies from './Movies'
import Welcomepage from './Welcomepage'
import Footer from './Footer'

function Landingpage() {
  return (
    <div>
      <Welcomepage />
      <Footer />
    </div>
  )
}

export default Landingpage
