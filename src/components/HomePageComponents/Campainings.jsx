import React from 'react'
import { CampaignData } from "../../helpers/CampaingData"
import CampaignCards from './CampaignCards'

const Campainings = () => {
  // Kampanya sayısını dinamik olarak hesapla
  const kampanyaSayisi = CampaignData.length;

  return (
    <div className="flex flex-col">
      {/* Kampanya kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-20 md:gap-24 lg:gap-28 max-w-7xl mx-auto px-4 mb-16 pt-10">
        {CampaignData.map((campaign, index) => (
          <CampaignCards 
            campaign={campaign}
            key={index}
          />
        ))}
      </div>

      {/* Kampanya bilgi şeridi */}
      <div className="bg-[#2F3D8D] w-full rounded-3xl py-4 px-6 md:px-12 max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between">
        <button className="bg-white text-[#2F3D8D] font-medium text-sm md:text-base py-2 px-6 rounded-full shadow-md hover:bg-blue-50 transition-colors mb-4 sm:mb-0">
          Tüm Kampanyalar
        </button>
        
        <p className="text-white text-sm md:text-base font-medium">
          {kampanyaSayisi} Kablonet Kampanyası Bulunuyor
        </p>
      </div>
    </div>
  )
}

export default Campainings