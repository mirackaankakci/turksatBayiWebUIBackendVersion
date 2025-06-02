import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aileboyu from "/assets/aileboyu.png";

function CampaignCards({ campaign }){
  // Varsayılan olarak mevcut olan taahhüt süresini seçelim
  const [activeTerm, setActiveTerm] = useState('12');
  
  // Kampanya yüklendiğinde, hangi taahhüt sürelerinin mevcut olduğunu kontrol et
  useEffect(() => {
    // Eğer 12 ay taahhüt bilgisi yoksa ancak 24 ay varsa, 24'ü aktif yap
    if (!campaign.taahut12Fiyat && campaign.taahut24Fiyat) {
      setActiveTerm('24');
    }
    // Eğer 24 ay taahhüt bilgisi yoksa (veya her ikisi de varsa), 12'yi aktif yap
    else if (campaign.taahut12Fiyat) {
      setActiveTerm('12');
    }
  }, [campaign]);

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

  // Aktif fiyatı belirleyelim
  const activePrice = activeTerm === '12' 
    ? campaign.taahut12Fiyat || "İletişime Geçin"
    : campaign.taahut24Fiyat || "İletişime Geçin";

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

      {/* Kart içeriği - Sabit yükseklik için flex ve flex-col kullanıyoruz */}
      <div className="bg-[#2F3D8D] rounded-2xl overflow-hidden shadow-xl pt-24 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-[580px] flex flex-col">
        {/* Popüler badge - Koşullu olarak gösteriyoruz */}
        {campaign.popular === "true" && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Popüler
            </span>
          </div>
        )}

        {/* Üst içerik - Esnek büyüme ile */}
        <div className="px-6 pt-2 pb-4 text-white text-center flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-3">
            {campaign.kampanyaAdi}
          </h3>
          
          <div className="overflow-y-auto flex-grow mb-2">
            <ul className="space-y-2 text-sm">
              {campaign.ozellikler && campaign.ozellikler.map((ozellik, index) => (
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

        {/* Taahhüt butonları - Sabit yükseklik */}
        <div className="py-3 border-t border-blue-700/30">
          <div className="flex justify-center gap-4">
            {/* Sadece 12 ay varsa göster */}
            {campaign.taahut12Fiyat && (
              <button 
                className={`font-medium px-5 py-1.5 rounded-full shadow-md transition-colors duration-200 
                  ${(activeTerm === '12' || !campaign.taahut24Fiyat) 
                    ? 'bg-white text-[#2F3D8D]' 
                    : 'bg-blue-700/30 text-white hover:bg-blue-700/50'}`}
                onClick={() => setActiveTerm('12')}
              >
                12 Ay
              </button>
            )}
            
            {/* Sadece 24 ay varsa göster */}
            {campaign.taahut24Fiyat && (
              <button 
                className={`font-medium px-5 py-1.5 rounded-full shadow-md transition-colors duration-200 
                  ${(activeTerm === '24' || !campaign.taahut12Fiyat) 
                    ? 'bg-white text-[#2F3D8D]' 
                    : 'bg-blue-700/30 text-white hover:bg-blue-700/50'}`}
                onClick={() => setActiveTerm('24')}
              >
                24 Ay
              </button>
            )}
            
            {/* Hiç taahhüt seçeneği yoksa da butonsuz ama aynı yükseklikte boş alan */}
            {!campaign.taahut12Fiyat && !campaign.taahut24Fiyat && (
              <div className="h-9"></div>
            )}
          </div>
        </div>

        {/* Alt içerik - Fiyat ve butonlar - Sabit yükseklik */}
        <div className="bg-[#0F1A5A] text-white text-center py-5 px-4">
          <div className="flex justify-center items-baseline">
            <span className="text-3xl font-bold">
              {activePrice}
            </span>
            {(campaign.taahut12Fiyat || campaign.taahut24Fiyat) && (
              <span className="text-sm ml-1 text-gray-300">/ay</span>
            )}
          </div>
          
          {/* Taahhüt bilgisi - Sabit yükseklik için min-height ekliyoruz */}
          <div className="min-h-[3rem] flex items-center justify-center">
            {/* Her iki seçenek de varsa alternatif fiyatı göster */}
            {campaign.taahut12Fiyat && campaign.taahut24Fiyat && (
              <div className="text-sm text-gray-400 my-3">
                {activeTerm === '12' 
                  ? `24 Ay Taahhüt: ${campaign.taahut24Fiyat}/ay` 
                  : `12 Ay Taahhüt: ${campaign.taahut12Fiyat}/ay`}
              </div>
            )}
            
            {/* Sadece bir seçenek varsa taahhüt süresini göster */}
            {(campaign.taahut12Fiyat && !campaign.taahut24Fiyat) && (
              <div className="text-sm text-gray-400 my-3">12 Ay Taahhütlü</div>
            )}
            
            {(!campaign.taahut12Fiyat && campaign.taahut24Fiyat) && (
              <div className="text-sm text-gray-400 my-3">24 Ay Taahhütlü</div>
            )}
            
            {/* Hiçbir taahhüt fiyatı yoksa */}
            {!campaign.taahut12Fiyat && !campaign.taahut24Fiyat && (
              <div className="text-sm text-gray-400 my-3">Detaylar için tıklayın</div>
            )}
          </div>
          
          {/* Detay butonu */}
          <Link
            to={`/kampanyalar/${getCategorySlug()}/${campaign.slug}`}
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