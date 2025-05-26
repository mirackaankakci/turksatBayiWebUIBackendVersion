import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignData } from '../helpers/CampaingData';
import { FaWifi, FaTv, FaPhoneAlt, FaCheckCircle, FaInfoCircle, FaArrowRight, FaRegFileAlt } from 'react-icons/fa';

const CampaignDetail = () => {
  const { kampanyaId } = useParams();
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState('24');
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    agreement: false
  });

  // Form değişikliklerini izle
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini API'ye gönderme işlemi burada yapılabilir
    console.log('Form gönderildi:', formData);
    alert('Başvurunuz alındı! Kısa sürede sizinle iletişime geçeceğiz.');
    
    // Formu temizle
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      agreement: false
    });
  };
  
  // Kampanya verilerini yükle
  useEffect(() => {
    // Gerçek bir API'den veri çekiyormuş gibi bir gecikme ekleyelim
    setLoading(true);
    
    setTimeout(() => {
      // URL'den gelen ID'ye göre kampanya bul (gerçek uygulamada bu bir API çağrısı olurdu)
      // Artık indeks yerine kampanyanın ID'sine göre arama yapıyoruz
      const foundCampaign = CampaignData.find(camp => camp.id.toString() === kampanyaId);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      } else {
        // Kampanya bulunamadıysa kampanyalar sayfasına yönlendir
        navigate('/kampanyalar');
      }
      
      setLoading(false);
    }, 500);
  }, [kampanyaId, navigate]);
  
  // Kategori ikonunu belirle
  const getCategoryIcon = (category) => {
    switch(category) {
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
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                {getCategoryIcon(campaign.category)}
                <span className="ml-2 text-sm bg-blue-800 px-3 py-1 rounded-full">
                  {campaign.category === 'internet' ? 'Kablonet' : 
                   campaign.category === 'tv' ? 'Kablo TV' : 
                   campaign.category === 'combo' ? 'Kombo Paket' : 'Kampanya'}
                </span>
                {campaign.popular === "true" && (
                  <span className="ml-2 text-sm bg-green-500 px-3 py-1 rounded-full">
                    Popüler
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{campaign.kampanyaAdi}</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">{campaign.aciklama}</p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Taahhüt Seçenekleri</h2>
                </div>
                
                <div className="flex justify-start gap-4 mb-6">
                  <button 
                    onClick={() => setSelectedTerm('12')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      selectedTerm === '12' 
                        ? 'bg-white text-blue-700' 
                        : 'bg-blue-800/50 hover:bg-blue-800'
                    }`}
                  >
                    12 Ay
                  </button>
                  <button 
                    onClick={() => setSelectedTerm('24')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      selectedTerm === '24' 
                        ? 'bg-white text-blue-700' 
                        : 'bg-blue-800/50 hover:bg-blue-800'
                    }`}
                  >
                    24 Ay
                  </button>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold mr-1 text-white">
                    {selectedTerm === '12' ? campaign.taahut12Fiyat : campaign.taahut24Fiyat}
                  </span>
                  <span className="text-blue-100">/ay</span>
                </div>
                
                <div className="text-sm text-blue-200 mt-2">
                  {selectedTerm === '12' 
                    ? `24 Ay taahhüt seçeneği: ${campaign.taahut24Fiyat}/ay`
                    : `12 Ay taahhüt seçeneği: ${campaign.taahut12Fiyat}/ay`
                  }
                </div>
              </div>
              
              <button 
                onClick={() => document.getElementById('basvuru-formu').scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-500 hover:bg-green-600 transition-colors text-white font-medium px-8 py-3 rounded-md inline-flex items-center"
              >
                <FaArrowRight className="mr-2" />
                Hemen Başvur
              </button>
            </div>
            
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
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button className="px-6 py-4 font-medium text-blue-600 border-b-2 border-blue-600">
                    Kampanya Detayı
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kampanya Özellikleri</h2>
                
                <ul className="space-y-4 mb-8">
                  {campaign.ozellikler.map((ozellik, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{ozellik}</span>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kampanya Hakkında</h2>
                
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
                  
                  <h3 className="text-xl font-bold text-gray-800 my-4">Neden Bu Kampanya?</h3>
                  
                  <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Uygun fiyat garantisi</li>
                    <li>Kolay kurulum ve hızlı aktivasyon</li>
                    <li>7/24 teknik destek</li>
                    <li>Memnuniyet garantisi</li>
                    <li>Taahhüt süresi boyunca fiyat avantajı</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Sıkça Sorulan Sorular */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sıkça Sorulan Sorular</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Bu kampanyadan kimler faydalanabilir?</h3>
                    <p className="text-gray-700">
                      Bu kampanya, altyapımızın bulunduğu bölgelerdeki yeni müşterilerimiz için geçerlidir. Mevcut müşterilerimiz için farklı kampanyalarımız bulunmaktadır.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Taahhüt süresi dolmadan iptal etmek istersem ne olur?</h3>
                    <p className="text-gray-700">
                      Taahhüt süresi dolmadan hizmeti iptal etmeniz durumunda, o ana kadar kampanyalı fiyat üzerinden sağlanan indirimler ve varsa kurulum ücretleri fatura edilir.
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
                </div>
              </div>
            </div>
          </div>
          
          {/* Başvuru Formu */}
          <div id="basvuru-formu" className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold">Hemen Başvurun</h2>
                <p className="mt-2 text-blue-100 text-sm">
                  Formu doldurun, müşteri temsilcimiz sizinle iletişime geçsin
                </p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0555 123 4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">İl</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="ankara">Ankara</option>
                      <option value="istanbul">İstanbul</option>
                      <option value="izmir">İzmir</option>
                      <option value="bursa">Bursa</option>
                      <option value="antalya">Antalya</option>
                      {/* Diğer iller */}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreement"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="mt-1 mr-2"
                        required
                      />
                      <label htmlFor="agreement" className="text-xs text-gray-600">
                        <a href="/kvkk" className="text-blue-600 hover:underline" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum, anladım ve kabul ediyorum.
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Başvuruyu Tamamla
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-3">Hemen Arayın</p>
                  <a href="tel:08505325000" className="text-xl font-bold text-blue-600 hover:underline">
                    0850 532 50 00
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Kampanya Koşulları */}
        <div className="bg-gray-100 rounded-lg p-6 mt-6">
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
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;