import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const PropertiesDiv = () => {
  // Ana hizmet kartları verileri
  const serviceCards = [
    {
      title: "KABLONET HİZMETLERİ",
      description: "Türksat Fiberoptik Altyapısı ile 1000 Mbps'e kadar yüksek hızlı internet",
      gradient: "bg-gradient-to-br from-[#2B7CBD] to-[#1A4B8C]",
      icon: "/assets/internet-icon.svg",
      buttonText: "Detaylı Bilgi",
      link: "/kampanyalar/kablonet"
    },
    {
      title: "KABLOTV HİZMETLERİ",
      description: "HD kalitesinde, kesintisiz TV yayınları ve birçok özel kanal seçeneği",
      gradient: "bg-gradient-to-br from-[#2778BE] to-[#1655A3]",
      icon: "/assets/tv-icon.svg",
      buttonText: "Paketleri İncele",
      link: "/kampanyalar/kablotv"
    },
    {
      title: "CİHAZLAR",
      description: "İhtiyacınıza uygun modern modemler ve yüksek teknoloji ürünleri",
      gradient: "bg-gradient-to-br from-[#236EB7] to-[#134B8F]",
      icon: "/assets/device-icon.svg",
      buttonText: "Cihazları Gör",
      link: "/cihazlar"
    },
  ];

  // Alt özellik ikonları - daha iyi açıklamalarla
  const featureIcons = [
    {
      title: "TELEFONSUZ İNTERNET",
      description: "Sabit hat aboneliği gerektirmeden hızlı internet",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14L12 16" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      link: "/telefonsuz-internet"
    },
    {
      title: "FİBER İNTERNET",
      description: "Yüksek hız ve düşük gecikme süresiyle premium internet deneyimi",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M3 12C3 12 7 4 12 12C17 20 21 12 21 12" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: "/fiber-internet"
    },
    {
      title: "HD TV YAYINI",
      description: "Kristal netliğinde görüntü ve zengin içerik seçenekleri",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M8 19L16 19" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10.5 8.5L13.5 11.5L10.5 14.5" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="8" y="9" width="8" height="5" rx="1" stroke="#2B7CBD" strokeWidth="1.5"/>
        </svg>
      ),
      link: "/hd-tv-yayini"
    },
    {
      title: "MÜŞTERİ SERVİSLERİ",
      description: "7/24 teknik destek ve hızlı müşteri hizmetleri çözümleri",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="7" r="3" stroke="#2B7CBD" strokeWidth="1.5"/>
          <circle cx="16" cy="9" r="2" stroke="#2B7CBD" strokeWidth="1.5"/>
          <path d="M12 14H6C4.34315 14 3 15.3431 3 17V19H12V17C12 15.3431 10.6569 14 9 14H6" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 14C14.5 14 16 14.3 16 14.8V19H21V16C21 15 19.5 14 18 14C17.5 14 16 14 16 14" stroke="#2B7CBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: "/musteri-hizmetleri"
    },
  ];

  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const featureVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Türksat <span className="text-blue-600">Hizmetlerimiz</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Yüksek hızlı internet, kesintisiz TV yayını ve modern teknoloji ürünleriyle hayatınızı kolaylaştırıyoruz.
          </p>
        </div>

        {/* Ana Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {serviceCards.map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`${card.gradient} rounded-xl text-white shadow-lg relative overflow-hidden h-64 group cursor-pointer`}
            >
              {/* Kart İçeriği */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div>
                  <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-sm leading-snug text-white/90">
                    {card.description}
                  </p>
                </div>
                
                <NavLink to={card.link} className="inline-block mt-4">
                <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm transition-all duration-200 self-start mt-4 group-hover:mt-0">
                 {card.buttonText} &rarr;
                </button>
                </NavLink>
              </div>
              
              {/* Dekoratif arka plan desenleri */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-4 border-white/20"></div>
                <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full border-2 border-white/15"></div>
              </div>
              
              {/* Sağ Üst Köşedeki İkon */}
              <div className="absolute -top-2 -right-2 opacity-20 transform scale-150 transition-transform group-hover:scale-[1.7] duration-500">
                <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d={index === 0 ? "M13 17h8v2h-8zm8-12v7h-8v3H9.82L15 21.2 14.2 22l-6-6L8 15.8l-.2-.2 6.6-6.6H13V6h8zm-4 4V7h-2v2h2zM1.8 2l1 1L2 3.8l-1-1L1.8 2zM5.4 5.6l1 1L5.6 7.4l-1-1L5.4 5.6zm-3 3l1 1L2.6 10.4l-1-1L2.4 8.6z" : (index === 1 ? "M21 17h-8v-2h8v2m0-6h-8v2h8v-2m0-6h-8v2h8V5m-10.997 9.997a2.997 2.997 0 11-5.994 0 2.997 2.997 0 015.994 0zm-8.003-8v11a2 2 0 002 2h14a2 2 0 002-2v-11a2 2 0 00-2-2h-14a2 2 0 00-2 2z" : "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z")}/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Alt Özellik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureIcons.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={featureVariants}
              whileHover="hover"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="border-2 border-blue-100 bg-blue-50 rounded-full p-5 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-blue-800 text-lg font-bold mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Hizmetlerimizden Yararlanmak İster Misiniz?</h3>
            <p className="text-blue-100">Size en uygun fırsatları hemen keşfedin</p>
          </div>
          <div className="flex space-x-4">
            <NavLink to="/kampanyalar">
            <button className="bg-white text-blue-800 font-medium py-3 px-6 rounded-full hover:bg-blue-50 transition-colors">
              Kampanyalar
            </button>
            </NavLink>
            <NavLink to="/hemenbasvur">
            <button className="bg-blue-700 border border-blue-300/30 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-900 transition-colors">
              Bize Ulaşın
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesDiv;