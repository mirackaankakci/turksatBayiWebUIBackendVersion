import React, { useState } from 'react';
import serit from "/assets/serit.png";
import modemBannerLogo from "/assets/modems/cloud-network.png";

const NetDevices = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('akilli');
    const [activeInfoSection, setActiveInfoSection] = useState('modemBilgileri');

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
            name: "Huawei - EG8247W Modem",
            modelName: "EchoLife EG8247W", // Tablo başlığı için ayrı bir alan ekledim
            type: "Fiber Modem",
            image: '/assets/modems/modem1.webp',
            shortDescription: "G-Pon teknolojisi ile hizmet verilen adreslerde kullanılabilir.",
            detailedDescription: "Bu modem Türksat GPON altyapısında daireye kadar fiber olan bağlantılarda kullanılabilir. Docsis fiber altyapısında kullanılamaz. Ezhome EG8247W ONT Ezhome EG8247W Optik Ağ Terminal (ONT), Huawei'in FTTH gününüzde kullanılan üst düzey bir ağ geçididir. Ev ve SOHO kullanıcıları için GPON teknolojisi yoluyla ultra-geniş bant erişimi sağlayan EG8247W, dört GE bağlantı noktası, iki POTS bağlantısı noktası, bir USB bağlantı noktası, bir CATV bağlantı noktası ve bir 2.4G Wi-Fi 5 bağlantısı noktasına sunar. VoIP, internet ve HD video servislerinde mükemmel deneyimi güvence altına olmak için yüksek performanslı temin yönetellerine sahiptir.",
            specifications: [
                { name: "Boyutlar (Y x G x D)", value: "295 mm x 82 mm x 184 mm" },
                { name: "Çalışma Sıcaklığı", value: "0°C ila 40°C" },
                { name: "Çalışma Nemi", value: "%5 ila %95 RH (yoğuşmasız)" },
                { name: "Güç Adaptörü Giriş", value: "100V ila 240V AC, 50 Hz/60 Hz" },
                { name: "Sistem Güç Kaynağı", value: "11V ila 14V DC, 3A" },
                { name: "Ağ Temel Bağlantı Noktaları", value: "GPON" },
                { name: "Kullanıcı Tarafı Bağlantı Noktaları", value: "2 POTS + 4 GE + USB + CATV + 2.4G Wi-Fi/5G Wi-Fi" },
                { name: "Göstergeler", value: "Power/PON/LOS/TEL/LAN/CATV/WLAN/WPS/USB" }
            ],
            pricing: [
                { period: "12 Ay Taahhüt", price: 40, perMonth: true },
                { period: "24 Ay Taahhüt", price: 40, perMonth: true },
            ]
        },
        {
            id: 2,
            name: "ZTE ZXHN - F6600 GPON Modem",
            modelName: "Parameter", // Tablo başlığı için ayrı bir alan ekledim
            type: "Fiber Modem",
            image: '/assets/modems/ZXHN.webp',
            shortDescription: "G-Pon teknolojisi ile hizmet verilen adreslerde kullanılabilir.",
            detailedDescription: "ZXHN F6600, Wi-Fi 6'yı destekler ve dört GE LAN bağlantı noktası ve iki telefon bağlantı noktasıyla birlikte gelir. MU-MIMO ve OFDMA teknolojileri, Wi-Fi ağının verimliliğini önemli ölçüde artırır. Mükemmel Wi-Fi performansı, kullanıcıların web'de daha iyi gezinmesine, video izlemesine ve çevrimiçi oyunlar oynamasına olanak tanır.",
            specifications: [
                { name: "WAN", value: "GPON" },
                { name: "LAN", value: "2x2 11ax@2.4GHz+ 2x2 11ax@5GHz; 4*GE; 2*FXS; 1*USB" },
                { name: "Buttons", value: "On/Off, Reset, WPS, Wi-Fi" },
                { name: "Electrical", value: "AC adapter: 12 V DC" },
                { name: "LEDs", value: "Power, PON, LOS, Internet, LAN1, LAN2, LAN3, LAN4, Phone1, Phone2, Wi-Fi, WPS, USB" },
                { name: "Dimensions", value: "210 mm*130 mm*35 mm (Not including antenna) (W*H*D)" },
                { name: "Operating temperature	", value: "0 °C~ 40°C" },
                { name: "Certification", value: "CE certification；Wi-Fi 6 certification" }
            ],
            pricing: [
                { period: "12 Ay Taahhüt", price: 40, perMonth: true },
                { period: "24 Ay Taahhüt", price: 40, perMonth: true },
            ]
        },
        {
            id: 3,
            name: "H&D NE1611C Modem",
            modelName: "Parameter", // Tablo başlığı için ayrı bir alan ekledim
            type: "Fiber Modem",
            image: '/assets/modems/ne1611c.webp',
            shortDescription: "Yeni nesil Docsis fiber altyapı destekli koaksiyel modem",
            detailedDescription: "NE1611, DOCSIS 3.0 kablolu modem, yönlendirici, ses ve kablosuz AP'yi tek bir cihazda birleştiren yüksek performanslı bir kablolu internet ağ geçididir.NE1611 gigabit ağ arabirimi sağlar. 2.4G ve 5G frekanslarında kablosuz ağı destekler.Kablosuz iletim hızı 1600Mbps'ye kadar ulaşabilir. İşletmeler ve aileler için daha iyi çevrimiçi deneyim için yeni nesil Wi-Fi6 ürünleri olarak zengin yazılım özelliklerini destekler. ",
            specifications: [
                { name: "-", value: "Compatible with DOCSIS/Euro-DOCSIS 3.0/2.0/1.1/1.0." },
                { name: "-", value: "Compatible with PacketCable1.5." },
                { name: "-", value: "Dual-band concurrent Wireless Access Point compatible with 802.11a/b/g/n/ac." },
                { name: "-", value: "24x8 Channel Bonding." },
                { name: "-", value: "Full Capture Bandwidth Tuner." },
                { name: "-", value: "Four 10/100/1000BASE-T Ethernet ports to provide wired connectivity." },
                { name: "-", value: "Two FXS lines of carrier-grade VoIP with HD voice support." },
                { name: "-", value: "Built-in BPI/BPI plus." }
            ],
            pricing: [
                { period: "12 Ay Taahhüt", price: 40, perMonth: true },
                { period: "24 Ay Taahhüt", price: 40, perMonth: true },
            ]
        },
        {
            id: 4,
            name: "Netmaster Infinity 401 Modem",
            modelName: "Parameter", // Tablo başlığı için ayrı bir alan ekledim
            type: "Fiber Modem",
            image: '/assets/modems/infinity401.webp',
            shortDescription: "Docsis 3.0 fiber altyapı destekli koaksiyel modem",
            detailedDescription: "Infinity401, DOCSIS 3.0 kanal birleştirme (channel bonding) fonksiyonlarını sunan üstün bir üründür ve bunun yanında tüm mevcut DOCSIS 3.0/2.0/1.1/1.0 head-end araçları ve Çoklu Hizmet Operatör (Multiple Service Operator/MSO) ağları ile geriye dönük olarak uyumludur. Türksat Kablonet/Kabloses şebekesi uyumlu VoIP hizmeti (NCS) desteği de sağlayan Infinity401, 2 portlu ağ anahtarı ve IEEE 802.11n ve 802.11AC kablosuz fonksiyonları ile yerleşik ağ geçidi olarak da kullanılabilir.",
            specifications: [

            ],
            pricing: [
                { period: "12 Ay Taahhüt", price: 40, perMonth: true },
                { period: "24 Ay Taahhüt", price: 40, perMonth: true },
            ]
        },
        {
            id: 5,
            name: "Zyxel - VMG3625-T50B Modem",
            modelName: "Parameter", // Tablo başlığı için ayrı bir alan ekledim
            type: "Fiber Modem",
            image: '/assets/modems/wmg3625-t50b.webp',
            shortDescription: "VDSL teknolojisi ile hizmet verilen adreslerde kullanılabilir.",
            detailedDescription: "Zyxel VMG3625-T50B, üçlü-oyun hizmetleri için dünya çapında pazar gereksinimlerini karşılamak üzere yüksek hızlı İnternet erişimi sağlar. Zahmetli kabloları hafifleten dahili 2x2 802.11ac WLAN işlevine sahip bu model, mükemmel WiFi kullanıcı deneyimi için olağanüstü bir kapsama alanı sunar. Dahası, kullanıcı odaklı tasarımı ile güçlü ve pratik işlevler sunarken her müşterinin kendi stilinden bir parça bulabilmesine izin verir.",
            specifications: [
                { name: "Üçlü-Oyun Güç Merkezi", value: "Zyxel VMG3625-T50B, birinci sınıf video dağıtım servisleri için gelişmiş QoS ve IGMP v1/2/3 gözetleme ve VLAN özellikleri gibi çok noktaya yayın trafik şekillendirme özellikleri ile üretilmiştir. Kablosuz IPTV operatörleri için dahili 2x2, 802.11ac çipi en iyi seçimdir." },
                { name: "Kusursuz hareketlilik için taşıyıcı sınıfı WiFi", value: "AC1200 olarak sınıflandırılan Zyxel VMG3625-T50B, 5 GHz üzerinde 867 Mbps * ve 2,4 GHz üzerinde 300 Mbps * hıza ulaşır. Daha iyi kullanıcı deneyimi için dört model, eşzamanlı, gecikmesiz akış ve oyun deneyimleri için Çok Kullanıcılı MIMO (MU-MIMO) ve Beamforming gibi performans artırıcı özelliklere sahip çift bantlı d WiFi sunar. Ayrıca, 4 adede kadar SSID ile birden fazla WiFi ağı oluşturma özelliği, operatörlerin video, veri ve misafirler için kolayca bireysel WLAN ağları oluşturmasına yardımcı olur." },
                { name: "UHD IPTV hizmeti için ultra hız", value: "Zyxel VMG3625-T50B, operatörlerin daha iyi UHD 4k IPTV servisleri sunmalarını sağlayan geniş bant erişim performansını destekler." },
            ],
            pricing: [
                { period: "12 Ay Taahhüt", price: 40, perMonth: true },
                { period: "24 Ay Taahhüt", price: 40, perMonth: true },
            ]
        }
    ];

    // Arama filtreleme
    const filteredModems = modemler.filter(modem =>
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
                <div className='flex justify-between items-center h-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className="text-white max-w-xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">Kablonet Fiber Modemler</h1>
                        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-blue-100">Türksat Kablonet Fiber Altyapısına Uygun Fiber Modemler</p>
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
                            <span className="font-medium"> {filteredModems.length}</span> sonuç bulundu
                        </p>
                    </div>
                )}

                {/* Cihaz Listesi */}
                <div className="space-y-10">
                    {filteredModems
                        .filter(modem => selectedTab ? modem.type === selectedTab : true)
                        .map((modem) => (
                            <div key={modem.id} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Başlık */}
                                <div className="p-6 pb-4">
                                    <h2 className="text-xl font-semibold text-blue-700">{modem.name}</h2>
                                    <p className="text-gray-600 mt-1">{modem.shortDescription}</p>
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
                                                <div key={index} className="border border-blue-200 rounded-md bg-white overflow-hidden">
                                                    <div className="bg-blue-50 px-4 py-1.5 border-b border-blue-200">
                                                        <p className="text-xs text-blue-800">{price.period}</p>
                                                    </div>
                                                    <div className="px-4 py-2">
                                                        <p className="text-center font-semibold text-gray-800">
                                                            {price.price.toFixed(2)} TL{price.perMonth ? " / AY" : ""}
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
                                        <p className="text-gray-700 mb-6">{modem.detailedDescription}</p>

                                        {/* Görseldeki gibi teknik özellikler tablosu */}
                                        <div className="mt-4">
                                            <table className="min-w-full border border-gray-200 text-sm">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="p-2 text-left font-medium text-gray-700 border-b border-gray-200">Özellikler</th>
                                                        <th className="p-2 text-left font-medium text-gray-700 border-b border-gray-200">
                                                            {modem.modelName || modem.name.split(" - ")[1]?.replace(" Modem", "") || "Özellikler"}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 rounded-md">
                                                    {modem.specifications.map((spec, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                            <td className="p-2 text-gray-700 font-medium border-r border-gray-200">{spec.name}</td>
                                                            <td className="p-2 text-gray-600">{spec.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* İhtiyaç durumunda uyarı bölümü */}
                            </div>
                        ))}
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-[100px] border border-gray-200">
                    <div className="p-6 md:p-8">


                        {/* Info Tab Buttonları */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                            <button
                                onClick={() => setActiveInfoSection('kablonetModemCesitleri')}
                                className={`py-3 px-4 rounded-lg text-left transition ${activeInfoSection === 'modemBilgileri'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Tarifeleri Nelerdir?</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('kablonetModem')}
                                className={`py-3 px-4 rounded-lg text-left transition ${activeInfoSection === 'kablonetModem'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Modem Nedir?</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('kablonetModemTeknolojileri')}
                                className={`py-3 px-4 rounded-lg text-left transition ${activeInfoSection === 'kablonetModemTeknolojileri'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Modem Teknolojileri</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('turksatAltyapısınaUygunModemCesitleri')}
                                className={`py-3 px-4 rounded-lg text-left transition ${activeInfoSection === 'turksatAltyapısınaUygunModemCesitleri'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                    <span className="font-medium">Türksat Altyapısına Uygun Modem Çeşitleri</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('enİyiKabloModemModelleri')}
                                className={`py-3 px-4 rounded-lg text-left transition ${activeInfoSection === 'enİyiKabloModemModelleri'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                    <span className="font-medium">En İyi Kablo Modem Modeller</span>
                                </div>
                            </button>

                        </div>

                        {/* İçerik bölümleri */}
                        {activeInfoSection === 'kablonetModemCesitleri' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Modem Çeşitleri</h3>

                                <p>G&uuml;n&uuml;m&uuml;zde, hızlı ve g&uuml;venilir bir internet bağlantısı hayatımızın &ouml;nemli bir par&ccedil;ası haline geldi. İnternet hızının artmasıyla birlikte, insanlar y&uuml;ksek kaliteli i&ccedil;eriklerin keyfini &ccedil;ıkarırken, evden &ccedil;alışma ve &ccedil;evrimi&ccedil;i eğitim gibi etkinlikleri daha da kolaylaştırmaktadırlar. İnternet servis sağlayıcınızın sunduğu internet hızını artırmak i&ccedil;in doğru Kablonet modemi se&ccedil;mek &ouml;nemlidir. Yazımızda&nbsp;<strong>Kablonet modem</strong>&nbsp;teknolojileri ve &ccedil;eşitleri hakkında bilgi edinecek ve internet bağlantınızın hızını artırmak i&ccedil;in hangi modemleri se&ccedil;meniz gerektiğini &ouml;ğreneceksiniz.</p>
                            </div>
                        )}

                        {activeInfoSection === 'kablonetModem' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Modem Nedir?</h3>
                                Kablonet modem, Türksat internet servis sağlayıcısının gönderdiği veri sinyallerini alarak evinizdeki internet bağlantısını sağlayan temel cihazlardan biridir. Kablo modemler, Kablo TV altyapısı üzerinden internet erişimi sunar ve evdeki tüm cihazların kablosuz veya kablolu şekilde internete bağlanmasını mümkün kılar. Türksat, abonelerine modemleri ister kiralama yöntemiyle ister satın alma seçeneğiyle temin etme imkânı sunar. Bunun yanı sıra, kullanıcılar dilerse Kablonet altyapısıyla uyumlu modemleri özel teknoloji mağazalarından veya çevrim içi satış kanallarından kendileri de temin edebilirler. Doğru modem seçimi, Kablonet internet hizmetinden en verimli şekilde faydalanmak için oldukça önemlidir.
                                {/* İçerik devam edebilir */}
                            </div>
                        )}

                        {activeInfoSection === 'kablonetModemTeknolojileri' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Modem Teknolojileri</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerine sunduğu çeşitli kampanyalarla internet hizmetini daha avantajlı hale getirir. Bu kampanyalar kapsamında abonelere indirimli tarifeler, ücretsiz modem temini, hediye internet kotaları ve benzeri birçok fırsat sunulmaktadır. Kablonet kampanyaları sayesinde kullanıcılar, hem bütçelerini koruyarak hem de daha kapsamlı hizmet alarak internet deneyimlerinden maksimum verim elde edebilirler. İhtiyaca özel hazırlanan bu kampanyalar, yeni aboneliklerden mevcut kullanıcı avantajlarına kadar geniş bir yelpazeyi kapsar. Böylece Kablonet, yalnızca hızlı ve güvenilir internet sağlamakla kalmaz, aynı zamanda sunduğu kampanyalarla müşteri memnuniyetini de en üst seviyeye taşır.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'turksatAltyapısınaUygunModemCesitleri' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Türksat Altyapısına Uygun Modem Çeşitleri</h3>
                                <p className="text-gray-600 mb-4">
                                    DOCSIS (Data Over Cable Service Interface Specification), koaksiyel kablolar üzerinden internet hizmeti sağlayan bir bağlantı teknolojisidir. Bu sistemde, kullanıcılar 100 Mbps’ye kadar indirme ve 20 Mbps’ye kadar yükleme hızlarına ulaşabilen tarifelerden faydalanabilir. Türksat altyapısında en yaygın olarak kullanılan versiyonlar DOCSIS 3.0 ve DOCSIS 3.1'dir. Özellikle DOCSIS 3.1 teknolojisi, daha fazla kanal desteği sunarak kullanıcıya yüksek hızlarda daha stabil bağlantı imkânı tanır ve tüm frekans spektrumunu kullanarak veri iletim kapasitesini artırır. Bununla birlikte, bazı bölgelerde DOCSIS 2.0 standardı da hâlâ desteklenmekte ve bu yapı üzerinden 20 Mbps’ye kadar hız sağlanmaktadır.

                                    GPON (Gigabit Passive Optical Network) ise daireye kadar fiber internet hizmeti sunan bir teknolojidir. Bu sistem, interneti optik fiber kablolar üzerinden ileterek daha yüksek hızlar ve daha düşük gecikme süresi sağlar. GPON altyapısında, internet servis sağlayıcısının merkezinde yer alan OLT (Optical Line Terminal) cihazı ile kullanıcıların ev ya da işyerlerine yerleştirilen ONT (Optical Network Terminal) cihazları arasında bağlantı kurulur. ONT’ler, yalnızca internet bağlantısı sağlamakla kalmaz, aynı zamanda IP telefon ve dijital TV hizmetleri gibi diğer servisleri de destekler. Geleneksel modemlere kıyasla daha gelişmiş donanım özelliklerine sahip olan ONT’ler, fiber altyapının sunduğu yüksek hız ve kararlılığı son kullanıcıya taşır.

                                    Kablonet, bu iki teknolojiyi farklı bölgelerdeki altyapı koşullarına göre kullanarak müşterilerine yüksek performanslı ve güvenilir internet hizmeti sunmayı hedeflemektedir.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'enİyiKabloModemModelleri' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">En İyi Kablo Modem Modeller</h3>
                                <p className="text-gray-600 mb-4">
                                    En iyi kablo modem modelleri, kullanıcıların internet kullanım alışkanlıklarına, ihtiyaçlarına ve bütçelerine göre farklılık gösterebilir. Ancak genel olarak değerlendirme yapılırken bazı temel kriterler öne çıkar.

                                    Bunlardan ilki hızdır. Yüksek hızlı internet bağlantısını destekleyen modemler, özellikle büyük dosya indirme, video akışı, çevrim içi oyun gibi yüksek bant genişliği gerektiren işlemlerde büyük avantaj sağlar. Bu nedenle, en iyi kablo modem modelleri genellikle yüksek indirme ve yükleme hızlarını destekleyen, güncel DOCSIS standartlarına sahip ürünlerdir.

                                    Bir diğer önemli kriter, işletim sistemi uyumluluğudur. Kullanıcıların tercih ettiği bilgisayar ve cihaz işletim sistemleriyle uyumlu çalışan modemler, kurulumda ve kullanımda sorun yaşanmaması açısından tercih edilir. Hem Windows, hem macOS, hem de Linux gibi sistemlerle sorunsuz çalışan modemler, daha geniş bir kullanıcı kitlesine hitap eder.

                                    Fiyat-performans dengesi de modem seçiminde belirleyici bir etkendir. Kaliteli bağlantı ve gelişmiş özellikler sunarken uygun fiyatlı olan modeller, kullanıcılar tarafından daha fazla tercih edilir. Pahalı olmak her zaman en iyi anlamına gelmez; bu nedenle fiyat ve sunulan özellikler birlikte değerlendirilmelidir.

                                    Modemlerin sunduğu ekstra özellikler de seçim sürecinde dikkate alınmalıdır. Örneğin, dahili Wi-Fi özelliği sayesinde aynı cihaz üzerinden hem kablolu hem de kablosuz bağlantı sağlanabilir. Çift bant Wi-Fi, çoklu cihaz desteği, gelişmiş güvenlik seçenekleri ve yönetim arayüzleri gibi fonksiyonlar da kullanıcı deneyimini doğrudan etkiler.

                                    Son olarak, marka ve model güvenilirliği göz önünde bulundurulmalıdır. Piyasada tanınan, kullanıcı yorumları olumlu ve teknik destek ağı güçlü markalar, uzun vadede daha sorunsuz bir kullanım sağlar. Netgear, Arris, TP-Link ve Motorola gibi global markalar, kablo modem konusunda sıklıkla önerilen ve tercih edilen markalardandır.

                                    Bu unsurlar bir arada değerlendirildiğinde, kullanıcılar kendi ihtiyaçlarına en uygun ve güvenilir kablo modem modelini seçebilirler.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetDevices;