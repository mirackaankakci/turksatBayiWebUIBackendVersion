import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryToUrl } from '../../utils/categoryUtils';
import aileboyu from "/assets/aileboyu.png";

function CampaignCards({ campaign }) {
  // Varsayılan olarak mevcut olan taahhüt süresini seçelim
  const [activeTerm, setActiveTerm] = useState('12');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Dinamik fiyat getirme fonksiyonu
  const getCommitmentPrice = (commitmentPeriod) => {
    if (!campaign) return null;
    
    // Dinamik olarak fiyat alanını oluştur
    const priceField = `taahut${commitmentPeriod}Fiyat`;
    return campaign[priceField] || null;
  };

  // Mevcut taahhüt seçeneklerini getir
  const getAvailableCommitments = () => {
    if (campaign.availableCommitments) {
      return campaign.availableCommitments;
    }
    
    // Fallback: Eski sistem
    const commitments = [];
    if (campaign.taahut12Fiyat) commitments.push(12);
    if (campaign.taahut24Fiyat) commitments.push(24);
    return commitments;
  };

  // İlk mevcut taahhüt süresini seç
  useEffect(() => {
    const availableCommitments = getAvailableCommitments();
    if (availableCommitments.length > 0) {
      const firstAvailable = Math.min(...availableCommitments);
      setActiveTerm(firstAvailable.toString());
    }
  }, [campaign]);
  
  // Kategori adını URL formatına dönüştür
  const getCategorySlug = () => {
    return categoryToUrl(campaign.category);
  };
  
  // Card'a tıklandığında kampanya detay sayfasına gitme işlemi
  const handleCardClick = (e) => {
    navigate(`/kampanyalar/${getCategorySlug()}/${campaign.slug}`);
  };
  
  // Aktif fiyatı belirleyelim
  const activePrice = getCommitmentPrice(activeTerm) || "İletişime Geçin";

  // Hemen Başvur fonksiyonu
  const handleBasvuru = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    
    try {
      // Seçilen kampanya bilgilerini localStorage'a kaydet
      const kampanyaBilgisi = {
        id: campaign.id,
        kampanyaAdi: campaign.kampanyaAdi,
        kategori: campaign.category,
        fiyat: activePrice,
        taahutSuresi: activeTerm,
        ozellikler: campaign.ozellikler,
        aciklama: campaign.aciklama
      };
      
      localStorage.setItem('selectedKampanya', JSON.stringify(kampanyaBilgisi));
      
      // Kısa delay (UX için)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Hemen başvur sayfasına yönlendir
      navigate('/hemenbasvur');
      
    } catch (error) {
      console.error('Başvuru hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[320px] mx-auto">
      <Link
        to={`/kampanyalar/${getCategorySlug()}/${campaign.slug}`}
        className="block"
      >
        {/* Taşan resim */}
        <div className="absolute -top-[90px] left-1/2 transform -translate-x-1/2 z-10">
          <img
            src={campaign.imgsrc || aileboyu}
            alt="Kampanya Görseli"
            className="w-44 h-auto drop-shadow-xl"
          />
        </div>

        {/* Kart içeriği - Yükseklik artırıldı */}
        <div className="bg-[#2F3D8D] rounded-2xl overflow-hidden shadow-xl pt-24 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-[640px] flex flex-col">
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
              {getAvailableCommitments().map(period => (
                <button 
                  key={period}
                  className={`font-medium px-5 py-1.5 rounded-full shadow-md transition-colors duration-200 
                    ${activeTerm === period.toString()
                      ? 'bg-white text-[#2F3D8D]' 
                      : 'bg-blue-700/30 text-white hover:bg-blue-700/50'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTerm(period.toString());
                  }}
                >
                  {period} Ay
                </button>
              ))}
              
              {/* Hiç taahhüt seçeneği yoksa da butonsuz ama aynı yükseklikte boş alan */}
              {getAvailableCommitments().length === 0 && (
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
              {getCommitmentPrice(activeTerm) && (
                <span className="text-sm ml-1 text-gray-300">/ay</span>
              )}
            </div>
            
            {/* Taahhüt bilgisi - Sabit yükseklik için min-height ekliyoruz */}
            <div className="min-h-[2rem] flex items-center justify-center">
              {/* Birden fazla seçenek varsa alternatif fiyatları göster */}
              {getAvailableCommitments().length > 1 && (
                <div className="text-sm text-gray-400 my-2">
                  {getAvailableCommitments()
                    .filter(period => period.toString() !== activeTerm)
                    .map(period => {
                      const price = getCommitmentPrice(period);
                      return price ? `${period} Ay: ${price}/ay` : null;
                    })
                    .filter(Boolean)
                    .join(', ')
                  }
                </div>
              )}
              
              {/* Sadece bir seçenek varsa taahhüt süresini göster */}
              {getAvailableCommitments().length === 1 && (
                <div className="text-sm text-gray-400 my-2">
                  {getAvailableCommitments()[0]} Ay Taahütlü
                </div>
              )}
              
              {/* Hiçbir taahhüt fiyatı yoksa */}
              {getAvailableCommitments().length === 0 && (
                <div className="text-sm text-gray-400 my-2">Detaylar için tıklayın</div>
              )}
            </div>
            
            {/* Butonlar - Yan yana */}
            <div className="flex gap-3 mt-3">
              {/* Hemen Başvur Butonu - YENİ */}
              <button
                onClick={handleBasvuru}
                disabled={loading}
                className={`flex-1 font-medium rounded-lg py-2.5 px-4 text-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 flex items-center justify-center ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Yönlendiriliyor...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1">🚀</span>
                    <span>Hemen Başvur</span>
                  </>
                )}
              </button>
              
              {/* Detay butonu */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/kampanyalar/${getCategorySlug()}/${campaign.slug}`);
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg py-2.5 px-4 text-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
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
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CampaignCards;