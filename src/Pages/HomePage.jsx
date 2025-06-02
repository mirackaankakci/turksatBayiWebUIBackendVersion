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
      // Boşluk ve özel karakterleri temizle, sadece rakam bırak
      let formattedValue = value.replace(/[^\d]/g, "");
      
      // 0 ile başlamıyorsa başına 0 ekle (11 haneden az ise)
      if (formattedValue.length > 0 && !formattedValue.startsWith("0") && formattedValue.length < 11) {
        formattedValue = "0" + formattedValue;
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

      {/* Form bölümü - HemenBasvur sayfasındaki API ile entegre edildi */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-center -mt-[35px] sm:-mt-[65px] lg:-mt-[90px] xl:-mt-[110px] items-center py-3 px-3 sm:px-5 md:px-6 lg:px-8 xl:px-32 drop-shadow-md"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg w-[94%] sm:w-full max-w-[1200px] py-4 sm:py-3 md:py-0 sm:h-[60px] md:h-[65px] lg:h-[90px] xl:h-[130px] m-1 sm:m-2 px-3 sm:px-4 overflow-visible gap-4 sm:gap-3 md:gap-2 lg:gap-0">
          {/* Sol div - Soldan taşan */}
          <div className="relative sm:-ml-14 md:-ml-18 lg:-ml-22 xl:-ml-26 w-[95%] sm:w-[120px] md:w-[220px] lg:w-[320px] h-[35px] sm:h-[40px] md:h-[45px] lg:h-[65px] xl:h-[85px] bg-[#000F73] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-[13px] sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Hızlı Başvuru Formu
            </span>
          </div>

          {/* Orta div - Form içeren */}
          <div className="w-[95%] sm:w-[260px] md:w-[320px] lg:w-[450px] xl:w-[550px] h-[80px] sm:h-[60px] md:h-[65px] lg:h-[75px] xl:h-[95px] rounded-lg flex flex-col items-center justify-center py-1.5 px-1.5 sm:px-2.5">
            <div className="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden border border-gray-300 shadow-md">
              <div className="w-full sm:w-1/2 relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız Soyadınız"
                  className="w-full h-[36px] sm:h-[38px] md:h-[42px] lg:h-[48px] px-4 sm:px-4 text-sm sm:text-sm md:text-base lg:text-lg border-0 focus:outline-none"
                  disabled={loading}
                />
                <div className="hidden sm:block absolute right-0 top-[10%] h-[80%] w-[1px] bg-gray-300"></div>
              </div>
              <div className="w-full sm:w-1/2 mt-0 border-t sm:border-t-0 border-gray-300 sm:border-0">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon Numaranız"
                  className="w-full h-[36px] sm:h-[38px] md:h-[42px] lg:h-[48px] px-4 sm:px-4 text-sm sm:text-sm md:text-base lg:text-lg border-0 focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>
            
            {/* Form durum mesajları - Görünümü iyileştirme */}
            {submitStatus.status && (
              <div className={`mt-2 p-2 rounded text-sm text-center ${
                submitStatus.status === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
          </div>

          {/* Sağ div - Yuvarlak (Gönder butonu) */}
          <button
            type="submit"
            disabled={loading}
            className={`relative sm:-mr-14 md:-mr-18 lg:-mr-22 xl:-mr-26 w-[60px] sm:w-[75px] md:w-[95px] lg:w-[120px] xl:w-[150px] h-[60px] sm:h-[75px] md:h-[95px] lg:h-[120px] xl:h-[150px] ${
              loading ? 'bg-gray-500' : 'bg-[#2F3F8E] hover:bg-[#1f2d6e]'
            } rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <span className="text-white font-bold text-[13px] sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                Gönder
              </span>
            )}
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
