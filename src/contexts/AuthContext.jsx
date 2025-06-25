import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../App.jsx';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);

  // Kullanıcının admin verilerini getir
  const fetchAdminData = async (uid) => {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      if (adminDoc.exists()) {
        return adminDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Admin verileri alınırken hata:', error);
      return null;
    }
  };

  // Yetki kontrolü fonksiyonları
  const hasPermission = (permission) => {
    if (!adminData || !adminData.permissions) return false;
    return adminData.permissions[permission] === true;
  };

  const hasRole = (role) => {
    if (!adminData) return false;
    return adminData.role === role;
  };

  const isSuperAdmin = () => hasRole('super_admin');
  const isAdminUser = () => hasRole('admin') || isSuperAdmin();
  const isEditor = () => hasRole('editor');

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        // Kullanıcının admin olup olmadığını kontrol et
        const adminStatus = await authService.checkAdminStatus(user.uid);
        
        if (adminStatus) {
          const userData = await fetchAdminData(user.uid);
          setCurrentUser(user);
          setAdminData(userData);
          setIsAdmin(true);
        } else {
          setCurrentUser(null);
          setAdminData(null);
          setIsAdmin(false);
          // Admin değilse çıkış yap
          await authService.signOut();
        }
      } else {
        setCurrentUser(null);
        setAdminData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);  const login = async (email, password) => {
    try {
      const userData = await authService.signIn(email, password);
      setCurrentUser(authService.getCurrentUser());
      setAdminData(userData);
      setIsAdmin(true);
      return userData;
    } catch (error) {
      setCurrentUser(null);
      setAdminData(null);
      setIsAdmin(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setCurrentUser(null);
      setAdminData(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    isAdmin,
    adminData,
    loading,
    login,
    logout,
    // Yetki kontrolü fonksiyonları
    hasPermission,
    hasRole,
    isSuperAdmin,
    isAdminUser,
    isEditor
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
