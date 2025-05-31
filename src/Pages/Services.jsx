import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  FaShieldAlt, 
  FaNetworkWired, 
  FaBirthdayCake, 
  FaCloud, 
  FaBox, 
  FaArrowUp, 
  FaArrowDown, 
  FaPhoneAlt, 
  FaSatelliteDish, 
  FaBed, 
  FaUserClock, 
  FaLock, 
  FaLaptop,
  FaChevronDown
} from 'react-icons/fa';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import serit from "../assets/serit.png"; // Import serit image

// Ayrı dosyalardaki servis içeriklerini ve soru-cevapları import et
import { serviceContents } from "../data/serviceContents";
import { serviceFaqs } from "../data/serviceFaqs";

const Services = () => {
  const { serviceId } = useParams(); // URL'den servis ID'sini al
  const navigate = useNavigate(); // Yönlendirme için navigate 
  const location = useLocation(); // Mevcut konum bilgisi
  
  const [selectedService, setSelectedService] = useState('statikIp');
  const [openFaq, setOpenFaq] = useState('');

  // Tüm servisler
  const services = [
    { id: 'statikIp', title: 'Statik IP', icon: <FaNetworkWired /> },
    { id: 'dogumGunu', title: 'Doğum Günü', icon: <FaBirthdayCake /> },
    { id: 'guvenliInternet', title: 'Güvenli İnternet', icon: <FaShieldAlt /> }, // URL uyumluluğu için türkçe karakter kullanmadım
    { id: 'kabloBulut', title: 'Kablo Bulut', icon: <FaCloud /> },
    { id: 'kotaPaketi', title: 'Kota Paketi', icon: <FaBox /> },
    { id: 'nitroYukle', title: 'Nitro Yükle', icon: <FaArrowUp /> },
    { id: 'nitroIndir', title: 'Nitro İndir', icon: <FaArrowDown /> },
    { id: 'telefonSesPaketi', title: 'Telefon Ses Paketi', icon: <FaPhoneAlt /> },
    { id: 'turksatSiber', title: 'Türksat Siber', icon: <FaSatelliteDish /> },
    { id: 'uykuYok', title: 'Uyku Yok', icon: <FaBed /> },
    { id: 'uykuYokPlus', title: 'Uyku Yok Plus', icon: <FaUserClock /> },
    { id: 'veriGizliligi', title: 'Veri Gizliliği', icon: <FaLock /> },
    { id: 'interaktifKutu', title: 'İnteraktif Kutu', icon: <FaLaptop /> }
  ];

  // URL'den gelen servis ID'sine göre seçili servisi ayarla
  useEffect(() => {
    if (serviceId && services.some(service => service.id === serviceId)) {
      setSelectedService(serviceId);
    } else if (location.pathname === '/servisler' || location.pathname === '/servisler/') {
      // Ana servis sayfasındayız, varsayılan servisi göster
      setSelectedService('statikIp');
    } else if (serviceId) {
      // Geçersiz servis ID'si, ana servis sayfasına yönlendir
      navigate('/servisler');
    }
  }, [serviceId, location.pathname, navigate, services]);

  // Servis seçildiğinde URL'i güncelle
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    navigate(`/servisler/${serviceId}`);
  };

  // Seçilen servise göre ilgili soru-cevapları getir
  const getServiceFaqs = (serviceId) => {
    return serviceFaqs[serviceId] || [
      { 
        id: 'genel', 
        question: `${services.find(s => s.id === serviceId)?.title} hakkında bilgi`,
        answer: `Bu servis hakkında detaylı bilgi yakında eklenecektir. Sorularınız için müşteri hizmetlerini arayabilirsiniz.`
      }
    ];
  };

  // FAQ açma/kapama işlevi
  const toggleFaq = (faqId) => {
    if (openFaq === faqId) {
      setOpenFaq('');
    } else {
      setOpenFaq(faqId);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {selectedService && serviceContents[selectedService] 
            ? `${serviceContents[selectedService].title} - Türksat Servisler` 
            : "Türksat Servisler"}
        </title>
        <meta 
          name="description" 
          content={selectedService && serviceContents[selectedService]?.description || "Türksat Kablonet servisler ve kampanyalar"}
        />
      </Helmet>

      {/* Banner Section - Diğer sayfalarda kullandığınız banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {selectedService && serviceContents[selectedService]
              ? serviceContents[selectedService].title
              : "Türksat Servisler"}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            {selectedService && serviceContents[selectedService]?.description ||
              "Türksat Kablonet ek servisler, kampanyalar ve hizmetler hakkında detaylı bilgilere buradan ulaşabilirsiniz."}
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sol Menü */}
            <div className="md:w-1/4 bg-white rounded-lg overflow-hidden shadow-md">
              <div className="service-list">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`flex items-center w-full px-4 py-4 text-left border-b border-gray-100 transition-colors ${
                      selectedService === service.id 
                        ? "bg-blue-700 text-white" 
                        : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      selectedService === service.id 
                        ? "bg-blue-50 text-blue-600" 
                        : "bg-blue-600 text-blue-50"
                    }`}>
                      {service.icon}
                    </div>
                    <span className="ml-3 font-medium">{service.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sağ İçerik Alanı */}
            <div className="md:w-3/4">
              {/* Servis içerik bilgileri */}
              <div className="mb-8">
                {serviceContents[selectedService] ? (
                  <div>
                    {/* Paragraf içerikleri */}
                    {serviceContents[selectedService].contentSections && 
                      serviceContents[selectedService].contentSections.map((section, index) => (
                        <div key={index} className="mb-4">
                          {section.type === 'paragraph' ? (
                            <p className="text-gray-700 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                              {section.text}
                            </p>
                          ) : section.type === 'heading' ? (
                            <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-2">{section.text}</h3>
                          ) : null}
                        </div>
                      ))
                    }
                    
                    {/* Servis madde madde açıklamaları */}
                    {serviceContents[selectedService].items && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200 mt-6">
                        <ul className="space-y-3">
                          {serviceContents[selectedService].items.map((item, index) => (
                            <li key={index} className="flex">
                              <span className="text-blue-600 mr-2">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Servis tabloları */}
                    {serviceContents[selectedService].tables && 
                      serviceContents[selectedService].tables.map((table, tableIndex) => (
                        <div key={tableIndex} className="mt-6 overflow-x-auto">
                          {table.title && (
                            <h3 className="text-lg font-medium text-gray-800 mb-3">{table.title}</h3>
                          )}
                          <table className="min-w-full bg-white border-collapse">
                            <thead>
                              <tr className="bg-gray-200">
                                {table.headers.map((header, index) => (
                                  <th 
                                    key={index}
                                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border border-gray-300"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                  {row.map((cell, cellIndex) => (
                                    <td 
                                      key={cellIndex}
                                      className="px-6 py-4 text-sm text-gray-700 border border-gray-300"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-lg p-6 text-blue-800">
                    <p>Bu servis hakkında detaylı bilgi yakında eklenecektir.</p>
                  </div>
                )}
              </div>
              
              {/* Soru-Cevap Bölümü */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sıkça Sorulan Sorular</h3>
                {getServiceFaqs(selectedService).map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="text-gray-700 font-medium">{faq.question}</span>
                      <FaChevronDown 
                        className={`text-gray-400 transition-transform ${openFaq === faq.id ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {openFaq === faq.id && (
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;