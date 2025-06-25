import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaUsers, 
  FaBlog, 
  FaEye, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUserShield,
  FaNewspaper,
  FaComments,
  FaTachometerAlt,
  FaSpinner,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { simpleBlogService as blogService } from '../services/simpleBlogService';
import { adminService } from '../services/authService';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalAdmins: 0,
    activeAdmins: 0,
    totalViews: 0,
    monthlyPosts: 0,
    weeklyPosts: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentAdmins, setRecentAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week'); // week, month, year
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Admin menü öğeleri
  const menuItems = [
    {
      title: 'Dashboard',
      icon: FaTachometerAlt,
      path: '/admin-dashboard',
      color: 'bg-blue-500',
      active: true
    },
    {
      title: 'Blog Yönetimi',
      icon: FaBlog,
      path: '/blog-admin',
      color: 'bg-green-500',
      count: stats.totalPosts
    },    {
      title: 'Kullanıcı Yönetimi',
      icon: FaUsers,
      path: '/admin-management',
      color: 'bg-purple-500',
      count: stats.totalAdmins
    },
    {
      title: 'Ayarlar',
      icon: FaCog,
      path: '/admin-settings',
      color: 'bg-gray-500'
    }
  ];

  // İstatistikleri yükle
  useEffect(() => {
    loadDashboardData();
  }, [timeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Blog istatistikleri
      const posts = await blogService.getAll();
      const admins = await adminService.getAll();
      
      // Tarih filtreleri
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      // İstatistikleri hesapla
      const totalViews = posts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
      const weeklyPosts = posts.filter(post => 
        post.createdAt && new Date(post.createdAt) >= weekAgo
      ).length;
      const monthlyPosts = posts.filter(post => 
        post.createdAt && new Date(post.createdAt) >= monthAgo
      ).length;

      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        totalAdmins: admins.length,
        activeAdmins: admins.filter(a => a.isActive).length,
        totalViews,
        monthlyPosts,
        weeklyPosts
      });

      // Son blog yazıları
      const sortedPosts = posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentPosts(sortedPosts);

      // Son adminler
      const sortedAdmins = admins
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentAdmins(sortedAdmins);

    } catch (error) {
      console.error('Dashboard verileri yüklenirken hata:', error);
      toast.error('Dashboard verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken hata oluştu');
    }
  };

  const getChangeIndicator = (current, previous) => {
    if (current > previous) {
      return <FaArrowUp className="text-green-500 text-sm" />;
    } else if (current < previous) {
      return <FaArrowDown className="text-red-500 text-sm" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Dashboard yükleniyor...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Dashboard - Türksat Kablonet</title>
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center mr-8">
                <img src="/assets/logo.png" alt="Türksat Kablonet" className="h-8" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Hoş geldiniz, {currentUser?.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
              >
                <option value="week">Son 7 Gün</option>
                <option value="month">Son 30 Gün</option>
                <option value="year">Son 1 Yıl</option>
              </select>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                item.active ? 'ring-2 ring-[#2F3D8D] ring-opacity-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white mr-4`}>
                    <item.icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.count !== undefined && (
                      <p className="text-sm text-gray-600">{item.count} öğe</p>
                    )}
                  </div>
                </div>
                {item.active && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#2F3D8D] rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Toplam Blog Yazıları */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Toplam Blog Yazıları
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPosts}
                </p>
                <div className="flex items-center mt-2">
                  {getChangeIndicator(stats.weeklyPosts, 0)}
                  <span className="text-sm text-gray-600 ml-1">
                    Bu hafta +{stats.weeklyPosts}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaNewspaper className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Yayınlanan Yazılar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Yayınlanan
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.publishedPosts}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">
                    %{Math.round((stats.publishedPosts / stats.totalPosts) * 100) || 0} oranı
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FaEye className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Toplam Görüntülenme */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Toplam Görüntülenme
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {stats.totalViews.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">
                    Ortalama {Math.round(stats.totalViews / stats.totalPosts) || 0}/yazı
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Aktif Adminler */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Aktif Adminler
                </p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {stats.activeAdmins}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">
                    Toplam {stats.totalAdmins} admin
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <FaUserShield className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Son Blog Yazıları */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Son Blog Yazıları</h2>
                <Link
                  to="/blog-admin"
                  className="text-[#2F3D8D] hover:text-[#1f2d6e] text-sm font-medium"
                >
                  Tümünü Gör →
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FaNewspaper className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">Henüz blog yazısı yok</p>
                  <Link
                    to="/blog-admin/new"
                    className="inline-flex items-center mt-4 px-4 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    İlk Yazıyı Oluştur
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : '-'}
                          </span>
                          <span className="flex items-center">
                            <FaEye className="mr-1" />
                            {post.viewCount || 0} görüntülenme
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status === 'published' ? 'Yayınlandı' : 'Taslak'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Görüntüle"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/blog-admin/edit/${post.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sistem Durumu ve Son Adminler */}
          <div className="space-y-6">
            {/* Sistem Durumu */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Sistem Durumu</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Sistemi</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Çalışıyor
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Veritabanı</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Çalışıyor
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auth Sistemi</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Çalışıyor
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Son Güncelleme</span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Son Adminler */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Son Adminler</h2>                <Link
                  to="/admin-management"
                  className="text-[#2F3D8D] hover:text-[#1f2d6e] text-sm font-medium"
                >
                  Tümünü Gör →
                </Link>
                </div>
              </div>
              <div className="p-6">
                {recentAdmins.length === 0 ? (
                  <div className="text-center py-4">
                    <FaUsers className="mx-auto text-3xl text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm">Admin yok</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentAdmins.map(admin => (
                      <div key={admin.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#2F3D8D] rounded-full flex items-center justify-center mr-3">
                            <FaUserShield className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                            <p className="text-xs text-gray-500">{admin.role}</p>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${admin.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hızlı Aksiyonlar */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Hızlı Aksiyonlar</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/blog-admin/new"
                  className="flex items-center w-full p-3 text-left bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                >
                  <FaPlus className="mr-3" />
                  Yeni Blog Yazısı
                </Link>                <Link
                  to="/admin-management"
                  className="flex items-center w-full p-3 text-left bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaUsers className="mr-3" />
                  Kullanıcı Yönetimi
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center w-full p-3 text-left bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaEye className="mr-3" />
                  Siteyi Görüntüle
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 Türksat Kablonet Admin Panel</p>
            <p>Sürüm 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
