import React from "react";
// İkonları import edin (örnek dosya yolları)
import fiberIcon from "../../assets/fiber-internet.png";
import tvIcon from "../../assets/tv-icon.png";
import serviceIcon from "../../assets/support-icon.png";
import speedIcon from "../../assets/speed-icon.png";
import routerIcon from "../../assets/router-icon.png";
import mailIcon from "../../assets/mail-icon.png";

const KablonetAdvantage = () => {
  const advantages = [
    {
      id: 1,
      title: "Fiber İnternet",
      description:
        "Türksat Kablonet, %100 Türksat'a Ait Fiber Altyapı Üzerinden Hizmet Vermektedir. Abonelerine Fiber İnternet ve Ev Paketleri En Uygun Fiyata Sunabilmektedir.",
      // SVG ikonu yerine resim kullanıyoruz
      icon: fiberIcon,
      highlight: "1000 Mbps Hızında Fiber İnternet Kullanımı Olun",
    },
    {
      id: 2,
      title: "HD Tv Yayını",
      description: "",
      icon: tvIcon,
      highlight: "Ultra HD & 4K Yayın İle Yüzlerce Yerel ve Yabancı Kanalın Tadını Çıkarın",
    },
    {
      id: 3,
      title: "Abone Servisleri",
      description:
        "Kablonet ve Kablo TV aboneliğiniz süresince ihtiyacınız olan hizmetlerimizden; tarife değişikliği, adres değişikliği, internetinizi donup kullandırma, taşınma vb. güvenliğini artırın.",
      icon: serviceIcon,
      highlight: "Size 7 Gün 24 Saat Destek Sağlayacak Teknik ve Online Abone Servisi",
    },
    {
      id: 4,
      title: "En Hızlı İnternet",
      description:
        "Milyonlar Kullanıcı Speedtest.net'te Hız Testi Yapıp, Kablonet Türkiye'nin En Hızlı İnterneti Olarak Zirveyi Paylaşıp, Milyonlar Kullanıcı Speedtest.net'te Hız Testi Yapıp, Kablonet Türkiye'nin En Hızlı İnterneti Olarak Zirveyi Paylaşır.",
      icon: speedIcon,
      highlight: "Sınırsız'dan Oyun İndirmek & Dijital Projeler İçin İyi Sonuç",
    },
    {
      id: 5,
      title: "Fiber İnternet",
      description:
        "Türksat Kablonet, %100 Türksat'a Ait Fiber Altyapı Üzerinden Hizmet Vermektedir. Abonelerine Fiber İnternet ve Ev Paketleri En Uygun Fiyata Sunabilmektedir.",
      icon: routerIcon,
      highlight: "1000 Mbps Hızında Fiber İnternet Kullanımı Olun",
    },
    {
      id: 6,
      title: "Fiber İnternet",
      description:
        "Türksat Kablonet, %100 Türksat'a Ait Fiber Altyapı Üzerinden Hizmet Vermektedir. Abonelerine Fiber İnternet ve Ev Paketleri En Uygun Fiyata Sunabilmektedir.",
      icon: mailIcon,
      highlight: "1000 Mbps Hızında Fiber İnternet Kullanımı Olun",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl">
      {/* Başlık bölümü */}


      {/* Kartları içeren bölüm */}
      <div className="space-y-3">
        {advantages.map((advantage) => (
          <div
            key={advantage.id}
            className="bg-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-center md:items-center shadow-md hover:shadow-lg transition-shadow duration-200 min-h-[220px] md:h-[110px] lg:h-[100px]"
          >
            {/* İkon - mobil için üstte */}
            <div className="flex-shrink-0 mb-3 md:mb-0 md:mr-5 self-center">
              <img 
                src={advantage.icon} 
                alt={advantage.title} 
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />
            </div>
            
            {/* İçerik - ortalanmış */}
            <div className="flex-grow overflow-hidden text-center md:text-left">
              <h3 className="text-[#304292] text-lg md:text-xl font-semibold mb-1">
                {advantage.title}
              </h3>
              {advantage.description && (
                <p className="text-gray-700 text-sm md:text-sm overflow-hidden md:line-clamp-2">
                  {advantage.description}
                </p>
              )}
              
              {/* Mobil görünümde highlight burada gösteriliyor */}
              <div className="md:hidden mt-3">
                <p className="text-[#00B7EB] text-sm font-medium">
                  {advantage.highlight}
                </p>
              </div>
            </div>
            
            {/* Sadece masaüstünde görünecek highlight bölümü */}
            <div className="hidden md:flex mt-3 md:mt-0 md:ml-4 md:w-1/4 md:border-l md:pl-4 md:border-gray-200 self-center h-full items-center">
              <p className="text-[#00B7EB] text-sm md:text-base font-medium">
                {advantage.highlight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KablonetAdvantage;