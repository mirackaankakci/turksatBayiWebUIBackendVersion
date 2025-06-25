# 🔐 Türksat Kablonet Admin Yönetim Sistemi

Firebase Authentication ve Firestore tabanlı, tam özellikli admin yönetim sistemi.

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler

#### Admin Yönetimi
- **Firebase Authentication**: Email/şifre ile güvenli giriş
- **Rol Tabanlı Yetki Sistemi**: Süper Admin, Admin, Editör rolleri
- **Detaylı Yetki Kontrolü**: Sayfa ve işlem bazında yetkilendirme
- **Admin CRUD**: Admin ekleme, düzenleme, silme ve durum yönetimi
- **Korumalı Rotalar**: Admin sayfalarını koruma
- **Otomatik Güvenlik**: Yetkisiz kullanıcıları otomatik çıkış

#### Dashboard ve İstatistikler
- **Modern Dashboard**: İstatistik kartları ve hızlı erişim butonları
- **Gerçek Zamanlı İstatistikler**: Blog, görüntülenme ve admin sayıları
- **Son Aktiviteler**: Admin giriş/çıkış logları
- **Sistem Durumu**: Firestore ve sistem durumu gösterimi

#### Blog Yönetimi
- **CRUD İşlemleri**: Blog yazıları için tam CRUD desteği
- **HTML Editör**: Zengin metin düzenleme toolbar'ı
- **Kategori Sistemi**: Opsiyonel kategori desteği
- **Görüntülenme Sayacı**: Otomatik viewCount sistemi (localStorage korumalı)
- **Arama ve Filtreleme**: Gelişmiş filtreleme seçenekleri
- **SEO Desteği**: React Helmet ile meta tag yönetimi

#### Güvenlik
- **Firestore Security Rules**: Katmanlı güvenlik sistemi
- **Rol Bazlı Erişim**: Her işlem için yetki kontrolü
- **XSS Koruması**: Güvenli HTML render
- **Session Yönetimi**: Otomatik token yenileme

## 📁 Dosya Yapısı

```
src/
├── contexts/
│   └── AuthContext.jsx           # Global auth state + yetki kontrolü
├── services/
│   ├── authService.js           # Firebase auth + admin servisleri
│   └── simpleBlogService.js     # Blog CRUD servisleri
├── components/
│   └── ProtectedRoute.jsx       # Korumalı rota bileşeni
├── Pages/
│   ├── AdminLogin.jsx           # Admin giriş sayfası
│   ├── AdminDashboard.jsx       # Ana dashboard
│   ├── AdminManagement.jsx      # Kullanıcı yönetimi (TAM ÖZELLİKLİ)
│   ├── AdminSettings.jsx        # Sistem ayarları
│   ├── BlogAdmin.jsx            # Blog listesi ve yönetimi
│   ├── BlogForm.jsx             # Blog ekleme/düzenleme formu
│   ├── Blog.jsx                 # Genel blog listesi (frontend)
│   └── BlogDetay.jsx            # Blog detay + viewCount sistemi
└── Styles/
    ├── CampaignDetail.css       # Temaya uygun stiller
    └── HemenBasvur.css          # Temaya uygun stiller
```

## 🔧 Kurulum ve Yapılandırma

### 1. Firebase Konfigürasyonu
Firebase projesi zaten yapılandırılmış durumda (`App.jsx`).

### 2. Firestore Security Rules & İndexler
`firestore-security-rules.txt` dosyasındaki kuralları ve index önerilerini uygulayın:

1. **Security Rules**: Firebase Console > Firestore Database > Rules
2. **Indexes**: Firebase Console > Firestore Database > Indexes
   - Blogs koleksiyonu için: `category` (ASC), `createdAt` (DESC)
   - Blogs koleksiyonu için: `status` (ASC), `createdAt` (DESC)

### 3. İlk Admin Kullanıcı Oluşturma

