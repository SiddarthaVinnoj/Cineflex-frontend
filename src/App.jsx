import React from 'react'
import Landingpage from './Landingpage'
import { Route, Routes } from 'react-router-dom'
import Watch from './Watch'
import Movies from './Movies'
import Webseries from './Webseries'
import Kids from './Kids'
import Webwatch from './Webwatch'
import Kidwatch from './Kidwatch'
import Video from './Video'
import Login from './Login'
import Signup from './Signup'
import Favorites from './Favorites'
import AboutUs from './About'
import ContactUs from './Contact'
import TermsOfUse from './Termsofuse'
import PrivacyPolicy from './Privacy'
import Support from './Support'
import Faq from './Faq'
function App() {
  return (
   <Routes>
  <Route path='/' element={<Landingpage />} />
  <Route path='/movies' element={<Movies />} />
  <Route path='/webseries' element={<Webseries />} />
  <Route path='/kids' element={<Kids />} />
  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path='/aboutus' element={<AboutUs />} />
  <Route path='/contact' element={<ContactUs />} />
  <Route path='/termsofuse' element={<TermsOfUse />} />
  <Route path='/privacy' element={<PrivacyPolicy />} />
  <Route path='/support' element={<Support />} />
  <Route path='/faq' element={<Faq />} />
  {/* Single Movie Pages */}
  <Route path='/movies/:id' element={<Watch />} />
  <Route path='/webseries/:id' element={<Webwatch />} />
  <Route path='/kids/:id' element={<Kidwatch />} />

  <Route path='/play/:id' element={<Video />} />
</Routes>
  )
}

export default App
