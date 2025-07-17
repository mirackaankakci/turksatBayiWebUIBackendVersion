# GitHub Resim Yükleme Sistemi Kurulum Rehberi

## 🚀 Genel Bakış

Firebase Storage yerine GitHub'ı kullanarak blog resimlerini saklayacaksınız. Bu sistem:
- ✅ **Ücretsiz** - GitHub'ta sınırsız resim depolama
- ✅ **Hızlı** - CDN üzerinden resim sunumu
- ✅ **Güvenli** - GitHub'ın güvenlik altyapısı
- ✅ **Yedekleme** - Otomatik git versiyonlama

## 📋 Kurulum Adımları

### 1. GitHub Personal Access Token Oluşturun

1. **GitHub'a giriş yapın**: https://github.com
2. **Settings > Developer settings > Personal access tokens > Tokens (classic)**
3. **"Generate new token (classic)"** butonuna tıklayın
4. **Token ayarları**:
   - **Note**: `Blog Image Upload Token`
   - **Expiration**: `No expiration` (önerilir)
   - **Scopes**: Aşağıdaki izinleri seçin:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `public_repo` (Access public repositories)
     - ✅ `write:packages` (Upload packages)

5. **"Generate token"** butonuna tıklayın
6. **Token'ı kopyalayın** (bir daha gösterilmeyecek!)

### 2. GitHub Bilgilerini Güncelleyin

`src/services/githubImageService.js` dosyasını açın ve aşağıdaki bilgileri güncelleyin:

```javascript
constructor() {
  this.owner = 'GITHUB_KULLANICI_ADINIZ'; // GitHub kullanıcı adınızı buraya yazın
  this.repo = 'turksatBayiWeb'; // Repository adınızı buraya yazın
  this.token = 'GITHUB_TOKEN_BURADA'; // Yukarıda oluşturduğunuz token'ı buraya yazın
  this.apiUrl = 'https://api.github.com';
}
```

### 3. Repository Ayarları

1. **Repository'yi public yapın** (önerilir)
2. **GitHub Pages'i etkinleştirin**:
   - Repository > Settings > Pages
   - Source: `Deploy from a branch`
   - Branch: `main`

### 4. İsteğe Bağlı: Klasör Yapısı

Resimler şu klasörlerde saklanacak:
- `public/blog-images/` - Blog yazı resimleri
- `Issues` - GitHub Issues API ile yüklenen resimler (otomatik)

## 🔧 Nasıl Çalışır?

### Yöntem 1: GitHub Issues API (Varsayılan)
- Resim, GitHub Issues API ile otomatik issue oluşturur
- Resim, GitHub CDN'de barındırılır (`user-images.githubusercontent.com`)
- Hızlı ve güvenilir

### Yöntem 2: Repository Contents API (Yedek)
- Resim, doğrudan repository'ye commit edilir
- GitHub Pages URL'si ile erişim (`username.github.io/repo-name`)
- Yedek sistem olarak çalışır

## 🎯 Kullanım

### Blog Editöründe:
1. **TinyMCE editöründe** resim butonuna tıklayın
2. **Dosya seçin** veya **sürükleyip bırakın**
3. **Otomatik GitHub'a yüklenir**
4. **Resim URL'si editöre eklenir**

### Kapak Resmi İçin:
1. **"Kapak Resmi Yükle"** butonuna tıklayın
2. **Dosya seçin**
3. **Otomatik GitHub'a yüklenir**
4. **Resim önizleme gösterilir**

## 📊 Avantajlar

| Özellik | Firebase Storage | GitHub |
|---------|------------------|---------|
| **Maliyet** | Ücretli (fazla kullanımda) | Ücretsiz |
| **Hız** | Hızlı | Çok hızlı (CDN) |
| **Güvenlik** | Güvenli | Çok güvenli |
| **Yedekleme** | Manuel | Otomatik (Git) |
| **Erişim** | Firebase Auth gerekli | Herkese açık |

## 🔍 Sorun Giderme

### Token Hatası
```
GitHub API hatası: Bad credentials
```
**Çözüm**: Token'ınızı kontrol edin ve yenileyin

### Repository Hatası
```
GitHub API hatası: Not Found
```
**Çözüm**: Repository adı ve kullanıcı adınızı kontrol edin

### Dosya Boyutu Hatası
```
Dosya boyutu 5MB'dan küçük olmalıdır
```
**Çözüm**: Resmi sıkıştırın veya küçültün

## 📱 Test Etme

1. **Blog yazısı oluşturun**
2. **TinyMCE editöründe resim yükleyin**
3. **Resimin görüntülendiğini kontrol edin**
4. **GitHub repository'de resimin kaydedildiğini doğrulayın**

## 🚀 Daha Fazla Özellik

- **Resim optimizasyonu** (yakında)
- **Thumbnail oluşturma** (yakında)
- **Batch upload** (yakında)
- **Resim galerisi** (yakında)

---

**✅ Kurulum tamamlandıktan sonra Firebase Storage'ı tamamen kaldırabilirsiniz!** 