**Yöntem 1: Tarayıcı Konsolu (Önerilen)**
```javascript
// 1. Siteyi açın (npm run dev)
// 2. Tarayıcı konsolunu açın (F12)
// 3. Aşağıdaki kodu çalıştırın:

import { auth, db } from './src/App.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const createFirstAdmin = async () => {
  const adminData = {
    email: 'admin@kablonet.com',
    password: 'admin123456', // GÜVENLİ BİR ŞİFRE KULLANIN!
    name: 'Super Admin',
    role: 'super_admin'
  };

  const userCredential = await createUserWithEmailAndPassword(
    auth, adminData.email, adminData.password
  );
  
  await setDoc(doc(db, 'admins', userCredential.user.uid), {
    email: adminData.email,
    name: adminData.name,
    role: adminData.role,
    isActive: true,
    createdAt: serverTimestamp(),
    permissions: { blog: true, users: true, settings: true }
  });
  
  console.log('✅ İlk admin oluşturuldu!');
};

createFirstAdmin();
```

**Yöntem 2: Manuel Firestore**
1. Firebase Console > Firestore Database
2. `admins` collection oluşturun
3. Document ID'yi Firebase Auth'dan alın
4. Gerekli alanları ekleyin

## 🔑 URL'ler ve Rotalar

### Public Rotalar
- `/` - Ana sayfa
- `/blog` - Blog listesi (frontend)
- `/blog/:slug` - Blog detay sayfası

### Admin Rotalar (Korumalı)
- `/admin-login` - Admin giriş sayfası
- `/admin-dashboard` - Ana dashboard (İSTATİSTİKLER + HIZLI ERİŞİM)
- `/admin-management` - Kullanıcı yönetimi (TAM ÖZELLİKLİ)
- `/admin-settings` - Sistem ayarları
- `/blog-admin` - Blog yönetimi
- `/blog-admin/new` - Yeni blog ekleme
- `/blog-admin/edit/:id` - Blog düzenleme

## 👥 Roller ve Yetkiler

### Rol Hiyerarşisi

1. **Süper Admin (`super_admin`)**
   - Tüm yetkilere sahip
   - Diğer adminleri yönetebilir (kendisi hariç silemez)
   - Sistem ayarlarına erişebilir
   - Süper adminleri düzenleyemez

2. **Admin (`admin`)**
   - Blog yönetimi yapabilir
   - Sınırlı kullanıcı yönetimi (süper admin düzenleyemez)
   - Kendi hesabını düzenleyemez

3. **Editör (`editor`)**
   - Sadece blog yönetimi yapabilir
   - Kullanıcı yönetimi yetkisi yok

### Yetki Kontrolü Sistemi

Her admin kullanıcısının `permissions` objesi bulunur:

```javascript
{
  blog: true,      // Blog yazıları yönetimi
  users: false,    // Kullanıcı yönetimi
  settings: false  // Sistem ayarları
}
```

### AuthContext Yetki Fonksiyonları

```javascript
const { 
  hasPermission,    // hasPermission('blog')
  hasRole,          // hasRole('super_admin') 
  isSuperAdmin,     // () => boolean
  isAdminUser,      // () => boolean
  isEditor          // () => boolean
} = useAuth();
```

## 🛡️ Güvenlik

### Özellikler
- ✅ Email/şifre doğrulama
- ✅ Admin durumu kontrolü
- ✅ Otomatik token yenileme
- ✅ Korumalı rotalar
- ✅ Son giriş takibi
- ✅ Firestore güvenlik kuralları

### Firestore Güvenlik
- Sadece adminler blog yazabilir
- Herkes blog okuyabilir
- Admin koleksiyonu korumalı

## 📱 Kullanım Kılavuzu

### Admin Sistemi Giriş
1. `/admin-login` adresine gidin
2. Email ve şifrenizi girin
3. Başarılı girişten sonra dashboard'a yönlendirilirsiniz

### Dashboard Kullanımı
- **İstatistik Kartları**: Blog sayısı, toplam görüntülenme, admin sayısı
- **Hızlı Aksiyonlar**: Blog ekleme, admin yönetimi, ayarlara erişim
- **Sistem Durumu**: Firestore bağlantı durumu
- **Son Adminler**: Son giriş yapan adminlerin listesi

### Admin Yönetimi (Yetki Kontrolü ile)
1. Dashboard'dan "Admin Yönetimi" butonuna tıklayın
2. **Yeni Admin Ekleme**: "Yeni Admin" butonu (sadece users yetkisi olanlar)
3. **Admin Düzenleme**: Edit ikonu (kendi kendini ve üst rolleri düzenleyemez)
4. **Durum Değiştirme**: Toggle butonu (yetki kontrolü ile)
5. **Admin Silme**: Çöp ikonu (kendini ve üst rolleri silemez)

