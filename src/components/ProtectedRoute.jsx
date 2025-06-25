import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaSpinner } from 'react-icons/fa';

function ProtectedRoute({ children, requirePermission = null }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#2F3D8D]" />
        <span className="ml-3 text-lg text-gray-600">Yetkilendiriliyor...</span>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    // Giriş yapmamış veya admin değil, login sayfasına yönlendir
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // TODO: Gelecekte permission kontrolü eklenebilir
  // if (requirePermission && !currentUser.permissions?.[requirePermission]) {
  //   return <Navigate to="/admin-unauthorized" replace />;
  // }

  return children;
}

export default ProtectedRoute;
