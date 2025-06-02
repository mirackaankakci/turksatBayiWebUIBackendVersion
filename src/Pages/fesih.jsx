import React, { useState } from 'react';
import { FaInfoCircle, FaPhoneAlt, FaFax, FaMapMarkedAlt, FaFileAlt, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import serit from '/assets/serit.png';

const FesihIslemleri = () => {
  const [activeTab, setActiveTab] = useState('information');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showFaqItem, setShowFaqItem] = useState(null);

  // Fesih işlemleri için il müdürlükleri ve iletişim bilgileri
  const cityOffices = [
    {
      id: 1,
      city: 'Ankara',
      address: 'Konya Yolu 40.Km. Gölbaşı / Ankara',
      phone: '0312 615 30 00',
      fax: '0312 615 30 01'
    },
    {
      id: 2,
      city: 'İstanbul',
      address: 'Büyükdere Cad. No:22 Mecidiyeköy / İstanbul',
      phone: '0212 310 36 00',
      fax: '0212 310 36 01'
    },
    {
      id: 3,
      city: 'İzmir',
      address: 'Mansuroğlu Mahallesi, 295/2 Sokak, No: 1, Ege Sun Plaza, Kat: 14, D: 1408, Bayraklı / İzmir',
      phone: '0232 445 19 00',
      fax: '0232 445 19 01'
    },
    {
      id: 4,
      city: 'Adana',
      address: 'Çınarlı Mah. Turhan Cemal Beriker Bulvarı No:33 / Adana',
      phone: '0322 427 33 00',
      fax: '0322 427 33 02'
    },
    {
      id: 5,
      city: 'Antalya',
      address: 'Altındağ Mahallesi, 100. Yıl Bulvarı, 5024 Sokak, No:34, Kepez / Antalya',
      phone: '0242 311 30 00',
      fax: '0242 311 30 01'
    },
    {
      id: 6,
      city: 'Bursa',
      address: 'Odunluk Mahallesi, Akademi Cad. No:8, Kat:2, D:14-15-16-17, Nilüfer / Bursa',
      phone: '0224 211 01 00',
      fax: '0224 211 01 01'
    },
    {
      id: 7,
      city: 'Gaziantep',
      address: 'İncilipınar Mah. Muammer Aksoy Bulvarı No:20 Şehitkamil / Gaziantep',
      phone: '0342 322 04 95',
      fax: '0342 322 04 96'
    },
    {
      id: 8,
      city: 'Kayseri',
      address: 'Fevzi Çakmak Mah. Mustafa Kemal Paşa Bulvarı No:195 Kocasinan / Kayseri',
      phone: '0352 222 88 00',
      fax: '0352 222 88 01'
    },
    {
      id: 9,
      city: 'Konya',
      address: 'Selçuklu Mahallesi, Selçuklu Caddesi, No: 35, Selçuklu / Konya',
      phone: '0332 260 41 00',
      fax: '0332 260 41 01'
    },
    {
      id: 10,
      city: 'Samsun',
      address: 'Kılıçdede Mah. Şehit Korhan Ekiz Cad. No:27 İlkadım / Samsun',
      phone: '0362 431 57 00',
      fax: '0362 431 57 01'
    }
  ];

  // Sıkça Sorulan Sorular
  const faqItems = [
    {
      id: 1,
      question: 'Abonelik fesih işlemlerini nasıl başlatabilirim?',
      answer: 'Aboneliğinizi feshetmek için Türksat A.Ş. İl Müdürlüklerine şahsen başvurabilir, Türksat İş Ortağı noktalarına gidebilir veya ikamet ettiğiniz ile ait müdürlüğümüze faks gönderebilirsiniz.'
    },
    {
      id: 2,
      question: 'Faks ile fesih işlemi yaparken hangi belgeleri göndermeliyim?',
      answer: 'Faks ile fesih işlemi yaparken, iletişim bilgilerinizi ve fesih talebinizi içeren imzalı bir dilekçe ile birlikte kimlik fotokopinizi göndermeniz gerekmektedir.'
    },
    {
      id: 3,
      question: 'Abonelik fesih talebi ne kadar sürede işleme alınır?',
      answer: 'Fesih işleminiz, talebinizin alınması ve doğrulanmasının ardından genellikle 24-48 saat içerisinde işleme alınır. İşlemin tamamlanması ise en geç 7 iş günü içerisinde gerçekleştirilir.'
    },
    {
      id: 4,
      question: 'Fesih işlemi için ücret ödemem gerekir mi?',
      answer: 'Taahhütlü aboneliğiniz varsa ve taahhüt süresi dolmadan fesih işlemi yapıyorsanız, kalan taahhüt süresi için cayma bedeli ödemeniz gerekebilir. Taahhüt süreniz dolduysa veya taahhütsüz abonelik kullanıyorsanız, fesih işlemi için ek bir ücret ödemezsiniz.'
    },
    {
      id: 5,
      question: 'Kiralık cihazları iade etmem gerekir mi?',
      answer: 'Evet, Türksat\'tan kiraladığınız modem, set-top box (STB) ve diğer cihazları, fesih işleminizin ardından en geç 15 gün içerisinde iade etmeniz gerekmektedir. İade işlemi için size en yakın Türksat İl Müdürlüğü veya iş ortağı noktasını kullanabilirsiniz.'
    },
    {
      id: 6,
      question: 'Fesih işlemi sonrası faturalarla ilgili ne yapmalıyım?',
      answer: 'Fesih işleminiz tamamlandıktan sonra, varsa kalan kullanım ücretlerinizi ve taahhüt cayma bedelinizi içeren son faturanız adresinize gönderilecektir. Bu faturayı ödemeniz gerekmektedir. Otomatik ödeme talimatınız varsa, fesih işlemi sonrası otomatik ödeme talimatınızın sonlandırılması için bankanızla iletişime geçmeyi unutmayınız.'
    }
  ];

  const toggleFaqItem = (id) => {
    if (showFaqItem === id) {
      setShowFaqItem(null);
    } else {
      setShowFaqItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="flex justify-center items-center h-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-3xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
              Abonelik Fesih İşlemleri
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">
              Hızlı ve kolay şekilde abonelik fesih işlemlerinizi gerçekleştirin
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('information')}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors ${activeTab === 'information' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Fesih Bilgilendirmesi
          </button>
          {/*<button
            onClick={() => setActiveTab('locations')}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors ${activeTab === 'locations' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            İl Müdürlükleri
          </button>*/}
          <button
            onClick={() => setActiveTab('procedure')}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors ${activeTab === 'procedure' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Fesih Prosedürü
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-6 font-medium text-sm sm:text-base transition-colors ${activeTab === 'faq' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Sıkça Sorulan Sorular
          </button>
        </div>

        {/* Information Tab */}
        {activeTab === 'information' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <FaInfoCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Abonelik Fesih İşlemleri Hakkında</h2>
                <p className="text-gray-700 mb-4">
                  Abonelik fesih işlemlerinizi, Türksat A.Ş. İl Müdürlüklerine ve Türksat İş Ortağı noktalarına bizzat başvurarak veya aşağıda iletişim bilgileri yer alan İl Müdürlüklerimize faks göndererek yapabilirsiniz.
                </p>
                <p className="text-gray-700 mb-4">
                  Faks yoluyla abonelik fesih işlemlerini gerçekleştirmek isteyen müşterilerimizin, iletişim bilgilerinin ve fesih taleplerinin yer aldığı dilekçe ve kimlik fotokopilerini, aboneliklerinin bulunduğu ile ait İl Müdürlüklerimize faks yoluyla göndermeleri gerekmektedir.
                </p>
                <p className="text-gray-700 mb-4">
                  Yetkili personellerimiz, İletişim bilgileri doğru ve eksiksiz olan müşterilerimizle, beyan ettikleri telefon numaraları üzerinden taleplerinin teyidi maksadıyla irtibata geçerek, abonelik fesih işlemi gerçekleştirecek ve sonrasında gerekli bilgilendirmede bulunacaktır.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Fesih İşlemi İçin Gerekli Belgeler:</h3>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <ul className="list-none space-y-3 mb-4 md:w-1/2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                    <span className="text-gray-700">İmzalı fesih dilekçesi</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                    <span className="text-gray-700">Kimlik fotokopisi (ön ve arka yüz)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                    <span className="text-gray-700">Güncel iletişim bilgileri</span>
                  </li>
                </ul>
                <div className="md:w-1/2 bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Dilekçede Bulunması Gerekenler:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Ad, soyad ve T.C. kimlik numarası</li>
                    <li>Adres ve abonelik numarası</li>
                    <li>Güncel telefon numarası</li>
                    <li>Fesih talep nedeni (opsiyonel)</li>
                    <li>Tarih ve imza</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Locations Tab */}
        {/*{activeTab === 'locations' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaMapMarkedAlt className="text-blue-600 mr-3" />
              İl Müdürlükleri İletişim Bilgileri
            </h2>

            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
              {cityOffices.map(office => (
                <button
                  key={office.id}
                  onClick={() => setSelectedCity(office.id)}
                  className={`p-3 text-center rounded-md transition-colors ${
                    selectedCity === office.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {office.city}
                </button>
              ))}
            </div>

            
            {selectedCity ? (
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                {cityOffices.filter(office => office.id === selectedCity).map(office => (
                  <div key={office.id}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{office.city} İl Müdürlüğü</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700 mb-5">
                          <strong className="block text-gray-800 mb-1">Adres:</strong>
                          {office.address}
                        </p>
                        <div className="flex flex-col space-y-3">
                          <p className="flex items-center">
                            <FaPhoneAlt className="text-blue-600 mr-2" />
                            <span>{office.phone}</span>
                          </p>
                          <p className="flex items-center">
                            <FaFax className="text-blue-600 mr-2" />
                            <span>{office.fax}</span>
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">Fesih İşlemi İçin:</h4>
                        <p className="text-gray-600 mb-3">
                          Fesih dilekçenizi ve gerekli belgeleri yukarıdaki faks numarasına gönderebilir veya şahsen il müdürlüğümüze başvurabilirsiniz.
                        </p>
                        <p className="text-sm text-blue-800 font-medium">
                          Çalışma saatleri: Hafta içi 08:30 - 17:30
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Lütfen detaylarını görmek istediğiniz il müdürlüğünü seçiniz.</p>
              </div>
            )}

            
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Çağrı Merkezi</h3>
              <p className="text-gray-700 mb-3">
                Fesih işlemleri hakkında daha fazla bilgi almak için çağrı merkezimizi arayabilirsiniz.
              </p>
              <div className="flex items-center">
                <FaPhoneAlt className="text-green-600 mr-2" />
                <span className="text-lg font-semibold">0850 XXX XX XX</span>
              </div>
            </div>
          </div>
        )}*/}

        {/* Procedure Tab */}
        {activeTab === 'procedure' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaFileAlt className="text-blue-600 mr-3" />
              Fesih İşlemi Prosedürü
            </h2>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 pr-0 md:pr-8">
                  <ol className="relative border-l border-gray-300 ml-3 space-y-6">
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 text-white">
                        1
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Fesih Dilekçesi Hazırlama</h3>
                      <p className="text-gray-600 mb-2">
                        Abonelik fesih dilekçenizi hazırlayın. Dilekçenizde ad-soyad, T.C. kimlik numarası, abonelik numarası, 
                        adres ve iletişim bilgileri eksiksiz olarak yer almalıdır.
                      </p>
                      <p className="text-sm text-blue-700">
                        Not: Dilekçe örneğini sitemizden indirebilirsiniz.
                      </p>
                    </li>
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 text-white">
                        2
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Belgeleri Hazırlama</h3>
                      <p className="text-gray-600">
                        İmzalı fesih dilekçeniz ve kimlik fotokopinizi (ön ve arka yüz) hazırlayın.
                      </p>
                    </li>
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 text-white">
                        3
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Başvuru Yöntemi Seçimi</h3>
                      <p className="text-gray-600">
                        Fesih başvurunuzu yapmak için aşağıdaki yöntemlerden birini seçin:
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                        <li>İl Müdürlüğüne şahsen başvuru</li>
                        <li>Türksat İş Ortağı noktalarına şahsen başvuru</li>
                        <li>İlgili İl Müdürlüğüne faks yoluyla başvuru</li>
                      </ul>
                    </li>
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 text-white">
                        4
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Doğrulama ve İşlem</h3>
                      <p className="text-gray-600">
                        Başvurunuzun ardından yetkili personelimiz, beyan ettiğiniz telefon numarası üzerinden 
                        sizinle iletişime geçerek talebinizi doğrulayacaktır.
                      </p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 text-white">
                        5
                      </span>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">İşlem Sonuçlandırma</h3>
                      <p className="text-gray-600">
                        Doğrulama işleminin ardından fesih talebiniz işleme alınacak ve sonuçlandırılacaktır. 
                        İşlem sonucunda tarafınıza bilgilendirme yapılacaktır.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="md:w-1/3 mt-8 md:mt-0">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                    <h3 className="font-semibold text-orange-800 mb-3">Önemli Hatırlatmalar</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FaInfoCircle className="text-orange-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Taahhütlü aboneliğiniz varsa, taahhüt süresi dolmadan yapılan fesih işlemlerinde cayma bedeli ödemeniz gerekebilir.</span>
                      </li>
                      <li className="flex items-start">
                        <FaInfoCircle className="text-orange-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Türksat'tan kiraladığınız cihazların (modem, set-top box vb.) iade edilmesi gerekmektedir.</span>
                      </li>
                      <li className="flex items-start">
                        <FaInfoCircle className="text-orange-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Faks ile gönderilen belgelerin net ve okunaklı olduğundan emin olunuz.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-5">
                    <h3 className="font-semibold text-blue-800 mb-3">Fesih Sonrası</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Fesih işlemi tamamlandıktan sonra kalan günleri kapsayan son faturanız adresinize gönderilecektir.</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Kiralık cihazların 15 gün içerisinde iade edilmesi gerekmektedir.</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                        <span className="text-gray-700 text-sm">Otomatik ödeme talimatınız varsa, bankanıza talimatı iptal ettirmeyi unutmayınız.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaQuestionCircle className="text-blue-600 mr-3" />
              Sıkça Sorulan Sorular
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full p-5 text-left bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleFaqItem(item.id)}
                  >
                    <h3 className="font-medium text-gray-800">{item.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${showFaqItem === item.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showFaqItem === item.id && (
                    <div className="p-5 bg-white border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Box */}
        <div className="bg-blue-700 text-white rounded-lg shadow-lg mt-8 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Yardıma mı ihtiyacınız var?</h2>
              <p className="text-blue-100 mb-4">
                Fesih işlemleriyle ilgili sorularınız için müşteri hizmetlerimize ulaşabilir veya en yakın Türksat İl Müdürlüğünü ziyaret edebilirsiniz.
              </p>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span className="text-lg font-medium">0850 806 60 00</span>
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center md:justify-end">
              <a 
                href="/hemenbasvur" 
                className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                İletişime Geçin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FesihIslemleri;