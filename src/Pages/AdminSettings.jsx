import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaSave, 
  FaArrowLeft, 
  FaCog, 
  FaDatabase,
  FaBell,
  FaEnvelope,
  FaServer,
  FaChartBar,
  FaDownload,
  FaUpload,
  FaTrash,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaShieldAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function AdminSettings() {
  const [settings, setSettings] = useState({
    // Site Ayarları
    siteName: 'Türksat Kablonet Blog',
    siteDescription: 'Türksat Kablonet resmi blog sitesi',
    siteUrl: 'https://kablonet.com',
    
    // Blog Ayarları
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    autoPublish: false,
    
    // Email Ayarları
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    emailNotifications: true,
    
    // Güvenlik Ayarları
    maxLoginAttempts: 5,
    sessionTimeout: 60, // dakika
    requireStrongPassword: true,
    enableTwoFactor: false,
    
    // Performans Ayarları
    cacheEnabled: true,
    cacheTimeout: 300, // saniye
    compressionEnabled: true,
    
    // Yedekleme Ayarları
    autoBackup: true,
    backupFrequency: 'daily', // daily, weekly, monthly
    maxBackups: 10
  });
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [systemStatus, setSystemStatus] = useState({
    database: 'healthy',
    storage: 'healthy',
    auth: 'healthy',
    cache: 'healthy'
  });
  const tabs = [
    { id: 'general', label: 'Genel', icon: FaCog },
    { id: 'blog', label: 'Blog', icon: FaBell },
    { id: 'email', label: 'E-posta', icon: FaEnvelope },
    { id: 'security', label: 'Güvenlik', icon: FaShieldAlt },
    { id: 'performance', label: 'Performans', icon: FaServer },
    { id: 'backup', label: 'Yedekleme', icon: FaDatabase }
  ];

  useEffect(() => {
    loadSettings();
    checkSystemStatus();
  }, []);

  const loadSettings = async () => {
    try {
      // Settings'leri localStorage'dan yükle (gerçek uygulamada API'den gelir)
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        setSettings({ ...settings, ...JSON.parse(savedSettings) });
      }
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error);
    }
  };

  const checkSystemStatus = async () => {
    // Sistem durumunu kontrol et (simülasyon)
    setTimeout(() => {
      setSystemStatus({
        database: Math.random() > 0.1 ? 'healthy' : 'warning',
        storage: Math.random() > 0.1 ? 'healthy' : 'warning',
        auth: 'healthy',
        cache: Math.random() > 0.2 ? 'healthy' : 'warning'
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      
      // Ayarları kaydet (gerçek uygulamada API'ye gönderilir)
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Ayarlar başarıyla kaydedildi');
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      toast.error('Ayarlar kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      toast.info('Test e-postası gönderiliyor...');
      
      // Simulated email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Test e-postası başarıyla gönderildi');
    } catch (error) {
      toast.error('Test e-postası gönderilemedi');
    }
  };

  const handleBackupCreate = async () => {
    try {
      toast.info('Yedekleme başlatılıyor...');
      
      // Simulated backup
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Yedekleme başarıyla oluşturuldu');
    } catch (error) {
      toast.error('Yedekleme oluşturulamadı');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <FaCheck className="text-green-500" />;
      case 'warning':
        return <FaTimes className="text-yellow-500" />;
      case 'error':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaSpinner className="animate-spin text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Adı
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Açıklaması
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site URL
              </label>
              <input
                type="url"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sayfa Başına Yazı Sayısı
              </label>
              <input
                type="number"
                name="postsPerPage"
                value={settings.postsPerPage}
                onChange={handleInputChange}
                min="1"
                max="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="allowComments"
                  checked={settings.allowComments}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Yorumlara izin ver</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="moderateComments"
                  checked={settings.moderateComments}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Yorumları modere et</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="autoPublish"
                  checked={settings.autoPublish}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Otomatik yayınla</span>
              </label>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleInputChange}
                  placeholder="smtp.gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                <input
                  type="number"
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Kullanıcı Adı
              </label>
              <input
                type="email"
                name="smtpUser"
                value={settings.smtpUser}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Şifre
              </label>
              <input
                type="password"
                name="smtpPassword"
                value={settings.smtpPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">E-posta bildirimlerini aktif et</span>
              </label>
              <button
                onClick={handleTestEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Test E-postası Gönder
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum Giriş Denemesi
                </label>
                <input
                  type="number"
                  name="maxLoginAttempts"
                  value={settings.maxLoginAttempts}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oturum Zaman Aşımı (dakika)
                </label>
                <input
                  type="number"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleInputChange}
                  min="15"
                  max="1440"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="requireStrongPassword"
                  checked={settings.requireStrongPassword}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Güçlü şifre zorunluluğu</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableTwoFactor"
                  checked={settings.enableTwoFactor}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">İki faktörlü doğrulama (2FA)</span>
              </label>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cache Zaman Aşımı (saniye)
              </label>
              <input
                type="number"
                name="cacheTimeout"
                value={settings.cacheTimeout}
                onChange={handleInputChange}
                min="60"
                max="3600"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="cacheEnabled"
                  checked={settings.cacheEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Cache'i aktif et</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="compressionEnabled"
                  checked={settings.compressionEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Sıkıştırmayı aktif et</span>
              </label>
            </div>
            
            {/* Sistem Durumu */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(systemStatus).map(([key, status]) => (
                  <div key={key} className={`p-4 rounded-lg ${getStatusColor(status)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{key}</span>
                      {getStatusIcon(status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yedekleme Sıklığı
                </label>
                <select
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                >
                  <option value="daily">Günlük</option>
                  <option value="weekly">Haftalık</option>
                  <option value="monthly">Aylık</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum Yedek Sayısı
                </label>
                <input
                  type="number"
                  name="maxBackups"
                  value={settings.maxBackups}
                  onChange={handleInputChange}
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="autoBackup"
                  checked={settings.autoBackup}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Otomatik yedekleme</span>
              </label>
            </div>
            
            {/* Yedekleme Aksiyonları */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yedekleme İşlemleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleBackupCreate}
                  className="flex items-center justify-center px-4 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                >
                  <FaDownload className="mr-2" />
                  Yedek Oluştur
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <FaUpload className="mr-2" />
                  Yedek Geri Yükle
                </button>
                <button className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <FaTrash className="mr-2" />
                  Eski Yedekleri Temizle
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Sistem Ayarları - Admin Panel</title>
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/admin-dashboard"
                className="flex items-center text-gray-600 hover:text-[#2F3D8D] transition-colors mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Sistem Ayarları</h1>
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSave className="mr-2" />
              )}
              {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </div>
      </div>      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden relative z-10">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#2F3D8D] text-[#2F3D8D]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
