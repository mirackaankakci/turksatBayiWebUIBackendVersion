import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaInfoCircle, FaChevronDown, FaChevronRight, FaTv, FaFilm, FaRunning, FaGlobe } from 'react-icons/fa';
import serit from '/assets/serit.png';
import modemBannerLogo from '/assets/database.png';

const TvPackets = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedPacket, setExpandedPacket] = useState(null);

  // Bir paket detayını genişlet/daralt
  const togglePacketDetails = (packetId) => {
    setExpandedPacket(expandedPacket === packetId ? null : packetId);
  };

  // Ana TV paketleri
  const tvPackets = [
    {
      id: 1,
      name: "Analog Kablo TV",
      icon: <FaTv className="text-blue-600" size={24} />,
      price: "100.00",
      category: "temel",
      description: "Türksat Kablo TV altyapısı ile onlarca kanal seçeneği. Ek bir cihaza ihtiyaç duymadan analog yayınları izleyin.",
      features: [
        "Kablo TV Analog Yayınlar",
        "Ulusal Kanallar",
        "National Geographic",
        "20+ Kanal Seçeneği"
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Analog Kablo TV, ek cihaza gerek olmadan sadece anten kablosu ile televizyonunuza bağlanarak kesintisiz yayın imkanı sunar. Ancak daha fazla kanal ve HD kalitesinde yayın izlemek isteyenler için Dijital Kablo TV platformunda Giriş, Temel ve Üst Paket seçenekleri mevcuttur. Bu paketlerde altyazı ve seslendirme gibi ekstra özellikler de yer alır.
      Analog Kablo TV ile onlarca kanala erişebilirsiniz. Dilerseniz uygun fiyatlı kampanyalarla Temel Pakete geçiş yapabilir, Kablonet + Kablo TV aboneliklerinde özel indirimlerden faydalanabilirsiniz. Detaylar için Kampanyalar sayfamızı ziyaret edebilirsiniz.
      Unutmayın, Analog yayınlar düşük kaliteli olup kararma ve sinyal sorunlarına açıktır. Günümüzde yerini Dijital Kablo TV'ye bırakmaktadır. Siz de daha kaliteli yayın deneyimi için dijital paketleri tercih edebilirsiniz.`
    },
    {
      id: 2,
      name: "Giriş Paketi",
      icon: <FaTv className="text-blue-600" size={24} />,
      price: "70.00",
      category: "tarifeler",
      description: "Kablo TV Giriş Paketi ile Yüzlerce kanal seçeneği. Kablo TV dijital yayınları HD kalitesinde izleyin.",
      features: [
        "Yüksek Çözünürlüklü Yayın Kalites",
        "4K Yayın Seçeneği",
        "Ulusal Kanallar",
        "Yerel Kanallar",
        "Belgesel Kanalları",
        "Yabancı Haber Kanalları",
        "Müzik Kanalları"
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Kablo TV Giriş Paketi ile yüzlerce kanal ve içerik sizi bekliyor. Üstelik KabloWeb TV üyeliğiyle internet olan her yerden Giriş Paket kapsamındaki kanalları ücretsiz izleyebilirsiniz.

Daha fazla kanal ve içerik isteyenler için Temel Paket, kampanyalarla çok daha uygun fiyatlarla sunuluyor. Detaylı bilgi ve avantajlı fiyatlar için KabloTV Kampanyaları sayfamızı ziyaret edin.

Giriş Paketi, temel televizyon yayınlarını uygun fiyatla izlemek isteyenler için ideal bir seçenektir. Popüler kanallar, haber ve tematik içerikler bu pakette yer alır. Kablonet + Kablo TV kampanyalarıyla hem fiber internet hem TV hizmetini birlikte alarak tasarruf edebilirsiniz.`
    },
    {
      id: 3,
      name: "Temel Paket",
      icon: <FaTv className="text-blue-600" size={24} />,
      price: "80.00",
      category: "tarifeler",
      description: "Yüzlerce kanal seçeneği. Kablo TV dijital yayınları HD kalitesinde izleyin.",
      features: [
        "Yüksek Çözünürlüklü Yayın Kalitesi",
        "Çocuk & Eğitim Kanalları",
        "Spor Kanalları",
        "Ulusal Kanallar",
        "Yerel Kanallar",
        "Belgesel Kanalları",
        "Yabancı Haber Kanalları",
        "Müzik Kanalları"
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Kablo TV Temel Paket ile popüler kanallar, haber, çocuk ve tematik içerikler sizi bekliyor. Üstelik KabloWeb TV üyeliği sayesinde internetin olduğu her yerden Temel Paket kapsamındaki kanalları ücretsiz izleyebilirsiniz.

Kablonet + Kablo TV kampanyalarıyla Temel Paket’e çok daha uygun fiyatlarla abone olabilir, hem fiber internet hem televizyon ihtiyacınızı ekonomik şekilde karşılayabilirsiniz. Güncel fırsatlar için KabloTV Kampanyaları sayfamızı inceleyin.

Temel Paket, geniş kanal içeriğiyle ailece TV keyfi yaşamak isteyenler için ideal bir tercihtir. Sözleşmesiz fiyatlarla da sunulan bu paketi kampanyalı şekilde satın alarak ekstra avantajlardan yararlanabilirsiniz.`
    },
    {
      id: 4,
      name: "Üst Paket",
      icon: <FaTv className="text-blue-600" size={24} />,
      price: "90.00",
      category: "tarifeler",
      description: "Üst paket kanalları ile Tv keyfinizi artırın!",
      features: [
        "Yüksek Çözünürlüklü Yayın Kalitesi",
        "4K/UHD Yayın Seçeneği",
        "Spor Kanalları",
        "Ulusal Kanallar",
        "Yerel Kanallar",
        "Belgesel Kanalları",
        "Yabancı Haber Kanalları",
        "Müzik Kanalları"
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Kablo TV Üst Paket ile Temel Paket’e ek onlarca belgesel, eğlence, spor ve yabancı dil kanalı evinize geliyor. Üstelik KabloWeb TV sayesinde internet olan her yerden Üst Paket kapsamındaki kanalları ücretsiz izleyebilirsiniz.

Kablonet + Kablo TV kampanyaları ile Üst Paket’e çok daha uygun fiyatlarla abone olabilir, hem fiber internet hem de zengin TV içeriğine tek pakette sahip olabilirsiniz. Tüm fırsatlar için KabloTV Kampanyaları sayfamızı ziyaret edin.

Üst Paket, daha fazla tematik ve özel kanal arayan kullanıcılar için ideal bir seçenektir. Sözleşmesiz seçeneklerle de sunulan bu paketi kampanyalı fiyatlarla tercih ederek tasarruf sağlayabilirsiniz.`
    },
    {
      id: 5,
      name: "Gümüş Sinema Paketi",
      icon: <FaFilm className="text-blue-600" size={24} />,
      price: "55.00",
      category: "sinema",
      description: "Evinizin konforunda sinema keyfi. Gümüş Sinema Paketi ile en yeni filmler ve diziler sizlerle.",
      features: [
        "6 Farklı Sinema Kanalı",
        "4K/UHD HD Yayın Kalitesi",
        "Seçkin Filmler",
        "Eviniz Konforunda Sinema Keyfi",
        "Yerli Film İçerikleri",
        "Yabancı Film İçerikleri",
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Kablo TV Gümüş Sinema Paketi ile evinizde 7/24 reklamsız film keyfi sizi bekliyor. Yerli ve yabancı sinema kanalları, özel belgeseller ve daha fazlası bu pakette. Daha geniş film arşivi isteyenler için Altın Sinema Paketi de mevcut.

Ayrıca, pakete özel Kablo Web TV erişimiyle, Üst Paket'teki birçok kanalı internetin olduğu her yerden ücretsiz izleyebilirsiniz.

Kablonet + Kablo TV kampanyalarıyla Gümüş Sinema Paketi’ni çok daha uygun fiyata alabilir, hem fiber internet hem de televizyon ihtiyaçlarınızı tek pakette karşılayabilirsiniz. En güncel kampanyalar ve fiyatlar için KabloTV Kampanyaları sayfamızı ziyaret edin.

`
    },
    {
      id: 6,
      name: "Altın Sinema Paketi",
      icon: <FaFilm className="text-blue-600" size={24} />,
      price: "65.00",
      category: "sinema",
      description: "Seçişi filmleri ve dizileri kaçırmayın. Altın Sinema Paketi ile en yeni filmler ve diziler sizlerle.",
      features: [
        "12 HD Sinema Kanalı",
        "4K / HD Yayın Kalitesi",
        "Güncel & Vizyon Filmleri",
        "Yerli Film İçerikleri",
        "Yabancı Film İçerikleri",
        "Eviniz Konforunda Sinema Keyfi",
      ],
      highlight: false,
      color: "blue",
      detail: `Türksat Kablo TV Altın Sinema Paketi ile 7/24 reklamsız film ve dizi keyfi evinizde! Yerli-yabancı filmler, premium sinema kanalları, aksiyon, aile ve dizi içerikleri bu pakette. Üstelik KabloWeb TV sayesinde internetin olduğu her yerden Üst Paket kanallarını da ücretsiz izleyebilirsiniz.
Gümüş Sinema Paketi’nden daha geniş içeriğe sahip Altın Sinema Paketi, sinema tutkunları için ideal. Bazı kampanyalarda ilk ay ücretsiz izleme fırsatı da sizi bekliyor!
Kablonet + Kablo TV kampanyalarıyla Altın Sinema Paketine çok daha uygun fiyatlarla abone olabilir, hem fiber internet hem de sinema dolu TV keyfini bir arada yaşayabilirsiniz. Detaylar için KabloTV Kampanyaları sayfamıza göz atın.
`
    }
  ];

  // Görüntülenen paketleri filtrele
  const filteredPackets = activeCategory === 'all'
    ? tvPackets
    : tvPackets.filter(packet => {
      // Her paketin kendi category özelliği olmalı
      return packet.category === activeCategory;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Daha Sade Banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className='flex justify-between items-center h-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className="text-white max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">Kablo TV Paketleri</h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">İhtiyacınıza en uygun paketi seçin</p>
          </div>

          <div className="ml-4">
            <img
              src={modemBannerLogo}
              alt="Modem Banner Logo"
              className="h-[80px] sm:h-[100px] md:h-[140px] w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Basit Kategori Butonları */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-md transition ${activeCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
          >
            Tüm Paketler
          </button>
          <button
            onClick={() => setActiveCategory('temel')}
            className={`px-4 py-2 rounded-md transition ${activeCategory === 'temel'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
          >
            Temel Paket
          </button>
          <button
            onClick={() => setActiveCategory('tarifeler')}
            className={`px-4 py-2 rounded-md transition ${activeCategory === 'tarifeler'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
          >
            Tarifeler
          </button>
          <button
            onClick={() => setActiveCategory('sinema')}
            className={`px-4 py-2 rounded-md transition ${activeCategory === 'sinema'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
          >
            Sinema Paketleri
          </button>
          <button
            onClick={() => setActiveCategory('ekpaket')}
            className={`px-4 py-2 rounded-md transition ${activeCategory === 'ekpaket'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
          >
            Ek Paketler
          </button>

        </div>
      </div>

      {/* Paket Kartları - Eşit Yükseklikte ve Alt Kısım Her Zaman Altta */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackets.map((packet) => (
            <div
              key={packet.id}
              className={`bg-white rounded-lg overflow-hidden shadow transition-shadow hover:shadow-lg ${
                packet.highlight ? `border-2 border-${packet.color}-500` : 'border border-gray-200'
              } flex flex-col h-full`} // Flex-col ve h-full ekledik
            >
              {/* Paket Başlık ve İkon */}
              <div className={`bg-${packet.color}-50 p-6 flex items-center justify-between border-b border-gray-100`}>
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-${packet.color}-100 mr-3`}>
                    {packet.icon}
                  </div>
                  <h3 className={`text-xl font-bold text-${packet.color}-700`}>{packet.name}</h3>
                </div>
                {packet.highlight && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">Önerilen</span>
                )}
              </div>

              {/* Paket İçeriği - Esnek Büyür (flex-grow) */}
              <div className="p-6 flex-grow flex flex-col"> {/* flex-grow ve flex-col ekledik */}
                <p className="text-gray-600 mb-4">{packet.description}</p>

                {/* Özellikler */}
                <div className="mb-6 flex-grow"> {/* flex-grow ekledik */}
                  <ul className="space-y-2">
                    {packet.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className={`text-${packet.color}-500 mt-1 mr-2 flex-shrink-0`} size={14} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detay Açıklama - Genişletildiğinde Görünür */}
                {expandedPacket === packet.id && (
                  <div className={`mb-4 border-t border-${packet.color}-100 pt-4`}>
                    <div className={`bg-${packet.color}-50 p-3 rounded-md text-sm text-${packet.color}-800`}>
                      <p className="mb-2">
                        <FaInfoCircle className="inline-block mr-1" /> {packet.detail}
                      </p>
                    </div>
                  </div>
                )}

                {/* Fiyat ve Başvuru - Her zaman alt kısımda */}
                <div className="pt-4 border-t border-gray-100 flex flex-col mt-auto"> {/* mt-auto ekledik */}
                  <div className="flex justify-center items-baseline mb-4">
                    <span className={`text-2xl font-bold text-${packet.color}-600`}>{packet.price}</span>
                    <span className="text-gray-500 ml-1">TL/Ay</span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/hemenbasvur"
                      className={`bg-${packet.color}-600 text-white text-center font-medium px-4 py-3 rounded-md hover:bg-${packet.color}-700 transition`}
                    >
                      Hemen Başvur
                    </Link>

                    <button
                      onClick={() => togglePacketDetails(packet.id)}
                      className={`text-${packet.color}-600 hover:text-${packet.color}-800 text-sm text-center font-medium flex items-center justify-center`}
                    >
                      Detaylar{' '}
                      <FaChevronDown
                        className={`ml-1 transition-transform ${expandedPacket === packet.id ? 'transform rotate-180' : ''}`}
                        size={12}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basit Bilgi Kartları */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Kablo TV Avantajları</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <FaTv className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">HD Kalitesinde İzleme</h3>
              <p className="text-gray-600">
                Kristal netliğinde görüntü, sinema kalitesinde ses ile evinizde premium izleme deneyimi.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <FaFilm className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Özel İçerikler</h3>
              <p className="text-gray-600">
                Tematik paketler ve özel kanallarla ilgi alanınıza yönelik içeriklere erişim imkanı.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <FaGlobe className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Kesintisiz Yayın</h3>
              <p className="text-gray-600">
                Hava koşullarından etkilenmeyen altyapımız sayesinde kesintisiz TV yayını.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Basit CTA Bölümü */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Size Özel Paketi Keşfedin</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Adresinize özel kampanyalarımızı öğrenmek için hemen başvurun.
          </p>
          <Link
            to="/hemenbasvur"
            className="bg-white text-blue-700 px-8 py-3 rounded-md font-bold inline-flex items-center hover:bg-blue-50 transition"
          >
            Hemen Başvur <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TvPackets;

