import React from 'react'
import { CampaignData } from "../../helpers/CampaingData"
import CampaignCards from './CampaignCards'
import { Link } from 'react-router-dom'

// Kampanya kategorisi ve gösterilecek kampanya sayısı için props ekleyelim
const Campainings = ({ category = 'all', limit = 0, showViewAllButton = true }) => {
  // Kategoriye göre filtreleme yapalım
  let filteredCampaigns = CampaignData;
  
  // Sadece kategori bilgisine göre filtreleme yapıyoruz
  if (category !== 'all') {
    filteredCampaigns = CampaignData.filter(campaign => campaign.category === category);
  }
  
  // Popüler kampanyaları öne çıkarmak için sıralama yapıyoruz
  filteredCampaigns = [...filteredCampaigns].sort((a, b) => {
    // Popular değeri "true" olanlar önce gelsin
    if (a.popular === "true" && b.popular !== "true") return -1;
    if (a.popular !== "true" && b.popular === "true") return 1;
    return 0;
  });
  
  // Limit parametresine göre kampanya sayısını sınırlayalım
  const displayedCampaigns = limit > 0 ? filteredCampaigns.slice(0, limit) : filteredCampaigns;
  
  // Toplam filtrelenmiş kampanya sayısını hesaplayalım
  const totalCampaigns = filteredCampaigns.length;

  // Kategori adını formatlayalım
  const getCategoryDisplayName = () => {
    switch(category) {
      case 'internet':
        return 'İnternet';
      case 'tv':
        return 'TV';
      case 'combo':
        return 'Kombo';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Kampanya kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-20 md:gap-24 lg:gap-28 max-w-7xl mx-auto px-4 mb-16 pt-10">
        {displayedCampaigns.map((campaign, index) => (
          <CampaignCards 
            campaign={campaign}
            key={index}
            index={index} // Index prop'unu ekliyoruz
          />
        ))}
      </div>

      {/* Kampanya bilgi şeridi */}
      {showViewAllButton && displayedCampaigns.length > 0 && (
        <div className="bg-[#2F3D8D] w-full rounded-3xl py-4 px-6 md:px-12 max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between">
          <Link to="/kampanyalar" className="bg-white text-[#2F3D8D] font-medium text-sm md:text-base py-2 px-6 rounded-full shadow-md hover:bg-blue-50 transition-colors mb-4 sm:mb-0">
            Tüm Kampanyalar
          </Link>
          
          <p className="text-white text-sm md:text-base font-medium">
            {totalCampaigns} {getCategoryDisplayName()} 
            {getCategoryDisplayName() ? ' ' : ''} 
            Kablonet Kampanyası Bulunuyor
          </p>
        </div>
      )}
      
      {/* Eğer hiç kampanya bulunamazsa mesaj göster */}
      {displayedCampaigns.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 font-medium">
            {getCategoryDisplayName()} kategorisinde kampanya bulunamadı.
          </p>
        </div>
      )}
    </div>
  )
}

export default Campainings