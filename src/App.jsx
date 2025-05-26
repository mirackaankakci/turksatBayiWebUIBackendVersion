import { useState } from 'react'
import './index.css'
import logo from './assets/logo.png'
import ResponsiveMenu from './components/ResponsiveMenu'
import CampaignBanner from "./components/CampaignBanner"

import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Footer from './components/footer'
import HemenBasvur from './Pages/HemenBasvur'
import Kampanyalar from './Pages/Kampanyalar'
import CampaignDetail from './components/CampaignDetail'
import NetTariffs from './Pages/NetTariffs'

function App() {

  

  return (
    <div>
      <div className="bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
    <ResponsiveMenu />
    </div>
    <div className="pt-[100px] " >
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/hemenbasvur" element={<HemenBasvur />} />
      <Route path="/kampanyalar" element={<Kampanyalar />} />
      <Route path="/kampanyalar/:kategori" element={<Kampanyalar />} />
      <Route path="/kampanyalar/:kategori/:kampanyaId" element={<CampaignDetail />} />
      <Route path="/tarifeler" element={<NetTariffs/>} />
      <Route path="/donate" element={<div>Donate</div>} />
    </Routes>
    </div>
    <Footer />

    </div>
  )
}

export default App
