import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaWifi, FaTv, FaPhoneAlt, FaArrowLeft, FaRocket } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000F73] via-[#1a237e] to-[#2F3F8E] flex items-center justify-center px-4 relative overflow-hidden pt-20 md:pt-24 lg:pt-28">
      
      {/* Arka plan animasyonlu şekiller */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-purple-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400 rounded-full opacity-10 animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-white rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 py-8">
        
        {/* TÜRKSAT Logo Alanı */}

        {/* 404 Büyük Numara - TÜRKSAT Renkleri */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-transparent bg-gradient-to-r from-white via-cyan-300 to-blue-300 bg-clip-text leading-none animate-pulse">
            404
          </h1>
          <div className="relative -mt-4 md:-mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 blur-3xl opacity-20 rounded-full"></div>
          </div>
        </div>

        {/* Ana Mesaj - TÜRKSAT Teması */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Bağlantı Kurulamadı! 📡
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
            Aradığınız sayfaya ulaşılamıyor. Fiber hızında yeni bir sayfa bulalım size!
          </p>
          
          {/* Sinyal Göstergesi */}
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg shadow-lg px-4 md:px-6 py-3 md:py-4 border border-white/20">
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-3 md:h-4 bg-red-500 rounded animate-pulse"></div>
                <div className="w-2 h-4 md:h-6 bg-yellow-500 rounded animate-pulse delay-100"></div>
                <div className="w-2 h-5 md:h-8 bg-gray-400 rounded"></div>
                <div className="w-2 h-6 md:h-10 bg-gray-400 rounded"></div>
              </div>
              <span className="text-white font-mono text-xs md:text-sm">Sinyal Bulunamadı</span>
            </div>
          </div>
        </div>

        {/* Uydu Animasyonu */}
        <div className="mb-8 md:mb-12">
          <div className="relative inline-block">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-r from-[#3499D2] to-[#2F3F8E] rounded-full flex items-center justify-center shadow-2xl animate-bounce border-4 border-white/20">
              <span className="text-2xl md:text-4xl">🛰️</span>
            </div>
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full flex items-center justify-center animate-ping">
              <span className="text-white font-bold text-xs md:text-sm">!</span>
            </div>
          </div>
        </div>

        {/* Hızlı Erişim Butonları - TÜRKSAT Hizmetleri */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          
          {/* Ana Sayfa */}
          <Link 
            to="/"
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-cyan-300 rounded-xl p-4 md:p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <FaHome className="text-2xl md:text-3xl text-cyan-300 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Ana Sayfa</h3>
            <p className="text-xs md:text-sm text-blue-100">Anasayfaya dön</p>
          </Link>

          {/* Kablonet İnternet */}
          <Link 
            to="/kampanyalar/kablonet"
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-green-300 rounded-xl p-4 md:p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <FaWifi className="text-2xl md:text-3xl text-green-300 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Kablonet</h3>
            <p className="text-xs md:text-sm text-blue-100">Fiber internet</p>
          </Link>

          {/* Kablo TV */}
          <Link 
            to="/kampanyalar/kablotv"
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-purple-300 rounded-xl p-4 md:p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <FaTv className="text-2xl md:text-3xl text-purple-300 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Kablo TV</h3>
            <p className="text-xs md:text-sm text-blue-100">HD yayınlar</p>
          </Link>

          {/* Hemen Başvur */}
          <Link 
            to="/hemenbasvur"
            className="group bg-gradient-to-r from-[#3499D2] to-[#2F3F8E] hover:from-[#2a7ba8] hover:to-[#1f2d6e] border border-white/30 rounded-xl p-4 md:p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <FaRocket className="text-2xl md:text-3xl text-white mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Hemen Başvur</h3>
            <p className="text-xs md:text-sm text-blue-100">Fiber hızında başvuru</p>
          </Link>
        </div>

        {/* Alt Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8 px-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
          >
            <FaArrowLeft />
            Geri Dön
          </button>

          <div className="text-blue-200 text-xs md:text-sm">veya</div>

          <Link 
            to="/"
            className="bg-gradient-to-r from-[#3499D2] to-[#2F3F8E] hover:from-[#2a7ba8] hover:to-[#1f2d6e] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/30 text-sm md:text-base"
          >
            🏠 Ana Sayfaya Dön
          </Link>
        </div>

        {/* TÜRKSAT İletişim Bilgisi */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 max-w-2xl mx-auto mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">📞 Yardıma mı İhtiyacınız Var?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-blue-100">
            <div>
              <p className="font-semibold text-cyan-300 text-sm md:text-base">Müşteri Hizmetleri</p>
              <a href='tel:08508066000' className="text-base md:text-lg font-bold text-white">0850 806 60 00</a>
            </div>
            <div>
              <p className="font-semibold text-cyan-300 text-sm md:text-base">7/24 Teknik Destek</p>
              <p className="text-xs md:text-sm">Online yardım al</p>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="pt-4 md:pt-6 border-t border-white/20">
          <p className="text-blue-200 text-xs md:text-sm">
            <span className="text-white font-semibold">TÜRKSAT Kablonet</span> - Türkiye'nin Fiber Ağı
          </p>
          <p className="text-blue-300 text-xs mt-1 md:mt-2">
            Sorun devam ederse, lütfen teknik destek ekibimizle iletişime geçin.
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;