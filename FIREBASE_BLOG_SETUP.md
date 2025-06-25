# Firebase Blog Sistemi Kurulum Rehberi

Bu rehber, Türksat Kablonet Web projesinde Firebase Firestore kullanarak blog sisteminin nasıl kurulacağını ve kullanılacağını açıklar.

## 📋 Gereksinimler

- Firebase hesabı
- Node.js ve npm
- React.js projesi (mevcut)

## 🚀 Firebase Kurulumu

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Create a project" butonuna tıklayın
3. Proje adını girin (örn: "turksat-bayi-web")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. Projeyi oluşturun

### 2. Firestore Database Kurulumu

1. Firebase Console'da projenizi açın
2. Sol menüden "Firestore Database" seçin
3. "Create database" butonuna tıklayın
4. "Start in test mode" seçin (geliştirme için)
5. Location seçin (Europe-west3 önerilir)

### 3. Firebase Config Ayarları

1. Firebase Console'da "Project Settings" > "General" sekmesine gidin
2. "Your apps" bölümünde "Web app" ekleyin
3. App nickname girin ve "Register app" tıklayın
4. Firebase config object'ini kopyalayın
5. `src/App.jsx` dosyasında config bilgilerini güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🔐 Firestore Security Rules

1. Firebase Console'da "Firestore Database" > "Rules" sekmesine gidin
2. `firestore.rules` dosyasındaki kuralları kopyalayın
3. Firebase Console'daki rules editörüne yapıştırın
4. "Publish" butonuna basın

## 📁 Veritabanı Yapısı

### Collections

#### `blog_categories`
```
{
  id: string (auto-generated),
  name: string,
  slug: string,
  icon: string,
  description: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `blog_posts`
```
{
  id: string (auto-generated),
  title: string,
  slug: string,
  excerpt: string,
  content: string (HTML),
  category: string (reference to category slug),
  author: string,
  image: string (URL),
  status: string ('draft' | 'published'),
  viewCount: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🎯 İlk Verileri Ekleme

### Otomatik Veri Ekleme (Önerilen)

1. Browser Developer Tools'u açın (F12)
2. Console sekmesine gidin
3. Aşağıdaki kodu çalıştırın:

```javascript
import { initializeFirestoreData } from './src/utils/firebaseInit.js';
initializeFirestoreData().then(result => console.log(result));
```

### Manuel Veri Ekleme

Blog Admin paneline gidip (`/blog-admin`) manuel olarak kategori ve blog yazısı ekleyebilirsiniz.

## 📝 Kullanım

### Blog Sayfaları

- **Ana Blog Sayfası**: `/blog`
- **Kategori Filtreleme**: `/blog/kategori/teknoloji`
- **Blog Detay**: `/blog/blog-yazisi-slug`
- **Admin Panel**: `/blog-admin`
- **Yeni Yazı**: `/blog-admin/new`
- **Yazı Düzenle**: `/blog-admin/edit/yazı-id`

### Blog Admin Paneli

1. `/blog-admin` adresine gidin
2. "Yeni Yazı" butonuna tıklayın
3. Form doldurarak blog yazısı ekleyin
4. Mevcut yazıları düzenlemek için "Edit" butonunu kullanın

### API Kullanımı

```javascript
import { blogService, categoryService } from './services/blogService';

// Blog yazılarını getir
const posts = await blogService.getAll({
  category: 'teknoloji',
  page: 1,
  pageSize: 6
});

// Tek blog yazısı getir
const post = await blogService.getBySlug('blog-yazisi-slug');

// Yeni blog yazısı ekle
const newPostId = await blogService.add({
  title: 'Yeni Blog Yazısı',
  content: 'Blog içeriği...',
  category: 'teknoloji',
  status: 'published'
});

// Kategorileri getir
const categories = await categoryService.getAll();
```

## 🛠️ Geliştirme

### Servis Fonksiyonları

- `blogService.getAll()` - Tüm blog yazılarını getir
- `blogService.getBySlug()` - Slug ile yazı getir
- `blogService.add()` - Yeni yazı ekle
- `blogService.update()` - Yazı güncelle
- `blogService.delete()` - Yazı sil
- `categoryService.getAll()` - Kategorileri getir
- `categoryService.add()` - Kategori ekle

### Yardımcı Fonksiyonlar

- `blogUtils.createSlug()` - Başlıktan slug oluştur
- `blogUtils.createExcerpt()` - İçerikten özet çıkar
- `blogUtils.calculateReadingTime()` - Okuma süresini hesapla

## 🐛 Sorun Giderme

### Yaygın Hatalar

1. **Firebase Config Hatası**
   - Config bilgilerinin doğru olduğundan emin olun
   - API key'in aktif olduğunu kontrol edin

2. **Firestore Permission Denied**
   - Security rules'ların doğru olduğundan emin olun
   - Test mode'da çalıştığınızı kontrol edin

3. **Blog Yazıları Görünmüyor**
   - Yazıların status'ünün 'published' olduğundan emin olun
   - Network sekmesinde API çağrılarını kontrol edin

### Debug Modları

Development ortamında console.log'lar aktiftir. Production'da bu loglar otomatik olarak kaldırılır.

## 🚀 Deployment

1. Firebase config bilgilerini production için güncelleyin
2. Firestore security rules'ı production'a uygun hale getirin
3. `npm run build` ile projeyi build edin
4. Build dosyalarını hosting servisinize yükleyin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Console hatalarını kontrol edin
2. Firebase Console'da Firestore işlemlerini izleyin
3. Network sekmesinde API çağrılarını kontrol edin

## 🔄 Gelecek Geliştirmeler

- [ ] Görsel upload sistemi (Firebase Storage)
- [ ] Kullanıcı authentication
- [ ] Blog yazısı beğeni sistemi
- [ ] Yorum sistemi
- [ ] SEO optimizasyonu
- [ ] Arama özelliği geliştirme
- [ ] Blog yazısı kategorilendirme
- [ ] Otomatik backup sistemi
