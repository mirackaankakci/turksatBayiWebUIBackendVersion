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
import NetDevices from './Pages/netDevices'
import KabloTvDevices from './Pages/KabloTvDevices'
import TvPackets from './Pages/tvPacket'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import FesihIslemleri from './Pages/fesih'
import Sss from './Pages/Sss'

function App() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#838383] to-[#3399D2]">
        <ResponsiveMenu />
      </div>
      <div className="pt-[100px]" >
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/hemenbasvur" element={<HemenBasvur />} />
          <Route path="/kampanyalar" element={<Kampanyalar />} />
          <Route path="/kampanyalar/:kategori" element={<Kampanyalar />} />
          <Route path="/kampanyalar/:kategori/:kampanyaId" element={<CampaignDetail />} />
          <Route path="/tarifeler" element={<NetTariffs/>} />
          <Route path="/cihazlar" element={<NetDevices/>} />
          <Route path="/donate" element={<div>Donate</div>} />
          <Route path="/kablotv/cihazlar" element={<KabloTvDevices/>} />
          <Route path="/kablotv/paketler" element={<TvPackets />} />
          <Route path="/gizliliksozlesmesi" element={<PrivacyPolicy />} />
          <Route path="/fesih-i̇şlemleri" element={<FesihIslemleri />} />
          <Route path="/sss" element={<Sss />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
