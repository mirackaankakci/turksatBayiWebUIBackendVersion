# 🔥 Firebase Proje Geçiş Rehberi

Bu rehber mevcut Türksat Kablonet web sitesini yeni bir Firebase projesine bağlamak için gerekli tüm adımları içerir.

## 📋 Genel Bakış

Bu projede aşağıdaki Firebase servisleri kullanılıyor:
- **Firestore Database**: Blog yazıları, kategoriler ve admin verileri
- **Authentication**: Admin kullanıcı girişi
- **Storage**: Blog resimleri ve dosyalar

## 🚀 Adım 1: Yeni Firebase Projesi Oluşturma

### 1.1 Proje Oluşturma
1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. **"Create a project"** veya **"Proje ekle"** butonuna tıklayın
3. Proje adını girin (örn: `turksat-kablonet-prod`)
4. Google Analytics'i etkinleştirin (önerilen)
5. **"Create project"** butonuna tıklayın

### 1.2 Web App Ekleme
1. Proje oluşturulduktan sonra **"Add app"** > **"Web"** (</>)  ikonuna tıklayın
2. App nickname girin (örn: `Turksat Web App`)
3. **"Register app"** butonuna tıklayın
4. Firebase SDK configuration kısmında verilen bilgileri kopyalayın
5. **"Continue to console"** butonuna tıklayın

## 🔧 Adım 2: Firebase Servislerini Etkinleştirme

### 2.1 Firestore Database
1. Sol menüden **"Firestore Database"** seçin
2. **"Create database"** butonuna tıklayın
3. **"Start in test mode"** seçin (güvenlik kurallarını sonra güncelleyeceğiz)
4. Lokasyon seçin (Europe-west3 (Frankfurt) önerilen)
5. **"Done"** butonuna tıklayın

### 2.2 Authentication
1. Sol menüden **"Authentication"** seçin
2. **"Get started"** butonuna tıklayın
3. **"Sign-in method"** sekmesine gidin
4. **"Email/Password"** seçeneğini etkinleştirin
5. **"Save"** butonuna tıklayın

### 2.3 Storage
1. Sol menüden **"Storage"** seçin
2. **"Get started"** butonuna tıklayın
3. **"Start in test mode"** seçin
4. Lokasyon seçin (aynı bölge önerilen)
5. **"Done"** butonuna tıklayın

## ⚙️ Adım 3: Konfigürasyon Güncelleme

### 3.1 Firebase Config Güncelleme
1. `src/App.jsx` dosyasını açın
2. `firebaseConfig` objesindeki değerleri Firebase Console'dan aldığınız bilgilerle değiştirin:

```javascript
const firebaseConfig = {
  apiKey: "sizin-api-key-iniz",
  authDomain: "proje-id.firebaseapp.com",
  projectId: "proje-id",
  storageBucket: "proje-id.firebasestorage.app",
  messagingSenderId: "messaging-sender-id",
  appId: "app-id",
  measurementId: "measurement-id"
};
```

## 🛡️ Adım 4: Güvenlik Kuralları

### 4.1 Firestore Rules
1. Firebase Console'da **"Firestore Database"** > **"Rules"** sekmesine gidin
2. `firestore.rules` dosyasındaki kuralları kopyalayın
3. Firebase Console'da mevcut kuralları silip yeni kuralları yapıştırın
4. **"Publish"** butonuna tıklayın

### 4.2 Storage Rules (İsteğe bağlı)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Adım 5: Firestore Indexes Oluşturma

Firebase Console'da **"Firestore Database"** > **"Indexes"** sekmesine gidin ve şu indexleri oluşturun:

### Blog Posts Collection
```
Collection ID: blog_posts
Fields: 
- status (Ascending)
- createdAt (Descending)
```

```
Collection ID: blog_posts  
Fields:
- category (Ascending)
- createdAt (Descending)
```

```
Collection ID: blog_posts
Fields:
- status (Ascending) 
- category (Ascending)
- createdAt (Descending)
```

### Admins Collection
```
Collection ID: admins
Fields:
- isActive (Ascending)
- role (Ascending)
```

## 👤 Adım 6: İlk Admin Kullanıcısı Oluşturma

### 6.1 Uygulama Çalıştırma
```bash
npm run dev
```

### 6.2 Admin Script Çalıştırma
1. Tarayıcıda uygulamayı açın
2. F12 tuşuna basarak Developer Tools açın
3. Console sekmesine gidin
4. `src/scripts/createFirstAdmin.js` dosyasının içeriğini kopyalayın
5. Console'a yapıştırıp Enter tuşuna basın
6. Başarılı olursa admin bilgileri gösterilecek

**Varsayılan Admin Bilgileri:**
- Email: `admin@kablonet.com`
- Şifre: `admin123`

⚠️ **GÜVENLİK:** İlk girişten sonra mutlaka şifreyi değiştirin!

## 📝 Adım 7: Başlangıç Verilerini Yükleme

### 7.1 Kategoriler ve Blog Yazıları
1. Admin paneline giriş yapın (`/admin-login`)
2. Tarayıcı konsolunda şu komutu çalıştırın:

```javascript
import { initializeFirestoreData } from './src/utils/firebaseInit.js';
initializeFirestoreData();
```

Bu komut şunları ekleyecek:
- 5 temel kategori (Teknoloji, İnternet, TV & Eğlence, Kampanyalar, Haberler)
- 5 örnek blog yazısı

## ✅ Adım 8: Test Etme

### 8.1 Frontend Test
- Ana sayfa açılıyor mu?
- Blog sayfası çalışıyor mu? (`/blog`)
- Blog yazıları görünüyor mu?

### 8.2 Admin Panel Test
- Admin girişi yapabiliyor musunuz? (`/admin-login`)
- Blog yazısı ekleyebiliyor musunuz?
- Mevcut yazıları düzenleyebiliyor musunuz?

## 🔍 Sorun Giderme

### Yaygın Hatalar

1. **"Permission denied" hatası**
   - Firestore rules doğru uygulandı mı kontrol edin
   - Admin kullanıcısı doğru oluşturuldu mu kontrol edin

2. **"Collection does not exist" hatası**
   - Başlangıç verilerini yüklediğinizden emin olun
   - Firestore Database'in aktif olduğunu kontrol edin

3. **Authentication hatası**
   - Email/Password sign-in metodu etkin mi kontrol edin
   - API key doğru mu kontrol edin

### Console Logları
Hata durumunda tarayıcı konsolunu kontrol edin:
```javascript
// Firebase bağlantısını test etmek için
console.log('Firebase App:', firebase.getApps());
```

## 📱 Production'a Alma

Production ortamına alırken:

1. **Güvenlik Kurallarını Gözden Geçirin**
   - Test modundan production moduna geçin
   - Gereksiz read/write izinlerini kaldırın

2. **Performans Optimizasyonu**
   - Gerekli tüm indexleri oluşturun
   - Unused fields'ları temizleyin

3. **Yedekleme Kurun**
   - Otomatik backup scheduling ayarlayın
   - Export işlemlerini düzenli yapın

## 📞 Destek

Sorun yaşıyorsanız:
1. Bu rehberdeki adımları tekrar kontrol edin
2. Firebase Console'daki hata loglarını inceleyin
3. Tarayıcı konsolundaki error mesajlarını kontrol edin

---

**📝 Not:** Bu rehber Türksat Kablonet web sitesi için özel olarak hazırlanmıştır. Tüm adımları sırasıyla takip etmeniz önemlidir. 