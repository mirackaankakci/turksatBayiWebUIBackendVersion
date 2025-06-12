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

// Kampanya verisini JSON dosyasından oku
let campaignData = [];
try {
  const campaignFilePath = path.join(__dirname, '../src/helpers/CampaingData.jsx');
  
  // Eğer dosya varsa oku, yoksa önce export-campaigns-to-json.js çalıştırılmalı
  if (fs.existsSync(campaignFilePath)) {
    const rawData = fs.readFileSync(campaignFilePath, 'utf8');
    campaignData = JSON.parse(rawData);
    console.log(`✅ ${campaignData.length} kampanya JSON dosyasından okundu.`);
  } else {
    console.warn('⚠️ campaigns.json dosyası bulunamadı. Öncelikle export-campaigns-to-json.js çalıştırın.');
    campaignData = []; // Boş bir dizi kullan
  }
} catch (error) {
  console.error('❌ Kampanya verileri okunurken hata:', error);
  campaignData = []; // Hata durumunda boş dizi kullan
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

console.log(`📄 Toplam ${staticPages.length} statik sayfa`);

// Dinamik kampanya sayfaları
const campaignPages = campaignData.map(campaign => ({
  url: `/kampanya/${campaign.slug || campaign.id}`, // slug yoksa id kullan
  changefreq: 'monthly',
  priority: 0.7
}));

console.log(`🔄 Toplam ${campaignPages.length} dinamik kampanya sayfası`);

// Tüm sayfaları birleştir
const allPages = [...staticPages, ...campaignPages];

// Tarih ekleyin
const now = new Date();
const formattedDate = now.toISOString().split('T')[0];

// XML oluştur
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Oluşturulma Tarihi: ${formattedDate} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

// public klasörünü kontrol et
try {
  // Eğer public klasörü yoksa oluştur
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    console.log('📁 Public klasörü oluşturuluyor...');
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Dosyayı yaz
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap.xml başarıyla oluşturuldu!');
  console.log(`📄 Dosya konumu: ${path.join(publicDir, 'sitemap.xml')}`);
} catch (error) {
  console.error('❌ Sitemap oluşturulurken hata:', error);
}