import fs from 'fs';

// Sitenizin domain adı (sonunda slash olmadan)
const domain = 'https://kablointernet.com.tr';

// Tüm statik URL'leri bir array içinde tanımlayın
const staticUrls = [
  '/',
  '/hemenbasvur',
  '/kampanyalar',
  '/tarifeler',
  '/cihazlar',
  '/kablotv/cihazlar',
  '/kablotv/paketler',
  '/gizliliksozlesmesi',
  '/fesih-islemleri', // URL'de Türkçe karakter yerine Latin alfabe karşılığı
  '/kablotv/frekans-listesi',
  '/servisler',
  '/sikca-sorulan-sorular', // URL'de Türkçe karakter yerine Latin alfabe karşılığı
  '/iletisim', // URL'de Türkçe karakter yerine Latin alfabe karşılığı
  '/altyapi-sorgulama', // URL'de Türkçe karakter yerine Latin alfabe karşılığı
  '/kablotv/tarifeler'
];

// Dinamik URL'ler için gerçek değerler
const kampanyaKategorileri = ['kablonet', 'kablotv', 'kabloses', 'mevcutmusteri'];

// Gerçek kampanya örnekleri - daha gerçekçi slug'lar
const kampanyalar = [
  { kategori: 'kablonet', slug: 'dordu-bir-arada-kampanyasi' },
  { kategori: 'kablonet', slug: 'aramiza-hosgeldin-kampanyasi' },
  { kategori: 'kablotv', slug: 'sinema-keyfi-kampanyasi' },
  { kategori: 'kablotv', slug: 'denemesi-bedava-s-sport-kampanyasi' },
  { kategori: 'kabloses', slug: 'doyasıya-muhabbet-kampanyası' },
  { kategori: 'all', slug: 'dordu-bir-arada-kampanyasi' },
  { kategori: 'mevcutmusteri',  slug: 'mevcut-müsteriye-ozel-her-eve-kablonet' }
];

const servisIdleri = ['statikIp', 'dogumGunu', 'guvenliInternet', 'kabloBulut', 'kotaPaketi'];
const filmIdleri = [1, 2, 3, 4, 5];

// XML başlangıcı
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Statik URL'leri ekle
staticUrls.forEach(url => {
  sitemap += `
  <url>
    <loc>${domain}${url}</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Kampanya kategorileri ekle
kampanyaKategorileri.forEach(kategori => {
  sitemap += `
  <url>
    <loc>${domain}/kampanyalar/${kategori}</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

// Gerçek kampanya sayfaları
kampanyalar.forEach(kampanya => {
  sitemap += `
  <url>
    <loc>${domain}/kampanyalar/${kampanya.kategori}/${kampanya.slug}</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
});

// Servis örnekleri
servisIdleri.forEach(servis => {
  sitemap += `
  <url>
    <loc>${domain}/servisler/${servis}</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Örnek film sayfaları
filmIdleri.forEach(id => {
  sitemap += `
  <url>
    <loc>${domain}/filmler/${id}</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
});

// XML sonu
sitemap += `
</urlset>`;

// public klasörünü kontrol et, yoksa oluştur
try {
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }
} catch (err) {
  console.error('public klasörü oluşturulamadı:', err);
}

// Dosyayı kaydet
try {
  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ Sitemap başarıyla oluşturuldu: ./public/sitemap.xml');
} catch (err) {
  console.error('Sitemap dosyası kaydedilemedi:', err);
}