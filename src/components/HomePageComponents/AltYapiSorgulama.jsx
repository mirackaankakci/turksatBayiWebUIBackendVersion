import React, { useState } from 'react'

const AltYapiSorgulama = () => {
  const [formData, setFormData] = useState({
    il: '',
    ilce: '',
    mahalle: '',
    sokak: '',
    bina: '',
    daire: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Altyapı sorgulaması yapıldı:", formData);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="border-t border-b border-gray-200 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2F3D8D] mb-4 sm:mb-6">
          Altyapı Sorgulama
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* İlk satır: İl, İlçe, Mahalle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="w-full">
              <input
                type="text"
                name="il"
                value={formData.il}
                onChange={handleChange}
                placeholder="İl seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
            
            <div className="w-full">
              <input
                type="text"
                name="ilce"
                value={formData.ilce}
                onChange={handleChange}
                placeholder="İlçe seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
            
            <div className="w-full">
              <input
                type="text"
                name="mahalle"
                value={formData.mahalle}
                onChange={handleChange}
                placeholder="Mahalle seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* İkinci satır: Sokak, Bina */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <input
                type="text"
                name="sokak"
                value={formData.sokak}
                onChange={handleChange}
                placeholder="Sokak seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
            
            <div className="w-full">
              <input
                type="text"
                name="bina"
                value={formData.bina}
                onChange={handleChange}
                placeholder="Bina seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Üçüncü satır: Daire ve Sorgula butonu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="w-full">
              <input
                type="text"
                name="daire"
                value={formData.daire}
                onChange={handleChange}
                placeholder="Daire seçiniz"
                className="w-full px-3 sm:px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600 text-sm sm:text-base"
              />
            </div>
            
            <div className="w-full">
              <button 
                type="submit"
                className="w-full bg-[#2F3D8D] text-white px-4 py-2.5 rounded-md hover:bg-[#263271] transition-colors duration-200 flex items-center justify-center text-sm sm:text-base font-medium"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Sorgula
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 sm:mt-8">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Bulunduğunuz binada Kablonet (Uydunet), Kablo TV (Teledünya) ve Kabloses Altyapısı olup olmadığını yukarıda
            yer alan form aracılığı ile kontrol edebilirsiniz. Binanızda Kablo TV Altyapısı varsa, hemen güncel kampanya veya
            tarifelerimizden birini seçerek hizmet almaya başlayabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AltYapiSorgulama;