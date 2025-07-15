import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaEye, 
  FaArrowLeft, 
  FaShare, 
  FaSpinner,
  FaHashtag,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaChevronRight,
  FaHome,
  FaListAlt,
  FaEdit
} from 'react-icons/fa';
import { simpleBlogService as blogService } from '../services/simpleBlogService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../App.jsx';
import { useAuth } from '../contexts/AuthContext';

function BlogDetay() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Kategorileri yükle
        const categoriesRef = collection(db, 'blog_categories');
        const categoriesSnapshot = await getDocs(categoriesRef);
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);

        // Blog yazısını yükle
        const allPosts = await blogService.getAll();
        const foundPost = allPosts.find(p => p.slug === slug);
        
        if (!foundPost) {
          navigate('/404');
          return;
        }

        setPost(foundPost);

        // İçeriği analiz et ve içerik tablosu oluştur
        const toc = generateTableOfContents(foundPost.content);
        setTableOfContents(toc);

        // Görüntülenme sayısını artır
        const viewKey = `blog_viewed_${foundPost.id}`;
        const lastViewed = localStorage.getItem(viewKey);
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (!lastViewed || (now - parseInt(lastViewed)) > oneDay) {
          await blogService.incrementViewCount(foundPost.id);
          localStorage.setItem(viewKey, now.toString());
        }
        
        // İlgili yazıları yükle
        const related = allPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id && p.status === 'published')
          .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
          .slice(0, 4);
        setRelatedPosts(related);
        
      } catch (error) {
        console.error('Blog detayı yüklenirken hata:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, navigate]);

  // Scroll progress takibi
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // İçerik tablosu oluştur
  const generateTableOfContents = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const toc = [];
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent;
      const id = `heading-${index}`;
      
      // Heading'e ID ekle
      heading.id = id;
      
      toc.push({
        id,
        text,
        level,
        element: heading
      });
    });
    
    return toc;
  };

  // Sosyal medya paylaşım URL'leri
  const getShareUrls = () => {
    if (!post) return {};
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const description = encodeURIComponent(post.excerpt || post.title);
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title} ${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${description}`,
      reddit: `https://reddit.com/submit?url=${url}&title=${title}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`
    };
  };

  // Paylaşım fonksiyonu
  const handleShare = (platform) => {
    const urls = getShareUrls();
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  // Okuma süresi hesaplama
  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).filter(word => word.length > 0);
    return Math.ceil(words.length / 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const categoryData = categories.find(cat => cat.slug === post.category);
  const shareUrls = getShareUrls();
  const readingTime = calculateReadingTime(post.content);

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": post.image || post.ogImage,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Türksat Kablonet",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/logo.png"
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "wordCount": post.wordCount || 0,
    "timeRequired": `PT${readingTime}M`,
    "keywords": post.tags ? post.tags.join(', ') : '',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.seoTitle || post.title} - Türksat Kablonet Blog</title>
        <meta name="description" content={post.seoDescription || post.excerpt || post.title} />
        <meta name="keywords" content={post.seoKeywords || post.tags?.join(', ') || ''} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.ogTitle || post.title} />
        <meta property="og:description" content={post.ogDescription || post.excerpt || post.title} />
        <meta property="og:image" content={post.ogImage || post.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Türksat Kablonet Blog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.ogTitle || post.title} />
        <meta name="twitter:description" content={post.ogDescription || post.excerpt || post.title} />
        <meta name="twitter:image" content={post.ogImage || post.image} />
        
        {/* Article specific */}
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt || post.createdAt} />
        <meta property="article:section" content={categoryData?.name} />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Canonical URL */}
        <link rel="canonical" href={post.canonical || window.location.href} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#2F3D8D] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#2F3D8D] flex items-center">
              <FaHome className="mr-1" />
              Ana Sayfa
            </Link>
            <FaChevronRight className="text-gray-400" />
            <Link to="/blog" className="hover:text-[#2F3D8D]">
              Blog
            </Link>
            <FaChevronRight className="text-gray-400" />
            {categoryData && (
              <>
                <Link to={`/blog/kategori/${categoryData.slug}`} className="hover:text-[#2F3D8D]">
                  {categoryData.name}
                </Link>
                <FaChevronRight className="text-gray-400" />
              </>
            )}
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Article Header */}
          <header className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            {/* Featured Image */}
            {post.image && (
              <div className="relative aspect-video md:aspect-[21/9] bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                
                {/* Admin Edit Button */}
                {isAdmin && (
                  <Link
                    to={`/blog-admin/edit/${post.id}`}
                    className="absolute top-4 right-4 bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Düzenle
                  </Link>
                )}
              </div>
            )}
            
            <div className="p-6 md:p-8">
              {/* Category Badge */}
              <div className="mb-6">
                <Link
                  to={`/blog/kategori/${categoryData?.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  style={{ 
                    backgroundColor: categoryData?.color || '#2F3D8D',
                    color: 'white'
                  }}
                >
                  {categoryData?.icon} {categoryData?.name}
                </Link>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-6 mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-[#2F3D8D]" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#2F3D8D]" />
                  <span>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Tarih yok'}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-[#2F3D8D]" />
                  <span>{readingTime} dakika okuma</span>
                </div>
                <div className="flex items-center">
                  <FaEye className="mr-2 text-[#2F3D8D]" />
                  <span>{post.viewCount || 0} görüntülenme</span>
                </div>
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <FaHashtag className="mr-1 text-xs" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Share Buttons */}
              <div className="flex items-center justify-between border-t pt-6">
                <div className="text-sm text-gray-600">
                  Bu makaleyi paylaşın
                </div>
                <div className="flex items-center space-x-2">
                  {navigator.share && (
                    <button
                      onClick={handleNativeShare}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Paylaş"
                    >
                      <FaShare />
                    </button>
                  )}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    title="Facebook'ta paylaş"
                  >
                    <FaFacebookF />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                    title="Twitter'da paylaş"
                  >
                    <FaTwitter />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                    title="LinkedIn'de paylaş"
                  >
                    <FaLinkedinIn />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    title="WhatsApp'ta paylaş"
                  >
                    <FaWhatsapp />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      title="Daha fazla paylaşım seçeneği"
                    >
                      <FaShare />
                    </button>
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-10">
                        <button
                          onClick={() => handleShare('pinterest')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <FaPinterest className="mr-2 text-red-600" />
                          Pinterest
                        </button>
                        <button
                          onClick={() => handleShare('reddit')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <FaReddit className="mr-2 text-orange-600" />
                          Reddit
                        </button>
                        <button
                          onClick={() => handleShare('telegram')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <FaTelegram className="mr-2 text-blue-500" />
                          Telegram
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Article Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#2F3D8D] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-l-[#2F3D8D] prose-blockquote:text-gray-700 prose-code:text-[#2F3D8D] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FaListAlt className="mr-2 text-[#2F3D8D]" />
                      İçindekiler
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm hover:text-[#2F3D8D] transition-colors ${
                            item.level === 1 ? 'font-semibold' : 
                            item.level === 2 ? 'ml-4' : 
                            item.level === 3 ? 'ml-8' : 'ml-12'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                
                {/* Quick Share */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Hızlı Paylaş</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center justify-center py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FaFacebookF className="mr-2" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center justify-center py-2 px-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
                    >
                      <FaTwitter className="mr-2" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center justify-center py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center justify-center py-2 px-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors text-sm"
                    >
                      <FaLinkedinIn className="mr-2" />
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <Link
                    to="/blog"
                    className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    <FaArrowLeft className="mr-2" />
                    Tüm Yazılar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg mt-8 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                İlgili Yazılar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={relatedPost.image || '/assets/placeholder-image.jpg'}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#2F3D8D] transition-colors mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.author}</span>
                          <span>{calculateReadingTime(relatedPost.content)} dk</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default BlogDetay;