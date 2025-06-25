import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import ediyoruz
import serit from "/assets/serit.png";
import ustserit from "/assets/ustserit.png";
import aileboyu from "/assets/aileboyu.png";
import arrow from "/assets/right-arrow.png";
import star from "/assets/star.png";
import Campainings from "../components/HomePageComponents/Campainings";
import AltYapiSorgulama from "../components/HomePageComponents/AltYapiSorgulama";
import MovieBanner from "../components/HomePageComponents/movieBanner";
import PropertiesDiv from "../components/propertiesDiv";
import KablonetAdvantage from "../components/HomePageComponents/KablonetAdvantage";
import { FaWifi, FaVideoSlash, FaPhoneAlt, FaTv, FaSearch, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  const navigate = useNavigate();
  // Seçilen kategoriyi tutacak state değişkeni - "all" olarak değiştirildi
  const [selectedCategory, setSelectedCategory] = useState("all"); // "kablonet" yerine "all"

  // Navigasyon öğelerini ve kategori eşleştirmelerini güncelleyelim
  const navItems = [
    // Tüm kampanyalar seçeneği eklendi
    { name: "Tüm Kampanyalar", href: "#", category: "all", icon: <FaSearch className="inline-block mr-1" /> },
    { name: "Kablonet", href: "#", category: "internet", icon: <FaWifi className="inline-block mr-1" /> }, // internet yerine kablonet
    { name: "Kablo TV", href: "#", category: "tv", icon: <FaTv className="inline-block mr-1" /> },
    { name: "Kabloses", href: "#", category: "phone", icon: <FaPhoneAlt className="inline-block mr-1" /> },
    { name: "Mevcut Muşteri", href: "#", category: "mevcutmusteri", icon: <FaVideoSlash className="inline-block mr-1" /> },
  ];
  
  // Form verisi için state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  
  // Form gönderim durumu için state'ler
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    status: null, // 'success', 'error', null
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Telefon numarası formatını düzenle
    if (name === "phone") {
      let formattedValue = value;
      
      // +90 ile başlıyorsa, +90'ı kaldır ve 0 ile başlat
      if (formattedValue.startsWith("+90")) {
        formattedValue = "0" + formattedValue.substring(3);
      }
      
      // Boşluk ve özel karakterleri temizle, sadece rakam bırak
      formattedValue = formattedValue.replace(/[^\d]/g, "");
      
      // Sadece 0 veya 5 ile başlamaya izin ver
      if (formattedValue.length > 0) {
        // İlk karakter 0 veya 5 değilse, input'u reddet
        if (!formattedValue.startsWith("0") && !formattedValue.startsWith("5")) {
          // Önceki değeri koru (yeni girişi reddet)
          formattedValue = formData.phone.replace(/[^\d]/g, "");
        }
        // 5 ile başlıyorsa başına 0 ekle
        else if (formattedValue.startsWith("5")) {
          formattedValue = "0" + formattedValue;
        }
      }
      
      // Maksimum 11 hane
      if (formattedValue.length > 11) {
        formattedValue = formattedValue.substring(0, 11);
      }
      
      // Görsel formatlama (5xx xxx xx xx)
      if (formattedValue.length >= 4) {
        formattedValue = formattedValue.replace(/(\d{4})(\d{0,3})(\d{0,2})(\d{0,2})/, 
          (match, p1, p2, p3, p4) => {
            let formatted = p1;
            if (p2) formatted += " " + p2;
            if (p3) formatted += " " + p3;
            if (p4) formatted += " " + p4;
            return formatted;
          });
      }
      
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue,
      }));
      
      // Hata mesajını temizle
      if (submitStatus.status === 'error') {
        setSubmitStatus({ status: null, message: '' });
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Form gönderimi - HemenBasvur sayfası ile aynı yapı
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.name.trim()) {
      setSubmitStatus({
        status: 'error',
        message: 'Lütfen adınızı ve soyadınızı girin.'
      });
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitStatus({
        status: 'error',
        message: 'Lütfen telefon numaranızı girin.'
      });
      return;
    }

    // Telefon numarası doğrulama (HemenBasvur'daki validatePhoneNumber fonksiyonu)
    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      setSubmitStatus({
        status: 'error',
        message: phoneError
      });
      return;
    }

    setLoading(true);
    setSubmitStatus({ status: null, message: '' });

    try {
      // HemenBasvur sayfasındaki ile aynı API çağrısı
      const response = await axios.post('/kaydet.php', {
        adsoyad: formData.name.trim(),
        telefon: formData.phone.trim(),
        kampanyaId: 'Anasayfa Form'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 saniye timeout
      });

      console.log("API Yanıtı:", response.data);

      if (response.data && response.data.success === true) {
        setSubmitStatus({
          status: 'success',
          message: 'Başvurunuz başarıyla alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.'
        });
        
        // GTM'e dönüşüm olayını gönder
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formgonderildi',
          formType: 'hemenbasvur',
          kampanyaId: formData.kampanyaId || 'Hemen Başvur Form'
        });
        
        console.log("GTM Event gönderildi: formgonderildi (Anasayfa Form)");
        
        // Formu temizle
        setFormData({ name: '', phone: '' });
        
        // Toast mesajı (eğer varsa)
        if (typeof toast === 'function') {
          toast.success('Başvurunuz başarıyla gönderildi!');
        }

        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => {
          setSubmitStatus({ status: null, message: '' });
        }, 5000);
      } else {
        throw new Error(response.data?.error || 'İşlem başarısız');
      }

    } catch (error) {
      console.error("API Hatası:", error);
      
      let errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Form bilgileri hatalı. Lütfen kontrol edin.';
      }
      
      setSubmitStatus({
        status: 'error',
        message: errorMessage
      });
      
      if (typeof toast === 'function') {
        toast.error('Başvuru gönderilirken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  // Kategori seçimi için işlev
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="items-center w-full overflow-hidden">
      <Helmet>
        <title>Türksat Kablonet ® Resmi Yetkili Web Sitesi</title>
        <meta name="description" content="Türksat Kablonet resmi web sitesi. Fiber internet, kablo TV ve telefon hizmetleri. En uygun kampanyalar ve tarifeler." />
      </Helmet>
      {/* Üst bölüm - Banner kısmı */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[500px] lg:h-[700px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="flex flex-row items-center h-full pb-10">
          <div className="max-w-[60%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[800px] text-left ml-2 sm:ml-4 md:ml-6 lg:ml-[100px] xl:ml-[250px]">
            <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[42px] xl:text-[52px] font-bold text-white">
              Aile Boyu Fiber Kampanyası
            </h1>

            <div className="mt-2 sm:mt-3 md:mt-5">
              <ul className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                <li className="flex items-center gap-1.5 sm:gap-2 text-white mb-1 sm:mb-2">
                  <img
                    src={arrow}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Kolay Başvuru</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-white mb-1 sm:mb-2">
                  <img
                    src={arrow}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Hızlı Kurulum</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-white">
                  <img
                    src={arrow}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Fırsatları Yakala</span>
                </li>
              </ul>
            </div>

            <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex gap-1 sm:gap-3 md:gap-5">
              <button
                className="flex items-center font-bold text-[12px] sm:text-[14px] md:text-[15px] lg:text-[18px] xl:text-[22px] px-2.5 pr-4 py-1.5 sm:px-3.5 sm:pr-4.5 md:px-5 md:pr-6 lg:px-6 lg:pr-8 rounded-md sm:rounded-lg bg-[#000F73] text-white shadow-sm transition-colors hover:bg-[#2F3F8E] cursor-pointer"
                onClick={() => navigate('/hemenbasvur')}  
              >
                <img
                  src={arrow}
                  alt=""
                  className="w-3 h-3 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5 mr-1.5 sm:mr-2"
                />
                <span className="whitespace-nowrap mr-1 sm:mr-2.5">
                  Başvuru
                </span>
              </button>
              
              <button
                className="flex items-center font-bold text-[12px] sm:text-[14px] md:text-[15px] lg:text-[18px] xl:text-[22px] px-2.5 pr-4 py-1.5 sm:px-3.5 sm:pr-4.5 md:px-5 md:pr-6 lg:px-6 lg:pr-8 rounded-md sm:rounded-lg bg-white text-[#3499d2] shadow-sm transition-colors hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/kampanyalar')}
              >
                <img
                  src={star}
                  alt=""
                  className="w-3 h-3 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5 xl:w-5.5 xl:h-5.5 mr-1.5 sm:mr-2 md:mr-2.5 lg:mr-[12px]"
                />
                <span className="whitespace-nowrap mr-1 sm:mr-2.5">
                  Kampanyaları Gör
                </span>
              </button>
            </div>
          </div>

          <div className="ml-auto mr-2 sm:mr-5 md:mr-8 lg:mr-[120px] xl:mr-[220px] flex items-center">
            <img
              src={aileboyu}
              className="w-[140px] sm:w-[200px] md:w-[240px] lg:w-[300px] xl:w-[420px]"
              alt="Aile Boyu Kampanya"
            />
          </div>
        </div>
      </div>

      {/* Form bölümü - Modernize edildi */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-center -mt-[35px] sm:-mt-[65px] lg:-mt-[90px] xl:-mt-[110px] items-center py-3 px-3 sm:px-5 md:px-6 lg:px-8 xl:px-32 drop-shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-white via-white to-gray-50 rounded-2xl w-[94%] sm:w-full max-w-[1200px] py-6 sm:py-4 md:py-3 sm:h-[90px] md:h-[110px] lg:h-[130px] xl:h-[160px] m-1 sm:m-2 px-4 sm:px-6 overflow-visible gap-6 sm:gap-4 md:gap-3 lg:gap-2 shadow-xl border border-gray-100">
          
          {/* Sol div - Başlık kısmı - Geliştirildi */}
          <div className="relative sm:-ml-16 md:-ml-20 lg:-ml-24 xl:-ml-28 w-[95%] sm:w-[140px] md:w-[240px] lg:w-[340px] h-[45px] sm:h-[55px] md:h-[65px] lg:h-[85px] xl:h-[105px] bg-gradient-to-r from-[#000F73] to-[#2F3F8E] rounded-xl flex items-center justify-center shadow-lg border border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl md:text-2xl">🚀</span>
                <span className="text-white font-bold text-[14px] sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-wide">
                  Hızlı Başvuru
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-blue-200 text-xs lg:text-sm font-medium">
                  Fiber Hızında İşlem
                </span>
              </div>
            </div>
          </div>

          {/* Orta div - Form input'ları - Input'lar ayrıldı */}
          <div className="w-[95%] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px] h-auto sm:h-[80px] md:h-[90px] lg:h-[100px] xl:h-[120px] rounded-xl flex flex-col items-center justify-center py-2 px-2 sm:px-3">
            
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
              
              {/* Ad Soyad Input - Ayrı container */}
              <div className="relative flex-1 group">
                <div className="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-md bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 transition-colors group-focus-within:text-blue-600 text-base z-10">
                    👤
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız ve Soyadınız"
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-4 sm:py-3 md:py-4 bg-white border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm md:text-base font-medium transition-all duration-200 hover:bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg"
                  />
                  {/* Input focus efekti */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              {/* Telefon Input - Ayrı container */}
              <div className="relative flex-1 group">
                <div className="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden shadow-md bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 transition-colors group-focus-within:text-blue-600 text-base z-10">
                    📱
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefon Numaranız (05XX XXX XXXX)"
                    disabled={loading}
                    className={`w-full pl-11 pr-4 py-4 sm:py-3 md:py-4 bg-white border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm md:text-base font-medium transition-all duration-200 hover:bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg ${
                      submitStatus.status === 'error' && submitStatus.message.includes('telefon') 
                        ? "bg-red-50 border-red-200" 
                        : ""
                    }`}
                  />
                  {/* Input focus efekti */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>
            </div>
            
            {/* Form durum mesajları - Geliştirilmiş tasarım */}
            {submitStatus.status && (
              <div className={`mt-4 p-4 rounded-lg text-sm text-center w-full transition-all duration-300 transform animate-fadeIn ${
                submitStatus.status === 'success' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200 shadow-sm' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-2 border-red-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-center gap-3">
                  {submitStatus.status === 'success' ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xs">!</span>
                    </div>
                  )}
                  <span className="font-medium text-sm">{submitStatus.message}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sağ div - Gönder butonu - Uzun ve modern tasarım */}
          <button
            type="submit"
            disabled={loading}
            className={`relative sm:-mr-16 md:-mr-20 lg:-mr-24 xl:-mr-28 w-[160px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] ${
              loading 
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#2F3F8E] to-[#3499D2] hover:from-[#1f2d6e] hover:to-[#2a7ba8] transform hover:scale-105 active:scale-95'
            } rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-white/30`}
          >
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-white"></div>
                <span className="text-white text-xs md:text-sm font-medium">Gönderiliyor...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-bold text-[12px] sm:text-sm md:text-base lg:text-lg tracking-wide text-center">
                  Hemen Başvur
                </span>
                <span className="text-lg md:text-xl text-white">➤</span>
              </div>
            )}
            
            {/* Buton hover efekti */}
            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </form>

      <hr className="border-[#338dc9] h-2" />

      {/* Alt bölüm - Kampanya kartları */}
      <div className="relative bg-red mt-5">
        <div className="relative rounded-lg border border-gray-300 z-30 bg-white max-w-7xl mx-auto md:-mb-20 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2F3F8E]">
              Türksat Kablonet
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#3499D2] mt-1">
              En Uygun Kablonet Kampanyaları
            </p>
          </div>

          {/* Navigation - Kategori seçimi için onClick ekledik */}
          <nav className="w-full sm:w-auto">
            <ul className="flex flex-row flex-wrap justify-center sm:justify-end gap-y-2 sm:gap-y-0 gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault(); // Sayfanın yenilenmesini önle
                      handleCategorySelect(item.category);
                    }}
                    className={`text-sm sm:text-base lg:text-lg font-medium block px-3 py-1.5 transition-colors duration-200 ${
                      selectedCategory === item.category
                        ? "text-[#2F3F8E] border-b-2 border-[#3499D2]"
                        : "text-gray-500 hover:text-[#2F3F8E] hover:border-b border-gray-300"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8 lg:py-40 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
          {/* Üst kısım - şerit görsel */}
          <img
            src={ustserit}
            alt="Üst Şerit"
            className="absolute -top-1 left-0 w-full h-auto pointer-events-none select-none"
            style={{ zIndex: 0 }}
          />

          {/* Alt kısım - şerit görsel */}
          <img
            src={serit}
            alt="Alt Şerit"
            className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
            style={{ zIndex: 0 }}
          />

          {/* Campaign cards container - Seçilen kategoriye göre filtreleme yapıyoruz */}
          <Campainings category={selectedCategory} />
        </div>
      </div>

      {/* Altyapı sorgulama bölümü - Responsive düzeltme */}
      <div className="relative bg-white w-full max-w-7xl mx-auto -mt-[80px] sm:-mt-[100px] lg:-mt-[130px] mb-10 rounded-lg z-30 shadow-lg overflow-hidden">
        <AltYapiSorgulama />
      </div>

      <div>
        <PropertiesDiv />
      </div>

      <div>
        <MovieBanner />
      </div>

        <div className="relative rounded-lg border border-gray-300 z-50 mt-[100px] bg-white max-w-7xl mx-auto md:-mb-20 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 ">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2F3F8E]">
              Kablonet Avantajları
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#3499D2] mt-1">
              Kablonet internet kullanan kullanıcıların elde ettiği avantajlar
            </p>
          </div>
        </div>
      <div className="relative mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8 lg:py-40 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        {/* Üst kısım - şerit görsel */}
        <img
          src={ustserit}
          alt="Üst Şerit"
          className="absolute -top-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />

        {/* Alt kısım - şerit görsel */}
        <img
          src={serit}
          alt="Alt Şerit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />

        {/* Campaign cards container */}
        <KablonetAdvantage />
      </div>
    </div>
  );
}

// Telefon numarası doğrulama fonksiyonu (HemenBasvur'dan)
const validatePhoneNumber = (phone) => {
  if (!phone) {
    return "Telefon numarası gereklidir.";
  }

  // Sadece rakam ve + işaretine izin ver
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  
  if (!/^[\d+]+$/.test(cleanPhone)) {
    return "Telefon numarası sadece rakam içermelidir.";
  }

  // Türk telefon numarası formatları için kontrol
  const phonePattern = /^(\+90|90|0)?\s?[1-9][0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
  
  if (!phonePattern.test(cleanPhone)) {
    return "Geçerli bir telefon numarası girin. (Örn: 0532 123 45 67)";
  }

  return "";
};

export default HomePage;
