import { useState } from 'react'
import './index.css'
import logo from '/assets/logo.png'
import ResponsiveMenu from './components/ResponsiveMenu'
import CampaignBanner from "./components/CampaignBanner"
import ScrollToTop from './components/ScrollToTop';

import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Footer from './components/footer'
import HemenBasvur from './Pages/HemenBasvur'
import Kampanyalar from './Pages/Kampanyalar'
import CampaignDetail from './components/CampaignDetail'
import NetTariffs from './Pages/NetTariffs'
import NetDevices from './Pages/netDevices'
import KabloTvDevices from './Pages/KabloTvDevices'
import TvPackets from './Pages/tvPacket'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import FesihIslemleri from './Pages/fesih'
import Sss from './Pages/Sss'
import TvFrekans from './Pages/TvFrekans'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import InfrastructureInquiry from './Pages/InfrastructureInquiry'
import KabloSesTariff from './Pages/KabloSesTariff'
import MovieDetail from './Pages/movieDetail'
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './Pages/NotFound'
import Blog from './Pages/Blog';
import BlogDetay from './Pages/BlogDetay';
import BlogAdmin from './Pages/BlogAdmin';
import BlogForm from './Pages/BlogForm';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AdminManagement from './Pages/AdminManagement';
import AdminSettings from './Pages/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import TestRegister from './Pages/TestRegister';
import CategoryManagement from './Pages/CategoryManagement';
import MediaLibrary from './Pages/MediaLibrary';
import AnalyticsDashboard from './Pages/AnalyticsDashboard';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyB9jzX5NJNnjyimOVzqf5QeJUJxFoVFCzY",
  authDomain: "turksatblog.firebaseapp.com",
  projectId: "turksatblog",
  storageBucket: "turksatblog.firebasestorage.app",
  messagingSenderId: "162384380005",
  appId: "1:162384380005:web:95714ffbc40707de00468c",
  measurementId: "G-NFRG5EMW86"
};

// Firebase'i başlat
const firebaseApp = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/blog-admin');

  return (
    <div>
      <HelmetProvider>
        <AuthProvider>
          <ScrollToTop />
          {!isAdminPage && (
            <div className="bg-gradient-to-b from-[#838383] to-[#3399D2]">
              <ResponsiveMenu />
            </div>
          )}
          <div className={isAdminPage ? "min-h-screen" : "pt-[100px]"}>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/hemenbasvur" element={<HemenBasvur />} />
              <Route path="/kampanyalar" element={<Kampanyalar />} />
              <Route path="/kampanyalar/:kategori" element={<Kampanyalar />} />
              <Route path="/kampanyalar/:kategori/:kampanyaSlug" element={<CampaignDetail />} />
              <Route path="/tarifeler" element={<NetTariffs/>} />
              <Route path="/cihazlar" element={<NetDevices/>} />
              <Route path="/kablotv/cihazlar" element={<KabloTvDevices/>} />
              <Route path="/kablotv/paketler" element={<TvPackets />} />
              <Route path="/gizliliksozlesmesi" element={<PrivacyPolicy />} />
              <Route path="/fesih-i̇şlemleri" element={<FesihIslemleri />} />
              <Route path="/kablotv/frekans-listesi" element={<TvFrekans />} />
              <Route path="/servisler" element={<Services />} />
              <Route path="/servisler/:serviceId" element={<Services />} />
              <Route path="/sikca-sorulan-sorular" element={<Sss />} />
              <Route path="/iletişim" element={<Contact />} />
              <Route path="/altyapi-sorgulama" element={<InfrastructureInquiry />} />
              <Route path="/kablotv/tarifeler" element={<KabloSesTariff />} />
              
              {/* Blog Routes - Public */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/kategori/:kategori" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetay />} />
              
              {/* Firebase Test Route */}
              <Route path="/test-register" element={<TestRegister />} />
              
              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/blog-admin" element={
                <ProtectedRoute>
                  <BlogAdmin />
                </ProtectedRoute>
              } />
              <Route path="/blog-admin/new" element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              } />
              <Route path="/blog-admin/edit/:id" element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              } />
              <Route path="/admin-management" element={
                <ProtectedRoute>
                  <AdminManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin-settings" element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute>
                  <CategoryManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/media" element={
                <ProtectedRoute>
                  <MediaLibrary />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
              <Route path="/filmler/:id" element={<MovieDetail />} /> {/* Film detay sayfası */}            </Routes>
          </div>
          {!isAdminPage && <Footer />}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </HelmetProvider>
    </div>
    
  )
}

export default App

// index.html veya App.jsx'te
