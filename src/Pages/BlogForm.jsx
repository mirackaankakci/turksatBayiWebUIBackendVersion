import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TinyMCEEditor from '../components/TinyMCEEditor';
import { 
  FaSave, 
  FaArrowLeft, 
  FaImage, 
  FaEye, 
  FaSpinner, 
  FaUpload,
  FaCalendarAlt,
  FaTags,
  FaSearch,
  FaGlobe,
  FaChartLine,
  FaUser,
  FaHashtag
} from 'react-icons/fa';
import { simpleBlogService as blogService, blogUtils } from '../services/simpleBlogService';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import githubImageService from '../services/githubImageService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../App.jsx';
import '../Styles/BlogContent.css';

function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const fileInputRef = useRef(null);

  // TinyMCE içerik değişiklik handler'ı
  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    author: 'Türksat Kablonet',
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    tags: [],
    // SEO Fields
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonical: '',
    focusKeyword: ''
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [categories, setCategories] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [tagInput, setTagInput] = useState('');

  // Kategorileri yükle
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesRef = collection(db, 'blog_categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
        
        // Eğer kategori seçilmemişse ilkini seç
        if (categoriesData.length > 0 && !formData.category) {
          setFormData(prev => ({ ...prev, category: categoriesData[0].slug }));
        }
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        // Fallback kategoriler
        const fallbackCategories = [
          { id: '1', name: 'Genel', slug: 'genel' },
          { id: '2', name: 'Teknoloji', slug: 'teknoloji' },
          { id: '3', name: 'İnternet', slug: 'internet' },
          { id: '4', name: 'TV & Eğlence', slug: 'tv-eglence' },
          { id: '5', name: 'Haberler', slug: 'haberler' },
          { id: '6', name: 'Kampanyalar', slug: 'kampanyalar' }
        ];
        setCategories(fallbackCategories);
        setFormData(prev => ({ ...prev, category: 'genel' }));
      }
    };
    loadCategories();
  }, []);

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
            author: post.author || 'Türksat Kablonet',
            status: post.status || 'draft',
            publishDate: post.publishDate || new Date().toISOString().split('T')[0],
            tags: post.tags || [],
            seoTitle: post.seoTitle || post.title || '',
            seoDescription: post.seoDescription || post.excerpt || '',
            seoKeywords: post.seoKeywords || '',
            ogTitle: post.ogTitle || post.title || '',
            ogDescription: post.ogDescription || post.excerpt || '',
            ogImage: post.ogImage || post.image || '',
            canonical: post.canonical || '',
            focusKeyword: post.focusKeyword || ''
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

  // İçerik değiştiğinde kelime sayısı ve okuma süresini hesapla
  useEffect(() => {
    if (formData.content) {
      const text = formData.content.replace(/<[^>]*>/g, '').replace(/[#*`~>\-\[\]]/g, '');
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      const readingTime = Math.ceil(wordCount / 200); // 200 kelime/dakika
      
      setWordCount(wordCount);
      setReadingTime(readingTime);
    }
  }, [formData.content]);

  // SEO skoru hesapla
  useEffect(() => {
    let score = 0;
    
    // Başlık uzunluğu (50-60 karakter ideal)
    if (formData.seoTitle && formData.seoTitle.length >= 50 && formData.seoTitle.length <= 60) {
      score += 20;
    } else if (formData.seoTitle && formData.seoTitle.length > 0) {
      score += 10;
    }
    
    // Meta açıklama uzunluğu (150-160 karakter ideal)
    if (formData.seoDescription && formData.seoDescription.length >= 150 && formData.seoDescription.length <= 160) {
      score += 20;
    } else if (formData.seoDescription && formData.seoDescription.length > 0) {
      score += 10;
    }
    
    // Focus keyword kontrolü
    if (formData.focusKeyword && formData.title.toLowerCase().includes(formData.focusKeyword.toLowerCase())) {
      score += 15;
    }
    
    // İçerik uzunluğu (300+ kelime ideal)
    if (wordCount >= 300) {
      score += 15;
    } else if (wordCount >= 150) {
      score += 10;
    }
    
    // Görsel varlığı
    if (formData.image) {
      score += 10;
    }
    
    // Etiket varlığı
    if (formData.tags.length > 0) {
      score += 10;
    }
    
    // Özet varlığı
    if (formData.excerpt) {
      score += 10;
    }
    
    setSeoScore(score);
  }, [formData, wordCount]);

  // Form alanlarını güncelle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Başlık değiştiğinde otomatik alanları güncelle
    if (name === 'title') {
      const newSlug = blogUtils.createSlug(value);
      setFormData(prev => ({
        ...prev,
        slug: newSlug,
        seoTitle: prev.seoTitle || value,
        ogTitle: prev.ogTitle || value
      }));
    }
    
    // Özet değiştiğinde SEO alanlarını güncelle
    if (name === 'excerpt') {
      setFormData(prev => ({
        ...prev,
        seoDescription: prev.seoDescription || value,
        ogDescription: prev.ogDescription || value
      }));
    }
  };

  // İçerik alanını güncelle
  // const handleContentChange = (e) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     content: e.target.getContent()
  //   }));
  // };

  // Resim yükleme - GitHub servisi
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      // GitHub servisi ile resim yükle
      const downloadURL = await githubImageService.uploadImage(file);
      
      setFormData(prev => ({
        ...prev,
        image: downloadURL,
        ogImage: prev.ogImage || downloadURL
      }));
      
    } catch (error) {
      console.error('GitHub resim yükleme hatası:', error);
      toast.error('Resim yüklenirken hata oluştu');
    } finally {
      setImageUploading(false);
    }
  };

  // Etiket ekleme
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        setTagInput('');
      }
    }
  };

  // Etiket silme
  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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
      
      // Markdown'ı HTML'e çevir
      const htmlContent = formData.content;
      
      const blogData = {
        ...formData,
        content: htmlContent,
        slug: formData.slug || blogUtils.createSlug(formData.title),
        updatedAt: new Date().toISOString(),
        wordCount,
        readingTime,
        seoScore
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

  const getSeoScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeoScoreText = (score) => {
    if (score >= 80) return 'Mükemmel';
    if (score >= 60) return 'İyi';
    if (score >= 40) return 'Orta';
    return 'Zayıf';
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{isEdit ? 'Blog Düzenle' : 'Yeni Blog Yazısı'} - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/blog-admin"
                className="flex items-center text-gray-600 hover:text-[#2F3D8D] transition-colors mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Geri Dön
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEdit ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
                </h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>{wordCount} kelime</span>
                  <span>{readingTime} dk okuma</span>
                  <span className={`font-semibold ${getSeoScoreColor(seoScore)}`}>
                    SEO: {seoScore}/100 ({getSeoScoreText(seoScore)})
                  </span>
                </div>
              </div>
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
              <button
                type="submit"
                form="blog-form"
                disabled={loading}
                className="flex items-center px-6 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {loading ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Yayınla')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {!previewMode ? (
            // Form Modu
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ana İçerik */}
              <div className="lg:col-span-2">
                <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Tab Navigation */}
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="flex border-b">
                      <button
                        type="button"
                        onClick={() => setActiveTab('content')}
                        className={`px-6 py-3 font-medium transition-colors ${
                          activeTab === 'content'
                            ? 'text-[#2F3D8D] border-b-2 border-[#2F3D8D]'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                       
                       
                        İçerik
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('seo')}
                        className={`px-6 py-3 font-medium transition-colors ${
                          activeTab === 'seo'
                            ? 'text-[#2F3D8D] border-b-2 border-[#2F3D8D]'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FaSearch className="inline mr-2" />
                        SEO
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('social')}
                        className={`px-6 py-3 font-medium transition-colors ${
                          activeTab === 'social'
                            ? 'text-[#2F3D8D] border-b-2 border-[#2F3D8D]'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FaGlobe className="inline mr-2" />
                        Sosyal Medya
                      </button>
                    </div>
                    
                    <div className="p-6">
                      {/* İçerik Sekmesi */}
                      {activeTab === 'content' && (
                        <div className="space-y-6">
                          {/* Başlık */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Başlık *
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="Çekici bir başlık yazın..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent text-lg"
                              required
                            />
                          </div>

                          {/* Slug */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              URL Slug
                            </label>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">/{window.location.hostname}/blog/</span>
                              <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="url-slug"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* Özet */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Özet
                            </label>
                            <textarea
                              name="excerpt"
                              value={formData.excerpt}
                              onChange={handleInputChange}
                              placeholder="Blog yazısının kısa özeti (150-160 karakter önerilir)..."
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                              {formData.excerpt.length}/160 karakter
                            </div>
                          </div>

                          {/* Ana Görsel */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ana Görsel
                            </label>
                            <div className="space-y-4">
                              {formData.image && (
                                <div className="relative">
                                  <img
                                    src={formData.image}
                                    alt="Blog görseli"
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                  >
                                    ×
                                  </button>
                                </div>
                              )}
                              <div className="flex items-center gap-4">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleImageUpload}
                                  accept="image/*"
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  disabled={imageUploading}
                                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                  {imageUploading ? (
                                    <FaSpinner className="animate-spin mr-2" />
                                  ) : (
                                    <FaUpload className="mr-2" />
                                  )}
                                  {imageUploading ? 'Yükleniyor...' : 'Resim Yükle'}
                                </button>
                                <input
                                  type="url"
                                  name="image"
                                  value={formData.image}
                                  onChange={handleInputChange}
                                  placeholder="Veya resim URL'si girin..."
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Etiketler */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Etiketler
                            </label>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#2F3D8D] text-white"
                                  >
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveTag(tag)}
                                      className="ml-2 text-white hover:text-red-200"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Etiket eklemek için yazın ve Enter'a basın..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* TinyMCE Editörü */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              İçerik * 
                              <span className="text-blue-600 ml-2">✨ TinyMCE Editörü</span>
                            </label>
                            
                            <TinyMCEEditor
                              value={formData.content}
                              onChange={handleEditorChange}
                            />
                            
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="text-blue-600">✅ TinyMCE editör:</span> {wordCount} kelime • {readingTime} dakika okuma süresi
                              <br />
                              <span className="text-xs">💡 İpucu: Zengin metin editörü ile kolayca formatlayabilirsiniz. Resimleri sürükleyip bırakabilirsiniz.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SEO Sekmesi */}
                      {activeTab === 'seo' && (
                        <div className="space-y-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center">
                              <FaChartLine className="text-blue-600 mr-2" />
                              <span className="font-medium text-blue-900">SEO Skoru: </span>
                              <span className={`font-bold ${getSeoScoreColor(seoScore)}`}>
                                {seoScore}/100 ({getSeoScoreText(seoScore)})
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Focus Keyword
                            </label>
                            <input
                              type="text"
                              name="focusKeyword"
                              value={formData.focusKeyword}
                              onChange={handleInputChange}
                              placeholder="Ana anahtar kelime..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              SEO Başlığı
                            </label>
                            <input
                              type="text"
                              name="seoTitle"
                              value={formData.seoTitle}
                              onChange={handleInputChange}
                              placeholder="Arama sonuçlarında görünecek başlık..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                              {formData.seoTitle.length}/60 karakter (50-60 ideal)
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              SEO Açıklaması
                            </label>
                            <textarea
                              name="seoDescription"
                              value={formData.seoDescription}
                              onChange={handleInputChange}
                              placeholder="Arama sonuçlarında görünecek açıklama..."
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                              {formData.seoDescription.length}/160 karakter (150-160 ideal)
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Anahtar Kelimeler
                            </label>
                            <input
                              type="text"
                              name="seoKeywords"
                              value={formData.seoKeywords}
                              onChange={handleInputChange}
                              placeholder="anahtar, kelime, listesi"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Canonical URL
                            </label>
                            <input
                              type="url"
                              name="canonical"
                              value={formData.canonical}
                              onChange={handleInputChange}
                              placeholder="https://example.com/canonical-url"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}

                      {/* Sosyal Medya Sekmesi */}
                      {activeTab === 'social' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Open Graph Başlığı
                            </label>
                            <input
                              type="text"
                              name="ogTitle"
                              value={formData.ogTitle}
                              onChange={handleInputChange}
                              placeholder="Sosyal medyada görünecek başlık..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Open Graph Açıklaması
                            </label>
                            <textarea
                              name="ogDescription"
                              value={formData.ogDescription}
                              onChange={handleInputChange}
                              placeholder="Sosyal medyada görünecek açıklama..."
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Open Graph Görseli
                            </label>
                            <input
                              type="url"
                              name="ogImage"
                              value={formData.ogImage}
                              onChange={handleInputChange}
                              placeholder="https://example.com/og-image.jpg"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                            />
                            {formData.ogImage && (
                              <img
                                src={formData.ogImage}
                                alt="OG Preview"
                                className="mt-2 w-full h-32 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Yan Panel */}
              <div className="space-y-6">
                {/* Yayın Ayarları */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Yayın Ayarları</h3>
                  <div className="space-y-4">
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
                        <option value="scheduled">Zamanlandı</option>
                      </select>
                    </div>

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
                          <option key={cat.id} value={cat.slug}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yayın Tarihi
                      </label>
                      <input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yazar
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* İstatistikler */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">İstatistikler</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kelime Sayısı</span>
                      <span className="font-semibold">{wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Okuma Süresi</span>
                      <span className="font-semibold">{readingTime} dk</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Etiket Sayısı</span>
                      <span className="font-semibold">{formData.tags.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SEO Skoru</span>
                      <span className={`font-semibold ${getSeoScoreColor(seoScore)}`}>
                        {seoScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editör Rehberi */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">
                    📝 Markdown Rehberi
                  </h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div><code>**bold**</code> → <strong>bold</strong></div>
                    <div><code>*italic*</code> → <em>italic</em></div>
                    <div><code>`code`</code> → <code>code</code></div>
                    <div><code># Başlık</code> → H1</div>
                    <div><code>## Başlık</code> → H2</div>
                    <div><code>- Liste</code> → • Liste</div>
                    <div><code>[link](url)</code> → Link</div>
                    <div><code>![alt](url)</code> → Resim</div>
                    <div><code>&gt; Alıntı</code> → Blockquote</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Önizleme Modu
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Görsel */}
              {formData.image && (
                <div className="aspect-video bg-gray-100">
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* İçerik */}
              <div className="p-8">
                <div className="mb-6">
                  <span className="bg-[#2F3D8D] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {categories.find(c => c.slug === formData.category)?.name}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {formData.title}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-600 mb-8">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(formData.publishDate).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    {formData.author}
                  </div>
                  <div className="flex items-center">
                    <FaEye className="mr-2" />
                    {readingTime} dk okuma
                  </div>
                </div>
                
                {formData.excerpt && (
                  <div className="bg-gray-50 border-l-4 border-[#2F3D8D] p-4 mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {formData.excerpt}
                    </p>
                  </div>
                )}
                
                <div className="blog-content">
                  <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Etiketler</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
                        >
                          <FaHashtag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogForm;