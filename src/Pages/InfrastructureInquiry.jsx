import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaSearch, FaTools, FaTimes } from "react-icons/fa";
import serit from "/assets/serit.png";
import { Helmet } from 'react-helmet-async';

const InfrastructureInquiry = () => {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [result, setResult] = useState(null);
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
  
  // Sayfa başlığını ve meta bilgilerini dinamik olarak ayarla
  useEffect(() => {
    let pageTitle = 'Türksat Kablonet Altyapı Sorgulama | Bölgenizde Hizmet Var mı?';
    let metaDescription = 'Türksat Kablonet fiber internet ve KabloTV altyapısının adresinizde kullanılabilir olup olmadığını öğrenin. Hızlı adres sorgulama.';
    
    // Adım 2: Yükleme ekranı
    if (step === 2) {
      pageTitle = 'Adres Sorgulanıyor | Türksat Kablonet Altyapı Sorgulama';
      metaDescription = 'Adresinizde Türksat Kablonet hizmetinin kullanılabilir olup olmadığı sorgulanıyor. Lütfen bekleyin.';
    }
    
    // Adım 3: Sonuçlar
    if (step === 3 && result) {
      if (result.hasService) {
        pageTitle = 'Tebrikler! Adresinizde Türksat Kablonet Hizmeti Kullanılabilir';
        metaDescription = `${result.address} adresinde ${result.maxSpeed} Mbps'e kadar hızlarda Türksat Kablonet hizmetinden yararlanabilirsiniz.`;
      } else {
        pageTitle = 'Üzgünüz | Türksat Kablonet Hizmeti Henüz Adresinizde Kullanılamıyor';
        metaDescription = `${result.address} adresinde şu anda Türksat Kablonet hizmeti bulunmamaktadır. Altyapı çalışmalarımızı takip edin.`;
      }
    }
    
    // Konum bilgilerine göre başlık güncelleme
    if (city && district) {
      pageTitle = `${city} ${district} Türksat Kablonet Altyapı Sorgulama`;
      metaDescription = `${city} ${district} bölgesinde Türksat Kablonet fiber internet ve KabloTV altyapısının kullanılabilirliğini sorgulayın.`;
      
      if (neighborhood) {
        pageTitle = `${city} ${district} ${neighborhood} Türksat Kablonet Altyapı Sorgulama`;
        metaDescription = `${city} ${district} ${neighborhood} bölgesinde Türksat Kablonet altyapısının kullanılabilir olup olmadığını öğrenin.`;
      }
    }
    
    // Doğrudan document.title'ı güncelleyelim
    document.title = pageTitle;
  }, [step, result, city, district, neighborhood]);
  
  // Sayfa yüklendikten 1 saniye sonra pop-up'ı otomatik açan useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMaintenancePopup(true);
    }, 1000); // 1000 milisaniye (1 saniye)
    
    // Component unmount edildiğinde timer'ı temizle
    return () => clearTimeout(timer);
  }, []); // Boş dependency array ile sadece bir kere çalışmasını sağlıyoruz
  
  // İller listesi - gerçek API'den alınabilir
  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
  
  // Seçilen şehre göre ilçeleri getiren fonksiyon - gerçek API ile değiştirilebilir
  const getDistricts = (selectedCity) => {
    const districtMap = {
      "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Maltepe"],
      "Ankara": ["Çankaya", "Keçiören", "Mamak", "Etimesgut", "Yenimahalle"],
      "İzmir": ["Konak", "Karşıyaka", "Bornova", "Buca", "Çiğli"],
      "Bursa": ["Osmangazi", "Nilüfer", "Yıldırım", "Gemlik", "İnegöl"],
      "Antalya": ["Muratpaşa", "Konyaaltı", "Kepez", "Alanya", "Manavgat"]
    };
    return districtMap[selectedCity] || [];
  };
  
  // Seçilen ilçeye göre mahalleleri getiren fonksiyon - gerçek API ile değiştirilebilir
  const getNeighborhoods = (selectedDistrict) => {
    // Örnek mahalleler
    return ["Atatürk Mahallesi", "Cumhuriyet Mahallesi", "Fatih Mahallesi", "Yeni Mahalle", "Merkez Mahallesi"];
  };
  
  // Seçilen mahalleye göre sokakları getiren fonksiyon - gerçek API ile değiştirilebilir
  const getStreets = (selectedNeighborhood) => {
    // Örnek sokaklar
    return ["Güneş Sokak", "Ay Sokak", "Yıldız Caddesi", "Çiçek Sokak", "Deniz Bulvarı"];
  };

  // İlçeleri seçilen şehre göre filtreleme
  const districts = city ? getDistricts(city) : [];
  
  // Mahalleleri seçilen ilçeye göre filtreleme
  const neighborhoods = district ? getNeighborhoods(district) : [];
  
  // Sokakları seçilen mahalleye göre filtreleme
  const streets = neighborhood ? getStreets(neighborhood) : [];

  // Adres sorgulaması yapan fonksiyon
  const handleInquiry = (e) => {
    e.preventDefault();
    // Bakım modu popupını göster
    setShowMaintenancePopup(true);
    
    // Not: Gerçek sorgu fonksiyonu bakım modu kaldırıldığında aktif edilecek
    /*
    // Yükleme ekranına geçiş
    setStep(2);
    
    // API isteğini simüle eden fonksiyon - gerçek API entegrasyonu ile değiştirilmeli
    setTimeout(() => {
      // Rastgele sonuç dönme (demo amaçlı)
      const hasService = Math.random() > 0.3;
      
      setResult({
        hasService,
        maxSpeed: hasService ? Math.floor(Math.random() * 500) + 100 : 0,
        address: `${street}, No: ${buildingNo}, ${neighborhood}, ${district}/${city}`
      });
      
      setStep(3); // Sonuç ekranına geçiş
    }, 1500);
    */
  };

  // Forma geri dönme fonksiyonu
  const handleBack = () => {
    setStep(1);
    setResult(null);
  };

  // Bakım modu popup'ını kapat
  const closeMaintenancePopup = () => {
    setShowMaintenancePopup(false);
  };

  // Meta açıklama ve anahtar kelimeler için yardımcı fonksiyonlar
  const getMetaDescription = () => {
    if (step === 3 && result) {
      if (result.hasService) {
        return `${result.address} adresinde ${result.maxSpeed} Mbps'e kadar hızlarda Türksat Kablonet hizmetinden yararlanabilirsiniz.`;
      } else {
        return `${result.address} adresinde şu anda Türksat Kablonet hizmeti bulunmamaktadır. Altyapı çalışmalarımızı takip edin.`;
      }
    }
    
    if (city && district) {
      let desc = `${city} ${district} bölgesinde Türksat Kablonet fiber internet ve KabloTV altyapısının kullanılabilirliğini sorgulayın.`;
      if (neighborhood) {
        desc = `${city} ${district} ${neighborhood} bölgesinde Türksat Kablonet altyapısının kullanılabilir olup olmadığını öğrenin.`;
      }
      return desc;
    }
    
    return 'Türksat Kablonet fiber internet ve KabloTV altyapısının adresinizde kullanılabilir olup olmadığını öğrenin. Hızlı adres sorgulama.';
  };
  
  const getMetaKeywords = () => {
    let keywords = 'türksat altyapı sorgulama, kablonet altyapı, fiber internet sorgulama, kablo tv altyapı';
    
    if (city) {
      keywords += `, ${city.toLowerCase()} türksat, ${city.toLowerCase()} kablonet`;
      if (district) {
        keywords += `, ${district.toLowerCase()} internet altyapısı, ${city.toLowerCase()} ${district.toLowerCase()} kablonet`;
      }
    }
    
    if (step === 3 && result) {
      keywords += result.hasService ? ', fiber internet başvuru, kablonet abonelik' : ', türksat altyapı genişletme, kablonet talep';
    }
    
    return keywords;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          {step === 3 && result
            ? result.hasService
              ? 'Tebrikler! Adresinizde Türksat Kablonet Hizmeti Kullanılabilir'
              : 'Üzgünüz | Türksat Kablonet Hizmeti Henüz Adresinizde Kullanılamıyor'
            : city && district
              ? neighborhood
                ? `${city} ${district} ${neighborhood} Türksat Kablonet Altyapı Sorgulama`
                : `${city} ${district} Türksat Kablonet Altyapı Sorgulama`
              : 'Türksat Kablonet Altyapı Sorgulama | Bölgenizde Hizmet Var mı?'
          }
        </title>
        <meta 
          name="description" 
          content={getMetaDescription()} 
        />
        <meta 
          name="keywords" 
          content={getMetaKeywords()} 
        />
        <meta 
          property="og:title" 
          content={step === 3 && result 
            ? (result.hasService ? 'Adresinizde Türksat Kablonet Hizmeti Var!' : 'Türksat Kablonet Hizmeti Henüz Bölgenizde Yok') 
            : 'Türksat Kablonet Altyapı Sorgulama'} 
        />
        <meta 
          property="og:description" 
          content={getMetaDescription()} 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      {/* Bakım Modu Popup */}
      {showMaintenancePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md mx-4 relative animate-fadeIn">
            <button 
              onClick={closeMaintenancePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Kapat"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <FaTools className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Sistemimiz Bakımda
              </h3>
              <p className="text-gray-600">
                Altyapı sorgulama sistemimiz şu anda bakımdadır. En kısa sürede hizmetinize sunacağız. 
                Anlayışınız için teşekkür ederiz.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a 
                href="tel:08508066000" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Müşteri Hizmetlerini Ara
              </a>
              <button
                onClick={closeMaintenancePopup}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Üst Banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Şerit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-white mb-4">
            {step === 3 && result
              ? result.hasService 
                ? "Adresinizde Hizmet Veriyoruz!" 
                : "Altyapı Kontrolü Sonuçları"
              : city 
                ? `${city} ${district || ''} ${neighborhood || ''} Altyapı Sorgulama` 
                : "Altyapı Sorgulama"}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
            {step === 3 && result
              ? result.hasService 
                ? "Tebrikler! Adresinizde Türksat Kablonet hizmetlerinden yararlanabilirsiniz." 
                : "Henüz bölgenizde hizmet veremiyoruz. Altyapı çalışmalarımız devam ediyor."
              : "Adresinizi girerek Türksat Kablo hizmetinin bölgenizde kullanılabilir olup olmadığını öğrenin."}
          </p>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10 -mt-12">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {/* Adres Formu */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <FaMapMarkerAlt className="mx-auto text-blue-600 mb-4" size={32} />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Adresinizi Seçin
                </h2>
                <p className="mt-2 text-gray-600">
                  Türksat Kablonet hizmetinin adresinizde kullanılabilir olup olmadığını öğrenmek için adresinizi girin.
                </p>
              </div>

              <form onSubmit={handleInquiry} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* İl Seçimi */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      İl *
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setDistrict("");
                        setNeighborhood("");
                        setStreet("");
                      }}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">İl Seçiniz</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* İlçe Seçimi */}
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                      İlçe *
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setNeighborhood("");
                        setStreet("");
                      }}
                      required
                      disabled={!city}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">İlçe Seçiniz</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mahalle Seçimi */}
                  <div>
                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                      Mahalle *
                    </label>
                    <select
                      id="neighborhood"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={(e) => {
                        setNeighborhood(e.target.value);
                        setStreet("");
                      }}
                      required
                      disabled={!district}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Mahalle Seçiniz</option>
                      {neighborhoods.map((neighborhood) => (
                        <option key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sokak Seçimi */}
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Sokak/Cadde *
                    </label>
                    <select
                      id="street"
                      name="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      disabled={!neighborhood}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Sokak/Cadde Seçiniz</option>
                      {streets.map((street) => (
                        <option key={street} value={street}>
                          {street}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bina No */}
                  <div className="md:col-span-2">
                    <label htmlFor="buildingNo" className="block text-sm font-medium text-gray-700 mb-1">
                      Bina No *
                    </label>
                    <input
                      id="buildingNo"
                      name="buildingNo"
                      type="text"
                      value={buildingNo}
                      onChange={(e) => setBuildingNo(e.target.value)}
                      required
                      placeholder="Örn: 15"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#2F3D8D] to-[#3399D2] text-white font-semibold rounded-md hover:opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2"
                    disabled={!city || !district || !neighborhood || !street || !buildingNo}
                  >
                    <FaSearch />
                    <span>Altyapı Sorgula</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Yükleme Ekranı - Şu an pasif */}
          {step === 2 && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
              <p className="mt-6 text-lg text-gray-600">Adresiniz sorgulanıyor...</p>
            </div>
          )}

          {/* Sonuç Ekranı - Şu an pasif */}
          {step === 3 && result && (
            <div className="text-center py-8">
              <div className="mb-8">
                {result.hasService ? (
                  <div className="bg-green-100 rounded-full p-4 inline-block">
                    <FaCheckCircle className="text-green-600" size={48} />
                  </div>
                ) : (
                  <div className="bg-red-100 rounded-full p-4 inline-block">
                    <FaTimesCircle className="text-red-600" size={48} />
                  </div>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {result.hasService ? "Harika! Hizmet Bölgenizdeyiz" : "Üzgünüz! Henüz Bölgenizde Hizmet Veremiyoruz"}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {result.hasService 
                  ? `Adresinizde ${result.maxSpeed} Mbps'e kadar hızda internet hizmeti alabilirsiniz!` 
                  : "Seçtiğiniz adres henüz hizmet bölgemizde bulunmamaktadır. Altyapı çalışmalarımız devam etmektedir."}
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg max-w-lg mx-auto mb-8">
                <p className="text-sm text-gray-500 font-medium">Sorgulanan Adres:</p>
                <p className="text-gray-700">{result.address}</p>
              </div>

              {result.hasService && (
                <div className="mb-8">
                  <a
                    href="/hemenbasvur"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-[#2F3D8D] to-[#3399D2] text-white font-semibold rounded-md hover:opacity-90 transition-all transform hover:scale-105"
                  >
                    Hemen Başvur
                  </a>
                </div>
              )}

              <button
                onClick={handleBack}
                className="text-blue-600 font-medium flex items-center space-x-2 mx-auto hover:text-blue-800"
              >
                <span>&larr;</span>
                <span>Yeni Adres Sorgula</span>
              </button>
            </div>
          )}
        </div>

        {/* Bilgi Kartı */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Türksat Kablo Altyapısı Nedir?
          </h2>
          
          <p className="text-gray-600 mb-4">
            Türksat Kablo TV ve İnternet altyapısı, fiber optik ve koaksiyel kablo teknolojilerini kullanarak yüksek hızlı internet, HD TV ve telefon hizmetlerini tek bir kablo üzerinden sağlayan gelişmiş bir ağ yapısıdır.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Yüksek Hız</h3>
              <p className="text-gray-600 text-sm">1000 Mbps'e varan hızlarda kesintisiz internet deneyimi.</p>
            </div>
            
            
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Stabil Bağlantı</h3>
              <p className="text-gray-600 text-sm">Fiber ve koaksiyel kablo teknolojisinin avantajlarıyla stabil ve güvenilir bağlantı.</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Popup için CSS animasyonu */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InfrastructureInquiry;