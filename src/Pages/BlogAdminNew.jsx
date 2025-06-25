import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaSpinner
} from 'react-icons/fa';
import { blogService, categoryService } from '../services/blogService';

function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Veri yükleme
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        blogService.getAll({ 
          category: selectedCategory === 'all' ? null : selectedCategory,
          page: 1,
          pageSize: 100
        }),
        categoryService.getAll()
      ]);
      
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Blog Yönetimi - Türksat Kablonet</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
            <Link
              to="/blog-admin/yeni"
              className="bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Yeni Yazı
            </Link>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 py-8">
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
            </div>

            {/* Yazı Listesi */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    ) : (
                      filteredPosts.map(post => {
                        const categoryData = categories.find(cat => cat.slug === post.category);
                        
                        return (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-gray-500 line-clamp-1">
                                    {post.excerpt}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {categoryData?.icon} {categoryData?.name || 'Genel'}
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
                                </Link>
                                <Link
                                  to={`/blog-admin/duzenle/${post.id}`}
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