### Blog Yönetimi
1. Dashboard'dan "Blog Yönetimi" butonuna tıklayın
2. **Filtreleme**: Kategori ve arama filtreleri
3. **Yeni Blog**: HTML editör ile zengin içerik oluşturma
4. **Düzenleme**: Mevcut blog yazılarını düzenleme
5. **ViewCount**: Otomatik görüntülenme sayacı (24 saat localStorage koruması)

### Çıkış
- Herhangi bir admin sayfasında "Çıkış" butonuna tıklayın
- Otomatik olarak giriş sayfasına yönlendirilirsiniz

## 🔧 Geliştirme ve Entegrasyon

### AuthContext Kullanımı
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { 
    currentUser, 
    isAdmin, 
    adminData,
    loading, 
    login, 
    logout,
    hasPermission,
    isSuperAdmin 
  } = useAuth();
  
  if (loading) return <div>Yükleniyor...</div>;
  if (!isAdmin) return <div>Yetkisiz</div>;
  
  // Yetki kontrolü
  if (!hasPermission('blog')) {
    return <div>Blog yetkisi yok</div>;
  }
  
  return <div>Admin içeriği</div>;
}
```

### Korumalı Rota Örneği
```jsx
<Route path="/admin-management" element={
  <ProtectedRoute>
    <AdminManagement />
  </ProtectedRoute>
} />
```

### Blog Servisi Kullanımı
```jsx
import { simpleBlogService } from '../services/simpleBlogService';

// Blog ekleme
const newBlog = await simpleBlogService.addBlog({
  title: 'Blog Başlığı',
  content: 'Blog içeriği...',
  category: 'Teknoloji',
  tags: ['react', 'firebase']
});

// ViewCount artırma
await simpleBlogService.incrementViewCount(blogId);
```

### Admin Servisi Kullanımı
```jsx
import { adminService } from '../services/authService';

// Admin ekleme
await adminService.createAdmin({
  name: 'Admin Adı',
  email: 'admin@kablonet.com',
  password: 'güvenli_şifre',
  role: 'admin',
  permissions: { blog: true, users: false, settings: false }
});

// Admin güncelleme (şifre hariç)
await adminService.updateAdmin(adminId, {
  name: 'Yeni Ad',
  role: 'editor',
  permissions: { blog: true, users: false, settings: false }
});
```

## 🐛 Sorun Giderme

### Yaygın Hatalar

1. **"Bu hesap admin yetkisine sahip değil"**
   - Admin kullanıcısı Firestore'da eksik
   - İlk admin oluşturma scriptini çalıştırın
   - `isActive: true` olduğundan emin olun

2. **"Admin hesabı deaktif durumda"**
   - AdminManagement'ta kullanıcıyı aktif hale getirin
   - Firestore'da `isActive: true` yapın

3. **"Erişim Yetkisi Yok" sayfası**
   - Kullanıcının gerekli permissions'ı olduğunu kontrol edin
   - Rol seviyesini kontrol edin (super_admin > admin > editor)

4. **Firestore permission denied**
   - Security rules'u kontrol edin
   - Index'leri oluşturun
   - Authentication durumunu kontrol edin

5. **Blog ViewCount çalışmıyor**
   - localStorage'ın açık olduğundan emin olun
   - Blog ID'sinin doğru olduğunu kontrol edin
   - Firestore'da blogs koleksiyonuna erişim olduğunu kontrol edin

6. **Şifre güncellemesi yapamıyorum**
   - Bu özellik Firebase kuralları gereği frontend'de desteklenmiyor
   - Admin kullanıcılarından şifre sıfırlama yapmasını isteyin
   - Cloud Function geliştirilmesi gerekir

### Debug Araçları
```javascript
// Console'da auth durumunu kontrol etme
import { auth } from './src/App.jsx';
console.log('Current User:', auth.currentUser);

// Auth context durumunu kontrol etme
import { useAuth } from './src/contexts/AuthContext';
const { adminData, hasPermission } = useAuth();
console.log('Admin Data:', adminData);
console.log('Has Blog Permission:', hasPermission('blog'));

