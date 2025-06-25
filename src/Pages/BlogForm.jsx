import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaImage, FaEye, FaSpinner } from 'react-icons/fa';
import { simpleBlogService as blogService, blogUtils } from '../services/simpleBlogService';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import JoditEditor from 'jodit-react';

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const editor = useRef(null);

  // Jodit editör konfigürasyonu
  const config = {
    readonly: false,
    placeholder: 'Blog yazısının içeriğini buraya yazın...',
    height: 400,
    language: 'tr',
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'paragraph', 'align', '|',
      'link', 'image', '|',
      'table', '|',
      'undo', 'redo', '|',
      'hr', 'source'
    ]
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'genel',
    author: 'Admin',
    status: 'draft'
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  // Kategoriler listesi
  const categories = [
    { value: 'genel', label: 'Genel' },
    { value: 'teknoloji', label: 'Teknoloji' },
    { value: 'internet', label: 'İnternet' },
    { value: 'tv-eglence', label: 'TV & Eğlence' },
    { value: 'haberler', label: 'Haberler' },
    { value: 'kampanyalar', label: 'Kampanyalar' }
  ];

  // Mevcut blog yazısını yükle (düzenleme modunda)
  useEffect(() => {
    const loadBlogPost = async () => {
      if (isEdit) {
        try {
          setDataLoading(true);
          const posts = await blogService.getAll();
          const post = posts.find(p => p.id === id);
          
          if (!post) {
            toast.error('Blog yazısı bulunamadı');
            navigate('/blog-admin');
            return;
          }
          
          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            image: post.image || '',
            category: post.category || 'genel',
            author: post.author || 'Admin',
            status: post.status || 'draft'
          });
        } catch (error) {
          console.error('Blog yazısı yüklenirken hata:', error);
          toast.error('Blog yazısı yüklenirken hata oluştu');
          navigate('/blog-admin');
        } finally {
          setDataLoading(false);
        }
      } else {
        setDataLoading(false);
      }
    };

    loadBlogPost();
  }, [id, isEdit, navigate]);

  // Form alanlarını güncelle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));    // Başlık değiştiğinde slug'ı otomatik oluştur
    if (name === 'title' && !isEdit) {
      const newSlug = blogUtils.createSlug(value);
      setFormData(prev => ({
        ...prev,
        slug: newSlug
      }));
    }
  };
  // İçerik alanını güncelle
  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  // Form gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Başlık ve içerik alanları zorunludur');
      return;
    }

    try {
      setLoading(true);
        const blogData = {
        ...formData,
        slug: formData.slug || blogUtils.createSlug(formData.title),
        updatedAt: new Date().toISOString()
      };

      if (isEdit) {
        await blogService.update(id, blogData);
        toast.success('Blog yazısı başarıyla güncellendi');
      } else {
        blogData.createdAt = new Date().toISOString();
        await blogService.add(blogData);
        toast.success('Blog yazısı başarıyla oluşturuldu');
      }
      
      navigate('/blog-admin');
    } catch (error) {
      console.error('Blog kaydedilirken hata:', error);
      toast.error('Blog kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{isEdit ? 'Blog Düzenle' : 'Yeni Blog Yazısı'} - Admin Panel</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/blog-admin')}
                className="flex items-center text-gray-600 hover:text-[#2F3D8D] transition-colors mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Geri Dön
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaEye className="mr-2" />
                {previewMode ? 'Düzenle' : 'Önizle'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {!previewMode ? (
            // Form Modu
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Temel Bilgiler */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Temel Bilgiler</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Başlık */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Blog yazısının başlığını girin"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="url-slug"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Yazar */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yazar
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Yazar adı"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>

                  {/* Durum */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayınlandı</option>
                    </select>
                  </div>

                  {/* Görsel URL */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Görsel URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>

                  {/* Özet */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Özet
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Blog yazısının kısa özeti..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>              {/* İçerik Editörü */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">İçerik *</h2>
                
                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  config={config}
                  onBlur={(newContent) => handleContentChange(newContent)}
                  onChange={() => {}}
                />
                
                <div className="mt-2 text-sm text-gray-500">
                  Zengin metin editörü ile yazınızı kolayca biçimlendirebilirsiniz.
                </div>
              </div>

              {/* Kaydet Butonu */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  {loading ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Kaydet')}
                </button>
              </div>
            </form>
          ) : (
            // Önizleme Modu
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4">{formData.title}</h2>
              <div className="text-gray-600 mb-6">
                <span>Kategori: {categories.find(c => c.value === formData.category)?.label}</span>
                <span className="mx-2">•</span>
                <span>Yazar: {formData.author}</span>
                <span className="mx-2">•</span>
                <span>Durum: {formData.status === 'published' ? 'Yayınlandı' : 'Taslak'}</span>
              </div>
              {formData.image && (
                <img src={formData.image} alt={formData.title} className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              {formData.excerpt && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-700">{formData.excerpt}</p>
                </div>
              )}
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogForm;