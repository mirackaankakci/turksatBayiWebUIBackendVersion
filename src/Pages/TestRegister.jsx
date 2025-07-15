import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../App.jsx';
import { Link } from 'react-router-dom';

function TestRegister() {
  const [formData, setFormData] = useState({
    email: 'admin@kablonet.com',
    password: 'admin123',
    name: 'Super Admin'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🔄 Firebase bağlantısı test ediliyor...');
      console.log('📧 Email:', formData.email);
      console.log('🔑 Şifre:', formData.password);

      // 1. Firebase Auth ile kullanıcı oluştur
      console.log('🔄 Firebase Auth kullanıcısı oluşturuluyor...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log('✅ Firebase Auth kullanıcısı oluşturuldu:', user.uid);

      // 2. Firestore'da admin dokümantı oluştur
      console.log('🔄 Firestore admin dokümantı oluşturuluyor...');
      await setDoc(doc(db, 'admins', user.uid), {
        email: formData.email,
        name: formData.name,
        role: 'super_admin',
        isActive: true,
        createdAt: serverTimestamp(),
        lastLoginAt: null,
        permissions: {
          blog: true,
          users: true,
          settings: true
        }
      });

      console.log('✅ Firestore admin dokümantı oluşturuldu!');

      setResult({
        success: true,
        message: 'Admin kullanıcısı başarıyla oluşturuldu!',
        uid: user.uid,
        email: formData.email
      });

    } catch (error) {
      console.error('❌ Hata:', error);
      setError({
        code: error.code,
        message: error.message
      });

      if (error.code === 'auth/email-already-in-use') {
        setResult({
          success: false,
          message: 'Bu email zaten kullanımda! Giriş yapmayı deneyin.',
          email: formData.email
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            🧪 Firebase Test & Admin Kayıt
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔑 Şifre
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                👤 İsim
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Admin Oluşturuluyor...
                </>
              ) : (
                '🚀 Admin Oluştur & Firebase Test Et'
              )}
            </button>
          </form>

          {/* Sonuç Mesajları */}
          {result && (
            <div className={`mt-6 p-4 rounded-md ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center">
                <div className="text-2xl mr-3">
                  {result.success ? '✅' : '⚠️'}
                </div>
                <div>
                  <p className={`font-medium ${
                    result.success ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.uid && (
                    <p className="text-sm text-gray-600 mt-1">
                      User ID: {result.uid}
                    </p>
                  )}
                  {result.email && (
                    <p className="text-sm text-gray-600">
                      Email: {result.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hata Mesajları */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <div className="text-2xl mr-3">❌</div>
                <div>
                  <p className="font-medium text-red-800">
                    Firebase Hatası: {error.code}
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bilgilendirme */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">ℹ️ Bilgi</h3>
            <p className="text-sm text-blue-700">
              Bu sayfa Firebase bağlantısını test etmek ve admin kullanıcısı oluşturmak için hazırlanmıştır.
            </p>
          </div>

          {/* Navigasyon */}
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/admin-login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              🔐 Admin Girişe Git
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              🏠 Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestRegister; 