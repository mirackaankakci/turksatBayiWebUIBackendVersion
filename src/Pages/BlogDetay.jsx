import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaUser, FaEye, FaArrowLeft, FaShare, FaHeart, FaSpinner } from 'react-icons/fa';
import { simpleBlogService as blogService } from '../services/simpleBlogService';

function BlogDetay() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    const loadData = async () => {
      setLoading(true);
      try {
        // Statik kategoriler
        const staticCategories = [
          { id: 1, name: 'Genel', slug: 'genel', icon: '📝' },
          { id: 2, name: 'Teknoloji', slug: 'teknoloji', icon: '💻' },
          { id: 3, name: 'İnternet', slug: 'internet', icon: '🌐' },
          { id: 4, name: 'TV & Eğlence', slug: 'tv-eglence', icon: '📺' },
          { id: 5, name: 'Haberler', slug: 'haberler', icon: '📰' },
          { id: 6, name: 'Kampanyalar', slug: 'kampanyalar', icon: '🎯' }
        ];        setBlogCategories(staticCategories);

        // Blog yazısını yükle
        const allPosts = await blogService.getAll();
        const foundPost = allPosts.find(p => p.slug === slug);
        
        if (!foundPost) {
          navigate('/404');
          return;
        }        setPost(foundPost);        // Görüntülenme sayısını artır (tekrar görüntüleme kontrolü ile)
        const viewKey = `blog_viewed_${foundPost.id}`;
        const lastViewed = localStorage.getItem(viewKey);
        const now = Date.now();
        
        // Görüntülenme süre seçenekleri:
        // const thirtyMinutes = 30 * 60 * 1000;     // 30 dakika
        // const oneHour = 60 * 60 * 1000;          // 1 saat  
        // const sixHours = 6 * 60 * 60 * 1000;     // 6 saat
        // const twelveHours = 12 * 60 * 60 * 1000; // 12 saat
        const oneDay = 24 * 60 * 60 * 1000;         // 24 saat (önerilen)
        
        // Eğer son 24 saat içinde görüntülenmemişse sayacı artır
        if (!lastViewed || (now - parseInt(lastViewed)) > oneDay) {
          blogService.incrementViewCount(foundPost.id);
          localStorage.setItem(viewKey, now.toString());
        }
        
        // İlgili yazıları yükle (aynı kategoriden)
        const related = allPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 3);
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const categoryData = blogCategories.find(cat => cat.slug === post.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.title} - Türksat Kablonet Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Geri Dön Butonu */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-[#2F3D8D] hover:text-[#1f2d6e] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Blog'a Geri Dön
          </button>
        </div>
      </div>

      {/* Ana İçerik */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <header className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <span className="bg-[#2F3D8D] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {categoryData?.icon} {categoryData?.name}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
              {/* Meta Bilgiler */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Tarih yok'}
              </div>
              <div className="flex items-center">
                <FaUser className="mr-2" />
                {post.author || 'Yazar'}
              </div>
              <div className="flex items-center">
                <FaEye className="mr-2" />
                {post.viewCount || 0} görüntülenme
              </div>
            </div>            {/* Ana Görsel */}
            {post.image && (
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}
          </header>          {/* İçerik */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none" style={{ fontSize: '16px', lineHeight: '1.7' }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>

          {/* Paylaşım Butonları */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Bu yazıyı paylaş</h3>
            <div className="flex gap-4">
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FaShare className="mr-2" />
                Facebook
              </button>
              <button className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                <FaShare className="mr-2" />
                Twitter
              </button>
              <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <FaShare className="mr-2" />
                WhatsApp
              </button>
            </div>
          </div>

          {/* İlgili Yazılar */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">İlgili Yazılar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">                        <h4 className="font-semibold text-gray-900 group-hover:text-[#2F3D8D] transition-colors" style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2
                        }}>
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2" style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2
                        }}>
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
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