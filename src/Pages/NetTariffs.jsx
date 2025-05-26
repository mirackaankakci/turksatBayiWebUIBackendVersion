import React, { useState } from 'react';
import serit from "../assets/serit.png";

const NetTariffs = () => {
    const [selectedCategory, setSelectedCategory] = useState('akilli');

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
        <div>
            {/* Hero Banner */}
            <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-24 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
                <img
                    src={serit}
                    alt="Serit"
                    className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
                    style={{ zIndex: 0 }}
                />
                <div className="relative z-10 max-w-7xl mx-auto text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Her Bütçe & Her İhtiyaca<br />Tarife Seçenekleri
                    </h1>
                    <p className="mt-3 sm:mt-5 text-lg sm:text-xl opacity-90">
                        Türksat Kablolu Fiber İnternet ve Dijital Platformları hizmetleri.
                    </p>
                </div>
            </div>

            {/* Tariffs Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <button
                        className={`py-2 px-4 md:px-6 rounded-md font-medium transition-all ${selectedCategory === 'akilli' 
                            ? 'bg-blue-800 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedCategory('akilli')}
                    >
                        Akıllı Sınırsız Tarifeler
                    </button>
                    <button
                        className={`py-2 px-4 md:px-6 rounded-md font-medium transition-all ${selectedCategory === 'sinirsiz' 
                            ? 'bg-blue-800 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedCategory('sinirsiz')}
                    >
                        Sınırsız Tarifeler
                    </button>
                    <button
                        className={`py-2 px-4 md:px-6 rounded-md font-medium transition-all ${selectedCategory === 'kotaliTarifeler' 
                            ? 'bg-blue-800 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedCategory('kotaliTarifeler')}
                    >
                        Kotalı Tarifeler
                    </button>
                    <button
                        className={`py-2 px-4 md:px-6 rounded-md font-medium transition-all ${selectedCategory === 'duranKotaliTarifeler' 
                            ? 'bg-blue-800 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedCategory('duranKotaliTarifeler')}
                    >
                        Duran Kotalı Tarifeler
                    </button>
                    <button
                        className={`py-2 px-4 md:px-6 rounded-md font-medium transition-all ${selectedCategory === 'dslTarifeler' 
                            ? 'bg-blue-800 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedCategory('dslTarifeler')}
                    >
                        DSL Tarifeler
                    </button>
                </div>

                {/* Content Container - White Background with Shadow */}
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-8">
                    {/* Akıllı Sınırsız Tarifeler Section */}
                    {selectedCategory === 'akilli' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">Akıllı Sınırsız Tarifeler</h2>
                            <p className="text-gray-600 mb-6">İnternet & Kullanım Anlığınızdaki Data Tüketimini Seçebilirsiniz</p>

                            {/* Table */}
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">İndirme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (06:00 - 16:00)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (DOCSIS)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (FIBER)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Kota</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Tarife Fiyatı</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {akilliSinirsizTariffs.map((tariff, index) => (
                                            <tr key={tariff.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="py-3 px-3 text-sm">{tariff.download}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.daytimeUpload}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.nighttimeUpload}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.fiberUpload}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.quota}</td>
                                                <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                                <p>* Akıllı Sınırsız Tarife serisinin bütün tarifelerini, kullanım miktarınıza bağlı olarak ek ücret ödenmemektedir. Saat 00:00-16:00 saatleri içerisinde yapılacak günlük büyük bölümünde bağlantı hızları tarifede belirtilen hıza yükseltilebilecektir.</p>
                                <p>* Bu tarifelerin özelliği srınırsız olmalarıdır. Kotlalı bir tarife değildir.</p>
                                <p>* Seçmiş olduğunuz tarifeler 00:00-16:00 saatleri arasında hız sınırlandırması olmadan kullanabilirsiniz. 16:00-00:00 saatleri arasında ise internet bağlantı hızınız tabloda belirtilen hıza düşürülmektedir.</p>
                            </div>
                        </div>
                    )}

                    {/* Sınırsız Tarifeler Section */}
                    {selectedCategory === 'sinirsiz' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">Sınırsız Tarifeler</h2>
                            <p className="text-gray-600 mb-6">İnternetinizi sınırsız kullanmak isteyenlere...</p>

                            {/* Table */}
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">İndirme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı<br />(Kablo Modem / DOCSIS)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı<br />(Eve Kadar Fiber / GPON)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sinirsizTariffs.map((tariff, index) => (
                                            <tr key={tariff.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="py-3 px-3 text-sm">{tariff.download}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.uploadDocsis}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.uploadFiber}</td>
                                                <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                                <p>*Sınırsız tarife kapsamında, kullanım miktarı ile ilişkili olarak herhangi bir hız düşürme söz konusu değildir. Kullanım miktarına bağlı olarak ek ücret alınmaz.</p>
                                <p>*200 Mbps ve üstü tarifeler GPON altyapısında hizmet verilebilen tarifelerdir. Daireye kadar fiber Kablonet bağlantısı ile Docsis altyapısından farklı modemler kullanılmaktadır</p>
                                <p>*200, 300, 500 ve 1.000 Mbps hızında internet hizmeti GPON altyapısı ile hizmet sunulan adreslerde sağlanabilmektedir. 1000 Mbps hız için müşterilerimizin ayrıca sabit IP hizmetini satın almaları gerekmektedir.</p>
                            </div>
                        </div>
                    )}

                    {/* Kotalı Tarifeler Section */}
                    {selectedCategory === 'kotaliTarifeler' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">Kotalı Tarifeler</h2>
                            <p className="text-gray-600 mb-6">Kullanımınıza göre ödeme yapmak istiyorsanız...</p>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">İndirme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (DOCSIS)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (GPON)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Kota</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Fiyat</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Ek Kullanım Ücreti</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Maksimum Ücret</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kotaliTarifeler.map((tariff, index) => (
                                            <tr key={tariff.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
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
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                                <p>* Kotalı İnternet Tarifesi için tarifede belirlenen GB`lar için ücretler her ay sabit olarak faturalara yansıtılır. Kotalı hizmetler için aylık olarak ödenecek ücret, aynı hızın sınırsız tarifesini geçemeyecektir. Tüm kotalı hızlarda kullanılan her artı GB için (GB Sabiti x Kullanılan GB miktarı) kadar tutar faturaya eklenecektir. En son içinde bulunulan GB miktarı için kıst ücret uygulanmayacak olup tam GB ücreti alınacaktır.</p>
                            </div>
                        </div>
                    )}

                    {/* Duran Kotalı Tarifeler Section */}
                    {selectedCategory === 'duranKotaliTarifeler' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">Duran Kotalı Tarifeler</h2>
                            <p className="text-gray-600 mb-6">İnternet Kullanım Alışkanlığınıza Göre Tarifenizi Seçebilirsiniz</p>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">İndirme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (DOCSIS)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı (GPON)</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Kota</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Fiyat</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Ek Kullanım Ücreti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {duranKotaliTarifeler.map((tariff, index) => (
                                            <tr key={tariff.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
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
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                                <p>* Duran Kotalı İnternet Tarifelerinde, kota bitiminde internet kullanımınız durdurulur. Ek GB satın almadan internet kullanılamaz.</p>
                                <p>* Kota yenileme veya ek kota satın alma işlemleri müşteri hizmetleri üzerinden gerçekleştirilebilir.</p>
                            </div>
                        </div>
                    )}

                    {/* DSL Tarifeler Section */}
                    {selectedCategory === 'dslTarifeler' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">DSL Tarifeler</h2>
                            <p className="text-gray-600 mb-6">Türk Telekom altyapısı üzerinden verilen tarifeler</p>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">İndirme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Yükleme Hızı</th>
                                            <th className="bg-gray-400/80 text-white py-3 px-3 text-left text-sm font-medium">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dslTarifeler.map((tariff, index) => (
                                            <tr key={tariff.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="py-3 px-3 text-sm">{tariff.indirmeHizi}</td>
                                                <td className="py-3 px-3 text-sm">{tariff.yuklemeHizi}</td>
                                                <td className="py-3 px-3 text-sm font-bold text-blue-800">{tariff.fiyat}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                                <p>* Türk Telekom altyapısı üzerinden DSL / FTTH internet tarifeleri bulunduğunuz adrese göre farklı seçenekler gösterebilir.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NetTariffs;