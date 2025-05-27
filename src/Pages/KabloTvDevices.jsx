import React, { useState } from "react";
import serit from "../assets/serit.png";
import modemBannerLogo from "../assets/modems/cloud-network.png";

const KabloTvDevices = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("akilli");
  const [activeInfoSection, setActiveInfoSection] = useState("modemBilgileri");

  // Import görsellerini daha güvenli bir şekilde yükleme için
  const getModemImage = (imagePath) => {
    try {
      return require(`${imagePath}`);
    } catch (err) {
      return null; // Fallback olarak null döner, sonra onError ile placeholder gösterilir
    }
  };

  const modemler = [
    {
      id: 1,
      name: "Türksat TV Box",
      modelName: "EchoLife EG8247W", // Tablo başlığı için ayrı bir alan ekledim
      type: "Fiber Modem",
      image: "../src/assets/tvdevices/tv_box.webp",
      shortDescription:
        "Türksat TV Box bir Android TV cihazıdır. Abonesi olduğunuz pakete ait kanalları ve içerikleri, internetin olduğu her yerde izleyebilmenin keyfi bir başka.",
      detailedDescription: `Seç izle
        • Kaydet izle
        • Tekrar izle
        • Canlı TV'de (desteklenen kanallarda) 1 haftaya kadar geriye al
        • Playlist oluştur
        • Programları kütüphanene kaydet
        • Mobil uzaktan kumandanla yönet (android TV, akıllı TV ve i-kutu için)
        • TV Her Yerde hizmetine akıllı TV, tablet, akıllı telefon, Android TV, i-kutu cihazlarınız üzerinden erişebilirsiniz.
        • TV Her Yerde, Giriş / Temel /Üst Paket seçenekleriyle kullanıma sunulmaktadır.
        • Ayrıca, zengin içerikleriyle Gümüş Sinema Paketi, Altın Sinema Paketi, Nat Geo Now Paketi veya CosmoGo Paketi ile de satın alınabilir.
        • TV Her Yerde kullanımları, Kablonet kotanızı etkilemez. Farklı bir internet sağlayıcıdan internet hizmeti almanız durumundaysa kullanımınız internet kotanızdan düşer.`,
      specifications: [],
      pricing: [
        { period: "12 Ay Taahhüt", price: 35, perMonth: true },
        { period: "24 Ay Taahhüt", price: 35, perMonth: true },
      ],
    },
    {
      id: 2,
      name: "i-Kutu ZTE (İnteraktif HD Kutu)",
      modelName: "EchoLife EG8247W", // Tablo başlığı için ayrı bir alan ekledim
      type: "Fiber Modem",
      image: "../src/assets/tvdevices/i-kutu-kiralama_1.webp",
      shortDescription: "Kablo TV keyfinizi maksimuma çıkarın",
      detailedDescription: `• KabloWebTV ile Televizyon Deneyiminizi Yeniden Keşfedin!
        • Seç İzle: Paketiniz kapsamındaki KabloWebTV film arşivine dilediğiniz zaman ulaşın, favori filmlerinizi ve dizilerinizi keyifle izleyin.
        • Durdur İzle: İzlediğiniz yayını istediğiniz anda durdurabilir, kaldığınız yerden devam edebilirsiniz. Artık hiçbir sahneyi kaçırmak yok!
        • Sesle Yazdır: Uzun uzun yazmakla uğraşmayın! Kumandaya konuşarak ekrana yazdırın ve aradığınız içeriği kolayca bulun.
        • Sesle Kanal Değiştir: Kanal numaralarını ezberlemeye gerek kalmadan, sadece söyleyerek kanal değiştirin.
        • Tek Kumanda: TV'nizin ses ayarı, açma/kapama gibi temel kontrollerini tek kumanda ile yönetin; cihaz karmaşasına son!(Bu özellik desteklenen TV modellerinde geçerlidir.)
        • Çocuk Kumandası: Sadece çocuklara özel içeriklere erişim sağlayarak, onların güvenli bir şekilde TV izlemesini mümkün kılar.
        • Kolay Kumanda: Daha az özelliği tercih eden kullanıcılar ve yaşlı bireyler için sadeleştirilmiş kullanım sunar.(Çocuk Kumandası ve Kolay Kumanda isteğe bağlıdır ve ayrıca temin edilmelidir.)`,
      specifications: [],
      pricing: [
        { period: "12 Ay Taahhüt", price: 0, perMonth: true },
        { period: "24 Ay Taahhüt", price: 30, perMonth: true },
      ],
    },
    {
      id: 3,
      name: "i-Kutu Çocuk Kumandası",
      modelName: "EchoLife EG8247W", // Tablo başlığı için ayrı bir alan ekledim
      type: "Fiber Modem",
      image: "../src/assets/tvdevices/cocukkumanda.webp",
      shortDescription: "i-Kutu kullanımınızı kolaylaştıracak kumandalar",
      detailedDescription: `• Alternatif kumandalar sadece i-kutu ile çalışmaktadır.
            • ”Çocuk Kumandası” ile sadece çocuklar için hazırlanmış kanalların ve içeriklerin izlenmesini sağlayacak ve çocuklarınız TV izlerken daha güvende hissedeceksiniz.
            • “Kolay Kumanda” tüm özellikleri daha az tuş ile kullanmayı tercih eden kullanıcılar için tercih edilebilir. Bu kumandada Ses ile komut bluetooth teknolojileri bulunmamaktadır. En sık kullanılan ses ve kanal değiştirme gibi basit işlevleri desteklemektedir. Cihazınız ile sunulan tüm içeriklere yine ulaşabilirsiniz.`,
      specifications: [],
      pricing: [
        { period: "12 Ay Taahhüt", price: 0, perMonth: true },
        { period: "24 Ay Taahhüt", price: 30, perMonth: true },
      ],
    },
  ];

  // Arama filtreleme
  const filteredModems = modemler.filter(
    (modem) =>
      modem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modem.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="flex justify-between items-center h-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
              Kablo TV Cihaz Çeşitleri
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">
              Kiralayabileceğiniz veya Satın Alabileceğiniz Kablo TV HD Set-Top
              Box Çeşitleri
            </p>
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

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Arama sonuç bildirimi */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              "<span className="font-medium">{searchQuery}</span>" için
              <span className="font-medium"> {filteredModems.length}</span>{" "}
              sonuç bulundu
            </p>
          </div>
        )}

        {/* Cihaz Listesi */}
        <div className="space-y-10">
          {filteredModems
            .filter((modem) =>
              selectedTab ? modem.type === selectedTab : true
            )
            .map((modem) => (
              <div
                key={modem.id}
                className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Başlık */}
                <div className="p-6 pb-4">
                  <h2 className="text-xl font-semibold text-blue-700">
                    {modem.name}
                  </h2>
                  <p className="text-gray-600 mt-1 font-bold">
                    {modem.shortDescription}
                  </p>
                </div>

                {/* Ana İçerik - İki Sütunlu Düzen */}
                <div className="md:flex">
                  {/* Mobil görünümde önce görünecek görseli içeren kısım */}
                  <div className="md:order-2 md:w-1/3 bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                    {/* Modem Görseli - Mobil görünümde üstte olacak */}
                    <div className="flex justify-center mb-6">
                      <img
                        src={modem.image}
                        alt={modem.name}
                        className="max-h-[240px] object-contain"
                      />
                    </div>

                    {/* Fiyat Kartları */}
                    <div className="space-y-4">
                      {modem.pricing.slice(0, 2).map((price, index) => (
                        <div
                          key={index}
                          className="border border-blue-200 rounded-md bg-white overflow-hidden"
                        >
                          <div className="bg-blue-50 px-4 py-1.5 border-b border-blue-200">
                            <p className="text-xs text-blue-800">
                              {price.period}
                            </p>
                          </div>
                          <div className="px-4 py-2">
                            <p className="text-center font-semibold text-gray-800">
                              {price.price.toFixed(2)} TL
                              {price.perMonth ? " / AY" : ""}
                            </p>
                          </div>
                        </div>
                      ))}

                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded transition-colors">
                        Hemen Başvur
                      </button>
                    </div>
                  </div>

                  {/* Sol: Modem Açıklamaları - Mobil görünümde altta kalır */}
                  <div className="md:order-1 md:w-2/3 p-6 pt-0">
                    <p className="text-gray-700 mb-6 whitespace-pre-line">
                      {modem.detailedDescription}
                    </p>

                    {/* Görseldeki gibi teknik özellikler tablosu */}
                    {modem.specifications && modem.specifications.length > 0 ? (
                      <div className="mt-4">
                        <table className="min-w-full border border-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 text-left font-medium text-gray-700 border-b border-gray-200">
                                Özellikler
                              </th>
                              <th className="p-2 text-left font-medium text-gray-700 border-b border-gray-200">
                                {modem.modelName ||
                                  modem.name
                                    .split(" - ")[1]
                                    ?.replace(" Modem", "") ||
                                  "Özellikler"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 rounded-md">
                            {modem.specifications.map((spec, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="p-2 text-gray-700 font-medium border-r border-gray-200">
                                  {spec.name}
                                </td>
                                <td className="p-2 text-gray-600">
                                  {spec.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* İhtiyaç durumunda uyarı bölümü */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KabloTvDevices;
