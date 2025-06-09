import React, { useState, useEffect } from "react";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaTools,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios"; // axios ekleyin (npm install axios)
import serit from "/assets/serit.png";

const HemenBasvur = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    kampanyaId: "", // URL'den kampanya ID'si alınabilir
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Telefon numarasını formatla
  const formatPhoneNumber = (phone) => {
    // Boşluk ve özel karakterleri temizle
    let formattedPhone = phone.replace(/\s+/g, "");
    formattedPhone = formattedPhone.replace(/[^\d+]/g, "");

    // + işaretini kaldır
    formattedPhone = formattedPhone.replace(/\+/g, "");

    // 90 ile başlıyorsa ve 0 yoksa düzelt
    if (formattedPhone.startsWith("90") && formattedPhone.length > 2) {
      formattedPhone = "0" + formattedPhone.substring(2);
    }
    // Başında 0 yoksa ekle
    else if (!formattedPhone.startsWith("0") && formattedPhone.length > 0) {
      formattedPhone = "0" + formattedPhone;
    }

    // Maksimum 11 karakter (0 dahil)
    if (formattedPhone.length > 11) {
      formattedPhone = formattedPhone.substring(0, 11);
    }

    return formattedPhone;
  };

  const validatePhoneNumber = (phone) => {
    // Türkiye telefon formatı kontrolü: 05XX XXX XXXX
    const turkishPhoneRegex = /^0[5][0-9]{9}$/;

    if (!phone) {
      return "Telefon numarası gerekli";
    } else if (!turkishPhoneRegex.test(phone)) {
      return "Geçerli bir cep telefonu numarası girin (05XX XXX XXXX)";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedPhone,
      }));

      // Telefon doğrulama hatasını temizle (anlık doğrulama yapma)
      if (phoneError) {
        setPhoneError("");
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // URL'den kampanya ID'sini al
  useEffect(() => {
    // URL'den kampanya ID'sini alabilirsiniz
    const params = new URLSearchParams(window.location.search);
    const kampanyaId = params.get("kampanyaId") || "";

    setFormData((prevState) => ({
      ...prevState,
      kampanyaId,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!formData.fullName.trim()) {
      alert("Lütfen adınızı ve soyadınızı girin.");
      return;
    }

    // Telefon numarası doğrulama
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
      setPhoneError(phoneError);
      return;
    }

    setIsSubmitting(true);
    setPhoneError("");

    try {
      const response = await axios.post('/kaydet.php', {
        adsoyad: formData.fullName.trim(),
        telefon: formData.phoneNumber.trim(),
        kampanyaId: formData.kampanyaId || 'Hemen Başvur Form'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 60000, // 60 saniye
        withCredentials: false
      });

      console.log("API Yanıtı:", response.data);

      if (response.data && response.data.success === true) {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // GTM'e dönüşüm olayını gönder
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formgonderildi',
          formType: 'hemenbasvur',
          kampanyaId: formData.kampanyaId || 'Hemen Başvur Form'
        });
        
        console.log("GTM Event gönderildi: formGonderildi");

        // Formu temizle
        setFormData({
          fullName: "",
          phoneNumber: "",
          kampanyaId: formData.kampanyaId,
        });

        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);

      } else {
        throw new Error(response.data?.error || 'İşlem başarısız');
      }

    } catch (error) {
      console.error("API Hatası:", error);
      setIsSubmitting(false);
      
      let errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Form bilgileri hatalı. Lütfen kontrol edin.';
      }
      
      alert(errorMessage);
    }
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
                placeholder="Telefon Numaranız (05XX XXX XXXX)"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-4 rounded-lg bg-gray-50 border ${
                  phoneError ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700`}
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
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
                    Başvurunuz başarıyla alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <p className="text-sm mt-1">
                    Müşteri temsilcimiz <span className="font-medium"><a href="tel:08508066000">0850 806 60 00</a></span> numaralı hattımızdan sizi arayacaktır.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              Müşteri temsilcimiz, sizi gün içerisinde{" "}
            <span className="font-medium text-[17px] text-blue-600"><a href="tel:08508066000">0850 806 60 00</a></span>{" "}
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
