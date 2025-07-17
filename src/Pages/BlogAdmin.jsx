import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaHome,
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaSpinner,
  FaSignOutAlt,
  FaUsers,
  FaArrowLeft
} from 'react-icons/fa';
import { simpleBlogService as blogService } from '../services/simpleBlogService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Statik kategoriler
  const categories = [
    { value: 'genel', label: 'Genel', color: 'bg-gray-100 text-gray-800' },
    { value: 'teknoloji', label: 'Teknoloji', color: 'bg-blue-100 text-blue-800' },
    { value: 'internet', label: 'İnternet', color: 'bg-green-100 text-green-800' },
    { value: 'tv-eglence', label: 'TV & Eğlence', color: 'bg-purple-100 text-purple-800' },
    { value: 'haberler', label: 'Haberler', color: 'bg-red-100 text-red-800' },
    { value: 'kampanyalar', label: 'Kampanyalar', color: 'bg-yellow-100 text-yellow-800' }
  ];
  // Çıkış yap
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      console.error('Çıkış hatası:', error);
      toast.error('Çıkış yapılırken hata oluştu');
    }
  };

  // Veri yükleme
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    setLoading(true);
    try {
      console.log('BlogAdmin: Veri yükleniyor...');
      const postsData = await blogService.getAll();
      console.log('BlogAdmin: Alınan veri:', postsData);
      setPosts(postsData || []);    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      alert('Blog yazıları yüklenirken hata oluştu');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Blog yazısı silme
  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz?`)) {
      try {
        await blogService.delete(id);
        await loadData();
        alert('Blog yazısı başarıyla silindi.');
      } catch (error) {
        console.error('Blog yazısı silinirken hata:', error);
        alert('Blog yazısı silinirken bir hata oluştu.');
      }
    }
  };

  // Durum değiştirme
  const handleStatusChange = async (id, newStatus) => {
    try {
      await blogService.update(id, { status: newStatus });
      await loadData();
      alert('Yazı durumu güncellendi.');
    } catch (error) {
      console.error('Durum değiştirilirken hata:', error);
      alert('Durum değiştirilirken bir hata oluştu.');
    }
  };

  // Filtreleme
  const filteredPosts = posts.filter(post => {
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || post.status === selectedStatus;
    
    return searchMatch && categoryMatch && statusMatch;
  });

  return (    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Blog Yönetimi - Türksat Kablonet</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
            <Link 
                to="/admin-dashboard" 
                className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
              <p className="text-sm text-gray-600 mt-1">
                Hoş geldiniz, {currentUser?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
            <Link
                to="/"
                className="bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
              >
                <FaHome className="mr-2" />
                Anasayfa
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Kullanıcı Yönetimi"
              >
                <FaUsers className="mr-2" />
                Kullanıcılar
              </Link>
              <Link
                to="/blog-admin/new"
                className="bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
              >
                <FaPlus className="mr-2" />
                Yeni Yazı
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                title="Çıkış Yap"
              >
                <FaSignOutAlt className="mr-2" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>      {/* İçerik */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
            <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Toplam Yazı</h3>
                <p className="text-3xl font-bold text-[#2F3D8D]">{posts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Yayınlanan</h3>
                <p className="text-3xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Taslak</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {posts.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Kategoriler</h3>
                <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
              </div>
            </div>            {/* Filtreler */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Arama */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Başlık veya içerik ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  />
                </div>

                {/* Kategori Filtresi */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Durum Filtresi */}
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="published">Yayınlanan</option>
                    <option value="draft">Taslak</option>
                    <option value="scheduled">Zamanlanmış</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Yazı Listesi */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Blog Yazıları ({filteredPosts.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Başlık
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Görüntülenme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          Hiç blog yazısı bulunamadı.
                        </td>
                      </tr>
                    ) : (                      filteredPosts.map(post => {
                        const categoryData = categories.find(cat => cat.value === post.category);
                        
                        return (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}>
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}>
                                    {post.excerpt || 'Açıklama yok'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryData?.color || 'bg-gray-100 text-gray-800'}`}>
                                {categoryData?.label || 'Genel'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={post.status || 'draft'}
                                onChange={(e) => handleStatusChange(post.id, e.target.value)}
                                className="text-xs font-medium rounded-full px-2 py-1 bg-gray-100"
                              >
                                <option value="draft">Taslak</option>
                                <option value="published">Yayınlanan</option>
                                <option value="scheduled">Zamanlanmış</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <FaEye className="mr-1" />
                                {post.viewCount || 0}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={`/blog/${post.slug}`}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Görüntüle"
                                >
                                  <FaEye />
                                </Link>                                <Link
                                  to={`/blog-admin/edit/${post.id}`}
                                  className="text-green-600 hover:text-green-900"
                                  title="Düzenle"
                                >
                                  <FaEdit />
                                </Link>
                                <button
                                  onClick={() => handleDelete(post.id, post.title)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Sil"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogAdmin;
