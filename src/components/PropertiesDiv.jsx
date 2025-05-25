import React from 'react';

const PropertiesDiv = () => {
  // Ana hizmet kartları verileri
  const serviceCards = [
    {
      title: "SERVİSLER",
      description: "Türksat Fiberoptik Alt Yapısı Üzerinde 100 Mbps ve Üzeri İnternet Hizmeti",
      gradient: "bg-gradient-to-br from-[#2B7CBD] to-[#1e5b94]",
      icon: "/kabloPng.png" // Düzeltilmiş yol
    },
    {
      title: "CİHAZLAR",
      description: "Türksat Fiberoptik Alt Yapısı Üzerinde 100 Mbps ve Üzeri İnternet Hizmeti",
      gradient: "bg-gradient-to-br from-[#2B7CBD] to-[#1e5b94]",
      icon: "/modem.png" // Düzeltilmiş yol
    },
    {
      title: "PAKETLER",
      description: "Türksat Fiberoptik Alt Yapısı Üzerinde 100 Mbps ve Üzeri İnternet Hizmeti",
      gradient: "bg-gradient-to-br from-[#2B7CBD] to-[#1e5b94]",
      icon: "/tv.png" // Düzeltilmiş yol
    },
  ];

  // Alt özellik ikonları
  const featureIcons = [
    {
      title: "TELEFONSUZ İNTERNET",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14L12 16" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: "FİBER İNTERNET",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M3 12C3 12 7 4 12 12C17 20 21 12 21 12" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "HD TV YAYINI",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M8 19L16 19" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10.5 8.5L13.5 11.5L10.5 14.5" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="8" y="9" width="8" height="5" rx="1" stroke="#2B7CBD" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title: "ABONE SERVİSLER",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="7" r="3" stroke="#2B7CBD" strokeWidth="1.5"/>
          <circle cx="16" cy="9" r="2" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M12 14H6C4.34315 14 3 15.3431 3 17V19H12V17C12 15.3431 10.6569 14 9 14H6" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 14C14.5 14 16 14.3 16 14.8V19H21V16C21 15 19.5 14 18 14C17.5 14 16 14 16 14" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Ana Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {serviceCards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.gradient} rounded-xl text-white shadow-lg relative overflow-hidden`}
            style={{ 
              backgroundImage: `url(${card.icon})`, 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center',
              minHeight: '160px' 
            }}
          >
            {/* Kart İçeriği */}
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{card.title}</h3>
              <p className="text-sm leading-snug">
                {card.description}
              </p>
              
              {/* Artı İşareti */}
              <div className="absolute right-4 bottom-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            {/* Sağ Üst Köşedeki İkon - Image onError ile yedek görsel */}
            <div className="absolute -top-4 -right-4 opacity-30">
              <img 
                src={card.icon}
                alt=""
                className="w-24 h-24 object-contain"
                onError={(e) => {
                  console.log("Image failed to load:", card.icon);
                  e.target.onerror = null;
                  
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Alt Özellik İkonları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {featureIcons.map((feature, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div className="border-2 border-[#2B7CBD] rounded-full p-4 mb-3">
              {feature.icon}
            </div>
            <h4 className="text-[#2B7CBD] text-center text-xs font-bold tracking-wider">
              {feature.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesDiv;