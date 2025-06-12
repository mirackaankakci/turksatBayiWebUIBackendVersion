import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // react-helmet-async kullanmanızı öneririm
import { FaSearch, FaTv } from 'react-icons/fa';
import frekansListesi from '../helpers/kablotv_frekans_listesi_full.json';
import serit from "/assets/serit.png"; // Import serit image

const TvFrekans = () => {
  const [kanallar, setKanallar] = useState([]);
  const [filteredKanallar, setFilteredKanallar] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Sayfa başlığını dinamik olarak değiştirmek için useEffect ekleyelim
  useEffect(() => {
    let pageTitle = 'KabloTV HD Kanallar Frekans Listesi - Türksat Kablonet';
    let pageDescription = 'Türksat Kablo TV HD kanal frekans listesi';
    
    // Arama yapılıyorsa başlık ve açıklamayı güncelle
    if (searchTerm) {
      pageTitle = `${searchTerm} - KabloTV Kanal Frekans Bilgisi | Türksat Kablonet`;
      pageDescription = `Türksat Kablo TV ${searchTerm} kanalının frekans bilgileri ve teknik özellikleri. HD/SD frekans değerleri.`;
    }
    
    // Doğrudan document.title'ı güncelleyelim
    document.title = pageTitle;
  }, [searchTerm]);
  
  // Frekans verilerini JSON dosyasından yükle - sadece HD kanalları
  useEffect(() => {
    try {
      // Sadece HD kanallarını filtrele
      const hdKanallar = frekansListesi
        .filter(kanal => kanal.Tip === "HD")
        .map(kanal => ({
          id: kanal.No,
          kanal: kanal.Kanal,
          frekans: kanal.Dijital_Frekans || kanal["Dijital Frekans"] || "-",
          analogFrekans: kanal.Analog_Frekans || kanal["Analog Frekans"] || "-",
          tip: kanal.Tip,
          sid: kanal.No // SID bilgisi olmadığı için kanal numarası kullanılıyor
        }));
      
      setKanallar(hdKanallar);
      setFilteredKanallar(hdKanallar);
      setLoading(false);
    } catch (error) {
      console.error("Frekans verileri yüklenirken hata:", error);
      setLoading(false);
    }
  }, []);

  // Arama işlevi
  useEffect(() => {
    if (kanallar.length > 0) {
      if (searchTerm) {
        const filteredResults = kanallar.filter(
          kanal => kanal.kanal.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredKanallar(filteredResults);
      } else {
        setFilteredKanallar(kanallar);
      }
    }
  }, [searchTerm, kanallar]);

  // Arama işlevi
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          {searchTerm 
            ? `${searchTerm} - KabloTV Kanal Frekans Bilgisi | Türksat Kablonet` 
            : 'KabloTV HD Kanallar Frekans Listesi - Türksat Kablonet'}
        </title>
        <meta 
          name="description" 
          content={
            searchTerm 
              ? `Türksat Kablo TV ${searchTerm} kanalının frekans bilgileri ve teknik özellikleri. HD/SD frekans değerleri.`
              : 'Türksat Kablo TV HD kanal frekans listesi. Tüm HD kanallara ait dijital ve analog frekans bilgileri.'}
        />
        <meta 
          name="keywords" 
          content={
            searchTerm 
              ? `${searchTerm} frekans, kablo tv ${searchTerm}, türksat ${searchTerm}, hd kanal frekansları, kablonet frekans listesi`
              : 'kablo tv frekans listesi, hd kanal frekansları, türksat kablo tv, kablonet hd kanallar, dijital yayın frekansları'
          } 
        />
      </Helmet>

      {/* Standart Banner Section - Diğer sayfalarda kullanılan banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {searchTerm ? `"${searchTerm}" Kanal Frekansları` : 'KabloTV HD Kanallar Listesi'}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            {searchTerm 
              ? `Türksat Kablo TV'de "${searchTerm}" içeren kanalların frekans bilgilerine buradan ulaşabilirsiniz.` 
              : 'Türksat Kablo TV\'de yayın yapan tüm HD kanalların frekans bilgilerine buradan ulaşabilirsiniz.'}
          </p>
          
          <div className="bg-white rounded-lg flex items-center p-2 shadow-md max-w-2xl mx-auto mt-8">
            <FaSearch className="text-gray-400 ml-2" />
            <input
              type="text"
              className="w-full p-2 outline-none text-gray-700"
              placeholder="Kanal adı ile arama yapın..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* İçerik bölümü */}
      <div className="container mx-auto px-4 py-8 max-w-6xl -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-8 overflow-x-auto border-b border-gray-200">
            <div className="flex items-center">
              <div className="px-4 py-3 font-medium text-base border-b-2 border-blue-600 text-blue-600">
                <FaTv className="inline-block mr-2 mb-1" />
                HD Kanallar
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <>
              {filteredKanallar && filteredKanallar.length > 0 ? (
                <div className="overflow-x-auto bg-white">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100 text-left text-gray-600 text-sm">
                        <th className="py-3 px-4 font-medium">Kanal No</th>
                        <th className="py-3 px-4 font-medium">Kanal Adı</th>
                        <th className="py-3 px-4 font-medium">Dijital Frekans</th>
                        <th className="py-3 px-4 font-medium hidden md:table-cell">Analog Frekans</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKanallar.map((kanal) => (
                        <tr key={kanal.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4">{kanal.id}</td>
                          <td className="py-3 px-4 font-medium">{kanal.kanal}</td>
                          <td className="py-3 px-4">{kanal.frekans}</td>
                          <td className="py-3 px-4 hidden md:table-cell">{kanal.analogFrekans || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg text-center">
                  <p className="text-gray-500">Aranan kriterlere uygun kanal bulunamadı.</p>
                  <button 
                    className="mt-4 text-blue-600 hover:text-blue-800"
                    onClick={() => setSearchTerm('')}
                  >
                    Tüm HD kanalları göster
                  </button>
                </div>
              )}
            </>
          )}

          {/* Bilgi kartı */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">HD Kanal Frekans Bilgileri</h2>
            <p className="text-gray-600 mb-4">
              Bu sayfada belirtilen frekans bilgileri Türksat Kablo TV'de sunulan HD kanallar için geçerlidir. 
              HD kanalları izleyebilmek için HD özellikli bir televizyon veya alıcı cihazına sahip olmanız gerekmektedir.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">HD Yayınların Avantajları</h3>
                <p className="text-gray-600">
                  HD yayınlar, yüksek çözünürlükleri sayesinde daha net ve canlı görüntü kalitesi sunar. Genellikle 1080p veya 720p çözünürlükte yayın yapılır.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Kanal Arama</h3>
                <p className="text-gray-600">
                  HD kanalları izleyebilmek için televizyonunuzun ayarlar menüsünden otomatik kanal araması yapabilirsiniz. Tarama yaparken sinyal türünü DVB-C Digital olarak seçiniz.
                </p>
              </div>
            </div>
          </div>
      
          {/* SSS Bölümü */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sıkça Sorulan Sorular</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">HD kanalları izleyebilmek için ne gerekir?</h3>
                <p className="text-gray-600">
                  HD kanalları izleyebilmek için HD uyumlu bir televizyon veya alıcı kutu (set-top box) ve HD yayınları içeren bir KabloTV paketi gereklidir.
                  Ayrıca televizyonunuzun DVB-C uyumlu olması gerekir.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">HD kanallar nasıl ayarlanır?</h3>
                <p className="text-gray-600">
                  HD kanalları ayarlamak için TV menüsünden kanal araması yapmanız gerekir. Genellikle Dijital Kanal Arama veya Otomatik Kanal Arama seçeneğini bularak, 
                  yayın türünü Kablo (DVB-C) olarak seçmeniz yeterlidir. 256 QAM ve 6875 sembol oranı değerlerini kullanabilirsiniz.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">HD ve SD kanal arasındaki fark nedir?</h3>
                <p className="text-gray-600">
                  HD kanallar (High Definition), SD (Standard Definition) kanallara göre çok daha yüksek çözünürlüğe sahiptir. HD kanallar genellikle 1280x720 veya 1920x1080 piksel 
                  çözünürlükte yayın yaparken, SD kanallar 720x576 piksel çözünürlüktedir. HD yayınlar daha net, detaylı ve canlı görüntü kalitesi sunar.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Frekans değerlerini nerede kullanırım?</h3>
                <p className="text-gray-600">
                  Frekans değerleri, televizyonunuzun manuel kanal arama bölümünde kullanılır. Eğer otomatik arama ile tüm kanalları bulamadıysanız, 
                  bu frekans değerlerini kullanarak manuel olarak kanalları ekleyebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvFrekans;