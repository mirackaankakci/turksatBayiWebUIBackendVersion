import React, { useState } from "react";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaTools,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";

import serit from "../assets/serit.png";

const HemenBasvur = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setIsSubmitting(true);

    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Form başarıyla gönderildikten sonra formu sıfırla
      setFormData({
        fullName: "",
        phoneNumber: "",
      });

      // Başarı mesajını 3 saniye sonra kaldır
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[400px] px-5 py-5 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-32 bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Hemen Başvurun
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Hızlı internet deneyimi için sadece bir adım uzaktasınız. Aşağıdaki
            formu doldurarak başvurunuzu hemen başlatabilirsiniz.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 -mt-[100px]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Bilgilerinizi Bırakın
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-0 md:flex md:gap-4 mb-6"
          >
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <FaUserAlt />
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Adınız Soyadınız"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-4 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700"
              />
            </div>

            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <FaPhoneAlt />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Telefon Numaranız"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-4 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-4 px-6 rounded-lg font-medium text-white transition duration-300 flex items-center justify-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg"
              }`}
            >
              {isSubmitting ? (
                "Gönderiliyor..."
              ) : (
                <>
                  Beni Arayın <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>

          {submitSuccess && (
            <div className="p-4 mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-medium">
                    Başvurunuz alındı. En kısa sürede sizinle iletişime
                    geçeceğiz.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              Müşteri temsilcimiz, sizi gün içerisinde{" "}
              <span className="font-medium">09:00 - 23:00</span> saatleri
              arasında <span className="font-medium">0850 802 22 22</span>{" "}
              numaralı hattımızdan arayarak güncel kampanyalar ve altyapınızla
              ilgili bilgilendirme yapacaktır.
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Nasıl Çalışır?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300">
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-5 mx-auto">
                <FaPhoneAlt size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                1. İlk Görüşme
              </h3>
              <p className="text-gray-600">
                Başvurunuz alındıktan sonra müşteri temsilcimiz sizi arayacak.
                Kampanya seçimi, güvenlik teyidi ve kimlik bilgilerinizin
                doğrulanması durumunda önkayıt işlemleriniz tamamlanacaktır.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300">
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-5 mx-auto">
                <FaTools size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                2. Teknik Ekip
              </h3>
              <p className="text-gray-600">
                Bölgenizdeki müşteri temsilcimiz tarafından farklı bir iletişim
                numarası ile arama gerçekleştirilir. Kurulum randevunuz 5 iş
                günü içerisinde oluşturulur.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300">
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-5 mx-auto">
                <FaRocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                3. İnternete Bağlanın
              </h3>
              <p className="text-gray-600">
                Sözleşmenizi kurulumdan önce e-devlet üzerinden veya kurulum
                esnasında onaylayabilirsiniz. Sözleşme kurulum gerçekleştiği
                takdirde geçerli olacaktır. Güzel günlerde kullanmanız
                dileğiyle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Daha Hızlı İnternet Deneyimi İçin
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Yüksek hızlı fiber internet ile tanışın, online dünyada kesintisiz
            deneyimin tadını çıkarın.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-lg"
          >
            Hemen Başvur
          </button>
        </div>
      </div>
    </>
  );
};

export default HemenBasvur;
