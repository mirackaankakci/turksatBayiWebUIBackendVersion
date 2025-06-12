// Importlar bölümünün hemen altına useState eklediğinizden emin olun 
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserLock, FaDatabase, FaCookieBite, FaRegEnvelope, FaChevronRight, FaAngleUp, FaFileContract } from 'react-icons/fa';
import serit from '/assets/serit.png';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  
  const sectionRefs = {
    introduction: useRef(null),
    dataCollection: useRef(null),
    dataUsage: useRef(null),
    dataSecurity: useRef(null),
    cookies: useRef(null),
    thirdParties: useRef(null),
    userRights: useRef(null),
    dataProcessingConsent: useRef(null),
    changes: useRef(null),
    contact: useRef(null)
  };

  // Sayfa başlığını dinamik olarak değiştirmek için useEffect ekleyelim
  useEffect(() => {
    let pageTitle = 'Gizlilik Politikası | Türksat Kablonet';
    let metaDescription = 'Türksat Kablonet gizlilik politikası ve kişisel verilerin işlenmesine dair aydınlatma metni.';
    
    // Aktif bölüme göre başlığı değiştirelim
    switch(activeSection) {
      case 'introduction':
        pageTitle = 'Gizlilik Politikası | Türksat Kablonet';
        metaDescription = 'Türksat Kablonet müşteri hizmetleri gizlilik politikası ve kişisel verilerin korunması hakkında aydınlatma metni.';
        break;
      case 'dataCollection':
        pageTitle = 'İşlenen Kişisel Veriler | Türksat Gizlilik Politikası';
        metaDescription = 'Türksat Kablonet tarafından işlenen kişisel veriler ve veri kategorileri hakkında detaylı bilgiler.';
        break;
      case 'dataUsage':
        pageTitle = 'Kişisel Verilerin İşlenme Amaçları | Türksat Gizlilik';
        metaDescription = 'Türksat Kablonet tarafından kişisel verilerinizin hangi amaçlarla işlendiği ve yasal dayanakları hakkında bilgiler.';
        break;
      case 'thirdParties':
        pageTitle = 'Kişisel Verilerin Aktarımı | Türksat Veri Güvenliği';
        metaDescription = 'Türksat Kablonet tarafından toplanan kişisel verilerin hangi durumlarda üçüncü taraflarla paylaşıldığı hakkında bilgiler.';
        break;
      case 'dataSecurity':
        pageTitle = 'Kişisel Veri Toplama Yöntemleri | Türksat KVKK Politikası';
        metaDescription = 'Türksat Kablonet tarafından kişisel verilerin toplanma yöntemleri ve hukuki dayanakları hakkında bilgilendirme.';
        break;
      case 'userRights':
        pageTitle = 'KVKK Kapsamındaki Haklarınız | Türksat Kablonet';
        metaDescription = 'Kişisel Verilerin Korunması Kanunu kapsamında Türksat Kablonet müşterilerinin sahip olduğu haklar ve başvuru yöntemleri.';
        break;
      case 'dataProcessingConsent':
        pageTitle = 'Veri İşleme İzni | Türksat Kişisel Veri İşleme';
        metaDescription = 'Türksat Kablonet hizmetlerinde kişisel verilerin işlenmesine dair izin ve rıza beyanı hakkında bilgilendirme.';
        break;
      case 'contact':
        pageTitle = 'Veri Sorumlusu İletişim Bilgileri | Türksat KVKK';
        metaDescription = 'Türksat Kablonet veri sorumlusu iletişim bilgileri ve KVKK kapsamındaki haklarınızla ilgili başvuru yöntemleri.';
        break;
      default:
        pageTitle = 'Gizlilik Politikası | Türksat Kablonet';
    }
    
    // Doğrudan document.title'ı güncelleyelim
    document.title = pageTitle;
  }, [activeSection]);

  // Sayfa içi navigasyon için section değiştirme
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Scroll konumuna göre aktif sekmeyi güncelle
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset ekle
      
      // Her bölümün scroll konumunu kontrol et ve aktif olanı belirle
      Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sayfanın en üstüne çık butonu için
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Meta açıklama ve anahtar kelimeler için yardımcı fonksiyonlar
  const getMetaDescription = () => {
    switch(activeSection) {
      case 'introduction':
        return 'Türksat Kablonet müşteri hizmetleri gizlilik politikası ve kişisel verilerin korunması hakkında aydınlatma metni.';
      case 'dataCollection':
        return 'Türksat Kablonet tarafından işlenen kişisel veriler ve veri kategorileri hakkında detaylı bilgiler.';
      case 'dataUsage':
        return 'Türksat Kablonet tarafından kişisel verilerinizin hangi amaçlarla işlendiği ve yasal dayanakları hakkında bilgiler.';
      case 'thirdParties':
        return 'Türksat Kablonet tarafından toplanan kişisel verilerin hangi durumlarda üçüncü taraflarla paylaşıldığı hakkında bilgiler.';
      case 'dataSecurity':
        return 'Türksat Kablonet tarafından kişisel verilerin toplanma yöntemleri ve hukuki dayanakları hakkında bilgilendirme.';
      case 'userRights':
        return 'Kişisel Verilerin Korunması Kanunu kapsamında Türksat Kablonet müşterilerinin sahip olduğu haklar ve başvuru yöntemleri.';
      case 'dataProcessingConsent':
        return 'Türksat Kablonet hizmetlerinde kişisel verilerin işlenmesine dair izin ve rıza beyanı hakkında bilgilendirme.';
      case 'contact':
        return 'Türksat Kablonet veri sorumlusu iletişim bilgileri ve KVKK kapsamındaki haklarınızla ilgili başvuru yöntemleri.';
      default:
        return 'Türksat Kablonet gizlilik politikası ve kişisel verilerin işlenmesine dair aydınlatma metni.';
    }
  };

  const getMetaKeywords = () => {
    const baseKeywords = 'gizlilik politikası, türksat, kablonet, kvkk, kişisel veri';
    
    switch(activeSection) {
      case 'introduction':
        return `${baseKeywords}, aydınlatma metni, veri sorumlusu, veri koruma`;
      case 'dataCollection':
        return `${baseKeywords}, işlenen veriler, kimlik bilgileri, iletişim bilgileri`;
      case 'dataUsage':
        return `${baseKeywords}, veri işleme amaçları, veri işleme ilkeleri`;
      case 'thirdParties':
        return `${baseKeywords}, veri aktarımı, üçüncü taraflar, veri paylaşımı`;
      case 'dataSecurity':
        return `${baseKeywords}, veri toplama yöntemi, hukuki sebepler, veri güvenliği`;
      case 'userRights':
        return `${baseKeywords}, veri sahibi hakları, başvuru hakkı, silme talebi`;
      case 'dataProcessingConsent':
        return `${baseKeywords}, açık rıza, veri işleme izni, onay`;
      case 'contact':
        return `${baseKeywords}, veri sorumlusu iletişim, başvuru yöntemi`;
      default:
        return baseKeywords;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          {activeSection === 'introduction' ? 'Gizlilik Politikası | Türksat Kablonet' :
           activeSection === 'dataCollection' ? 'İşlenen Kişisel Veriler | Türksat Gizlilik Politikası' :
           activeSection === 'dataUsage' ? 'Kişisel Verilerin İşlenme Amaçları | Türksat Gizlilik' :
           activeSection === 'thirdParties' ? 'Kişisel Verilerin Aktarımı | Türksat Veri Güvenliği' :
           activeSection === 'dataSecurity' ? 'Kişisel Veri Toplama Yöntemleri | Türksat KVKK Politikası' :
           activeSection === 'userRights' ? 'KVKK Kapsamındaki Haklarınız | Türksat Kablonet' :
           activeSection === 'dataProcessingConsent' ? 'Veri İşleme İzni | Türksat Kişisel Veri İşleme' :
           activeSection === 'contact' ? 'Veri Sorumlusu İletişim Bilgileri | Türksat KVKK' :
           'Gizlilik Politikası | Türksat Kablonet'}
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
          content={activeSection === 'introduction' ? 'Gizlilik Politikası | Türksat Kablonet' :
                   activeSection === 'dataCollection' ? 'İşlenen Kişisel Veriler | Türksat' :
                   activeSection === 'dataUsage' ? 'Kişisel Verilerin İşlenme Amaçları' :
                   activeSection === 'userRights' ? 'KVKK Kapsamındaki Haklarınız' :
                   'Gizlilik Politikası | Türksat Kablonet'} 
        />
        <meta 
          property="og:description" 
          content={getMetaDescription()} 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      {/* Banner Bölümü */}
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
              {activeSection === 'introduction' ? 'Gizlilik Politikası' :
               activeSection === 'dataCollection' ? 'İşlenen Kişisel Verileriniz' :
               activeSection === 'dataUsage' ? 'Verilerin İşlenme Amaçları' :
               activeSection === 'thirdParties' ? 'Kişisel Verilerin Aktarımı' :
               activeSection === 'dataSecurity' ? 'Veri Toplama Yöntemleri' :
               activeSection === 'userRights' ? 'KVKK Kapsamında Haklarınız' :
               activeSection === 'dataProcessingConsent' ? 'Veri İşleme İzni' :
               activeSection === 'contact' ? 'İletişim Bilgileri' :
               'Gizlilik Politikası'}
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">
              {activeSection === 'introduction' ? 'Kişisel verilerinizin korunmasına önem veriyoruz' :
               activeSection === 'dataCollection' ? 'Hangi bilgilerinizi işliyoruz?' :
               activeSection === 'dataUsage' ? 'Verilerinizi nasıl ve neden kullanıyoruz?' :
               activeSection === 'thirdParties' ? 'Verilerinizi kimlere aktarabiliyoruz?' :
               activeSection === 'dataSecurity' ? 'Verilerinizi nasıl topluyoruz?' :
               activeSection === 'userRights' ? 'Kişisel verileriniz üzerindeki haklarınız' :
               activeSection === 'dataProcessingConsent' ? 'Verilerinizin işlenmesi için izin talebi' :
               activeSection === 'contact' ? 'Veri sorumlusuna nasıl ulaşırsınız?' :
               'Kişisel verilerinizin korunmasına önem veriyoruz'}
            </p>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Gizlilik Politikası</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol Menü - Navigasyon */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaShieldAlt className="mr-2 text-blue-600" />
                İçerik
              </h3>

              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigateToSection('introduction')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'introduction' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Giriş
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('dataCollection')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'dataCollection' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    İşlenen Kişisel Veriler
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('dataUsage')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'dataUsage' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    İşlenme Amaçları
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('thirdParties')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'thirdParties' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Kişisel Verilerin Aktarımı
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('dataSecurity')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'dataSecurity' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Toplama Yöntemi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('userRights')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'userRights' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Haklarınız
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('dataProcessingConsent')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'dataProcessingConsent' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Veri İşleme İzni
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToSection('contact')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${activeSection === 'contact' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    İletişim
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ İçerik - Gizlilik Politikası */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="prose max-w-none">
                {/* Giriş */}
                <section id="introduction" ref={sectionRefs.introduction} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaShieldAlt className="text-blue-600" size={20} />
                    </div>
                    UNİQCAL İLETİŞİM HİZMETLERİ SANAYİ TİCARET LİMİTED ŞİRKETİ
                    <br />KİŞİSEL VERİLERİN İŞLENMESİNE DAİR AYDINLATMA METNİ
                  </h2>
                  <p className="text-gray-700 font-semibold mb-4">
                    Güvenliğiniz Bizim İçin Önemli!
                  </p>
                  <p className="mb-6">
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK" veya "Kanun") ve 10 Mart 2018 tarihli Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında; kişisel verilerinizin işlenmesine ilişkin olarak veri sorumlusu sıfatıyla UNİQCAL İLETİŞİM HİZMETLERİ SANAYİ TİCARET LİMİTED ŞİRKETİ ("Uniqcal") tarafından sizleri bilgilendirmek istiyoruz.
                  </p>
                  <div className="bg-blue-50 p-5 border border-blue-200 rounded-lg mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">1. VERİ SORUMLUSU BİLGİLERİ</h3>
                    <ul className="space-y-1">
                      <li><strong>Unvan:</strong> UNİQCAL İLETİŞİM HİZMETLERİ SANAYİ TİCARET LİMİTED ŞİRKETİ</li>
                      <li><strong>Adres:</strong> KAVACIK MAH. ŞEHİT TEĞMEN ALİ YILMAZ SK. TALIA PLAZA NO: 14 İÇ KAPI NO: 3 BEYKOZ/ İSTANBUL</li>
                      <li><strong>Telefon:</strong> 0850 806 60 00</li>
                      <li><strong>Web:</strong> <a href="https://www.kablointernet.com.tr/" className="text-blue-600 hover:underline">https://www.kablointernet.com.tr/</a></li>
                      <li><strong>E-posta:</strong> info@kablointernet.com.tr</li>
                    </ul>
                  </div>
                </section>

                {/* İşlenen Kişisel Veriler */}
                <section id="dataCollection" ref={sectionRefs.dataCollection} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaUserLock className="text-blue-600" size={20} />
                    </div>
                    2. İŞLENEN KİŞİSEL VERİLER
                  </h2>
                  <p className="mb-4">
                    TÜRKSAT A.Ş. ile olan ilişkiniz kapsamında aşağıdaki kişisel verileriniz işlenebilir:
                  </p>
                  <ul className="list-disc pl-5 space-y-3 mb-4">
                    <li>
                      <strong>Kimlik Bilgileri:</strong> Ad, soyad, doğum yeri ve tarihi, yaş, fotoğraf, kimlik bilgileri
                    </li>
                    <li>
                      <strong>İletişim Bilgileri:</strong> Adres, e-posta, telefon, ikamet bilgileri
                    </li>
                    <li>
                      <strong>Fiziksel Mekân Güvenlik Verileri:</strong> Giriş-çıkış kayıtları, kamera kayıtları
                    </li>
                    <li>
                      <strong>Siber Güvenlik Verileri:</strong> Kullanıcı adı, şifre, IP adresi, erişim logları vb.
                    </li>
                  </ul>
                </section>

                {/* Kişisel Verilerin İşlenme Amaçları */}
                <section id="dataUsage" ref={sectionRefs.dataUsage} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaDatabase className="text-blue-600" size={20} />
                    </div>
                    3. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI
                  </h2>
                  <p className="mb-4">
                    Kişisel verileriniz; aşağıdaki amaçlarla, Kanun'un öngördüğü ilkeler doğrultusunda işlenmektedir:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <li>Sözleşme ve yasal yükümlülüklerin yerine getirilmesi</li>
                    <li>Abonelik işlemleri (başlatma, iptal, devir vb.)</li>
                    <li>Sistem ve hizmet taleplerinin karşılanması</li>
                    <li>Fiziksel ve siber güvenliğin sağlanması</li>
                    <li>WebTV, kullanıcı hesabı, kota ve fatura işlemlerinin yürütülmesi</li>
                    <li>Tanıtım, pazarlama ve kampanya bilgilendirmeleri</li>
                    <li>Çağrı merkezi ve müşteri hizmetleri süreçleri</li>
                    <li>Denetim, eğitim, organizasyon, fuar ve toplantı faaliyetleri</li>
                    <li>E-Devlet ve dijital hizmetlerin sunumu</li>
                    <li>Yasal kurumlara bilgi sunulması, hukuki süreçlerin takibi</li>
                    <li>Hizmet kalitesinin ve çeşitliliğinin artırılması</li>
                    <li>Misafirhane, taşıt servisi, sağlık tetkiki gibi destek hizmetlerinin yönetimi</li>
                  </ul>
                </section>

                {/* Kişisel Verilerin Aktarımı */}
                <section id="thirdParties" ref={sectionRefs.thirdParties} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaDatabase className="text-blue-600" size={20} />
                    </div>
                    4. KİŞİSEL VERİLERİN AKTARIMI
                  </h2>
                  <p className="mb-4">
                    Kişisel verileriniz, yukarıda belirtilen amaçlarla ve KVKK'nın 8. ve 9. maddeleri çerçevesinde;
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Yetkili kamu kurumları, mahkemeler, kolluk kuvvetleri</li>
                    <li>Hizmet aldığımız firmalar, iş ortaklarımız</li>
                    <li>Dijital ajanslar, çağrı merkezleri, bankalar, sigorta şirketleri</li>
                    <li>Denetim firmaları, PTT, lojistik firmaları</li>
                    <li>Yurtiçinde ve yurtdışında bulunan çözüm ortaklarımızla paylaşılabilir.</li>
                  </ul>
                </section>

                {/* Toplama Yöntemi */}
                <section id="dataSecurity" ref={sectionRefs.dataSecurity} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaShieldAlt className="text-blue-600" size={20} />
                    </div>
                    5. KİŞİSEL VERİLERİN TOPLANMA YÖNTEMİ VE HUKUKİ SEBEBİ
                  </h2>
                  <p className="mb-4">
                    Verileriniz; çağrı merkezi, internet, sosyal medya, mobil uygulamalar, eğitim ve organizasyonlar, üçüncü kişiler ve resmi merciler gibi kanallar üzerinden KVKK'nın 5, 6 ve 8. maddelerine uygun olarak toplanmaktadır.
                  </p>
                </section>

                {/* KVKK Kapsamında Hakları */}
                <section id="userRights" ref={sectionRefs.userRights} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaUserLock className="text-blue-600" size={20} />
                    </div>
                    6. KVKK KAPSAMINDA HAKLARINIZ
                  </h2>
                  <p className="mb-4">
                    Kanun'un 11. maddesi uyarınca sahip olduğunuz haklar şunlardır:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Kişisel verinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenmişse bilgi talep etme</li>
                    <li>İşleme amacını ve uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içi/yurt dışı veri aktarımını öğrenme</li>
                    <li>Eksik/yanlış verilerin düzeltilmesini isteme</li>
                    <li>Silinmesini/yok edilmesini isteme</li>
                    <li>İşlemlerin 3. kişilere bildirilmesini isteme</li>
                    <li>Otomatik sistemlere dayalı işlemlere itiraz etme</li>
                    <li>Kanuna aykırı işlem nedeniyle zararın giderilmesini talep etme</li>
                  </ul>
                </section>

                {/* Veri İşleme İzni */}
                <section id="dataProcessingConsent" ref={sectionRefs.dataProcessingConsent} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaFileContract className="text-blue-600" size={20} />
                    </div>
                    VERİ İŞLEME İZNİ
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                    <p className="mb-3">
                      Veri işleme izni, hizmetlerinizi geliştirmek amacıyla, ilgili yasal düzenlemelere uygun olarak 
                      verilerinizin kişisel bilgileriniz kullanılmadan işlenmesini sağlayan bir izindir.
                    </p>
                    <p className="mb-3">
                      Verilerin işlenmesine verdiğiniz izni dilediğiniz zaman iptal edebilirsiniz.
                    </p>
                    <p className="mb-3">
                      Verileriniz hiçbir şekilde üçüncü şahıslarla paylaşılmaz.
                    </p>
                    <p>
                      Kişisel bilgilere gerek duyulmadan işlenen veriler, hizmetlerin iyileştirilmesine ve 
                      çeşitlendirilmesine yardımcı olur.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="consent" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label htmlFor="consent" className="ml-3 font-medium text-gray-700">
                        Kişisel verilerimin işlenmesine ilişkin Aydınlatma Metni'ni okudum, anladım ve onaylıyorum.
                      </label>
                    </div>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
                      onClick={() => alert('Onayınız alındı. Teşekkür ederiz.')}
                    >
                      Onayla
                    </button>
                  </div>
                </section>

                {/* İletişim */}
                <section id="contact" ref={sectionRefs.contact} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaRegEnvelope className="text-blue-600" size={20} />
                    </div>
                    İletişim
                  </h2>
                  <p className="mb-4">
                    KVKK kapsamındaki haklarınızla ilgili talepleriniz için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
                    <h3 className="font-bold text-gray-800 mb-2">UNİQCAL İLETİŞİM HİZMETLERİ SANAYİ TİCARET LİMİTED ŞİRKETİ</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Adres:</strong> KAVACIK MAH. ŞEHİT TEĞMEN ALİ YILMAZ SK. TALIA PLAZA NO: 14 İÇ KAPI NO: 3 BEYKOZ/ İSTANBUL
                      </li>
                      <li>
                        <strong>Telefon:</strong> 0850 806 60 00
                      </li>
                      <li>
                        <strong>E-posta:</strong> info@kablointernet.com.tr
                      </li>
                      <li>
                        <strong>Web:</strong> <a href="https://www.kablointernet.com.tr/" className="text-blue-600 hover:underline">www.kablointernet.com.tr</a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sayfa başına dön butonu */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Sayfa başına dön"
      >
        <FaAngleUp size={24} />
      </button>
    </div>
  );
};

export default PrivacyPolicy;