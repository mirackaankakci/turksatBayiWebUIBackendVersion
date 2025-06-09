import React, { useState } from 'react';
import serit from "/assets/serit.png";
import { Helmet } from 'react-helmet-async';

const KabloSesTariff = () => {
    // Sayfa açıldığında "tarifeler" kategorisinin seçili olması için başlangıç değerini değiştirdim
    const [selectedCategory, setSelectedCategory] = useState('tarifeler');
    const [activeInfoSection, setActiveInfoSection] = useState('tarifelerNelerdir');

    const tarifeler = [
        {
            id: 1,
            download: "50 Mbps'e Kadar",
            daytimeUpload: "20 Mbps'e Kadar",
            nighttimeUpload: "5 Mbps'e Kadar",
            fiberUpload: "10 Mbps'e Kadar",
            quota: "-",
            price: "520,00 TL/Ay"
        },
        {
            id: 2,
            download: "100 Mbps'e Kadar",
            daytimeUpload: "25 Mbps'e Kadar",
            nighttimeUpload: "5 Mbps'e Kadar",
            fiberUpload: "15 Mbps'e Kadar",
            quota: "-",
            price: "540,00 TL/Ay"
        }
    ];

    const aramaYonuTariffs = [
        {
            "id": 1,
            "direction": "Şebeke içi, Şehir içi, Şehirlerarası, 444, Diğer Alternatif Telekom Operatörleri",
            "price": "0,09 TL/Dakika"
        },
        {
            "id": 2,
            "direction": "Yurtiçi GSM",
            "price": "0,31 TL/Dakika"
        },
        {
            "id": 3,
            "direction": "Uluslararası I. Kademe PSTN",
            "price": "0,10 TL/Dakika"
        },
        {
            "id": 4,
            "direction": "Uluslararası Kademe I GSM",
            "price": "0,77 TL/Dakika"
        },
        {
            "id": 5,
            "direction": "Uluslararası Kademe II PSTN",
            "price": "0,51 TL/Dakika"
        },
        {
            "id": 6,
            "direction": "Uluslararası Kademe II GSM",
            "price": "1,02 TL/Dakika"
        },
        {
            "id": 7,
            "direction": "Uluslararası Kademe III PSTN",
            "price": "1,28 TL/Dakika"
        },
        {
            "id": 8,
            "direction": "Uluslararası Kademe III GSM",
            "price": "1,28 TL/Dakika"
        },
        {
            "id": 9,
            "direction": "Uluslararası Kademe IV PSTN",
            "price": "3,06 TL/Dakika"
        },
        {
            "id": 10,
            "direction": "Uluslararası Kademe IV GSM",
            "price": "3,06 TL/Dakika"
        },
        {
            "id": 11,
            "direction": "Uluslararası Kademe V PSTN",
            "price": "4,58 TL/Dakika"
        },
        {
            "id": 12,
            "direction": "Uluslararası Kademe V GSM",
            "price": "4,58 TL/Dakika"
        },
        {
            "id": 13,
            "direction": "Uluslararası Kademe VI PSTN",
            "price": "5,10 TL/Dakika"
        },
        {
            "id": 14,
            "direction": "Uluslararası Kademe VI GSM",
            "price": "5,10 TL/Dakika"
        },
        {
            "id": 15,
            "direction": "Uluslararası Kademe VII PSTN",
            "price": "15,30 TL/Dakika"
        },
        {
            "id": 16,
            "direction": "Uluslararası Kademe VII GSM",
            "price": "15,30 TL/Dakika"
        },
        {
            "id": 17,
            "direction": "Uluslararası Kademe VIII PSTN",
            "price": "40,80 TL/Dakika"
        },
        {
            "id": 18,
            "direction": "Uluslararası Kademe VIII GSM",
            "price": "40,80 TL/Dakika"
        },
        {
            "id": 19,
            "direction": "Uluslararası Kademe IX PSTN",
            "price": "75,00 TL/Dakika"
        },
        {
            "id": 20,
            "direction": "Uluslararası Kademe IX GSM",
            "price": "75,00 TL/Dakika"
        },
        {
            "id": 21,
            "direction": "Uluslararası Kademe X PSTN",
            "price": "110,00 TL/Dakika"
        },
        {
            "id": 22,
            "direction": "Uluslararası Kademe X GSM",
            "price": "110,00 TL/Dakika"
        },
        {
            "id": 23,
            "direction": "KKTC PSTN",
            "price": "0,51 TL/Dakika"
        },
        {
            "id": 24,
            "direction": "KKTC GSM",
            "price": "0,51 TL/Dakika"
        },
        {
            "id": 25,
            "direction": "Inmarsat",
            "price": "56,09 TL/Dakika"
        },
        {
            "id": 26,
            "direction": "Intl Mobile",
            "price": "50,99 TL/Dakika"
        },
        {
            "id": 27,
            "direction": "Thuraya",
            "price": "45,90 TL/Dakika"
        }
    ];

    const kademeTablosu = [
        {
            id: 1,
            indirmeHizi: "16 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "10 GB",
            fiyat: "150,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "500,00 TL"
        },
        {
            id: 2,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "75 GB",
            fiyat: "350,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "520,00 TL"
        },
        {
            id: 3,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "150 GB",
            fiyat: "380,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "520,00 TL"
        },
        {
            id: 4,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "400,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "520,00 TL"
        },
        {
            id: 5,
            indirmeHizi: "50 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "10 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "420,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "560,00 TL"
        },
        {
            id: 6,
            indirmeHizi: "50 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "10 Mbps'e kadar",
            kota: "500 GB",
            fiyat: "520,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "560,00 TL"
        },
        {
            id: 7,
            indirmeHizi: "100 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "15 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "520,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "600,00 TL"
        },
        {
            id: 8,
            indirmeHizi: "100 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "15 Mbps'e kadar",
            kota: "500 GB",
            fiyat: "580,00 TL/Ay",
            ekKullanımÜcreti: "1,50 TL/GB",
            maksimumÜcret: "600,00 TL"
        }
    ];

    const ucretliOzelServisler = [
       {
        "id": 1,
        "name": "Avea Bilinmeyen Numaralar Servisi",
        "number": "11855",
        "price": "1,52 TL/dk"
    },
    {
        "id": 2,
        "name": "Turkcell Bilinmeyen Numaralar Servisi",
        "number": "11832",
        "price": "1,52 TL/dk"
    },
    {
        "id": 3,
        "name": "Vodafone Bilinmeyen Numaralar Servisi",
        "number": "11842",
        "price": "1,52 TL/dk"
    },
    {
        "id": 4,
        "name": "Türk Telekom Bilinmeyen Numaralar Servisi",
        "number": "11811",
        "price": "1,02 TL/dk"
    },
    {
        "id": 5,
        "name": "Özel Servis 11880",
        "number": "11880",
        "price": "6,00 TL/dk"
    },
    {
        "id": 6,
        "name": "Özel Servis 11888",
        "number": "11888",
        "price": "6,00 TL/dk"
    },
    {
        "id": 7,
        "name": "Alo Sağlık Yardım",
        "number": "113",
        "price": null
    },
    {
        "id": 8,
        "name": "Zehir Danışma",
        "number": "114",
        "price": null
    },
    {
        "id": 9,
        "name": "Btk (harmonized european short codes)",
        "number": "116",
        "price": null
    },
    {
        "id": 10,
        "name": "Telefon Arıza",
        "number": "121",
        "price": null
    },
    {
        "id": 11,
        "name": "Alo Gençlik Hattı",
        "number": "123",
        "price": null
    },
    {
        "id": 12,
        "name": "Alo Dask",
        "number": "125",
        "price": null
    },
    {
        "id": 13,
        "name": "KabloTV Arıza",
        "number": "126",
        "price": null
    },
    {
        "id": 14,
        "name": "Ürün Güvenliği Şikayet Hattı",
        "number": "130",
        "price": null
    },
    {
        "id": 15,
        "name": "Alo Taksi",
        "number": "134",
        "price": null
    },
    {
        "id": 16,
        "name": "Güvenli İnternet Destek Hattı",
        "number": "141",
        "price": null
    },
    {
        "id": 17,
        "name": "Alo Sosyal Yardım",
        "number": "144",
        "price": null
    },
    {
        "id": 18,
        "name": "Cumhurbaşkanlığı İletişim Merkezi",
        "number": "150",
        "price": null
    },
    {
        "id": 19,
        "name": "Botaş İhbar Hattı",
        "number": "152",
        "price": null
    },
    {
        "id": 20,
        "name": "Alo Zabıta/Büyükşehir/Belediye",
        "number": "153",
        "price": null
    },
    {
        "id": 21,
        "name": "e-devlet Kapısı Çağrı Merkezi",
        "number": "160",
        "price": null
    },
    {
        "id": 22,
        "name": "Telekom Borç Sorma",
        "number": "163",
        "price": null
    },
    {
        "id": 23,
        "name": "TİB (alo internet bilgi ihbar)",
        "number": "166",
        "price": null
    },
    {
        "id": 24,
        "name": "Çalışma ve Sosyal Güvenlik Kurumu",
        "number": "170",
        "price": null
    },
    {
        "id": 25,
        "name": "Sigara Bırakma Hattı",
        "number": "171",
        "price": null
    },
    {
        "id": 26,
        "name": "Alo Gıda",
        "number": "174",
        "price": "0,15 TL/dk"
    },
    {
        "id": 27,
        "name": "Alo Tüketici",
        "number": "175",
        "price": null
    },
    {
        "id": 28,
        "name": "Kültür ve Turizm Bakanlığı İletişim Merkezi",
        "number": "176",
        "price": null
    },
    {
        "id": 29,
        "name": "Alo Valilik",
        "number": "179",
        "price": null
    },
    {
        "id": 30,
        "name": "Tarım ve Orman Bakanlığı İletişim Merkezi",
        "number": "180",
        "price": null
    },
    {
        "id": 31,
        "name": "Çevre Bilgi",
        "number": "181",
        "price": null
    },
    {
        "id": 32,
        "name": "Hastane Randevu Hattı",
        "number": "182",
        "price": null
    },
    {
        "id": 33,
        "name": "Alo Çocuk ve Kadın Hattı",
        "number": "183",
        "price": null
    },
    {
        "id": 34,
        "name": "Sağlık Danışma",
        "number": "184",
        "price": null
    },
    {
        "id": 35,
        "name": "Su Arıza",
        "number": "185",
        "price": null
    },
    {
        "id": 36,
        "name": "Alo Elektrik",
        "number": "186",
        "price": null
    },
    {
        "id": 37,
        "name": "Gaz Arıza",
        "number": "187",
        "price": null
    },
    {
        "id": 38,
        "name": "Cenaze Hizmetleri",
        "number": "188",
        "price": null
    },
    {
        "id": 39,
        "name": "Vergi Danışma",
        "number": "189",
        "price": null
    },
    {
        "id": 40,
        "name": "Dini Danışma Hattı",
        "number": "190",
        "price": null
    },
    {
        "id": 41,
        "name": "Uyuşturucu ile mücadele danışma ve destek hattı",
        "number": "191",
        "price": null
    },
    {
        "id": 42,
        "name": "Alo Veri Koruma",
        "number": "198",
        "price": null
    },
    {
        "id": 43,
        "name": "Alo Nüfus",
        "number": "199",
        "price": null
    }
    ];

    const ucretsizServisNolar = [
        {
        "id": 1,
        "name": "Yangın İhbar",
        "number": "110",
        "price": "Ücretsiz"
    },
    {
        "id": 2,
        "name": "Sıhhi İmdat",
        "number": "112",
        "price": "Ücretsiz"
    },
    {
        "id": 3,
        "name": "Alo AFAD",
        "number": "122",
        "price": "Ücretsiz"
    },
    {
        "id": 4,
        "name": "TCDD Acil Durum İhbar Hattı",
        "number": "131",
        "price": "Ücretsiz"
    },
    {
        "id": 5,
        "name": "Acil Yardım Hizmetleri Destek Hattı",
        "number": "132",
        "price": "Ücretsiz"
    },
    {
        "id": 6,
        "name": "Alo Gümrük Kaçakçılığı",
        "number": "136",
        "price": "Ücretsiz"
    },
    {
        "id": 7,
        "name": "Alo Terör İhbar Hattı",
        "number": "140",
        "price": "Ücretsiz"
    },
    {
        "id": 8,
        "name": "Alo Kıyı Emniyet",
        "number": "151",
        "price": "Ücretsiz"
    },
    {
        "id": 9,
        "name": "Polis İmdat",
        "number": "155",
        "price": "Ücretsiz"
    },
    {
        "id": 10,
        "name": "Jandarma İmdat",
        "number": "156",
        "price": "Ücretsiz"
    },
    {
        "id": 11,
        "name": "İnsan Ticareti Mağd. Yrd. İhb. Hattı",
        "number": "157",
        "price": "Ücretsiz"
    },
    {
        "id": 12,
        "name": "Alo Sahil Güvenlik",
        "number": "158",
        "price": "Ücretsiz"
    },
    {
        "id": 13,
        "name": "Alo Karayolları",
        "number": "159",
        "price": "Ücretsiz"
    },
    {
        "id": 14,
        "name": "Türk Kızılayı",
        "number": "168",
        "price": "Ücretsiz"
    },
    {
        "id": 15,
        "name": "Orman Yangını İhbar",
        "number": "177",
        "price": "Ücretsiz"
    }
    ];



    const getCurrentTariffs = () => {
        switch (selectedCategory) {
            case 'tarifeler': return tarifeler;
            case 'aramaYonu': return aramaYonuTariffs;
            case 'ucretliOzelServisler': return ucretliOzelServisler;
            case 'ucretsizServisNo': return ucretsizServisNolar;
            default: return tarifeler; // Varsayılan olarak tarifeleri döndürüyoruz
        }
    };

    return (
        <div className="bg-gray-50">
     <Helmet>
        <title>Kabloses Telefon Tarifeleri | Sabit Telefon Paketleri - Türksat</title>
        <meta name="description" content="Türksat Kabloses sabit telefon tarifeleri. Her yöne dakika paketleri ve özel servis numaraları." />
      </Helmet>
            {/* Hero Banner - Daha modern ve çekici */}
            <div className="relative mx-auto w-full h-[250px] sm:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2] z-0">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.22"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}></div>
                </div>
                <img
                    src={serit}
                    alt="Serit"
                    className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none z-10"
                />
                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Kabloses Tarifeleri
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white/80">
                        Şimdi Sabit Telefonunuzu Kablonet Altyapısına Taşıyın Fırsatları Yakalayın
                    </p>
                </div>
            </div>

            {/* Ana İçerik */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Kategori Kartları - Mobil görünüm için optimize edilmiş */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
                    <div
                        onClick={() => setSelectedCategory('tarifeler')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'tarifeler'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'tarifeler' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {/* Para/Ücret İkonu - Tarifeler için */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'tarifeler' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Tarifeler
                                </h3>
                                <p className="text-xs text-gray-500"></p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('aramaYonu')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'aramaYonu'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'aramaYonu' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {/* Telefon/Arama İkonu - Arama Yönü için */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'aramaYonu' ? 'text-blue-700' : 'text-gray-700'}`}>
                                   Arama Yönü Ücretleri
                                </h3>
                                <p className="text-xs text-gray-500"></p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('ucretliOzelServisler')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'ucretliOzelServisler'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'ucretliOzelServisler' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {/* Ücretli Servis İkonu */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'ucretliOzelServisler' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Ücretli Özel Servis Numaraları
                                </h3>
                                <p className="text-xs text-gray-500"></p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('ucretsizServisNo')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'ucretsizServisNo'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'ucretsizServisNo' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {/* Ücretsiz Servis İkonu */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'ucretsizServisNo' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Ücretsiz Özel Servis Numaraları
                                </h3>
                                <p className="text-xs text-gray-500"></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarife İçeriği */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-16 transition-all">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4">
                        <h2 className="text-white text-xl font-bold">
                            {selectedCategory === 'tarifeler' && 'Tarifeler'}
                            {selectedCategory === 'aramaYonu' && 'Arama Yönü Tarifeleri'}
                            {selectedCategory === 'ucretliOzelServisler' && 'Ücretli Özel Servis Numaraları'}
                            {selectedCategory === 'ucretsizServisNo' && 'Ücretsiz Özel Servis Numaraları'}
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">
                            {selectedCategory === 'tarifeler' && 'Türksat Kabloses Tarifeleri'}
                            {selectedCategory === 'aramaYonu' && 'Arama Yönüne Göre Ücretlendirmeler'}
                            {selectedCategory === 'ucretliOzelServisler' && 'Türksat Kabloses Ücretli Özel Servis Numaraları'}
                            {selectedCategory === 'ucretsizServisNo' && 'Türksat Kabloses Ücretsiz Acil Servis Numaraları'}
                        </p>
                    </div>

                    {/* Tablo İçeriği - Responsive Design */}
                    <div className="overflow-x-auto p-6">
                        {selectedCategory === 'tarifeler' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Her Yöne(Dakika)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Şebeke İçi(Dakika)<br /></th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat(TL/Ay)*<br /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarifeler.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.download}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.daytimeUpload}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.nighttimeUpload}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'aramaYonu' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Arama Yonu</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ücretlendirme*
(TL/Dakika)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aramaYonuTariffs.map((aramaYonu, index) => (
                                        <tr key={aramaYonu.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-4 border-b border-gray-100 text-sm">{aramaYonu.direction}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{aramaYonu.price}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}



                        {selectedCategory === 'ucretliOzelServisler' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ücretli Özel Servis Numaraları</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Numara</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ücretlendirme*(TL/dakika)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ucretliOzelServisler.map((ucretliOzelServis, index) => (
                                        <tr key={ucretliOzelServis.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-3 text-sm">{ucretliOzelServis.name}</td>
                                            <td className="py-3 px-3 text-sm">{ucretliOzelServis.number}</td>
                                            <td className="py-3 px-3 text-sm">{ucretliOzelServis.price || "-"}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'ucretsizServisNo' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ücretsiz Acil Servis</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Numara</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ücretlendirme</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ucretsizServisNolar.map((ucretsizServis, index) => (
                                        <tr key={ucretsizServis.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-3 text-sm">{ucretsizServis.name}</td>
                                            <td className="py-3 px-3 text-sm">{ucretsizServis.number}</td>
                                            <td className="py-3 px-3 text-sm">{ucretsizServis.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Açıklama Kartı */}
                    <div className="bg-blue-50/70 p-6 border-t border-blue-100">
                        <div className="flex items-start">
                            <div className="shrink-0 mr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-2">Önemli Bilgiler</h4>
                                {selectedCategory === 'tarifeler' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Her yöne tarifeler Şehir içi, Şehirlerarası, Yurtiçi GSM, 444, 3 Rakamlı kısa numaralar ve Diğer Alternatif Telekom Operatörleri yönlerine geçerlidir. Her yöne paket dakikalar aşımında her arama kendi tarifesinden ücretlendirilir.</p>
                                        <p>* Ücretlendirme yurtiçi GSM yönüne periyot 30 saniye, diğer yönlere 60 saniyedir.</p>
                                        <p>* Tarifelere %20 oranında KDV ve %10 oranında ÖİV dahildir.</p>
                                    </div>
                                )}

                                {selectedCategory === 'aramaYonu' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Ücretlendirme periyodu yurtiçi GSM yönüne 30 saniye, diğer yönlere 60 saniyedir.</p>
                                        <p>* Tarifelere %20 oranında KDV ve %10 oranında ÖİV dahildir.</p>
                                        <p>* PSTN; sabit telefon hizmetidir.</p>
                                    </div>
                                )}


                                {selectedCategory === 'ucretliOzelServisler' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>*  Ücretlendirme periyodu 60 saniyedir.</p>
                                        <p>* Tarifelere %20 oranında KDV ve %10 oranında ÖİV dahildir.</p>
                                    </div>
                                )}
                                
                                {selectedCategory === 'ucretsizServisNo' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Bu servis numaraları acil durumlarda aramak için ücretsiz olarak sunulmaktadır.</p>
                                        <p>* Lütfen acil durum olmadığı sürece bu numaraları gereksiz yere meşgul etmeyiniz.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start mt-[50px]">
                            <div>
                                {selectedCategory === 'tarifeler' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <h4 className="text-[30px] font-semibold text-blue-800 mb-2 ">Her yöne dakika paketleri</h4>
                                        <p>* Kabloses hizmeti, Kablonet hizmeti ile beraber sunulmaktadır.</p>
                                        <p>* Numaranızı Kabloses'e taşıyarak da bu hizmetten faydalanabilirsiniz.</p>
                                        <p>* Kullanım alışkanlığınıza göre yukarıdaki tabloda verilen paket tarifelerden dilediğiniz birini aylık tarife paketi olarak seçebilirsiniz.</p>
                                        <p>* Kabloses hizmeti kapsamında tahsis edilen numara Türksat tarafından (mücbir hallerde) değiştirilebilecektir.</p>
                                        <p>* Türksat, Kabloses tarifelerinde değişiklik yapma hakkını saklı tutar.</p>
                                        <p>* Ayrıntılı fatura talebinde her sayfa 5,00 TL olarak ücretlendirilir. E-Faturaya geçiş yapılması durumunda ücret alınmaz.</p>
                                        <p>* Faturaların son ödeme tarihinden sonra ödenmesi halinde 21.05.2024 tarihinden itibaren, günlük %0,15 oranında gecikme bedeli yansıtılır.</p>
                                        <p>* Ayda bir sefer tarife değişimi yapılabilmektedir. Tarife değişimi yapıldığı gün baz alınarak fiyatlandırma yapılacak ve bir önceki tarifenize ait dakikalar sıfırlanacaktır.</p>
                                        <p>* Örneğin her yöne 100 dakika paketiniz varsa, ayın 15 inde her yöne dakika paketinizin yarısı (50 dakika) kullanılabilir. Yarım aylık ücret yansıtılır. 50 dakikanın üzeri ayrıca tarife üzerinden faturalandırılır.</p>
                                        <p>* Müşterilerimiz, mevcut aylık tarife paketlerine ilave olarak aşağıda belirtilen 30 gün boyunca geçerli olacak ek paketleri satın alabilecektir. Paket kullanımı başlamadan en fazla 2 paket tanımlanabilecektir.</p>

                                        <table className="w-full min-w-max table-auto text-left">
                                            <thead>
                                                <tr>
                                                    <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ek Paket (Her Yöne Dakika)</th>
                                                    <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat (TL)<br /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="p-4 border-b border-gray-100 text-sm">100</td>
                                                    <td className="p-4 border-b border-gray-100 text-sm">17,50</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 border-b border-gray-100 text-sm">200</td>
                                                    <td className="p-4 border-b border-gray-100 text-sm">25,00</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 border-b border-gray-100 text-sm">300</td>
                                                    <td className="p-4 border-b border-gray-100 text-sm">37,50</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 border-b border-gray-100 text-sm">500</td>
                                                    <td className="p-4 border-b border-gray-100 text-sm">55,00</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 border-b border-gray-100 text-sm">1000</td>
                                                    <td className="p-4 border-b border-gray-100 text-sm">105,00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}




                            </div>
                        </div>
                    </div>
                </div>

                {/* İnfo Bölümü - Yeni Tasarım */}

            </div>
        </div>
    );
};

export default KabloSesTariff;