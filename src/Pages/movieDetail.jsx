import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FaPlay, FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Banner'dan gelen film verilerini ve ayarları kontrol et
  const movieFromBanner = location.state?.movieData;
  const openTrailer = location.state?.openTrailer;

  useEffect(() => {
    // Banner'dan veri geldiyse onu kullan
    if (movieFromBanner) {
      setMovie(movieFromBanner);
      
      // Eğer fragman açılması isteniyorsa, activeTab'ı trailer yap
      if (openTrailer) {
        setActiveTab('trailer');
      }
      
      setLoading(false);
    } else {
      // Banner'dan veri gelmediyse API'den fetch et
      // API'den film verilerini çekme simülasyonu
      setTimeout(() => {
        setMovie({
         
        });
        setLoading(false);
      }, 1000);
    }
  }, [id, movieFromBanner, openTrailer]);

  // Sayfa yüklendiğinde, fragman tabı seçiliyse o bölüme scroll et
  useEffect(() => {
    if (!loading && activeTab === 'trailer') {
      setTimeout(() => {
        document.getElementById('content-tabs')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [loading, activeTab]);

  // Fragmanı açma işlevi
  const handleOpenTrailer = () => {
    setActiveTab('trailer');
    // Sayfa içinde trailer tab'a kaydır
    setTimeout(() => {
      document.getElementById('content-tabs')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Film Arka Plan Banner */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Arka plan görüntüsü ve degradesi */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${movie.backdropUrl || movie.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/60 to-transparent"></div>
        </div>
        
        {/* İçerik */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Film Posteri */}
            <div className="w-56 h-80 rounded-lg overflow-hidden shadow-2xl shrink-0 border-4 border-white flex-none hidden md:block">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Film Bilgileri */}
            <div className="text-white">
              <div className="mb-2 flex items-center gap-2">
                {movie.genres && movie.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-600/70 text-xs uppercase tracking-wider px-2 py-1 rounded backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-gray-300 text-lg mb-4">{movie.originalTitle}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-2" />
                  <span>{movie.rating}/5</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-400 mr-2" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <span>{movie.releaseDate || movie.year}</span>
                </div>
              </div>
              
              <button 
                onClick={handleOpenTrailer}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
              >
                <FaPlay />
                Fragmanı İzle
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Sütun - Mobilde yukarıda */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Tab Navigasyonu */}
            <div className="border-b border-gray-300 mb-6" id="content-tabs">
              <nav className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 relative ${activeTab === 'overview' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Genel Bakış
                  {activeTab === 'overview' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('cast')}
                  className={`py-4 relative ${activeTab === 'cast' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Oyuncular
                  {activeTab === 'cast' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('trailer')}
                  className={`py-4 relative ${activeTab === 'trailer' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Fragman
                  {activeTab === 'trailer' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                  )}
                </button>
              </nav>
            </div>
            
            {/* Tab İçerikleri */}
            <div>
              {/* Genel Bakış */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Film Özeti</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {movie.description || movie.overview || "Film için özet bilgisi bulunmamaktadır."}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {movie.director && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Yönetmen</h3>
                        <p className="text-gray-600">{movie.director}</p>
                      </div>
                    )}
                    
                    {movie.writers && movie.writers.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Senaristler</h3>
                        <p className="text-gray-600">{movie.writers.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Oyuncular */}
              {activeTab === 'cast' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Oyuncular</h2>
                  {movie.cast && movie.cast.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {movie.cast.map((actor, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={actor.image} 
                              alt={actor.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <p className="font-medium text-gray-800">{actor.name}</p>
                            <p className="text-sm text-gray-500">{actor.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">Oyuncu bilgisi henüz eklenmemiştir.</p>
                  )}
                </div>
              )}
              
              {/* Fragman */}
              {activeTab === 'trailer' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fragman</h2>
                  {movie.trailerUrl ? (
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                      <iframe 
                        src={movie.trailerUrl}
                        title="Film Fragmanı"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full min-h-[400px]"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-full h-64 rounded-lg">
                      <p className="text-gray-600">Bu film için fragman henüz eklenmemiştir.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Sağ Sütun - Benzer Filmler */}
          <div className="order-1 lg:order-2">
            {/* Mobil & tablet için poster (masaüstünde üstteki görünür) */}
            <div className="mb-8 flex justify-center md:hidden">
              <div className="w-48 h-72 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Benzer Filmler */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Benzer Filmler</h3>
              {movie.similarMovies && movie.similarMovies.length > 0 ? (
                <div className="space-y-4">
                  {movie.similarMovies.map((similarMovie) => (
                    <Link to={`/filmler/${similarMovie.id}`} key={similarMovie.id} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-16 h-24 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={similarMovie.poster}
                          alt={similarMovie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{similarMovie.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">Benzer film önerisi bulunmamaktadır.</p>
              )}
              
              <div className="mt-6">
                <Link to="/filmler" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Tüm Filmleri Gör →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;