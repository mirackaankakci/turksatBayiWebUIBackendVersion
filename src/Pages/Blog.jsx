import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaUser, FaTag, FaEye, FaArrowRight, FaSearch, FaSpinner } from 'react-icons/fa';
import serit from "/assets/serit.png";
import ustserit from "/assets/ustserit.png";

// Firebase servislerini import et
import { simpleBlogService as blogService } from '../services/simpleBlogService';

function Blog() {
  const { kategori, slug } = useParams();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;
  // Kategorileri yükle (şimdilik devre dışı)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Statik kategoriler kullanıyoruz
        const staticCategories = [
          { id: 1, name: 'Genel', slug: 'genel', icon: '📝' },
          { id: 2, name: 'Teknoloji', slug: 'teknoloji', icon: '💻' },
          { id: 3, name: 'İnternet', slug: 'internet', icon: '🌐' },
          { id: 4, name: 'TV & Eğlence', slug: 'tv-eglence', icon: '📺' },
          { id: 5, name: 'Haberler', slug: 'haberler', icon: '📰' },
          { id: 6, name: 'Kampanyalar', slug: 'kampanyalar', icon: '🎯' }
        ];
        setBlogCategories(staticCategories);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    loadCategories();
  }, []);
  // Blog yazılarını yükle
  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const posts = await blogService.getAll();
        
        // Frontend'de filtreleme yap
        let filteredPosts = posts;
        
        if (selectedCategory && selectedCategory !== 'all') {
          filteredPosts = posts.filter(post => post.category === selectedCategory);
        }
        
        if (searchTerm) {
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }
        
        setBlogPosts(filteredPosts);
        setTotalPosts(filteredPosts.length);
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error);
        setBlogPosts([]);
        setTotalPosts(0);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (kategori) {
      setSelectedCategory(kategori);
    }
  }, [kategori]);  // Blog yazılarını filtrele ve sayfalama
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Kategori değiştirme
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === 'all') {
      navigate('/blog');
    } else {
      navigate(`/blog/kategori/${category}`);
    }
  };

  // Arama fonksiyonu
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Blog - Türksat Kablonet</title>
        <meta name="description" content="Türksat Kablonet blog sayfası. Teknoloji, internet ve TV dünyasından haberler." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
        />
        
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Kablonet Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Teknoloji dünyasından son haberler ve ipuçları
            </p>
          </div>
        </div>
      </div>

      {/* Filtre ve Arama Bölümü */}
      <div className="bg-white shadow-lg -mt-16 relative z-10 mx-4 md:mx-8 lg:mx-16 rounded-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Kategori Filtreleri */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-[#2F3D8D] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaTag className="inline mr-2" />
                Tümü
              </button>
              
              {blogCategories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.slug
                      ? 'bg-[#2F3D8D] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Arama Kutusu */}
            <div className="relative">
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent w-80"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>      {/* Blog Yazıları Grid */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
            <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
          </div>
        ) : currentPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Aradığınız kriterlere uygun blog yazısı bulunamadı.
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="bg-[#2F3D8D] text-white px-6 py-3 rounded-lg hover:bg-[#1f2d6e] transition-colors"
            >
              Tüm Yazıları Göster
            </button>
          </div>
        ) : (          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map(post => (
              <BlogCard key={post.id} post={post} categories={blogCategories} />
            ))}
          </div>
        )}

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === i + 1
                      ? 'bg-[#2F3D8D] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Blog Kart Bileşeni
function BlogCard({ post, categories }) {
  const categoryData = categories.find(cat => cat.slug === post.category);
  
  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Blog Görseli */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image || '/assets/default-blog-image.jpg'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#2F3D8D] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {categoryData?.name || 'Genel'}
          </span>
        </div>
      </div>

      {/* Blog İçeriği */}
      <div className="p-6">        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2F3D8D] transition-colors" style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4" style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3
        }}>
          {post.excerpt}
        </p>

        {/* Meta Bilgiler */}
        <div className="flex items-center text-xs text-gray-500 mb-4 gap-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : 'Tarih yok'}
          </div>
          <div className="flex items-center">
            <FaUser className="mr-1" />
            {post.author || 'Yazar'}
          </div>
          <div className="flex items-center">
            <FaEye className="mr-1" />
            {post.viewCount || 0}
          </div>
        </div>

        {/* Devamını Oku Butonu */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-[#2F3D8D] font-semibold hover:text-[#1f2d6e] transition-colors group"
        >
          Devamını Oku
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default Blog;