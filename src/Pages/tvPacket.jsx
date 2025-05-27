import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaInfoCircle, FaSearch, FaChevronDown, FaChevronRight, FaTv, FaClock, FaFilm, FaRunning, FaGlobe } from 'react-icons/fa';
import serit from '../assets/serit.png';

const TvPackets = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedPacket, setSelectedPacket] = useState(null);

  // Bir kanal paketinin detaylarını göster/gizle
  const togglePacketDetails = (packetId) => {
    setSelectedPacket(selectedPacket === packetId ? null : packetId);
  };

  // Bir SSS öğesini genişlet/daralt
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Tüm TV paketleri
  const tvPackets = [
    {
      id: 1,
      name: "Temel Paket",
      category: "temel",
      price: "29.99",
      channels: 80,
      hdChannels: 12,
      popular: true,
      highlighted: false,
      description: "Ailenin her bireyi için en popüler kanalların yer aldığı ekonomik paket.",
      features: [
        "80+ kanal",
        "12+ HD kanal",
        "Türkçe dublajlı filmler",
        "Çocuk kanalları",
        "Haber kanalları"
      ],
      icon: <FaTv className="text-blue-600" size={24} />,
      channelList: [
        "TRT 1 HD", "Show TV HD", "ATV HD", "Fox TV HD", "Kanal D HD", 
        "Star TV HD", "TRT Haber HD", "NTV", "CNN Türk", "Haber Türk",
        "TRT Çocuk", "Cartoon Network", "Disney Channel", "TLC", "DMAX",
        "24 Kitchen", "Discovery Channel", "National Geographic"
      ]
    },
    {
      id: 2,
      name: "Üst Paket",
      category: "ust",
      price: "49.99",
      channels: 120,
      hdChannels: 25,
      popular: true,
      highlighted: true,
      description: "Film, dizi ve belgesel tutkunları için zengin kanal çeşitliliği sunan üst paket.",
      features: [
        "120+ kanal",
        "25+ HD kanal",
        "Sinema kanalları",
        "Temel Paket kanalları",
        "Belgesel kanalları",
        "Müzik kanalları",
        "Dizi kanalları"
      ],
      icon: <FaFilm className="text-blue-600" size={24} />,
      channelList: [
        "Tüm Temel Paket Kanalları", "Sinema TV", "Sinema TV 2", "Sinema Aksiyon HD",
        "FX HD", "Fox Crime HD", "BBC Earth HD", "Discovery Science HD", 
        "Investigation Discovery", "History Channel HD", "Da Vinci Learning",
        "MTV HD", "VH1", "MCM Top", "FightBox HD", "Fast&Fun Box HD",
        "Docubox HD", "Fashion Box HD", "360 TuneBox"
      ]
    },
    {
      id: 3,
      name: "Gümüş Sinema Paketi",
      category: "sinema",
      price: "19.99",
      channels: 6,
      hdChannels: 6,
      popular: false,
      highlighted: false,
      description: "Hollywood'un en yeni filmlerini ve ödüllü yapımları izleyebileceğiniz sinema paketi.",
      features: [
        "6 özel sinema kanalı",
        "Tamamı HD yayın",
        "Hollywood filmleri",
        "Ödüllü filmler",
        "Aksiyon ve macera"
      ],
      icon: <FaFilm className="text-blue-600" size={24} />,
      channelList: [
        "Movie Smart Premium HD", "Movie Smart Platin HD", "Movie Smart Gold HD", 
        "Movie Smart Türk HD", "Movie Smart Classic HD", "Movie Smart Action HD"
      ]
    },
    {
      id: 4,
      name: "Altın Sinema Paketi",
      category: "sinema",
      price: "29.99",
      channels: 10,
      hdChannels: 10,
      popular: false,
      highlighted: false,
      description: "Film tutkunları için genişletilmiş sinema paketi. Tüm film kategorilerinde özel kanallar.",
      features: [
        "10 özel sinema kanalı",
        "Tamamı HD yayın",
        "Gümüş Sinema Paketi kanalları",
        "Özel festival filmleri",
        "Aile filmleri",
        "Komedi filmleri"
      ],
      icon: <FaFilm className="text-blue-600" size={24} />,
      channelList: [
        "Tüm Gümüş Sinema Paketi Kanalları", "Movie Smart Fest HD", "Movie Smart Family HD",
        "Movie Smart Comedy HD", "Movie Smart Premium 2 HD"
      ]
    },
    {
      id: 5,
      name: "Spor Plus Paketi",
      category: "spor",
      price: "39.99",
      channels: 8,
      hdChannels: 8,
      popular: false,
      highlighted: false,
      description: "Spor tutkunları için özel tasarlanmış paket. Maç, tenis, motor sporları, ekstrem sporlar ve daha fazlası.",
      features: [
        "8 özel spor kanalı",
        "Tamamı HD yayın",
        "Canlı maçlar",
        "Motor sporları",
        "Ekstrem sporlar",
        "Su sporları"
      ],
      icon: <FaRunning className="text-blue-600" size={24} />,
      channelList: [
        "S Sport HD", "S Sport 2 HD", "Eurosport 1 HD", "Eurosport 2 HD",
        "NBA TV HD", "Edge Sport HD", "Extreme Sports Channel HD", "Trace Sport Stars HD"
      ]
    },
    {
      id: 6,
      name: "Belgesel Max Paketi",
      category: "belgesel",
      price: "19.99",
      channels: 8,
      hdChannels: 8,
      popular: false,
      highlighted: false,
      description: "Doğa, tarih, bilim ve teknoloji meraklıları için özel belgesel paketi.",
      features: [
        "8 özel belgesel kanalı",
        "Tamamı HD yayın",
        "Doğa belgeselleri",
        "Tarih belgeselleri",
        "Bilim ve teknoloji",
        "Premium içerikler"
      ],
      icon: <FaGlobe className="text-blue-600" size={24} />,
      channelList: [
        "National Geographic Wild HD", "Nat Geo People HD", "Discovery Science HD", 
        "Discovery Showcase HD", "Animal Planet HD", "History HD",
        "BBC Earth HD", "Viasat History HD"
      ]
    }
  ];

  // Görüntülenen paketleri filtrele
  const filteredPackets = tvPackets.filter(packet => {
    // Kategori filtresi
    const categoryMatch = activeCategory === 'all' || packet.category === activeCategory;
    
    // Arama filtresi
    const searchMatch = packet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       packet.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // SSS verileri
  const faqItems = [
    {
      question: "Kablo TV hizmeti hangi illerde geçerlidir?",
      answer: "Kablo TV hizmetimiz, altyapımızın bulunduğu 23 ilde geçerlidir. Bu illerin listesine web sitemizden ulaşabilir veya müşteri hizmetlerini arayarak adresinizde altyapı olup olmadığını öğrenebilirsiniz."
    },
    {
      question: "Kablo TV paketlerimi nasıl değiştirebilirim?",
      answer: "Mevcut paketinizi değiştirmek için web sitemizdeki Online İşlemler menüsünden, 0850 XXX XX XX numaralı müşteri hizmetlerimizi arayarak veya size en yakın Türksat Bayi'sine başvurarak işlem yapabilirsiniz."
    },
    {
      question: "HD kanal izlemek için ekstra bir cihaza ihtiyacım var mı?",
      answer: "HD kanalları izleyebilmek için HD uyumlu bir televizyon ve HD yayınları destekleyen bir set üstü kutu (Türksat HD Box veya i-Kutu) gereklidir. Bu cihazları kiralayabilir veya satın alabilirsiniz."
    },
    {
      question: "Kablo TV'yi internet olmadan kullanabilir miyim?",
      answer: "Evet, Kablo TV hizmetimizi internet aboneliğiniz olmadan da kullanabilirsiniz. Sadece TV paketi aboneliği yapabilir veya daha sonra internet ekleyebilirsiniz."
    },
    {
      question: "Paketlere ek olarak tekil kanal alabilir miyim?",
      answer: "Evet, mevcut paketinize ek olarak tekil kanallar veya tematik mini paketler ekleyebilirsiniz. Bu ek kanalların ücretleri ana paket ücretinize eklenir."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Bölümü */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="flex justify-center items-center h-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
              Kablo TV Paketleri
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">
              Yüzlerce kanalı HD kalitesinde izlemenin keyfini çıkarın
            </p>
          </div>
        </div>
      </div>

      {/* Filtre ve Arama Bölümü */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-md transition ${activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Tüm Paketler
              </button>
              <button
                onClick={() => setActiveCategory('temel')}
                className={`px-4 py-2 rounded-md transition ${activeCategory === 'temel'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Temel Paket
              </button>
              <button
                onClick={() => setActiveCategory('ust')}
                className={`px-4 py-2 rounded-md transition ${activeCategory === 'ust'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Üst Paket
              </button>
              <button
                onClick={() => setActiveCategory('sinema')}
                className={`px-4 py-2 rounded-md transition ${activeCategory === 'sinema'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Sinema Paketleri
              </button>
              <button
                onClick={() => setActiveCategory('spor')}
                className={`px-4 py-2 rounded-md transition ${activeCategory === 'spor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Spor Paketleri
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Paket ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Paketler Bölümü - Liste görünümü (Türksat sitesine benzer) */}
        <div className="space-y-6 mb-12">
          {filteredPackets.length > 0 ? (
            filteredPackets.map((packet) => (
              <div
                key={packet.id}
                className={`bg-white rounded-lg border overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
                  packet.highlighted ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Sol taraf - Paket bilgileri */}
                    <div className="md:w-3/4">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {packet.icon}
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{packet.name}</h3>
                            {packet.popular && (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 flex items-center">
                                <FaStar className="mr-1" size={10} />
                                Popüler
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{packet.description}</p>
                          
                          {/* Kanal Sayıları */}
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <span className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded">
                              <span className="font-medium mr-1">{packet.channels}+</span> kanal
                            </span>
                            <span className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded">
                              <span className="font-medium mr-1">{packet.hdChannels}+</span> HD kanal
                            </span>
                          </div>

                          {/* Özellikler Listesi */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Paket Özellikleri:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                              {packet.features.map((feature, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" size={14} />
                                  <span className="text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bazı Kanallar */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Bazı Kanallar:</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                              {packet.channelList.slice(0, 6).map((channel, index) => (
                                <div key={index} className="text-sm text-gray-600">• {channel}</div>
                              ))}
                            </div>
                            <button 
                              className="text-sm text-blue-600 mt-2 flex items-center"
                              onClick={() => togglePacketDetails(packet.id)}
                            >
                              {selectedPacket === packet.id ? 'Kanalları gizle' : 'Tüm kanalları gör'} 
                              <FaChevronRight className={`ml-1 ${selectedPacket === packet.id ? 'transform rotate-90' : ''}`} size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sağ taraf - Fiyat ve buton */}
                    <div className="md:w-1/4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                      <div className="mb-3 text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-3xl font-bold text-blue-700">{packet.price}</span>
                          <span className="text-gray-600 ml-1">TL/Ay</span>
                        </div>
                        <p className="text-sm text-gray-500">KDV dahil</p>
                      </div>
                      
                      <Link
                        to="/hemenbasvur"
                        className="w-full bg-blue-700 text-white font-medium px-4 py-3 rounded-md text-center hover:bg-blue-800 transition"
                      >
                        Hemen Başvur
                      </Link>
                      
                      <button
                        onClick={() => togglePacketDetails(packet.id)}
                        className="mt-2 text-blue-700 hover:text-blue-900 font-medium text-sm"
                      >
                        Detaylar
                      </button>
                    </div>
                  </div>

                  {/* Genişletilmiş Detaylar */}
                  {selectedPacket === packet.id && (
                    <div className="border-t border-gray-200 mt-6 pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Tüm Kanallar</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                        {packet.channelList.map((channel, index) => (
                          <div key={index} className="text-sm text-gray-600">• {channel}</div>
                        ))}
                      </div>
                      
                      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Paket Bilgileri</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={14} />
                            <span className="text-gray-700">Bu paketimiz 12 ay taahhütle sunulmaktadır.</span>
                          </li>
                          <li className="flex items-start">
                            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={14} />
                            <span className="text-gray-700">Kurulum ve aktivasyon ücretsizdir.</span>
                          </li>
                          <li className="flex items-start">
                            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={14} />
                            <span className="text-gray-700">HD yayınları izlemek için HD uyumlu TV Box gereklidir.</span>
                          </li>
                          <li className="flex items-start">
                            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={14} />
                            <span className="text-gray-700">Paket içeriği ve fiyatlar farklı illerde değişiklik gösterebilir.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FaInfoCircle size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Paket Bulunamadı</h3>
              <p className="text-gray-500 mb-4">
                Arama kriterinize uygun paket bulunamadı. Lütfen filtrelerinizi değiştirin.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Tüm Paketleri Göster
              </button>
            </div>
          )}
        </div>

        {/* Kablo TV Karşılaştırma Tablosu */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Paket Karşılaştırma</h2>
          
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Özellikler</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Temel Paket</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Üst Paket</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Sinema Paketleri</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-700 font-medium">Kanal Sayısı</td>
                <td className="py-3 px-4 text-center text-gray-600">80+ Kanal</td>
                <td className="py-3 px-4 text-center text-gray-600">120+ Kanal</td>
                <td className="py-3 px-4 text-center text-gray-600">Paket Bazında Değişir</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-700 font-medium">HD Kanallar</td>
                <td className="py-3 px-4 text-center text-gray-600">12+ HD Kanal</td>
                <td className="py-3 px-4 text-center text-gray-600">25+ HD Kanal</td>
                <td className="py-3 px-4 text-center text-gray-600">Tamamı HD</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-700 font-medium">Sinema Kanalları</td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-red-500 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-green-500 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-700 font-medium">Belgesel Kanalları</td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-yellow-500 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-green-500 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <FaCheckCircle className="text-red-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-700 font-medium">Fiyat</td>
                <td className="py-3 px-4 text-center text-gray-600">29.99 TL/Ay</td>
                <td className="py-3 px-4 text-center text-gray-600">49.99 TL/Ay</td>
                <td className="py-3 px-4 text-center text-gray-600">19.99 TL'den başlayan</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bilgi Bölümü */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kablo TV Avantajları</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">HD Kalitesinde İzleme</h3>
              <p className="text-gray-700 text-sm">
                Türksat Kablo TV ile yayınları HD kalitesinde izleyebilirsiniz. Kristal netliğinde görüntü, sinema kalitesinde ses ile evinizde premium izleme deneyimi.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Özel İçerikler</h3>
              <p className="text-gray-700 text-sm">
                Tematik paketler ve özel kanallarla ilgi alanınıza yönelik içeriklere erişim sağlayın. Sinema, spor, belgesel ve daha fazlası.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Kesintisiz Yayın</h3>
              <p className="text-gray-700 text-sm">
                Hava koşullarından etkilenmeyen altyapımız sayesinde kesintisiz TV yayını. Yağmurda, karda, fırtınada bile net görüntü kalitesi.
              </p>
            </div>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sıkça Sorulan Sorular</h2>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <FaChevronDown 
                    className={`text-gray-500 transition-transform duration-200 ${expandedFaq === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                {expandedFaq === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bölümü */}
        <div className="bg-blue-700 text-white py-12 px-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Size Özel Paketi Keşfedin</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Adresinize özel kampanyalarımızı öğrenmek için başvuru formunu doldurun, müşteri temsilcimiz en kısa sürede size ulaşsın.
          </p>
          <Link
            to="/hemenbasvur"
            className="bg-white text-blue-700 px-8 py-3 rounded-md font-bold text-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center"
          >
            Hemen Başvur <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TvPackets;

