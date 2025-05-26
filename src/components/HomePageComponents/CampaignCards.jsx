import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import aileboyu from "../../assets/aileboyu.png";

function CampaignCards({ campaign }){
  // Aktif taahhüt süresini takip etmek için state ekleyelim
  const [activeTerm, setActiveTerm] = useState('12'); // Varsayılan olarak 12 ay seçili

  // Kampanya kategori adını URL formatına dönüştür
  const getCategorySlug = () => {
    switch(campaign.category) {
      case 'internet':
        return 'kablonet';
      case 'tv':
        return 'kablotv';
      case 'phone':
        return 'kabloses';
      case 'combo':
        return 'kombo';
      default:
        return 'kampanya';
    }
  };

  return (
    <div className="relative w-[320px] mx-auto">
      {/* Taşan resim */}
      <div className="absolute -top-[90px] left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={campaign.imgsrc || aileboyu}
          alt="Kampanya Görseli"
          className="w-44 h-auto drop-shadow-xl"
        />
      </div>

      {/* Kart içeriği */}
      <div className="bg-[#2F3D8D] rounded-2xl overflow-hidden shadow-xl pt-24 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-[580px]">
        {/* Popüler badge - Koşullu olarak gösteriyoruz */}
        {campaign.popular === "true" && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Popüler
            </span>
          </div>
        )}

        <div className="px-6 pt-2 pb-4 text-white text-center h-[250px] flex flex-col">
          <h3 className="text-xl font-semibold mb-3">
            {campaign.kampanyaAdi}
          </h3>
          
          <div className="overflow-y-auto flex-grow mb-2">
            <ul className="space-y-2 text-sm">
              {campaign.ozellikler.map((ozellik, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{ozellik}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-sm text-gray-300 mt-auto">{campaign.aciklama}</p>
        </div>

        <div className="flex justify-center gap-4 bg-[#2F3D8D] py-3 border-t border-blue-700/30">
          <button 
            className={`font-medium px-5 py-1.5 rounded-full shadow-md transition-colors duration-200 
              ${activeTerm === '12' 
                ? 'bg-white text-[#2F3D8D]' 
                : 'bg-blue-700/30 text-white hover:bg-blue-700/50'}`}
            onClick={() => setActiveTerm('12')}
          >
            12 Ay
          </button>
          <button 
            className={`font-medium px-5 py-1.5 rounded-full shadow-md transition-colors duration-200 
              ${activeTerm === '24' 
                ? 'bg-white text-[#2F3D8D]' 
                : 'bg-blue-700/30 text-white hover:bg-blue-700/50'}`}
            onClick={() => setActiveTerm('24')}
          >
            24 Ay
          </button>
        </div>

        <div className="bg-[#0F1A5A] text-white text-center py-5 px-4">
          <div className="flex justify-center items-baseline">
            <span className="text-3xl font-bold">
              {activeTerm === '12' ? campaign.taahut12Fiyat : campaign.taahut24Fiyat}
            </span>
            <span className="text-sm ml-1 text-gray-300">/ay</span>
          </div>
          <div className="text-sm text-gray-400 mt-1 mb-3">
            {activeTerm === '12' 
              ? `24 Ay Taahhüt: ${campaign.taahut24Fiyat}/ay` 
              : `12 Ay Taahhüt: ${campaign.taahut12Fiyat}/ay`}
          </div>
          
          {/* Artık index yerine campaign.id kullanıyoruz */}
          <Link
            to={`/kampanyalar/${getCategorySlug()}/${campaign.id}`}
            className="w-[80%] mx-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg py-2.5 px-6 text-base shadow-lg transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Detayları Gör
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CampaignCards;