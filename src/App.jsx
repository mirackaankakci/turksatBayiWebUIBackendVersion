import { useState } from 'react'
import './index.css'
import logo from '/assets/logo.png'
import ResponsiveMenu from './components/ResponsiveMenu'
import CampaignBanner from "./components/CampaignBanner"
import ScrollToTop from './components/ScrollToTop';

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
import TvFrekans from './Pages/TvFrekans'
import Services from './Pages/Services'
import Contact from './Pages/contact'
import InfrastructureInquiry from './Pages/InfrastructureInquiry'
import KabloSesTariff from './Pages/KabloSesTariff'

function App() {
  return (
    <div>
      <ScrollToTop />
      <div className="bg-gradient-to-b from-[#838383] to-[#3399D2]">
        <ResponsiveMenu />
      </div>
      <div className="pt-[100px]" >
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/hemenbasvur" element={<HemenBasvur />} />
          <Route path="/kampanyalar" element={<Kampanyalar />} />
          <Route path="/kampanyalar/:kategori" element={<Kampanyalar />} />
          <Route path="/kampanyalar/:kategori/:kampanyaSlug" element={<CampaignDetail />} />
          <Route path="/tarifeler" element={<NetTariffs/>} />
          <Route path="/cihazlar" element={<NetDevices/>} />
          <Route path="/donate" element={<div>Donate</div>} />
          <Route path="/kablotv/cihazlar" element={<KabloTvDevices/>} />
          <Route path="/kablotv/paketler" element={<TvPackets />} />
          <Route path="/gizliliksozlesmesi" element={<PrivacyPolicy />} />
          <Route path="/fesih-i̇şlemleri" element={<FesihIslemleri />} />
          <Route path="/kablotv/frekans-listesi" element={<TvFrekans />} />
          <Route path="/servisler" element={<Services />} />
          <Route path="/servisler/:serviceId" element={<Services />} />
          <Route path="/sıkça-sorulan-sorular" element={<Sss />} />
          <Route path="/i̇letişim" element={<Contact />} />
          <Route path="/altyapı-sorgulama" element={<InfrastructureInquiry />} />
          <Route path="/kablotv/tarifeler" element={<KabloSesTariff />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
