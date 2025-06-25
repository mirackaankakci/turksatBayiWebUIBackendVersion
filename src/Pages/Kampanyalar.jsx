import React, { useState, useEffect } from 'react';
import { FaWifi, FaVideoSlash, FaPhoneAlt, FaTv, FaSearch, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampaignCards from '../components/HomePageComponents/CampaignCards';
import { CampaignData } from '../helpers/CampaingData';
import serit from "/assets/serit.png";
import { Helmet } from 'react-helmet-async';

const Kampanyalar = () => {
  // URL parametrelerini almak için useParams kullanıyoruz
  const { kategori } = useParams();
  const navigate = useNavigate();

  // URL'deki kategori parametresine göre başlangıç filtresi belirliyoruz
  const getInitialFilter = () => {
    if (!kategori) return 'all';

    switch (kategori.toLowerCase()) {
      case 'kablonet':
        return 'internet';
      case 'kablotv':
        return 'tv';
      case 'kabloses':
        return 'phone';
      case 'mevcutmusteri':
        return 'mevcutmusteri';
      default:
        return 'all';
    }
  };

  const [activeFilter, setActiveFilter] = useState(getInitialFilter());
  const [searchQuery, setSearchQuery] = useState('');

  // Kategori değiştiğinde URL'yi güncelle
  useEffect(() => {
    // URL parametresini belirle
    let urlPath = '';
    switch (activeFilter) {
      case 'internet':
        urlPath = '/kampanyalar/kablonet';
        break;
      case 'tv':
        urlPath = '/kampanyalar/kablotv';
        break;
      case 'phone':
        urlPath = '/kampanyalar/kabloses';
        break;
      case 'mevcutmusteri':
        urlPath = '/kampanyalar/mevcutmusteri';
        break;
      default:
        urlPath = '/kampanyalar';
    }

    // Sadece kategori değiştiğinde URL'yi güncelle
    if (
      (kategori === 'kablonet' && activeFilter !== 'internet') ||
      (kategori === 'kablotv' && activeFilter !== 'tv') ||
      (kategori === 'kabloses' && activeFilter !== 'phone') ||
      (kategori === 'mevcutmusteri' && activeFilter !== 'mevcutmusteri') ||
      (!kategori && activeFilter !== 'all') ||
      (kategori && activeFilter === 'all')
    ) {
      navigate(urlPath, { replace: true });
    }
  }, [activeFilter, kategori, navigate]);

  // Kategori filtresini ve URL'yi güncelle
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const kampanyalar = CampaignData;

  // Filtreleme fonksiyonu
  const filteredKampanyalar = kampanyalar.filter(kampanya => {
    // Kategori filtresi
    const categoryMatch = activeFilter === 'all' || kampanya.category === activeFilter;

    // Arama filtresi
    const searchMatch =
      kampanya.kampanyaAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kampanya.aciklama.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Kategori ikonlarını belirleme
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'internet':
        return <FaWifi />;
      case 'tv':
        return <FaTv />;
      case 'phone':
        return <FaPhoneAlt />;
      case 'mevcutmusteri':
        return <FaVideoSlash />;
      default:
        return <FaWifi />;
    }
  };

  // Add this new useEffect to update the document title when activeFilter changes
  useEffect(() => {
    let pageTitle = '';
    
    switch(activeFilter) {
      case 'all':
        pageTitle = 'Türksat Kablonet Kampanyaları';
        break;
      case 'internet':
        pageTitle = 'Türksat Kablonet İnternet Kampanyaları';
        break;
      case 'tv':
        pageTitle = 'Türksat Kablo TV Kampanyaları';
        break;
      case 'phone':
        pageTitle = 'Türksat Kabloses Telefon Kampanyaları';
        break;
      case 'mevcutmusteri':
        pageTitle = 'Türksat Mevcut Müşteri Kampanyaları';
        break;
      default:
        pageTitle = 'Türksat Kablonet Kampanyaları';
    }
    
    // Directly update document title
    document.title = pageTitle;
  }, [activeFilter]);

  // URL değiştiğinde activeFilter'ı güncelle
  useEffect(() => {
    const newFilter = getInitialFilter();
    if (newFilter !== activeFilter) {
      setActiveFilter(newFilter);
    }
  }, [kategori]);

  // Ayrı bir useEffect ile URL'yi güncelle
  useEffect(() => {
    // URL parametresini belirle
    let urlPath = '';
    switch (activeFilter) {
      case 'internet':
        urlPath = '/kampanyalar/kablonet';
        break;
      case 'tv':
        urlPath = '/kampanyalar/kablotv';
        break;
      case 'phone':
        urlPath = '/kampanyalar/kabloses';
        break;
      case 'mevcutmusteri':
        urlPath = '/kampanyalar/mevcutmusteri';
        break;
      default:
        urlPath = '/kampanyalar';
    }
    
    // Mevcut URL ile hedef URL farklıysa güncelle
    if (location.pathname !== urlPath) {
      navigate(urlPath, { replace: true });
    }
  }, [activeFilter, navigate, location.pathname]);

  return (
    <div className="relative min-h-screen bg-gray-50 ">
      <Helmet>
        <title>
          {activeFilter === 'all' ? 'Türksat Kablonet Kampanyaları - Türksat Kablonet ® Web Sitesi' :
            activeFilter === 'internet' ? 'Türksat Kablonet İnternet Kampanyaları - Türksat Kablonet ® Web Sitesi' :
              activeFilter === 'tv' ? 'Türksat Kablo TV Kampanyaları - Türksat Kablonet ® Web Sitesi' :
                activeFilter === 'phone' ? 'Türksat Kabloses Telefon Kampanyaları - Türksat Kablonet ® Web Sitesi' :
                  'Türksat Mevcut Müşteri Kampanyaları - Türksat Kablonet ® Web Sitesi'}
        </title>
        <meta
          name="description"
          content={
            activeFilter === 'all' ? 'Türksat Kablonet kampanyaları. Fiber internet, kablo TV ve telefon hizmetlerinde özel indirimler ve avantajlı paketler.' :
              activeFilter === 'internet' ? 'Türksat Kablonet internet kampanyaları. Hızlı fiber internet paketlerinde cazip fiyatlar ve özel fırsatlar.' :
                activeFilter === 'tv' ? 'Türksat Kablo TV kampanyaları. HD ve 4K kalitesinde TV yayınları, film ve dizi paketlerinde özel indirimler.' :
                  activeFilter === 'phone' ? 'Türksat Kabloses telefon kampanyaları. Uygun fiyatlı sabit telefon hizmetleri ve tarifeler.' :
                    'Türksat mevcut müşterilere özel kampanyalar. Güncel yükseltme fırsatları ve sadakat indirimleri.'
          }
        />
      </Helmet>
      {/* Hero Banner */}
      <div className="relative mx-auto w-full h-[300px] pt-[70px] items-center sm:h-[350px] md:h-[400px] lg:h-[400px]  bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="container mx-auto max-w-6xl items-center text-center mt-[70px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {activeFilter === 'all' ? 'Tüm Kampanyalar' :
              activeFilter === 'internet' ? 'Kablonet Kampanyaları' :
                activeFilter === 'tv' ? 'Kablo TV Kampanyaları' :
                  activeFilter === 'phone' ? 'Kabloses Kampanyaları' :
                    'Mevcut Müşteri Kampanyaları'}
          </h1>
          <p className="text-xl text-blue-100 max-w-full">
            Size özel hazırlanmış internet, TV ve telefon kampanyalarımızı keşfedin.
            Birbirinden avantajlı fırsatları kaçırmayın!
          </p>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 -mt-5 sm:-mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-md transition ${activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Tüm Kampanyalar
              </button>
              <button
                onClick={() => handleFilterChange('internet')}
                className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${activeFilter === 'internet'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                <FaWifi /> Kablonet
              </button>
              <button
                onClick={() => handleFilterChange('tv')}
                className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${activeFilter === 'tv'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                <FaTv /> Kablo TV
              </button>
              <button
                onClick={() => handleFilterChange('phone')}
                className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${activeFilter === 'phone'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                <FaPhoneAlt /> Kabloses
              </button>
              <button
                onClick={() => handleFilterChange('mevcutmusteri')}
                className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${activeFilter === 'mevcutmusteri'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                <FaVideoSlash /> Mevcut Müşteri
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Kampanya ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Kampanyalar - CampaignCards kullanarak - Boşluk eklendi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-32 mb-12 pt-20">
          {filteredKampanyalar.map((kampanya, index) => (
            <div key={index} className="relative">
              <CampaignCards
                campaign={kampanya}
                index={index} // Index prop'unu ekliyoruz
              />
            </div>
          ))}
        </div>

        {filteredKampanyalar.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sonuç Bulunamadı</h3>
            <p className="text-gray-600">
              Arama kriterlerinize uygun kampanya bulunamadı. Lütfen filtrelerinizi değiştirin veya tüm kampanyaları görüntüleyin.
            </p>
            <button
              onClick={() => { handleFilterChange('all'); setSearchQuery(''); }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-[#2F3D8D] transition"
            >
              Tüm Kampanyaları Göster
            </button>
          </div>
        )}
      </div>

      {/* SSS */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sık Sorulan Sorular</h2>

          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Kampanyalardan nasıl yararlanabilirim?</h3>
              <p className="text-gray-600">
                Kampanyalarımızdan yararlanmak için web sitemizden başvuru yapabilir, 0850 XXX XX XX numaralı müşteri hizmetlerimizi arayabilir veya size en yakın bayimizi ziyaret edebilirsiniz.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Kampanyalar hangi bölgelerde geçerli?</h3>
              <p className="text-gray-600">
                Kampanyalarımız altyapımızın bulunduğu tüm il ve ilçelerde geçerlidir. Adresinizde altyapı kontrolü yapmak için "Hemen Başvur" butonunu kullanabilirsiniz.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Taahhüt süreleri nedir?</h3>
              <p className="text-gray-600">
                Kampanyalarımız genellikle 12 veya 24 ay taahhütlü olarak sunulmaktadır. Ayrıca bazı kampanyalarda taahhütsüz seçenekler de bulunmaktadır.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/sikca-sorulan-sorular" className="text-blue-600 font-medium hover:text-blue-800 transition inline-flex items-center">
              Tüm Soruları Görüntüle <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Bölümü */}
      <div className="bg-gradient-to-b from-[#2F3D8D] to-[#3399D2] py-12">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4  text-blue-100">Hemen Başvurun, Size Uygun Kampanyayı Bulalım</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Adresinize özel kampanyalarımızı öğrenmek için başvuru formunu doldurun, müşteri temsilcimiz en kısa sürede size ulaşsın.
          </p>
          <Link
            to="/hemenbasvur"
            className="bg-white text-[#2F3D8D] px-8 py-3 rounded-md font-bold text-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center"
          >
            Hemen Başvur <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Kampanyalar;