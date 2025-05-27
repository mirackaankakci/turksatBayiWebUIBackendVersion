import React, { useState } from 'react';
import serit from "../assets/serit.png";

const NetTariffs = () => {
    const [selectedCategory, setSelectedCategory] = useState('akilli');
    const [activeInfoSection, setActiveInfoSection] = useState('tarifelerNelerdir');

    const akilliSinirsizTariffs = [
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

    const sinirsizTariffs = [
        {
            id: 1,
            download: "16 Mbps'e kadar",
            uploadDocsis: "3 Mbps'e kadar",
            uploadFiber: "5 Mbps'e kadar",
            price: "500,00 TL/Ay"
        },
        {
            id: 2,
            download: "25 Mbps'e kadar",
            uploadDocsis: "4 Mbps'e kadar",
            uploadFiber: "5 Mbps'e kadar",
            price: "520,00 TL/Ay"
        },
        {
            id: 3,
            download: "35 Mbps'e kadar",
            uploadDocsis: "5 Mbps'e kadar",
            uploadFiber: "10 Mbps'e kadar",
            price: "540,00 TL/Ay"
        },
        {
            id: 4,
            download: "50 Mbps'e kadar",
            uploadDocsis: "5 Mbps'e kadar",
            uploadFiber: "10 Mbps'e kadar",
            price: "560,00 TL/Ay"
        },
        {
            id: 5,
            download: "75 Mbps'e kadar",
            uploadDocsis: "5 Mbps'e kadar",
            uploadFiber: "15 Mbps'e kadar",
            price: "580,00 TL/Ay"
        },
        {
            id: 6,
            download: "100 Mbps'e kadar",
            uploadDocsis: "5 Mbps'e kadar",
            uploadFiber: "15 Mbps'e kadar",
            price: "600,00 TL/Ay"
        },
        {
            id: 7,
            download: "50 Mbps'e kadar",
            uploadDocsis: "20 Mbps'e kadar",
            uploadFiber: "20 Mbps'e kadar",
            price: "650,00 TL/Ay"
        },
        {
            id: 8,
            download: "100 Mbps'e kadar",
            uploadDocsis: "20 Mbps'e kadar",
            uploadFiber: "20 Mbps'e kadar",
            price: "750,00 TL/Ay"
        },
        {
            id: 9,
            download: "200 Mbps'e kadar(Eve Kadar Fiber GPON)",
            uploadDocsis: "-",
            uploadFiber: "30 Mbps'e kadar",
            price: "800,00 TL/Ay"
        },
        {
            id: 10,
            download: "1000 Mbps'e kadar",
            uploadDocsis: "-",
            uploadFiber: "125 Mbps'e kadar",
            price: "1400,00 TL/Ay"
        }
    ];

    const kotaliTarifeler = [
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

    const duranKotaliTarifeler = [
        {
            id: 1,
            indirmeHizi: "16 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "10 GB",
            fiyat: "150,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 2,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "75 GB",
            fiyat: "350,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 3,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "150 GB",
            fiyat: "380,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 4,
            indirmeHizi: "25 Mbps'e kadar",
            yüklemeHizDOCSIS: "2 Mbps'e kadar",
            yüklemeHiziGPON: "5 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "400,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 5,
            indirmeHizi: "50 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "10 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "420,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 6,
            indirmeHizi: "50 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "10 Mbps'e kadar",
            kota: "500 GB",
            fiyat: "520,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 7,
            indirmeHizi: "100 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "15 Mbps'e kadar",
            kota: "250 GB",
            fiyat: "520,00 TL/Ay",
            ekKullanımÜcreti: "-"
        },
        {
            id: 8,
            indirmeHizi: "100 Mbps'e kadar",
            yüklemeHizDOCSIS: "5 Mbps'e kadar",
            yüklemeHiziGPON: "15 Mbps'e kadar",
            kota: "500 GB",
            fiyat: "580,00 TL/Ay",
            ekKullanımÜcreti: "-"
        }
    ];

    const dslTarifeler = [
        {
            id: 1,
            indirmeHizi: "16 Mbps'e kadar",
            yuklemeHizi: "2 Mbps'e kadar",
            fiyat: "500,00 TL/Ay"
        },
        {
            id: 2,
            indirmeHizi: "24 Mbps'e kadar",
            yuklemeHizi: "3 Mbps'e kadar",
            fiyat: "520,00 TL/Ay"
        },
        {
            id: 3,
            indirmeHizi: "35 Mbps'e kadar",
            yuklemeHizi: "3 Mbps'e kadar",
            fiyat: "540,00 TL/Ay"
        },
        {
            id: 4,
            indirmeHizi: "50 Mbps'e kadar",
            yuklemeHizi: "4 Mbps'e kadar",
            fiyat: "560,00 TL/Ay"
        },
        {
            id: 5,
            indirmeHizi: "75 Mbps'e kadar",
            yuklemeHizi: "4 Mbps'e kadar",
            fiyat: "580,00 TL/Ay"
        },
        {
            id: 6,
            indirmeHizi: "100 Mbps'e kadar",
            yuklemeHizi: "4 Mbps'e kadar",
            fiyat: "600,00 TL/Ay"
        },
        {
            id: 7,
            indirmeHizi: "200 Mbps'e kadar",
            yuklemeHizi: "10 Mbps'e kadar",
            fiyat: "800,00 TL/Ay"
        },
        {
            id: 8,
            indirmeHizi: "500 Mbps'e kadar",
            yuklemeHizi: "20 Mbps'e kadar",
            fiyat: "1.100,00 TL/Ay"
        },
        {
            id: 9,
            indirmeHizi: "1000 Mbps'e kadar",
            yuklemeHizi: "20 Mbps'e kadar",
            fiyat: "1.400,00 TL/Ay"
        }
    ];



    const getCurrentTariffs = () => {
        switch (selectedCategory) {
            case 'akilli': return akilliSinirsizTariffs;
            case 'sinirsiz': return sinirsizTariffs;
            case 'kotaliTarifeler': return kotaliTarifeler;
            case 'duranKotaliTarifeler': return duranKotaliTarifeler;
            case 'dslTarifeler': return dslTarifeler;
            default: return akilliSinirsizTariffs;
        }
    };

    return (
        <div className="bg-gray-50">
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
                        İnternet Tarifeleri
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white/80">
                        Her ihtiyaca ve bütçeye uygun Türksat Kablolu Fiber İnternet seçenekleri
                    </p>
                </div>
            </div>

            {/* Ana İçerik */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* İntro bölümü */}
                <div className="mb-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">İhtiyacınıza En Uygun Tarifeyi Seçin</h2>
                    <p className="mt-4 text-gray-600">
                        Türksat Kablonet, farklı internet kullanım ihtiyaçlarına göre özelleştirilmiş tarife seçenekleri sunar.
                        Size en uygun tarifeyi seçerek avantajlı fiyatlarla yüksek hızda internete sahip olun.
                    </p>
                </div>

                {/* Kategori Kartları - Mobil görünüm için optimize edilmiş */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
                    <div
                        onClick={() => setSelectedCategory('akilli')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'akilli'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'akilli' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'akilli' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Akıllı Sınırsız
                                </h3>
                                <p className="text-xs text-gray-500">Değişken performans</p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('sinirsiz')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'sinirsiz'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'sinirsiz' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'sinirsiz' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Sınırsız
                                </h3>
                                <p className="text-xs text-gray-500">Sabit hız</p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('kotaliTarifeler')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'kotaliTarifeler'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'kotaliTarifeler' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'kotaliTarifeler' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Kotalı
                                </h3>
                                <p className="text-xs text-gray-500">Ek ücretli</p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('duranKotaliTarifeler')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'duranKotaliTarifeler'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'duranKotaliTarifeler' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'duranKotaliTarifeler' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    Duran Kotalı
                                </h3>
                                <p className="text-xs text-gray-500">Kota bitince durur</p>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSelectedCategory('dslTarifeler')}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all ${selectedCategory === 'dslTarifeler'
                            ? 'bg-blue-50 border-blue-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedCategory === 'dslTarifeler' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-semibold ${selectedCategory === 'dslTarifeler' ? 'text-blue-700' : 'text-gray-700'}`}>
                                    DSL Tarifeler
                                </h3>
                                <p className="text-xs text-gray-500">TT altyapısı</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarife İçeriği */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-16 transition-all">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4">
                        <h2 className="text-white text-xl font-bold">
                            {selectedCategory === 'akilli' && 'Akıllı Sınırsız Tarifeler'}
                            {selectedCategory === 'sinirsiz' && 'Sınırsız Tarifeler'}
                            {selectedCategory === 'kotaliTarifeler' && 'Kotalı Tarifeler'}
                            {selectedCategory === 'duranKotaliTarifeler' && 'Duran Kotalı Tarifeler'}
                            {selectedCategory === 'dslTarifeler' && 'DSL Tarifeler'}
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">
                            {selectedCategory === 'akilli' && 'İnternet & Kullanım Anlığınızdaki Data Tüketimini Seçebilirsiniz'}
                            {selectedCategory === 'sinirsiz' && 'İnternetinizi sınırsız kullanmak isteyenlere...'}
                            {selectedCategory === 'kotaliTarifeler' && 'Kullanımınıza göre ödeme yapmak istiyorsanız...'}
                            {selectedCategory === 'duranKotaliTarifeler' && 'İnternet Kullanım Alışkanlığınıza Göre Tarifenizi Seçebilirsiniz'}
                            {selectedCategory === 'dslTarifeler' && 'Türk Telekom altyapısı üzerinden verilen tarifeler'}
                        </p>
                    </div>

                    {/* Tablo İçeriği - Responsive Design */}
                    <div className="overflow-x-auto p-6">
                        {selectedCategory === 'akilli' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">İndirme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı<br />(06:00 - 16:00)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı<br />(DOCSIS)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı<br />(FIBER)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Kota</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Tarife Fiyatı</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {akilliSinirsizTariffs.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.download}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.daytimeUpload}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.nighttimeUpload}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.fiberUpload}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.quota}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm font-semibold text-blue-700">{tariff.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'sinirsiz' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">İndirme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı<br />(Kablo Modem / DOCSIS)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı<br />(Eve Kadar Fiber / GPON)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sinirsizTariffs.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.download}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.uploadDocsis}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm">{tariff.uploadFiber}</td>
                                            <td className="p-4 border-b border-gray-100 text-sm font-semibold text-blue-700">{tariff.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'kotaliTarifeler' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">İndirme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı (DOCSIS)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı (GPON)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Kota</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ek Kullanım Ücreti</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Maksimum Ücret</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kotaliTarifeler.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-3 text-sm">{tariff.indirmeHizi}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.yüklemeHizDOCSIS}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.yüklemeHiziGPON}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.kota}</td>
                                            <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.fiyat}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.ekKullanımÜcreti}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.maksimumÜcret}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'duranKotaliTarifeler' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">İndirme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı (DOCSIS)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı (GPON)</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Kota</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Ek Kullanım Ücreti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {duranKotaliTarifeler.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-3 text-sm">{tariff.indirmeHizi}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.yüklemeHizDOCSIS}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.yüklemeHiziGPON}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.kota}</td>
                                            <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.fiyat}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.ekKullanımÜcreti}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {selectedCategory === 'dslTarifeler' && (
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">İndirme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Yükleme Hızı</th>
                                        <th className="border-b border-blue-100 bg-blue-50/50 p-4 text-sm font-semibold text-blue-900">Fiyat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dslTarifeler.map((tariff, index) => (
                                        <tr key={tariff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-3 text-sm">{tariff.indirmeHizi}</td>
                                            <td className="py-3 px-3 text-sm">{tariff.yuklemeHizi}</td>
                                            <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.fiyat}</td>
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
                                {selectedCategory === 'akilli' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Akıllı Sınırsız Tarife serisinin bütün tarifelerini, kullanım miktarınıza bağlı olarak ek ücret ödenmemektedir. Saat 00:00-16:00 saatleri içerisinde yapılacak günlük büyük bölümünde bağlantı hızları tarifede belirtilen hıza yükseltilebilecektir.</p>
                                        <p>* Bu tarifelerin özelliği srınırsız olmalarıdır. Kotlalı bir tarife değildir.</p>
                                        <p>* Seçmiş olduğunuz tarifeler 00:00-16:00 saatleri arasında hız sınırlandırması olmadan kullanabilirsiniz. 16:00-00:00 saatleri arasında ise internet bağlantı hızınız tabloda belirtilen hıza düşürülmektedir.</p>
                                    </div>
                                )}

                                {selectedCategory === 'sinirsiz' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>*Sınırsız tarife kapsamında, kullanım miktarı ile ilişkili olarak herhangi bir hız düşürme söz konusu değildir. Kullanım miktarına bağlı olarak ek ücret alınmaz.</p>
                                        <p>*200 Mbps ve üstü tarifeler GPON altyapısında hizmet verilebilen tarifelerdir. Daireye kadar fiber Kablonet bağlantısı ile Docsis altyapısından farklı modemler kullanılmaktadır</p>
                                        <p>*200, 300, 500 ve 1.000 Mbps hızında internet hizmeti GPON altyapısı ile hizmet sunulan adreslerde sağlanabilmektedir. 1000 Mbps hız için müşterilerimizin ayrıca sabit IP hizmetini satın almaları gerekmektedir.</p>
                                    </div>
                                )}

                                {selectedCategory === 'kotaliTarifeler' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Kotalı İnternet Tarifesi için tarifede belirlenen GB`lar için ücretler her ay sabit olarak faturalara yansıtılır. Kotalı hizmetler için aylık olarak ödenecek ücret, aynı hızın sınırsız tarifesini geçemeyecektir. Tüm kotalı hızlarda kullanılan her artı GB için (GB Sabiti x Kullanılan GB miktarı) kadar tutar faturaya eklenecektir. En son içinde bulunulan GB miktarı için kıst ücret uygulanmayacak olup tam GB ücreti alınacaktır.</p>
                                    </div>
                                )}

                                {selectedCategory === 'duranKotaliTarifeler' && (
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p>* Duran Kotalı İnternet Tarifelerinde, kota bitiminde internet kullanımınız durdurulur. Ek GB satın almadan internet kullanılamaz.</p>
                                        <p>* Kota yenileme veya ek kota satın alma işlemleri müşteri hizmetleri üzerinden gerçekleştirilebilir.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* İnfo Bölümü - Yeni Tasarım */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-blue-800 mb-6">Tarifelerimiz Hakkında</h2>

                        {/* Info Tab Buttonları */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                            <button
                                onClick={() => setActiveInfoSection('tarifelerNelerdir')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'tarifelerNelerdir'
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
                                onClick={() => setActiveInfoSection('fiberTarifeler')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'fiberTarifeler'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Fiber İnternet Tarifeleri</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('kampanyalar')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'kampanyalar'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Kampanyalar</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('musteriHizmetleri')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'musteriHizmetleri'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                    <span className="font-medium">Müşteri Hizmetleri</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('kablonetiAvantajlari')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'kablonetiAvantajlari'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                    <span className="font-medium">Kablonet'in Avantajları</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('kablonetiHizliInternet')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'kablonetiHizliInternet'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                    <span className="font-medium">Kablonet Hızlı İnternet</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('esnekTarifeler')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'esnekTarifeler'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                    </svg>
                                    <span className="font-medium">Kablonet'in Esnek Tarifeleri</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('guvenliInternet')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'guvenliInternet'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    <span className="font-medium">Kablonet'in Güvenli İnterneti</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveInfoSection('uygunFiyatlar')}
                                className={`py-3 px-4 rounded-lg text-left transition ${
                                    activeInfoSection === 'uygunFiyatlar'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">Kablonet'in Uygun Fiyatları</span>
                                </div>
                            </button>
                        </div>

                        {/* İçerik bölümleri */}
                        {activeInfoSection === 'tarifelerNelerdir' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Tarifeleri Nelerdir?</h3>
                                <p data-start="0" data-end="109">İhtiyacınıza en uygun onlarca tarifeyi Kablonet&rsquo;te bulabilirsiniz. Başlıca d&ouml;rt kategori altında inceleyelim:</p>
                                <p data-start="111" data-end="142"><strong data-start="111" data-end="140">Akıllı Sınırsız Tarifeler</strong></p>
                                <ul data-start="143" data-end="432">
                                    <li data-start="143" data-end="257">
                                        <p data-start="145" data-end="257">İnternet kullanımının en yoğun olduğu 19:00&ndash;24:00 saatleri arasında hızınız, se&ccedil;tiğiniz pakete g&ouml;re d&uuml;ş&uuml;r&uuml;l&uuml;r.</p>
                                    </li>
                                    <li data-start="258" data-end="392">
                                        <p data-start="260" data-end="392">&Ouml;rneğin 100 Mbps&rsquo;lik pakette bu zaman diliminde hız 25 Mbps&rsquo;ye kadar d&uuml;şer; g&uuml;n&uuml;n diğer saatlerinde ise tam hızda devam edersiniz.</p>
                                    </li>
                                    <li data-start="393" data-end="432">
                                        <p data-start="395" data-end="432">Kota ve kota aşımı &uuml;creti uygulanmaz.</p>
                                    </li>
                                </ul>
                                <p data-start="434" data-end="458"><strong data-start="434" data-end="456">Sınırsız Tarifeler</strong></p>
                                <ul data-start="459" data-end="592">
                                    <li data-start="459" data-end="540">
                                        <p data-start="461" data-end="540">G&uuml;n&uuml;n her saati, se&ccedil;tiğiniz hızda kesintisiz ve kotasız internet keyfi sunar.</p>
                                    </li>
                                    <li data-start="541" data-end="592">
                                        <p data-start="543" data-end="592">Ne saat kısıtlaması ne de ek &uuml;cret s&ouml;z konusudur.</p>
                                    </li>
                                </ul>
                                <p data-start="594" data-end="632"><strong data-start="594" data-end="630">Kotalı ve Duran Kotalı Tarifeler</strong></p>
                                <ul data-start="633" data-end="902">
                                    <li data-start="633" data-end="729">
                                        <p data-start="635" data-end="729"><strong data-start="635" data-end="657">Kotalı tarifelerde</strong>, aylık belirlenen kota aşılırsa GB başına sabit bir &uuml;cret yansıtılır.</p>
                                    </li>
                                    <li data-start="730" data-end="902">
                                        <p data-start="732" data-end="902"><strong data-start="732" data-end="760">Duran kotalı tarifelerde</strong> ise kota dolduğunda bağlantınız kesilir; isterseniz ek kota paketi satın alarak internet kullanımınıza kaldığınız yerden devam edebilirsiniz.</p>
                                    </li>
                                </ul>
                                <p data-start="904" data-end="923"><strong data-start="904" data-end="921">DSL Tarifeler</strong></p>
                                <ul data-start="924" data-end="1110">
                                    <li data-start="924" data-end="1051">
                                        <p data-start="926" data-end="1051">Kablonet altyapısının bulunmadığı b&ouml;lgelerde, T&uuml;rk Telekom ortak altyapısı &uuml;zerinden hizmet veren DSL modemli tarifelerdir.</p>
                                    </li>
                                    <li data-start="1052" data-end="1110">
                                        <p data-start="1054" data-end="1110">Hız, b&ouml;lgedeki şebeke desteğine bağlı olarak belirlenir.</p>
                                    </li>
                                </ul>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="text-gray-700">
                                        Bu tarifelere ek olarak televizyon ve sabit telefon hizmetlerini bir arada sunan “hepsi bir arada” kampanyalarımız da mevcut. İsterseniz bu paketleri de tercih ederek, iletişim ve eğlence ihtiyaçlarınızı tek bir çatı altında karşılayabilirsiniz.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeInfoSection === 'fiberTarifeler' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Fiber İnternet Tarifeleri</h3>
                                <p data-start="187" data-end="512">Kablonet, kullanıcılarına y&uuml;ksek hızda, g&uuml;venilir ve kesintisiz internet hizmeti sunan T&uuml;rkiye&rsquo;nin &ouml;nde gelen internet servis sağlayıcılarından biridir. Farklı ihtiya&ccedil;lara uygun olarak hazırlanan Kablonet internet tarifeleri, hem limitsiz hem de kotalı se&ccedil;eneklerle sunularak her b&uuml;t&ccedil;eye ve kullanım alışkanlığına hitap eder.</p>
                                <p data-start="514" data-end="837">Limitsiz Kablonet tarifeleri, kullanıcılarına g&uuml;n&uuml;n her saatinde hız d&uuml;ş&uuml;m&uuml; veya kota sınırlaması olmadan internet kullanma imk&acirc;nı sağlar. Kotalı tarifelerde ise belirli bir veri kullanım sınırı bulunur; kota dolduğunda ek &uuml;cretlendirme yapılabilir veya bağlantı durdurularak kullanıcıya ek kota satın alma fırsatı sunulur.</p>
                                <p data-start="839" data-end="1229">Kablonet'in sunduğu fiber internet teknolojisi sayesinde kullanıcılar daha y&uuml;ksek hızlarla internete bağlanabilir, video izleme, online oyun oynama ve uzaktan &ccedil;alışma gibi y&uuml;ksek bant genişliği gerektiren işlemleri sorunsuzca ger&ccedil;ekleştirebilir. Fiber altyapısı &uuml;zerinden sunulan Kablonet internet tarifeleri, farklı hız se&ccedil;enekleriyle &ouml;zelleştirilebilir ve kullanıcıya &ouml;zel &ccedil;&ouml;z&uuml;mler sunar.</p>
                                <p data-start="1231" data-end="1491">Kablonet, sadece internet bağlantısıyla değil, aynı zamanda televizyon ve telefon hizmetlerini de i&ccedil;eren avantajlı kampanyalarıyla dikkat &ccedil;eker. T&uuml;m iletişim ihtiya&ccedil;larını tek bir &ccedil;atı altında toplayan bu &ccedil;&ouml;z&uuml;mler, hem ekonomik hem de pratik bir se&ccedil;enek sunar.</p>
                                <p data-start="1493" data-end="1678">Eğer siz de kesintisiz, hızlı ve uygun fiyatlı bir internet hizmeti arıyorsanız, Kablonet&rsquo;in size en uygun tarifesini hemen keşfedin. Kablonet ile internet artık daha &ouml;zg&uuml;r, daha g&uuml;&ccedil;l&uuml;!</p>
                                {/* İçerik devam edebilir */}
                            </div>
                        )}

                        {activeInfoSection === 'kampanyalar' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Kampanyaları</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerine sunduğu çeşitli kampanyalarla internet hizmetini daha avantajlı hale getirir. Bu kampanyalar kapsamında abonelere indirimli tarifeler, ücretsiz modem temini, hediye internet kotaları ve benzeri birçok fırsat sunulmaktadır. Kablonet kampanyaları sayesinde kullanıcılar, hem bütçelerini koruyarak hem de daha kapsamlı hizmet alarak internet deneyimlerinden maksimum verim elde edebilirler. İhtiyaca özel hazırlanan bu kampanyalar, yeni aboneliklerden mevcut kullanıcı avantajlarına kadar geniş bir yelpazeyi kapsar. Böylece Kablonet, yalnızca hızlı ve güvenilir internet sağlamakla kalmaz, aynı zamanda sunduğu kampanyalarla müşteri memnuniyetini de en üst seviyeye taşır.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'musteriHizmetleri' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Müşteri Hizmetleri</h3>
                                <p className="text-gray-600 mb-4">
                                   Kablonet, müşterilerine 7/24 ücretsiz teknik destek hizmeti sunarak her an ulaşılabilir bir iletişim ağı sağlar. Müşteri hizmetleri, kullanıcıların internet hizmetleriyle ilgili her türlü sorusuna yanıt verirken, karşılaşılan teknik sorunların çözümünde de aktif olarak destek sunar. Alanında uzman ekip tarafından sağlanan bu destek, müşterilerin sorunlarını hızlı ve etkili bir şekilde çözmelerine yardımcı olur. Kablonet müşteri hizmetleri, sadece teknik konularda değil, abonelik işlemleri, kampanya bilgileri ve faturalandırma gibi konularda da rehberlik eder. Bu kapsamlı destek anlayışı, Kablonet’in müşteri memnuniyetine verdiği önemin en önemli göstergelerinden biridir.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'kablonetiAvantajlari' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet'in Avantajları</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerine birçok avantaj sunar. Yüksek hızlı internet hizmeti, uygun fiyatlar, kampanyalar, müşteri hizmetleri gibi avantajlar, Kablonet'in tercih edilmesinde önemli bir rol oynar. Ayrıca, Kablonet müşterilerine kiralık modemleri vererek, internet bağlantı maliyetlerini düşürür.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'kablonetiHizliInternet' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet Hızlı İnternet</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, kullanıcılarına yüksek hızlı internet hizmeti sunarak dijital dünyada kesintisiz bir deneyim yaşatır. Kablonet’in sunduğu hızlı internet bağlantısı sayesinde müşteriler, web sitelerinde daha hızlı gezinebilir, dosya indirme ve yükleme işlemlerini kısa sürede tamamlayabilir. Bu yüksek hız, özellikle online eğitim, uzaktan çalışma, video konferans, oyun ve içerik izleme gibi yoğun internet kullanımı gerektiren alanlarda büyük bir avantaj sağlar. Kablonet’in yüksek hızlı interneti, kullanıcıların günlük işlerini daha verimli gerçekleştirmesine yardımcı olurken, internet deneyimini de konforlu ve sorunsuz hale getirir.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'esnekTarifeler' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet'in Esnek Tarifeleri</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerine esnek internet tarifeleri sunarak her kullanıcının ihtiyacına uygun çözümler geliştirir. Kotalı ve limitsiz seçeneklerin yanı sıra farklı hız alternatifleriyle hazırlanan bu tarifeler, kullanıcıların internet alışkanlıklarına göre kolayca özelleştirilebilir. Ayrıca çeşitli kampanyalarla desteklenen bu hizmetler, hem ekonomik avantajlar sağlar hem de kullanıcıya maksimum fayda sunar. Kablonet’in sunduğu bu esneklik, bireysel veya kurumsal tüm müşterilerin interneti tam da ihtiyaç duydukları şekilde kullanmalarına olanak tanır.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'guvenliInternet' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet'in Güvenli İnterneti</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerinin dijital güvenliğini ön planda tutarak güvenli internet hizmeti sunar. Kullanıcıların internette gönül rahatlığıyla gezinebilmesi için çeşitli güvenlik önlemleri sağlayan Kablonet, antivirüs programları, zararlı yazılım korumaları ve internet filtreleme sistemleri gibi araçlarla desteklenen bir altyapı sunar. Bu sayede özellikle çocuklu aileler, işletmeler ve bilinçli internet kullanıcıları için güvenli bir dijital ortam oluşturulur. Kablonet’in sunduğu bu güvenli internet hizmeti, kullanıcıların kişisel verilerini ve cihazlarını tehditlere karşı koruyarak, internet deneyimini hem daha sağlıklı hem de daha huzurlu hale getirir.
                                </p>
                            </div>
                        )}

                        {activeInfoSection === 'uygunFiyatlar' && (
                            <div className="prose prose-blue max-w-none">
                                <h3 className="text-xl font-bold text-blue-700 mb-4">Kablonet'in Uygun Fiyatları</h3>
                                <p className="text-gray-600 mb-4">
                                    Kablonet, müşterilerine uygun fiyatlarla internet hizmeti sunarak her bütçeye hitap eden çözümler geliştirir. Fiyatlandırma, kullanıcıların ihtiyaç ve tercihlerine göre özelleştirilebilir yapıda sunulur; böylece her müşteri kendine en uygun paketi seçebilir. Ayrıca dönemsel kampanyalar ve indirimlerle bu fiyatlar daha avantajlı hale getirilir. Kablonet’in sunduğu ekonomik ve esnek fiyat politikası, kaliteli internet hizmetine erişimi kolaylaştırırken, kullanıcıların bütçesini de korur.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetTariffs;