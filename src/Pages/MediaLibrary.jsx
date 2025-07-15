import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaUpload, 
  FaTrash, 
  FaSignOutAlt,
  FaArrowLeft,
  FaSpinner,
  FaImage,
  FaSearch,
  FaDownload,
  FaCopy,
  FaEye,
  FaCheck,
  FaFolderOpen,
  FaTimes,
  FaEdit
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../App.jsx';
import { toast } from 'react-toastify';

function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filterType, setFilterType] = useState('all'); // all, images, documents
  const [sortBy, setSortBy] = useState('date'); // date, name, size
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, 'media/');
      const result = await listAll(storageRef);
      
      const filesData = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await itemRef.getMetadata();
          
          return {
            id: itemRef.name,
            name: itemRef.name,
            url,
            size: metadata.size,
            type: metadata.contentType,
            uploadedAt: new Date(metadata.timeCreated),
            fullPath: itemRef.fullPath
          };
        })
      );
      
      setFiles(filesData);
    } catch (error) {
      console.error('Dosyalar yüklenirken hata:', error);
      toast.error('Dosyalar yüklenemedi');
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

  const handleFileUpload = async (uploadFiles) => {
    setUploading(true);
    
    try {
      const uploads = Array.from(uploadFiles).map(async (file) => {
        // Dosya adını temizle
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const fileRef = ref(storage, `media/${fileName}`);
        
        await uploadBytes(fileRef, file);
        return fileName;
      });
      
      await Promise.all(uploads);
      toast.success(`${uploadFiles.length} dosya başarıyla yüklendi`);
      setShowUploadModal(false);
      loadFiles();
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      toast.error('Dosya yükleme sırasında hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    if (window.confirm(`${file.name} dosyasını silmek istediğinizden emin misiniz?`)) {
      try {
        const fileRef = ref(storage, file.fullPath);
        await deleteObject(fileRef);
        toast.success('Dosya başarıyla silindi');
        loadFiles();
      } catch (error) {
        console.error('Dosya silinirken hata:', error);
        toast.error('Dosya silinemedi');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;
    
    if (window.confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`)) {
      try {
        const deletePromises = selectedFiles.map(async (fileId) => {
          const file = files.find(f => f.id === fileId);
          if (file) {
            const fileRef = ref(storage, file.fullPath);
            await deleteObject(fileRef);
          }
        });
        
        await Promise.all(deletePromises);
        toast.success(`${selectedFiles.length} dosya başarıyla silindi`);
        setSelectedFiles([]);
        loadFiles();
      } catch (error) {
        console.error('Toplu silme hatası:', error);
        toast.error('Dosyalar silinirken hata oluştu');
      }
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL panoya kopyalandı');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (type) => type?.startsWith('image/');
  const isDocument = (type) => type?.startsWith('application/') || type?.startsWith('text/');

  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || 
                         (filterType === 'images' && isImage(file.type)) ||
                         (filterType === 'documents' && isDocument(file.type));
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.size - a.size;
        case 'date':
        default:
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      }
    });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    setSelectedFiles(filteredFiles.map(f => f.id));
  };

  const deselectAllFiles = () => {
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Medya Kütüphanesi - Türksat Kablonet</title>
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
                <h1 className="text-2xl font-bold text-gray-900">Medya Kütüphanesi</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Resim ve dosya yönetimi - {files.length} dosya
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#2F3D8D] text-white px-4 py-2 rounded-lg hover:bg-[#1f2d6e] transition-colors flex items-center"
              >
                <FaUpload className="mr-2" />
                Dosya Yükle
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
            <span className="ml-3 text-lg text-gray-600">Dosyalar yükleniyor...</span>
          </div>
        ) : (
          <>
            {/* Araç Çubuğu */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Dosya ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  >
                    <option value="all">Tüm Dosyalar</option>
                    <option value="images">Resimler</option>
                    <option value="documents">Belgeler</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                  >
                    <option value="date">Tarihe Göre</option>
                    <option value="name">İsme Göre</option>
                    <option value="size">Boyuta Göre</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  {selectedFiles.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {selectedFiles.length} dosya seçili
                      </span>
                      <button
                        onClick={handleBulkDelete}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Sil
                      </button>
                      <button
                        onClick={deselectAllFiles}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      >
                        Seçimi İptal Et
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={selectedFiles.length === filteredFiles.length ? deselectAllFiles : selectAllFiles}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    {selectedFiles.length === filteredFiles.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                  </button>
                </div>
              </div>
            </div>

            {/* Dosya Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFiles.map(file => (
                <div 
                  key={file.id} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-[#2F3D8D]' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {isImage(file.type) ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl text-gray-400">
                          📄
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        className="w-4 h-4 text-[#2F3D8D] rounded focus:ring-[#2F3D8D]"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-3">
                      <p>{formatFileSize(file.size)}</p>
                      <p>{new Date(file.uploadedAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="URL'yi Kopyala"
                        >
                          <FaCopy />
                        </button>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Görüntüle"
                        >
                          <FaEye />
                        </a>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(file)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFiles.length === 0 && (
              <div className="text-center py-16">
                <FaFolderOpen className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Dosya bulunamadı
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Arama kriterlerinize uygun dosya bulunamadı.' : 'Henüz dosya yüklenmemiş.'}
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                >
                  <FaUpload className="mr-2" />
                  İlk Dosyayı Yükle
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Dosya Yükle</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-[#2F3D8D] bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Dosyaları buraya sürükleyip bırakın veya seçin
                </p>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*,application/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors cursor-pointer"
                >
                  <FaUpload className="mr-2" />
                  Dosya Seç
                </label>
              </div>
              
              {uploading && (
                <div className="mt-4 text-center">
                  <FaSpinner className="animate-spin text-2xl text-[#2F3D8D] mb-2" />
                  <p className="text-sm text-gray-600">Yükleniyor...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaLibrary; 