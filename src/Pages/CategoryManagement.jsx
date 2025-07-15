import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSignOutAlt,
  FaArrowLeft,
  FaSpinner,
  FaSave,
  FaTimes,
  FaEye,
  FaList,
  FaSearch
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../App.jsx';
import { toast } from 'react-toastify';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    description: '',
    color: '#2F3D8D'
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Önceden tanımlı kategori iconları
  const categoryIcons = [
    { value: '💻', label: 'Teknoloji' },
    { value: '🌐', label: 'İnternet' },
    { value: '📺', label: 'TV & Eğlence' },
    { value: '🎯', label: 'Kampanyalar' },
    { value: '📰', label: 'Haberler' },
    { value: '🏠', label: 'Ev & Yaşam' },
    { value: '💡', label: 'İpuçları' },
    { value: '📱', label: 'Mobil' },
    { value: '🎮', label: 'Oyun' },
    { value: '🚀', label: 'Yenilikler' },
    { value: '⚙️', label: 'Ayarlar' },
    { value: '📊', label: 'Raporlar' }
  ];

  // Kategori renkler
  const categoryColors = [
    '#2F3D8D', '#059669', '#DC2626', '#7C2D12', '#7C3AED', '#DB2777',
    '#EA580C', '#CA8A04', '#065F46', '#1F2937', '#374151', '#6B7280'
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const categoriesRef = collection(db, 'blog_categories');
      const snapshot = await getDocs(categoriesRef);
      
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
      
      setCategories(categoriesData);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
      toast.error('Kategoriler yüklenemedi');
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

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        description: category.description,
        color: category.color || '#2F3D8D'
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        icon: '📝',
        description: '',
        color: '#2F3D8D'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      icon: '',
      description: '',
      color: '#2F3D8D'
    });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && { slug: generateSlug(value) })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingCategory) {
        // Güncelleme
        await updateDoc(doc(db, 'blog_categories', editingCategory.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        toast.success('Kategori başarıyla güncellendi');
      } else {
        // Yeni kategori ekleme
        await addDoc(collection(db, 'blog_categories'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        toast.success('Kategori başarıyla eklendi');
      }
      
      closeModal();
      loadCategories();
    } catch (error) {
      console.error('Kategori kaydedilirken hata:', error);
      toast.error('Kategori kaydedilemedi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`"${name}" kategorisini silmek istediğinizden emin misiniz?`)) {
      try {
        await deleteDoc(doc(db, 'blog_categories', id));
        toast.success('Kategori başarıyla silindi');
        loadCategories();
      } catch (error) {
        console.error('Kategori silinirken hata:', error);
        toast.error('Kategori silinemedi');
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Kategori Yönetimi - Türksat Kablonet</title>
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
                <h1 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Blog kategorilerini yönetin - {categories.length} kategori
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal()}
                className="bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
              >
                <FaPlus className="mr-2" />
                Yeni Kategori
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
            <span className="ml-3 text-lg text-gray-600">Kategoriler yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Arama ve Filtreler */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Kategori ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredCategories.length} kategori bulundu
                </div>
              </div>
            </div>

            {/* Kategori Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div 
                    className="h-20 flex items-center justify-center text-white text-3xl"
                    style={{ backgroundColor: category.color || '#2F3D8D' }}
                  >
                    {category.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Slug: {category.slug}</span>
                      <span>
                        {category.createdAt ? new Date(category.createdAt).toLocaleDateString('tr-TR') : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/kategori/${category.slug}`}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FaEye className="mr-1" />
                        Görüntüle
                      </Link>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal(category)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <FaList className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Kategori bulunamadı
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Arama kriterlerinize uygun kategori bulunamadı.' : 'Henüz kategori yok.'}
                </p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                >
                  <FaPlus className="mr-2" />
                  İlk Kategoriyi Oluştur
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Adı
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İkon
                </label>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {categoryIcons.map(icon => (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
                      className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                        formData.icon === icon.value
                          ? 'border-[#2F3D8D] bg-[#2F3D8D] bg-opacity-10'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title={icon.label}
                    >
                      {icon.value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renk
                </label>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {categoryColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        formData.color === color
                          ? 'border-gray-800 scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  placeholder="Kategori açıklaması..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      {editingCategory ? 'Güncelle' : 'Kaydet'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement; 