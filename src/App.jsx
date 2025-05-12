import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import logo from './assets/logo.png'

import ResponsiveMenu from './components/ResponsiveMenu'
import CampaignBanner from "./components/CampaignBanner"


function App() {

  

  return (
    <div>
    <ResponsiveMenu />
    <CampaignBanner />

    </div>
  )
}

export default App
