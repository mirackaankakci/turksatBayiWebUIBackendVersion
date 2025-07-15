import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaChartLine, 
  FaEye, 
  FaSignOutAlt,
  FaArrowLeft,
  FaSpinner,
  
  FaNewspaper,
  FaHeart,
  
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../App.jsx';
import { toast } from 'react-toastify';

function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // 7, 30, 90, 365
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalPosts: 0,
    publishedPosts: 0,
    averageViews: 0,
    topPosts: [],
    categoryStats: [],
    recentActivity: [],
    viewsOverTime: []
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const timeRanges = [
    { value: '7', label: 'Son 7 Gün' },
    { value: '30', label: 'Son 30 Gün' },
    { value: '90', label: 'Son 90 Gün' },
    { value: '365', label: 'Son 1 Yıl' }
  ];

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, selectedCategory]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // Tarih aralığını hesapla
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeRange));
      
      // Blog yazılarını al
      const postsRef = collection(db, 'blog_posts');
      const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));
      const postsSnapshot = await getDocs(postsQuery);
      
      const allPosts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
      
      // Kategorileri al
      const categoriesRef = collection(db, 'blog_categories');
      const categoriesSnapshot = await getDocs(categoriesRef);
      const categories = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filtreleme
      const filteredPosts = allPosts.filter(post => {
        const postDate = new Date(post.createdAt);
        const inTimeRange = postDate >= startDate && postDate <= endDate;
        const inCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return inTimeRange && inCategory;
      });
      
      // İstatistikleri hesapla
      const totalViews = allPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
      const publishedPosts = allPosts.filter(post => post.status === 'published');
      const averageViews = publishedPosts.length > 0 ? totalViews / publishedPosts.length : 0;
      
      // En çok okunan yazılar
      const topPosts = [...allPosts]
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 10);
      
      // Kategori istatistikleri
      const categoryStats = categories.map(category => {
        const categoryPosts = allPosts.filter(post => post.category === category.slug);
        const categoryViews = categoryPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
        return {
          ...category,
          postCount: categoryPosts.length,
          totalViews: categoryViews,
          averageViews: categoryPosts.length > 0 ? categoryViews / categoryPosts.length : 0
        };
      }).sort((a, b) => b.totalViews - a.totalViews);
      
      // Son aktiviteler (yeni yazılar)
      const recentActivity = allPosts
        .filter(post => new Date(post.createdAt) >= startDate)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
      
      // Zaman içinde görüntüleme sayısı (simüle edilmiş)
      const viewsOverTime = generateViewsOverTime(allPosts, startDate, endDate);
      
      setAnalytics({
        totalViews,
        totalPosts: allPosts.length,
        publishedPosts: publishedPosts.length,
        averageViews,
        topPosts,
        categoryStats,
        recentActivity,
        viewsOverTime
      });
      
    } catch (error) {
      console.error('Analytics yüklenirken hata:', error);
      toast.error('Analytics verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const generateViewsOverTime = (posts, startDate, endDate) => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Basit simülasyon - gerçek uygulamada analytics servisi kullanılır
      const dayViews = Math.floor(Math.random() * 100) + 50;
      data.push({
        date: date.toISOString().split('T')[0],
        views: dayViews
      });
    }
    
    return data;
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
    toast.success('Veriler yenilendi');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const calculateGrowthRate = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Analytics Dashboard - Türksat Kablonet</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link 
                to="/admin-dashboard" 
                className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Blog performansı ve istatistikler
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                
                Yenile
              </button>
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

      {/* İçerik */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
            <span className="ml-3 text-lg text-gray-600">Analytics yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Filtreler */}
            <div className="bg-white rounded-lg shadow mb-8 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zaman Aralığı
                    </label>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      {timeRanges.map(range => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      <option value="all">Tüm Kategoriler</option>
                      {analytics.categoryStats.map(category => (
                        <option key={category.id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  Son güncelleme: {new Date().toLocaleString('tr-TR')}
                </div>
              </div>
            </div>

            {/* Ana İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">
                      Toplam Görüntülenme
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {formatNumber(analytics.totalViews)}
                    </p>
                    <div className="flex items-center mt-2">
                     
                      <span className="text-sm text-green-600">
                        +12% bu ay
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaEye className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">
                      Toplam Yazı
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {analytics.totalPosts}
                    </p>
                    <div className="flex items-center mt-2">
                      
                      <span className="text-sm text-green-600">
                        +{analytics.publishedPosts} yayınlı
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaNewspaper className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">
                      Ortalama Görüntülenme
                    </p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      {Math.round(analytics.averageViews)}
                    </p>
                    <div className="flex items-center mt-2">
                      
                      <span className="text-sm text-green-600">
                        +8% artış
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaChartLine className="text-purple-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">
                      En Popüler Kategori
                    </p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">
                      {analytics.categoryStats[0]?.name || 'Yok'}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-600">
                        {analytics.categoryStats[0]?.postCount || 0} yazı
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaHeart className="text-orange-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* İçerik Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* En Çok Okunan Yazılar */}
              <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    En Çok Okunan Yazılar
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {analytics.topPosts.slice(0, 5).map((post, index) => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#2F3D8D] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 line-clamp-1">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : '-'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaEye className="mr-1" />
                          {post.viewCount || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kategori İstatistikleri */}
              <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Kategori Performansı
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {analytics.categoryStats.map(category => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 text-xl mr-3">
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {category.postCount} yazı
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {formatNumber(category.totalViews)} görüntülenme
                          </div>
                          <div className="text-sm text-gray-500">
                            Ort: {Math.round(category.averageViews)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-white rounded-lg shadow-lg mt-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Son Aktiviteler
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analytics.recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <FaNewspaper className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Yeni yazı yayınlandı
                          </h4>
                          <p className="text-sm text-gray-600">
                            {activity.title}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString('tr-TR') : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 