// Firestore admin kaydını kontrol etme
import { doc, getDoc } from 'firebase/firestore';
const adminDoc = await getDoc(doc(db, 'admins', userId));
console.log('Admin Record:', adminDoc.data());
```

## 📈 Gelecek Özellikler ve İyileştirmeler

### Kısa Vadede Eklenebilecekler
- [ ] **Şifre Sıfırlama**: Email ile şifre sıfırlama sistemi
- [ ] **Profil Düzenleme**: Admin kullanıcılarının kendi profillerini düzenlemesi
- [ ] **Gelişmiş Loglama**: Admin aktivite loglarının detaylı takibi
- [ ] **Bulk Operations**: Toplu admin/blog işlemleri
- [ ] **E-posta Doğrulama**: Yeni admin hesapları için email verification

### Uzun Vadeli Özellikler
- [ ] **İki Faktörlü Doğrulama (2FA)**: SMS/TOTP ile ek güvenlik
- [ ] **Real-time Bildirimler**: Anlık admin bildirimleri
- [ ] **Advanced Analytics**: Detaylı dashboard istatistikleri
- [ ] **File Upload System**: Blog yazıları için resim/dosya yükleme
- [ ] **Yedekleme Sistemi**: Veritabanı backup/restore
- [ ] **API Rate Limiting**: Güvenlik için istek sınırlaması
- [ ] **Mobile Admin App**: React Native ile mobil admin paneli

### Teknik İyileştirmeler
- [ ] **Offline Support**: PWA özellikleri ile offline çalışma
- [ ] **Performance Optimization**: Lazy loading ve caching
- [ ] **Error Boundary**: React error handling
- [ ] **Unit Testing**: Jest ile test coverage
- [ ] **TypeScript Migration**: Tip güvenliği için TypeScript

## 🔗 İlgili Dosyalar ve Kaynaklar

### Temel Dosyalar
- `src/services/authService.js` - Auth ve admin servisleri
- `src/services/simpleBlogService.js` - Blog CRUD servisleri
- `src/contexts/AuthContext.jsx` - Global auth state ve yetki kontrolü
- `firestore-security-rules.txt` - Güvenlik kuralları ve index önerileri

### UI/UX Dosyaları
- `src/Pages/AdminDashboard.jsx` - Ana dashboard
- `src/Pages/AdminManagement.jsx` - Kullanıcı yönetimi (tam özellikli)
- `src/Pages/BlogAdmin.jsx` - Blog listesi ve yönetimi
- `src/Styles/` - Temaya uygun CSS stiller

### Yapılandırma
- `src/App.jsx` - Firebase config ve router setup
- `tailwind.config.js` - Tailwind CSS yapılandırması
- `package.json` - Proje bağımlılıkları

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana Renk**: `#2F3D8D` (Türksat mavisi)
- **İkincil**: `#1f2d6e` (Koyu mavi)
- **Başarılı**: `#10B981` (Yeşil)
- **Uyarı**: `#F59E0B` (Turuncu)
- **Hata**: `#EF4444` (Kırmızı)
- **Gri Tonları**: `#F9FAFB`, `#F3F4F6`, `#E5E7EB`

### Tipografi
- **Başlıklar**: Tailwind font-bold sınıfları
- **Gövde Metni**: Tailwind font-medium/normal sınıfları
- **İkonlar**: React Icons (Font Awesome) kütüphanesi

### Responsive Tasarım
- **Mobile First**: Tailwind'in responsive breakpoint'leri
- **Grid System**: Tailwind grid sınıfları
- **Flex Layout**: Modern flex layout patterns

---

**🚨 Önemli Güvenlik Uyarıları:**
- İlk admin şifresini mutlaka değiştirin
- Firebase güvenlik kurallarını production'da uygulayın
- Test email/şifrelerini production'da kullanmayın
- Admin paneli URL'lerini gizli tutun
- HTTPS kullanın (production'da zorunlu)
- Environment variables ile config bilgilerini koruyun

**📊 Sistem Durumu:**
- ✅ Authentication: Tam çalışır durumda
- ✅ Authorization: Rol bazlı yetki kontrolü aktif
- ✅ Blog System: CRUD + ViewCount sistemi çalışıyor
- ✅ Admin Management: Tam özellikli kullanıcı yönetimi
- ✅ Dashboard: İstatistikler ve hızlı erişim
- ⚠️ Password Reset: Henüz implement edilmedi
- ⚠️ 2FA: Gelecek versiyon için planlandı

**Son Güncelleme**: Haziran 2025  
**Versiyon**: 2.0.0 (Tam özellikli admin sistemi)
