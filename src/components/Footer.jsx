import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import ustserit from "/assets/ustserit.png";
import footerlogo from "/assets/footerlogo.svg";

const  Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2F3D8D] to-[#3399D2] text-white mt-[200px]">
      <div className="relative mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        {/* Üst kısım - şerit görsel */}
        <img
          src={ustserit}
          alt="Üst Şerit"
          className="absolute -top-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        
        {/* İçeriği sınırlayarak ortaya doğru sığdırıyoruz */}
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Ana Footer Bölümü */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo ve Hakkında */}
            <div className="space-y-3">
              <img 
                src={footerlogo} 
                alt="Türksat Kablonet" 
                className="h-12 mb-4"
              />
              <p className="text-sm text-gray-200">
                Türksat Kablonet, Türkiye'nin uydu operatörü Türksat A.Ş. tarafından sunulan yüksek hızlı internet ve TV hizmetidir.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                  <FaYoutube size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Hızlı Linkler</h3>
              <ul className="space-y-2">
                {['Kampanyalar', 'İnternet Paketleri', 'TV Paketleri', 'Combo Paketler', 'Kurumsal Çözümler'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destek */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Destek</h3>
              <ul className="space-y-2">
                {['Sıkça Sorulan Sorular', 'Online İşlemler', 'Fesih İşlemleri', 'Altyapı Sorgulama', 'İletişim'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">İletişim</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-200">
                  <span className="block font-medium mb-1">Adres:</span>
                  Fatih Sultan Mehmet Cad, Kavacık, Şht. Teğmen Ali Yılmaz Sk. No:14, Kat:3, 34810 Beykoz/İstanbul
                </li>
                <li className="text-sm text-gray-200">
                  <span className="block font-medium mb-1">Müşteri Hizmetleri:</span>
                  <a href="tel:08508066000" className="hover:underline">0850 806 60 00</a>
                </li>
                <li className="text-sm text-gray-200">
                  <span className="block font-medium mb-1">E-posta:</span>
                  <a href="mailto:info@turksat.com.tr" className="hover:underline">info@kablointernet.com.tr</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Alt Footer - bu da sınırlandırılıyor */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-300 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Türksat Kablonet. Tüm hakları saklıdır.
              </div>
              <div className="flex space-x-4">
                <Link to="/gizliliksozlesmesi" className="text-xs text-gray-300 hover:text-white hover:underline transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link to="/kullanim-kosullari" className="text-xs text-gray-300 hover:text-white hover:underline transition-colors">
                  Kullanım Koşulları
                </Link>
                <Link to="/cerez-politikasi" className="text-xs text-gray-300 hover:text-white hover:underline transition-colors">
                  Çerez Politikası
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;