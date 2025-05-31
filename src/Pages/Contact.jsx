import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaUser, FaCommentAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import serit from "../assets/serit.png";

const Contact = () => {
  // Form durumu için state değişkenleri
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    status: null, // 'success', 'error', null
    message: '',
  });

  // Form değişikliğini izleme
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus({
        status: 'error',
        message: 'Lütfen tüm alanları doldurunuz.'
      });
      return;
    }

    // E-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        status: 'error',
        message: 'Lütfen geçerli bir e-posta adresi giriniz.'
      });
      return;
    }

    // Telefon numarası doğrulama
    let cleanPhone = formData.phone.replace(/\s+/g, '');
    cleanPhone = cleanPhone.replace(/[+]/g, '');
    
    // Başında 0 yoksa ve 90 ile başlıyorsa düzeltme yap
    if (cleanPhone.substring(0, 1) !== '0' && cleanPhone.substring(0, 2) === '90') {
      cleanPhone = '0' + cleanPhone.substring(2);
    } else if (cleanPhone.substring(0, 1) !== '0') {
      cleanPhone = '0' + cleanPhone;
    }
    
    if (!/^\d{10,11}$/.test(cleanPhone.replace(/^0/, ''))) {
      setSubmitStatus({
        status: 'error',
        message: 'Geçerli bir telefon numarası giriniz. (10 veya 11 haneli)'
      });
      return;
    }

    setLoading(true);
    setSubmitStatus({ status: null, message: '' });

    try {
      // API endpoint ve parametreler
      const apiUrl = "/api/service/1.0/contact/";
      const apiKey = "c1d1b885397a6e5ab26e77343201ea89";
      
      const requestBody = new URLSearchParams();
      requestBody.append("apikey", apiKey);
      requestBody.append("name", formData.name);
      requestBody.append("email", formData.email);
      requestBody.append("phone", cleanPhone);
      requestBody.append("message", formData.message);
      requestBody.append("source", "website-contact");
      
      console.log("İletişim formu gönderiliyor:", Object.fromEntries(requestBody));
      
      // API'ye istek gönderme
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      console.log("API yanıtı:", response.data);
      
      // Başarı durumunda
      setSubmitStatus({
        status: 'success',
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.'
      });
      
      // Form alanlarını temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Başarı bildirimi göster
      if (typeof toast === 'function') {
        toast.success('Mesajınız başarıyla gönderildi!');
      }
      
    } catch (error) {
      console.error('İletişim formu gönderiminde hata:', error);
      
      // Hata durumunda
      setSubmitStatus({
        status: 'error',
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
      });
      
      // Hata bildirimi göster
      if (typeof toast === 'function') {
        toast.error('Mesajınız gönderilirken bir hata oluştu!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[400px] bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl">
            Sorularınız, istekleriniz veya önerileriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
      </div>

      {/* Ana İçerik Bölümü */}
      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10 -mt-12">
        {/* İletişim bilgileri ve harita kartları */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* İletişim Bilgileri Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Adres</h3>
                  <p className="text-gray-600 mt-1">
                    Fatih Sultan Mehmet Cad, Kavacık, Şht. Teğmen Ali Yılmaz Sk. No:14, Kat:3, 34810 Beykoz/İstanbul
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaPhoneAlt size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Telefon</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="tel:08508066000" className="hover:text-blue-600 transition-colors">0850 806 60 00</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaEnvelope size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">E-posta</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:info@turksat.com.tr" className="hover:text-blue-600 transition-colors">info@kablointernet.com.tr</a>
                  </p>
                </div>
              </div>
              
            </div>
            
          </div>
          
          {/* Harita Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6 h-[450px] lg:h-auto lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h2>
            <div className="h-[360px] w-full rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.5850403872865!2d29.095939815729387!3d41.08955887929325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9117e9c1273%3A0x55f68ba25e893a3!2sFatih%20Sultan%20Mehmet%20Cd.%2C%20Kava%C3%A7%C4%B1k%2C%20%C5%9Eht.%20Te%C4%9Fmen%20Ali%20Y%C4%B1lmaz%20Sk.%20No%3A14%2C%2034810%20Beykoz%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1653565187201!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Türksat Bayi Lokasyon"
              ></iframe>
            </div>
          </div>
        </div>

        
        {/* SSS Bölümü (İsteğe Bağlı) */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Sık Sorulan Sorular</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              İletişim kurmadan önce sık sorulan sorulara göz atabilirsiniz. Sorularınızın cevapları burada olabilir.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Turksat Kablo hizmeti bölgemde var mı?</h3>
                <p className="mt-2 text-gray-600">
                  Altyapı sorgulama bölümümüzden adresinizi seçerek Turksat Kablo hizmetlerinin bölgenizde mevcut olup olmadığını öğrenebilirsiniz.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Türksat Kablo aboneliği için hangi belgeler gereklidir?</h3>
                <p className="mt-2 text-gray-600">
                  Türksat Kablo aboneliği için kimlik belgesi (nüfus cüzdanı, ehliyet veya pasaport) ve abonelik işlemlerini gerçekleştirecek kişinin kimlik fotokopisi yeterlidir.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Teknik destek için ne yapmalıyım?</h3>
                <p className="mt-2 text-gray-600">
                  Teknik destek için 0850 806 60 00 numaralı çağrı merkezimizi 7/24 arayabilirsiniz. Ayrıca online işlemler bölümünden de arıza kaydı oluşturabilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <a href="/sıkça-sorulan-sorular" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center transition-colors duration-300">
                Tüm Sık Sorulan Soruları Görüntüle
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;