import { useState } from 'react'
import './index.css'
import logo from './assets/logo.png'
import ResponsiveMenu from './components/ResponsiveMenu'
import CampaignBanner from "./components/CampaignBanner"

import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'

function App() {

  

  return (
    <div>
      <div className="bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
    <ResponsiveMenu />
    </div>
    <div className="pt-[100px]">
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/campaign" element={<div></div>} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
      <Route path="/donate" element={<div>Donate</div>} />
    </Routes>
    </div>
    </div>
  )
}

export default App
