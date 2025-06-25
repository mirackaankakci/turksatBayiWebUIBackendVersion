import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CampaignData } from '../helpers/CampaingData';
import serit from "/assets/serit.png";
import { FaWifi, FaTv, FaPhoneAlt, FaCheckCircle, FaInfoCircle, FaArrowRight, FaRegFileAlt, FaMoneyBillWave, FaListAlt, FaPhoneVolume, FaLaptop } from 'react-icons/fa';
import { styleTable } from '../utils/htmlUtils';
import axios from "axios";

const CampaignDetail = () => {
  // kampanyaId yerine kampanyaSlug kullanın
  const { kampanyaSlug } = useParams();
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState('12'); // '24' yerine '12' olarak değiştiriyoruz
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ucretlendirme');

  // SEO için state'ler
  const [pageTitle, setPageTitle] = useState('Kampanya Detayı | Türksat Kablonet');
  const [pageDescription, setPageDescription] = useState('Türksat Kablonet kampanya detayları');
  const [pageKeywords, setPageKeywords] = useState('türksat, kablonet, kampanya, internet');

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agreement: false,
    kampanyaId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Telefon numarası formatlayıcı fonksiyon
  const formatPhoneNumber = (phone) => {
    // Boşluk ve özel karakterleri temizle
    let formattedPhone = phone.replace(/\s+/g, "");
    formattedPhone = formattedPhone.replace(/[^\d+]/g, "");

    // + işaretini kaldır
    formattedPhone = formattedPhone.replace(/\+/g, "");

    // 90 ile başlıyorsa ve 0 yoksa düzelt
    if (formattedPhone.startsWith("90") && formattedPhone.length > 2) {
      formattedPhone = "0" + formattedPhone.substring(2);
    }
    // Başında 0 yoksa ekle
    else if (!formattedPhone.startsWith("0") && formattedPhone.length > 0) {
      formattedPhone = "0" + formattedPhone;
    }

    // Maksimum 11 karakter (0 dahil)
    if (formattedPhone.length > 11) {
      formattedPhone = formattedPhone.substring(0, 11);
    }

    return formattedPhone;
  };

  // Telefon numarası doğrulama
  const validatePhoneNumber = (phone) => {
    // Türkiye telefon formatı kontrolü: 05XX XXX XXXX
    const turkishPhoneRegex = /^0[5][0-9]{9}$/;

    if (!phone) {
      return "Telefon numarası gerekli";
    } else if (!turkishPhoneRegex.test(phone)) {
      return "Geçerli bir cep telefonu numarası girin (05XX XXX XXXX)";
    }

    return "";
  };

  // Form değişikliklerini yönetme
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedPhone
      }));
      
      // Telefon doğrulama hatasını temizle
      if (phoneError) {
        setPhoneError("");
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!formData.name.trim()) {
      alert("Lütfen adınızı ve soyadınızı girin.");
      return;
    }

    // Telefon numarası doğrulama
    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      setPhoneError(phoneError);
      return;
    }

    setIsSubmitting(true);
    setPhoneError("");

    try {
      // PHP dosyasına gönderilecek veriler (HemenBasvur ile aynı format)
      const response = await axios.post('/kaydet.php', {
        adsoyad: formData.name.trim(),
        telefon: formData.phone.trim(),
        kampanyaId: campaign?.id || formData.kampanyaId || 'Campaign Detail Form'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 saniye timeout
      });

      console.log("API Yanıtı:", response.data);

      if (response.data && response.data.success === true) {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // GTM'e dönüşüm olayını gönder
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formgonderildi',
          formType: 'kampanyaDetay',
          kampanyaId: campaign?.id || formData.kampanyaId || 'Campaign Detail Form',
          kampanyaAdi: campaign?.kampanyaAdi || ''
        });
        
        console.log("GTM Event gönderildi: formgonderildi (Kampanya Detay)");

        // Formu temizle
        setFormData({
          name: "",
          phone: "",
          agreement: false,
          kampanyaId: campaign?.id || ""
        });

        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);

      } else {
        throw new Error(response.data?.error || 'İşlem başarısız');
      }

    } catch (error) {
      console.error("API Hatası:", error);
      setIsSubmitting(false);
      
      let errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
      }
      
      alert(errorMessage);
    }
  };

  // Kampanya verilerini yükle
  useEffect(() => {
    // Gerçek bir API'den veri çekiyormuş gibi bir gecikme ekleyelim
    setLoading(true);

    setTimeout(() => {
      // ID yerine slug ile kampanyayı bulun
      const foundCampaign = CampaignData.find(camp => camp.slug === kampanyaSlug);

      if (foundCampaign) {
        setCampaign(foundCampaign);
        
        // Kampanya bulunduğunda SEO meta bilgilerini güncelle
        updateMetaTags(foundCampaign);
      } else {
        // Kampanya bulunamadıysa kampanyalar sayfasına yönlendir
        navigate('/kampanyalar');
      }

      setLoading(false);
    }, 500);
  }, [kampanyaSlug, navigate]);

  // SEO meta etiketlerini güncelleme fonksiyonu
  const updateMetaTags = (campaign) => {
    if (!campaign) return;

    let title = '';
    let description = '';
    let keywords = 'türksat, kablonet, kampanya';
    
    const categoryName = campaign.category;
    const price = campaign.taahut12Fiyat || campaign.taahut24Fiyat || '';
    const features = campaign.ozellikler?.slice(0, 3).join(', ') || '';
    
    // Kategori bazlı başlık ve açıklama
    switch (categoryName) {
      case 'internet':
        title = `${campaign.kampanyaAdi} | Kablonet İnternet Kampanyası - Türksat Kablonet ® Web Sitesi`;
        description = `${campaign.kampanyaAdi} internet kampanyası ile ${features} özellikleri ve ayda sadece ${price} TL. Fiber hızında kesintisiz internet için hemen başvurun.`;
        keywords += ', fiber internet, kablonet, broadband, yüksek hız internet';
        break;
      case 'tv':
        title = `${campaign.kampanyaAdi} | Kablo TV Kampanyası - Türksat Kablonet ® Web Sitesi`;
        description = `${campaign.kampanyaAdi} TV kampanyası ile ${features} özellikleri ve ayda sadece ${price} TL. HD kalitesinde TV keyfi için hemen başvurun.`;
        keywords += ', kablo tv, televizyon, hd tv, dijital yayın';
        break;
      case 'phone':
        title = `${campaign.kampanyaAdi} | Kablo Ses Telefon Kampanyası - Türksat Kablonet ® Web Sitesi`;
        description = `${campaign.kampanyaAdi} telefon kampanyası ile ${features} özellikleri ve ayda sadece ${price} TL. Ekonomik konuşma fırsatları için hemen başvurun.`;
        keywords += ', kablo ses, sabit telefon, ev telefonu';
        break;
      case 'mevcutmusteri':
        title = `${campaign.kampanyaAdi} | Mevcut Müşteri Kampanyası - Türksat Kablonet ® Web Sitesi`;
        description = `${campaign.kampanyaAdi} mevcut müşteri kampanyası ile ${features} özellikleri ve özel indirimler. Sadece Türksat müşterilerine özel fırsatlar.`;
        keywords += ', mevcut müşteri, sadakat kampanyası, mevcut abone';
        break;
      default:
        title = `${campaign.kampanyaAdi} | Türksat Kablonet Kampanyası - Türksat Kablonet ® Web Sitesi`;
        description = `${campaign.kampanyaAdi} kampanyası detayları ve fiyatları. ${features} özellikleri ile hemen başvurun, avantajlı fiyatlardan yararlanın.`;
    }
    
    // SEO bilgilerini güncelle
    setPageTitle(title);
    setPageDescription(description);
    setPageKeywords(keywords);
    
    // Doğrudan document.title'ı da güncelle
    document.title = title;
  };

  // Aktif tab değiştiğinde meta açıklamayı güncelle
  useEffect(() => {
    if (campaign) {
      let description = pageDescription;
      
      switch(activeTab) {
        case 'ucretlendirme':
          description = `${campaign.kampanyaAdi} kampanyası fiyatları ve ücretlendirme detayları. ${campaign.taahut12Fiyat ? '12 ay' : ''} ${campaign.taahut24Fiyat ? '/ 24 ay' : ''} taahhüt seçenekleri.`;
          break;
        case 'detaylar':
          description = `${campaign.kampanyaAdi} kampanyası özellikleri ve içeriği. ${campaign.ozellikler?.slice(0, 2).join(', ')} ve daha fazlası için detaylı bilgi.`;
          break;
        case 'iletisim':
          description = `${campaign.kampanyaAdi} kampanyası başvurusu için iletişim bilgileri. 0850 806 60 00 numaralı hattı arayarak detaylı bilgi alabilirsiniz.`;
          break;
        case 'cihazlar':
          description = `${campaign.kampanyaAdi} kampanyası ile uyumlu modem ve cihaz seçenekleri. WiFi modem ve TV Box hakkında detaylı bilgi.`;
          break;
      }
      
      setPageDescription(description);
    }
  }, [activeTab, campaign]);

  //  useEffect ile kampanya yüklendiğinde 12 ay taahhüt kontrolü yapın
  useEffect(() => {
    if (campaign) {
      // Eğer 12 ay taahhüt varsa onu seç
      if (campaign.taahut12Fiyat) {
        setSelectedTerm('12');
      } 
      // Yoksa ve 24 ay taahhüt varsa 24 ayı seç
      else if (campaign.taahut24Fiyat) {
        setSelectedTerm('24');
      }
      // Her ikisi de yoksa boş bırak
      else {
        setSelectedTerm('');
      }
    }
  }, [campaign]);

  // Campaign yüklendiğinde kampanyaId'yi güncelle
  useEffect(() => {
    if (campaign) {
      setFormData(prevState => ({
        ...prevState,
        kampanyaId: campaign.id
      }));
    }
  }, [campaign]);

  // Kategori ikonunu belirle
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'internet':
        return <FaWifi className="text-blue-500" />;
      case 'tv':
        return <FaTv className="text-purple-500" />;
      case 'phone':
        return <FaPhoneAlt className="text-green-500" />;
      default:
        return <FaWifi className="text-blue-500" />;
    }
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet>
          <title>Kampanya Yükleniyor... | Türksat Kablonet</title>
          <meta name="description" content="Türksat Kablonet kampanya detayları yükleniyor. Lütfen bekleyin." />
        </Helmet>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Kampanya bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kampanya bulunamadıysa
  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet>
          <title>Kampanya Bulunamadı | Türksat Kablonet</title>
          <meta name="description" content="Aradığınız kampanya bulunamadı. Güncel kampanyalarımızı inceleyebilirsiniz." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
          <FaInfoCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kampanya Bulunamadı</h2>
          <p className="text-gray-600 mb-6">
            Aradığınız kampanya bulunamadı veya artık mevcut değil. Güncel kampanyalarımızı incelemek için aşağıdaki bağlantıyı kullanabilirsiniz.
          </p>
          <Link
            to="/kampanyalar"
            className="bg-blue-600 text-white px-6 py-2 rounded-md inline-flex items-center hover:bg-blue-700 transition"
          >
            Kampanyalara Dön <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={campaign.imgsrc || "/src/assets/aileboyu.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={campaign.imgsrc || "/src/assets/aileboyu.png"} />
        <link rel="canonical" href={`https://turksatkablonet.com/kampanyalar/${campaign.category}/${kampanyaSlug}`} />
        {campaign.popular === "true" && (
          <meta name="robots" content="index, follow" />
        )}
        {submitSuccess && (
          <meta name="robots" content="noindex, follow" />
        )}
      </Helmet>

      {/* Hero Banner */}
      <div className="relative mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-24 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2] text-white">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 overflow-hidden text-white">
          <svg className="absolute left-0 top-0 h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="1000" height="1000" fill="url(#pattern)" />
          </svg>
          <svg className="absolute right-0 bottom-0 w-2/3 max-w-3xl opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.4,-51.6C58.2,-39.9,67.7,-25,70.5,-8.6C73.4,7.9,69.6,25.9,58.9,36.6C48.3,47.4,30.8,50.9,14.2,54.9C-2.4,58.9,-18.1,63.4,-34.6,59.4C-51.1,55.4,-68.4,43,-70.9,28.3C-73.5,13.6,-61.3,-3.4,-51.6,-18.9C-42,-34.4,-35,-48.4,-24.5,-59.1C-14,-69.9,0,-77.4,14.1,-74.3C28.1,-71.1,42.1,-57.4,45.4,-51.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mobil görünümde resim üstte - desktop görünümde sağda */}
            <div className="flex justify-center md:hidden order-first mb-6">
              <img
                src={campaign.imgsrc || "/src/assets/aileboyu.png"}
                alt={campaign.kampanyaAdi}
                className="max-h-48 drop-shadow-xl object-contain"
              />
            </div>

            <div className="order-last md:order-first">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {getCategoryIcon(campaign.category)}
                <span className="text-xs sm:text-sm bg-blue-800 px-2 py-1 rounded-full">
                  {campaign.category === 'internet' ? 'Kablonet' :
                    campaign.category === 'tv' ? 'Kablo TV' :
                      campaign.category === 'combo' ? 'Kombo Paket' : 'Kampanya'}
                </span>
                {campaign.popular === "true" && (
                  <span className="text-xs sm:text-sm bg-green-500 px-2 py-1 rounded-full">
                    Popüler
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{campaign.kampanyaAdi}</h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6">{campaign.aciklama}</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Taahhüt Seçenekleri</h2>
                </div>

                {/* Taahhüt butonları - sadece ilgili fiyatlar varsa göster */}
                <div className="flex justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {campaign.taahut12Fiyat && (
                    <button
                      onClick={() => setSelectedTerm('12')}
                      className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                        selectedTerm === '12'
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-800/50 hover:bg-blue-800'
                      }`}
                    >
                      12 Ay
                    </button>
                  )}
                  {campaign.taahut24Fiyat && (
                    <button
                      onClick={() => setSelectedTerm('24')}
                      className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                        selectedTerm === '24'
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-800/50 hover:bg-blue-800'
                      }`}
                    >
                      24 Ay
                    </button>
                  )}
                  {!campaign.taahut12Fiyat && !campaign.taahut24Fiyat && (
                    <div className="text-white text-sm">Taahhüt bilgileri bulunmamaktadır.</div>
                  )}
                </div>

                {/* Aktif fiyat gösterimi */}
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-bold mr-1 text-white">
                    {selectedTerm === '12' ? campaign.taahut12Fiyat : campaign.taahut24Fiyat || "İletişime Geçin"}
                  </span>
                  {(campaign.taahut12Fiyat || campaign.taahut24Fiyat) && (
                    <span className="text-blue-100">/ay</span>
                  )}
                </div>

                {/* Alternatif taahhüt bilgisi - Her iki seçenek varsa göster */}
                {campaign.taahut12Fiyat && campaign.taahut24Fiyat && (
                  <div className="text-xs sm:text-sm text-blue-200 mt-2">
                    {selectedTerm === '12'
                      ? `24 Ay taahhüt seçeneği: ${campaign.taahut24Fiyat}/ay`
                      : `12 Ay taahüt seçeneği: ${campaign.taahut12Fiyat}/ay`
                    }
                  </div>
                )}
                
                {/* Tek seçenek varsa bilgilendirme */}
                {(campaign.taahut12Fiyat && !campaign.taahut24Fiyat) && (
                  <div className="text-xs sm:text-sm text-blue-200 mt-2">
                    Sadece 12 Ay taahütlü seçenek mevcuttur.
                  </div>
                )}
                
                {(!campaign.taahut12Fiyat && campaign.taahut24Fiyat) && (
                  <div className="text-xs sm:text-sm text-blue-200 mt-2">
                    Sadece 24 Ay taahütlü seçenek mevcuttur.
                  </div>
                )}
              </div>

              <button
                onClick={() => document.getElementById('basvuru-formu').scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-500 hover:bg-green-600 transition-colors text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-md inline-flex items-center w-full sm:w-auto justify-center sm:justify-start"
              >
                <FaArrowRight className="mr-2" />
                Hemen Başvur
              </button>
            </div>

            {/* Sadece desktop görünümünde sağda resim */}
            <div className="hidden md:flex justify-center">
              <img
                src={campaign.imgsrc || "/src/assets/aileboyu.png"}
                alt={campaign.kampanyaAdi}
                className="max-h-96 drop-shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Ana İçerik */}
          <div className="md:col-span-2">
            {/* Sekme Başlıkları */}
            <div className="bg-white rounded-t-xl shadow-md overflow-hidden mb-0">
              <div className="flex flex-wrap">
                <button
                  onClick={() => setActiveTab('ucretlendirme')}
                  className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors ${activeTab === 'ucretlendirme'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  <FaMoneyBillWave className="inline-block mr-2 mb-1" />
                  Ücretlendirme
                </button>
                <button
                  onClick={() => setActiveTab('detaylar')}
                  className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors ${activeTab === 'detaylar'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  <FaListAlt className="inline-block mr-2 mb-1" />
                  Detaylar
                </button>
                <button
                  onClick={() => setActiveTab('iletisim')}
                  className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors ${activeTab === 'iletisim'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  <FaPhoneVolume className="inline-block mr-2 mb-1" />
                  İletişim
                </button>
                <button
                  onClick={() => setActiveTab('cihazlar')}
                  className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors ${activeTab === 'cihazlar'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                  <FaLaptop className="inline-block mr-2 mb-1" />
                  Cihazlar
                </button>
              </div>
            </div>

            {/* Sekme İçerikleri */}
            <div className="bg-white rounded-b-xl shadow-md overflow-hidden mb-6 sm:mb-8">
              <div className="p-4 sm:p-6">
                {/* Ücretlendirme Sekmesi */}
                {activeTab === 'ucretlendirme' && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                      Kampanya Detayları
                    </h2>

                    <div className="overflow-x-auto mb-6">
                      {campaign.ucretlendirme ? (
                        <div dangerouslySetInnerHTML={{ __html: campaign.ucretlendirme }} />
                      ) : (
                        <div className="text-gray-600"></div>
                      )}
                    </div>

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Kampanya Notları</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {campaign.kampanyaNotlari ? (
                          campaign.kampanyaNotlari.map((not, index) => (
                            <li key={index}>{not}</li>
                          ))
                        ) : (
                          <>
                            <li>Fiyatlarımıza KDV ve ÖİV dahildir.</li>
                            <li>Taahhüt süresi kampanya başlangıç tarihinden itibaren başlar ve seçilen taahhüt süresi boyunca geçerlidir.</li>
                            <li>Taahhüt süresi dolmadan iptal durumunda kampanya bedeli tahsil edilir.</li>
                            <li>Aktivasyon ücreti ilk faturanıza yansıtılacaktır.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Detaylar Sekmesi */}
                {activeTab === 'detaylar' && (
                  <div>
                    {campaign.detaylarHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: campaign.detaylarHtml }} />
                    ) : (
                      <>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Kampanya Özellikleri</h2>

                        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                          {campaign.ozellikler && campaign.ozellikler.map((ozellik, index) => (
                            <li key={index} className="flex items-start">
                              <FaCheckCircle className="text-green-500 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                              <span className="text-gray-700 text-sm sm:text-base">{ozellik}</span>
                            </li>
                          ))}
                        </ul>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Kampanya Koşulları</h2>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                          <ul className="space-y-2 text-sm text-gray-700">
                            {campaign.kampanyaKosullari ? (
                              campaign.kampanyaKosullari.map((kosul, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-gray-500 font-bold mr-2">•</span>
                                  <span>{kosul}</span>
                                </li>
                              ))
                            ) : (
                              <>

                              </>
                            )}
                          </ul>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Kampanya Hakkında</h2>

                        <div className="prose max-w-none text-gray-700">
                          <p className="mb-4">
                            {campaign.kampanyaAdi} ile Türksat Kablo'nun sunduğu yüksek hız ve kaliteli hizmet avantajlarından faydalanabilirsiniz.
                            Bu özel kampanya kapsamında seçtiğiniz taahhüt süresine göre uygun fiyatlarla hizmetlerimizden yararlanabilirsiniz.
                          </p>

                          <p className="mb-4">
                            {campaign.category === 'internet' && "Kablonet ile kesintisiz ve yüksek hızda internet deneyimi yaşayın. Fiber altyapımız sayesinde daha stabil ve güvenilir bir bağlantıya sahip olun."}
                            {campaign.category === 'tv' && "Kablo TV ile yüzlerce kanal, dijital görüntü ve ses kalitesiyle evinizde. HD kanallar ve geniş içerik seçenekleriyle televizyon keyfini doyasıya yaşayın."}
                            {campaign.category === 'combo' && "Kombo paketlerimizle internet, televizyon ve telefon hizmetlerini tek pakette birleştirerek hem zamandan hem de bütçenizden tasarruf edin."}
                          </p>

                          {campaign.detayAciklama && <p className="mb-4">{campaign.detayAciklama}</p>}
                        </div>

                        {/* SSS */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-6">Sıkça Sorulan Sorular</h2>

                        <div className="space-y-4">
                          {campaign.faq ? (
                            campaign.faq.map((item, index) => (
                              <div key={index} className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.soru}</h3>
                                <p className="text-gray-700">{item.cevap}</p>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Bu kampanyadan kimler faydalanabilir?</h3>
                                <p className="text-gray-700">
                                  Bu kampanya, altyapımızın bulunduğu bölgelerdeki yeni müşterilerimiz için geçerlidir. Mevcut müşterilerimiz için farklı kampanyalarımız bulunmaktadır.
                                </p>
                              </div>

                              <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Taahüt süresi dolmadan iptal etmek istersem ne olur?</h3>
                                <p className="text-gray-700">
                                  Taahüt süresi dolmadan hizmeti iptal etmeniz durumunda, o ana kadar kampanyalı fiyat üzerinden sağlanan indirimler ve varsa kurulum ücretleri fatura edilir.
                                </p>
                              </div>

                              <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Kurulum ücreti var mı?</h3>
                                <p className="text-gray-700">
                                  Bu kampanyada kurulum ücreti bulunmamaktadır. Teknik ekibimiz ücretsiz olarak kurulum hizmeti sağlamaktadır.
                                </p>
                              </div>

                              <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Altyapı kontrolü nasıl yaparım?</h3>
                                <p className="text-gray-700">
                                  Adresinizde altyapı kontrolü yapmak için başvuru formunu doldurabilir veya müşteri hizmetlerimizi arayabilirsiniz. Ekiplerimiz en kısa sürede adresinizde kontrol yapacaktır.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* İletişim Sekmesi */}
                {activeTab === 'iletisim' && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h2>

                    <div className="grid md:grid-cols-1 gap-6 mb-8 items-center">
                      <div className="bg-blue-50 p-5 rounded-lg w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Müşteri Hizmetleri</h3>
                        <div className="space-y-2">
                          <p className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <a href="tel:08508066000">0850 806 60 00</a>
                          </p>
                          <p className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            Türksat Abone Merkezleri
                          </p>
                          <p className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1h-3v-1H8v1H5v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path>
                            </svg>
                            Türksat İl Müdürlükleri
                          </p>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          7 gün 24 saat hizmetinizdeyiz.
                        </p>
                      </div>
                    </div>

                    {/*<div className="bg-gray-50 p-5 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">En Yakın Bayi</h3>
                      <p className="text-gray-700 mb-4">
                        Size en yakın Türksat Bayi'yi bulmak için adresinizi girin veya haritadan seçin.
                      </p>
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Bayi Bul
                      </button>
                    </div>*/}
                  </div>
                )}

                {/* Cihazlar Sekmesi */}
                {activeTab === 'cihazlar' && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                      Cihaz Seçenekleri
                    </h2>

                    {campaign.cihazlarHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: campaign.cihazlarHtml }} />
                    ) : (
                      <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 bg-gray-50 flex justify-center">
                              <img src="/modem.png" alt="Modem" className="h-40 object-contain" />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800">Wi-Fi 6 Modem</h3>
                              <p className="text-gray-600 text-sm mt-1 mb-3">
                                Yüksek hız ve geniş kapsama alanı için ideal
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-600 font-bold">
                                  {campaign.modem1Fiyat || "60 TL/ay"}
                                </span>
                                <span className="text-xs text-gray-500">Kiralama</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 bg-gray-50 flex justify-center">
                              <img src="/modem-premium.png" alt="Premium Modem" className="h-40 object-contain" />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800">Premium Modem</h3>
                              <p className="text-gray-600 text-sm mt-1 mb-3">
                                Mesh teknolojisi ile kesintisiz internet deneyimi
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-600 font-bold">
                                  {campaign.modem2Fiyat || "90 TL/ay"}
                                </span>
                                <span className="text-xs text-gray-500">Kiralama</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-2 bg-gray-50 flex justify-center">
                              <img src="/tv-box.png" alt="TV Box" className="h-40 object-contain" />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800">TV Box</h3>
                              <p className="text-gray-600 text-sm mt-1 mb-3">
                                HD TV yayınları için set üstü kutu
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-600 font-bold">
                                  {campaign.tvBoxFiyat || "40 TL/ay"}
                                </span>
                                <span className="text-xs text-gray-500">Kiralama</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 bg-blue-50 p-5 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Cihaz Avantajları</h3>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              <span>Kiralanan cihazlar için teknik destek ücretsizdir.</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              <span>Arıza durumunda yenisi ile değişim yapılır.</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              <span>Teknolojik cihazlar ile daha stabil ve kesintisiz hizmet.</span>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Başvuru Formu - Sticky şekilde ayarlandı */}
          <div id="basvuru-formu" className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
              <div className="bg-blue-600 text-white p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold">Hemen Başvurun</h2>
                <p className="mt-2 text-blue-100 text-xs sm:text-sm">
                  Formu doldurun, müşteri temsilcimiz sizinle iletişime geçsin
                </p>
              </div>

              <div className="p-4 sm:p-6">
                {/* Başarı Mesajı */}
                {submitSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">
                          Başvurunuz başarıyla alınmıştır!
                        </p>
                        <p className="text-sm mt-1">
                          En kısa sürede sizinle iletişime geçeceğiz.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0555 123 4567"
                      className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      required
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white font-medium py-2 px-4 rounded-md transition-colors`}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Tamamla"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Hemen Arayın</p>
                  <a href="tel:08508066000" className="text-lg sm:text-xl font-bold text-blue-600 hover:underline">
                    0850 806 60 00
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kampanya Koşulları */}
        {/*<div className="bg-gray-100 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <FaRegFileAlt className="mr-2 text-gray-600" />
            Kampanya Koşulları
          </h3>
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Bu kampanya {selectedTerm} ay taahhüt karşılığında geçerlidir. Taahhüt süresi içinde iptal edilmesi durumunda verilen indirimler ve kurulum ücretleri aboneye faturalandırılır.
            </p>
            <p>
              Kampanya fiyatları {selectedTerm} aylık taahhüt süresi boyunca geçerli olup, taahhüt bitiminde güncel tarife fiyatları uygulanacaktır. Kampanyadan faydalanmak için altyapının bulunması ve hizmetin teknik olarak verilebilmesi gerekmektedir.
            </p>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default CampaignDetail;