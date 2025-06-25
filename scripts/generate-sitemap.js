// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname ve __filename ES module'lerde mevcut olmadığı için oluşturuyoruz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌐 Sitemap Generator başlatılıyor...');

// Base URL
const BASE_URL = 'https://www.kablointernet.com.tr';

// Kampanya verisini doğru dosyadan oku
let campaignData = [];
try {
  // Önce CampaingData.jsx dosyasının yolunu kontrol et
  const campaignFilePath = path.join(__dirname, '../src/helpers/CampaingData.jsx');
  
  if (fs.existsSync(campaignFilePath)) {
    console.log('📂 CampaingData.jsx dosyası bulundu, içeriği okunuyor...');
    
    // JSX dosyasını oku ve kampanya verilerini çıkar
    const fileContent = fs.readFileSync(campaignFilePath, 'utf8');
    
    // JSX dosyasından kampanya objelerini çıkarmak için regex kullan
    const campaignRegex = /{\s*id:\s*['"`]([^'"`]+)['"`]\s*,[\s\S]*?slug:\s*['"`]([^'"`]+)['"`][\s\S]*?}/g;
    let match;
    
    while ((match = campaignRegex.exec(fileContent)) !== null) {
      campaignData.push({
        id: match[1],
        slug: match[2]
      });
    }
    
    // Eğer regex çalışmazsa, manual olarak kampanya listesi tanımla
    if (campaignData.length === 0) {
      console.log('📝 Manuel kampanya listesi kullanılıyor...');
      campaignData = [
        { id: 'dordu-bir-arada', slug: 'dordu-bir-arada-kampanyasi' },
        { id: 'aramiza-hosgeldin', slug: 'aramiza-hosgeldin-kampanyasi' },
        { id: 'aile-boyu-fiber', slug: 'aile-boyu-fiber-kampanyasi' },
        { id: 'her-eve-kablonet', slug: 'her-eve-kablonet-kampanyasi' },
        { id: 'hepsi-bir-arada', slug: 'hepsi-bir-arada-kampanyasi' },
        { id: 'taahhutsuz-fiber', slug: 'taahhutsuz-fiber-net-kampanyasi' },
        { id: 'muhtesem-ikili', slug: 'muhtesem-ikili-kampanyasi' },
        { id: 'turksat-isim-kolay', slug: 'turksat-isim-kolay-kampanyasi' },
        { id: 'sinema-keyfi', slug: 'sinema-keyfi-kampanyasi' },
        { id: 'denemesi-bedava-s-sport', slug: 'denemesi-bedava-s-sport-kampanyasi' },
        { id: 'doyasiya-belgesel', slug: 'doyasiya-belgesel-kampanyasi' },
        { id: 'aile-boyu-tv', slug: 'aile-boyu-tv-kampanyasi' },
        { id: 'denemesi-bedava-tv-her-yerde', slug: 'denemesi-bedava-tv-her-yerde' },
        { id: 'doyasiya-muhabbet', slug: 'doyasıya-muhabbet-kampanyası' },
        { id: 'mevcut-her-eve-kablonet', slug: 'mevcut-müsteriye-ozel-her-eve-kablonet' },
        { id: 'mevcut-hepsi-bir-arada', slug: 'mevcut-musteriye-ozel-hepsi-bir-arada' },
        { id: 'mevcut-dordu-bir-arada', slug: 'mevcut-musteriye-ozel-dordu-bir-arada-kampanyasi' }
      ];
    }
    
    console.log(`✅ ${campaignData.length} kampanya bulundu.`);
    
  } else {
    console.warn('⚠️ CampaingData.jsx dosyası bulunamadı.');
    console.log('📁 Aranan yol:', campaignFilePath);
  }
} catch (error) {
  console.error('❌ Kampanya verileri okunurken hata:', error);
}

// Sabit URL'ler
const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/kampanyalar', changefreq: 'daily', priority: 0.9 },
  { url: '/kampanyalar/internet', changefreq: 'weekly', priority: 0.8 },
  { url: '/kampanyalar/tv', changefreq: 'weekly', priority: 0.8 },
  { url: '/kampanyalar/phone', changefreq: 'weekly', priority: 0.8 },
  { url: '/kampanyalar/combo', changefreq: 'weekly', priority: 0.8 },
  { url: '/kampanyalar/mevcutmusteri', changefreq: 'weekly', priority: 0.8 },
  { url: '/hemen-basvur', changefreq: 'monthly', priority: 0.6 },
  { url: '/hakkimizda', changefreq: 'monthly', priority: 0.5 },
  { url: '/gizlilik-politikasi', changefreq: 'yearly', priority: 0.4 },
  { url: '/kullanim-kosullari', changefreq: 'yearly', priority: 0.4 },
  { url: '/iletisim', changefreq: 'monthly', priority: 0.6 }
];

// Dinamik kampanya detay sayfaları
const campaignDetailPages = campaignData.map(campaign => ({
  url: `/kampanyalar/${campaign.slug}`, // Doğru URL formatı
  changefreq: 'weekly',
  priority: 0.8
}));

console.log(`📄 ${staticPages.length} statik sayfa`);
console.log(`🎯 ${campaignDetailPages.length} kampanya detay sayfası`);

// Tüm sayfaları birleştir
const allPages = [...staticPages, ...campaignDetailPages];

// XML oluştur
const now = new Date();
const formattedDate = now.toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Otomatik oluşturuldu: ${formattedDate} -->
<!-- Toplam ${allPages.length} sayfa -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Dosyayı kaydet
try {
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap.xml başarıyla oluşturuldu!');
  console.log(`📊 Toplam ${allPages.length} sayfa eklendi`);
  console.log(`📂 Dosya: ${path.join(publicDir, 'sitemap.xml')}`);
  
  // Debug: İlk 5 kampanya URL'sini göster
  if (campaignDetailPages.length > 0) {
    console.log('\n🔗 Örnek kampanya URL\'leri:');
    campaignDetailPages.slice(0, 5).forEach(page => {
      console.log(`   ${BASE_URL}${page.url}`);
    });
  }
  
} catch (error) {
  console.error('❌ Sitemap oluşturulurken hata:', error);
}