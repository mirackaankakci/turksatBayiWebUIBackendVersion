import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSpinner, FaUser, FaShieldAlt, FaCrown, FaExclamationTriangle} from 'react-icons/fa';
import { adminService } from '../services/authService';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';

function AdminManagement() {
  const { hasPermission, isSuperAdmin, adminData } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    permissions: {
      blog: true,
      users: false,
      settings: false
    }
  });
  const [formLoading, setFormLoading] = useState(false);

  // Yetki kontrolü
  const canManageUsers = hasPermission('users') || isSuperAdmin();
  const canEditAdmin = (admin) => {
    // Süper admin herkesi düzenleyebilir
    if (isSuperAdmin()) return true;
    // Kendi kendini düzenleyemez ama başkalarını düzenleyebilir (users yetkisi varsa)
    if (admin.id === adminData?.uid) return false;
    // Süper admini sadece süper admin düzenleyebilir
    if (admin.role === 'super_admin') return false;
    return canManageUsers;
  };

  const canDeleteAdmin = (admin) => {
    // Süper admin herkesi silebilir ama kendini silemez
    if (isSuperAdmin()) return admin.id !== adminData?.uid;
    // Kendi kendini silemez
    if (admin.id === adminData?.uid) return false;
    // Süper admini sadece süper admin silebilir
    if (admin.role === 'super_admin') return false;
    return canManageUsers;
  };  // Rol seçenekleri
  const roles = [
    { value: 'super_admin', label: 'Süper Admin', icon: FaCrown },
    { value: 'admin', label: 'Admin', icon: FaShieldAlt },
    { value: 'editor', label: 'Editör', icon: FaUser }
  ];

  // Adminleri yükle
  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const adminList = await adminService.getAll();
      setAdmins(adminList);
    } catch (error) {
      console.error('Adminler yüklenirken hata:', error);
      toast.error('Adminler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('permissions.')) {
      const permission = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permission]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setFormLoading(true);
      await adminService.createAdmin(formData);
      toast.success('Admin başarıyla eklendi');
      setShowAddForm(false);
      resetForm();
      loadAdmins();
    } catch (error) {
      console.error('Admin eklenirken hata:', error);
      toast.error(error.message || 'Admin eklenemedi');
    } finally {
      setFormLoading(false);
    }
  };  const handleEditAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Lütfen gerekli alanları doldurun');
      return;
    }

    try {
      setFormLoading(true);
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        permissions: formData.permissions
      };

      await adminService.updateAdmin(editingAdmin.id, updateData);
      toast.success('Admin başarıyla güncellendi');
      setShowEditForm(false);
      setEditingAdmin(null);
      resetForm();
      loadAdmins();
    } catch (error) {
      console.error('Admin güncellenirken hata:', error);
      toast.error(error.message || 'Admin güncellenemedi');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditForm = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '', // Şifre alanını boş bırak
      role: admin.role,
      permissions: admin.permissions || {
        blog: true,
        users: false,
        settings: false
      }
    });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'admin',
      permissions: {
        blog: true,
        users: false,
        settings: false
      }
    });
  };

  const handleToggleStatus = async (adminId, currentStatus) => {
    try {
      await adminService.toggleAdminStatus(adminId, !currentStatus);
      toast.success('Admin durumu güncellendi');
      loadAdmins();
    } catch (error) {
      console.error('Admin durumu değiştirilirken hata:', error);
      toast.error('Admin durumu değiştirilemedi');
    }
  };

  const handleDeleteAdmin = async (adminId, adminName) => {
    if (!confirm(`"${adminName}" adlı admini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await adminService.deleteAdmin(adminId);
      toast.success('Admin başarıyla silindi');
      loadAdmins();
    } catch (error) {
      console.error('Admin silinirken hata:', error);
      toast.error('Admin silinemedi');
    }
  };

  const getRoleIcon = (role) => {
    const roleData = roles.find(r => r.value === role);
    const IconComponent = roleData?.icon || FaUser;
    return <IconComponent className="w-4 h-4" />;
  };

  const getRoleLabel = (role) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.label || 'Admin';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'editor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  // Yetki kontrolü
  if (!canManageUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <FaExclamationTriangle className="mx-auto text-6xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erişim Yetkisi Yok</h2>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişim için kullanıcı yönetimi yetkisine sahip olmanız gerekiyor.
          </p>
          <Link
            to="/admin-dashboard"
            className="inline-flex items-center px-4 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
          >
            Admin Paneline Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Admin Yönetimi - Admin Panel</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Yönetimi</h1>
            <div className="flex items-center gap-3">              <Link
                to="/admin-dashboard"
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Admin Panel
              </Link>
              {canManageUsers && (
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddForm(true);
                    setShowEditForm(false);
                    setEditingAdmin(null);
                  }}
                  className="flex items-center px-4 py-2 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Yeni Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Add Admin Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Yeni Admin Ekle</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddAdmin} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Admin adı"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@kablonet.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şifre *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 6 karakter"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      minLength={6}
                      required
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rol
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Yetkiler
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.blog"
                        checked={formData.permissions.blog}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Blog Yönetimi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.users"
                        checked={formData.permissions.users}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Kullanıcı Yönetimi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.settings"
                        checked={formData.permissions.settings}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Sistem Ayarları</span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors disabled:opacity-50"
                  >
                    {formLoading ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      <FaPlus className="mr-2" />
                    )}
                    {formLoading ? 'Ekleniyor...' : 'Admin Ekle'}
                  </button>
                </div>
              </form>
            </div>          )}

          {/* Edit Admin Form */}
          {showEditForm && editingAdmin && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Admin Düzenle</h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingAdmin(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleEditAdmin} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Admin adı"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@kablonet.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                      required
                    />
                  </div>                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şifre <span className="text-red-500 font-normal">(şu anda desteklenmiyor)</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Şifre güncellemesi desteklenmiyor"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Şifre güncellemesi için kullanıcıdan şifre sıfırlama yapmasını isteyin.
                    </p>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rol
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F3D8D] focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Yetkiler
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.blog"
                        checked={formData.permissions.blog}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Blog Yönetimi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.users"
                        checked={formData.permissions.users}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Kullanıcı Yönetimi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="permissions.settings"
                        checked={formData.permissions.settings}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#2F3D8D] focus:ring-[#2F3D8D] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Sistem Ayarları</span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingAdmin(null);
                      resetForm();
                    }}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex items-center px-6 py-3 bg-[#2F3D8D] text-white rounded-lg hover:bg-[#1f2d6e] transition-colors disabled:opacity-50"
                  >
                    {formLoading ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      <FaEdit className="mr-2" />
                    )}
                    {formLoading ? 'Güncelleniyor...' : 'Güncelle'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admin List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Adminler ({admins.length})
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yetkiler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Giriş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        Henüz admin eklenmemiş.
                      </td>
                    </tr>
                  ) : (
                    admins.map(admin => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#2F3D8D] rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-sm" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {admin.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {admin.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(admin.role)}`}>
                            {getRoleIcon(admin.role)}
                            <span className="ml-1">{getRoleLabel(admin.role)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {admin.permissions?.blog && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Blog
                              </span>
                            )}
                            {admin.permissions?.users && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Kullanıcılar
                              </span>
                            )}
                            {admin.permissions?.settings && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Ayarlar
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {admin.lastLoginAt ? (
                            new Date(admin.lastLoginAt).toLocaleDateString('tr-TR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          ) : (
                            'Hiçbir zaman'
                          )}
                        </td>                        <td className="px-6 py-4 whitespace-nowrap">
                          {canEditAdmin(admin) ? (
                            <button
                              onClick={() => handleToggleStatus(admin.id, admin.isActive)}
                              className={`flex items-center ${admin.isActive ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {admin.isActive ? (
                                <>
                                  <FaToggleOn className="text-xl mr-1" />
                                  <span className="text-sm">Aktif</span>
                                </>
                              ) : (
                                <>
                                  <FaToggleOff className="text-xl mr-1" />
                                  <span className="text-sm">Pasif</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <div className={`flex items-center ${admin.isActive ? 'text-green-600' : 'text-red-600'}`}>
                              {admin.isActive ? (
                                <>
                                  <FaToggleOn className="text-xl mr-1" />
                                  <span className="text-sm">Aktif</span>
                                </>
                              ) : (
                                <>
                                  <FaToggleOff className="text-xl mr-1" />
                                  <span className="text-sm">Pasif</span>
                                </>
                              )}
                            </div>
                          )}
                        </td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {canEditAdmin(admin) && (
                              <button
                                onClick={() => openEditForm(admin)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Düzenle"
                              >
                                <FaEdit />
                              </button>
                            )}
                            {canDeleteAdmin(admin) && (
                              <button
                                onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                                className="text-red-600 hover:text-red-900"
                                title="Sil"
                              >
                                <FaTrash />
                              </button>
                            )}
                            {!canEditAdmin(admin) && !canDeleteAdmin(admin) && (
                              <span className="text-gray-400 text-sm">Yetki yok</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManagement;
