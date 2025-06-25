// Blog kategorileri
export const blogCategories = [
  {
    id: 1,
    name: 'Teknoloji',
    slug: 'teknoloji',
    icon: '💻'
  },
  {
    id: 2,
    name: 'İnternet',
    slug: 'internet',
    icon: '🌐'
  },
  {
    id: 3,
    name: 'TV & Eğlence',
    slug: 'tv-eglence',
    icon: '📺'
  },
  {
    id: 4,
    name: 'Kampanyalar',
    slug: 'kampanyalar',
    icon: '🎯'
  },
  {
    id: 5,
    name: 'Haberler',
    slug: 'haberler',
    icon: '📰'
  }
];

// Blog yazıları
export const blogPosts = [
  {
    id: 1,
    title: 'Fiber İnternet Nedir? Avantajları Nelerdir?',
    slug: 'fiber-internet-nedir-avantajlari-nelerdir',
    excerpt: 'Fiber internet teknolojisi ve sağladığı avantajlar hakkında detaylı bilgi. Neden fiber internet tercih etmelisiniz?',
    content: `
      <p>Fiber internet, günümüzün en hızlı internet teknolojisidir. Işık sinyalleri kullanarak veri iletimi yapan bu teknoloji, geleneksel bakır kablolara göre çok daha yüksek hızlar sunar.</p>
      
      <h2>Fiber İnternetin Avantajları</h2>
      <ul>
        <li><strong>Yüksek Hız:</strong> Gigabit hızlara kadar çıkabilir</li>
        <li><strong>Düşük Gecikme:</strong> Online oyunlar ve video konferanslar için ideal</li>
        <li><strong>Güvenilirlik:</strong> Hava koşullarından etkilenmez</li>
        <li><strong>Simetrik Hız:</strong> Upload ve download hızları eşit</li>
      </ul>
      
      <p>Türksat Kablonet olarak, müşterilerimize en kaliteli fiber internet hizmetini sunmaktan gurur duyuyoruz.</p>
    `,
    image: '/assets/blog/fiber-internet.jpg',
    category: 'internet',
    author: 'Ahmet Yılmaz',
    publishDate: '2024-06-20',
    views: 1250,
    featured: true
  },
  {
    id: 2,
    title: '2024 Yılının En İyi Kablo TV Paketleri',
    slug: '2024-yilinin-en-iyi-kablo-tv-paketleri',
    excerpt: '2024 yılında sunduğumuz en popüler kablo TV paketlerini ve özelliklerini keşfedin.',
    content: `
      <p>2024 yılında televizyon izleme alışkanlıkları değişiyor. İşte size en iyi kablo TV paketlerimiz:</p>
      
      <h2>Aile Paketi</h2>
      <p>Çocuklar ve yetişkinler için 150+ kanal seçeneği ile aile boyu eğlence.</p>
      
      <h2>Spor Paketi</h2>
      <p>Tüm spor müsabakalarını HD kalitede izleyin.</p>
      
      <h2>Premium Paketi</h2>
      <p>4K kalitede film ve dizi keyfi.</p>
    `,
    image: '/assets/blog/kablo-tv-paketleri.jpg',
    category: 'tv-eglence',
    author: 'Fatma Demir',
    publishDate: '2024-06-18',
    views: 987,
    featured: true
  },
  {
    id: 3,
    title: 'Evde İnternet Hızını Artırmanın 10 Yolu',
    slug: 'evde-internet-hizini-artirmanin-10-yolu',
    excerpt: 'İnternet hızınızı maksimuma çıkarmak için uygulayabileceğiniz pratik yöntemler.',
    content: `
      <p>İnternet hızınız yavaş mı? İşte hızınızı artırmak için 10 etkili yöntem:</p>
      
      <ol>
        <li>Modem konumunu optimize edin</li>
        <li>Wireless kanalını değiştirin</li>
        <li>Gereksiz cihazları ağdan çıkarın</li>
        <li>Modem yazılımını güncelleyin</li>
        <li>Ethernet kablosu kullanın</li>
        <li>Virüs taraması yapın</li>
        <li>Arka planda çalışan uygulamaları kapatın</li>
        <li>DNS ayarlarını değiştirin</li>
        <li>QoS ayarlarını yapılandırın</li>
        <li>İnternet paketinizi yükseltin</li>
      </ol>
    `,
    image: '/assets/blog/internet-hizi-artirma.jpg',
    category: 'teknoloji',
    author: 'Mehmet Kaya',
    publishDate: '2024-06-15',
    views: 2100,
    featured: false
  },
  {
    id: 4,
    title: 'Yaz Kampanyası: %50 İndirimli İnternet Paketleri',
    slug: 'yaz-kampanyasi-50-indirimli-internet-paketleri',
    excerpt: 'Yaz aylarına özel fiber internet paketlerinde büyük indirimler! Fırsatı kaçırmayın.',
    content: `
      <p>Bu yaz Türksat Kablonet ile hem hızlı internete hem de büyük tasarrufa sahip olun!</p>
      
      <h2>Kampanya Detayları</h2>
      <ul>
        <li>Tüm fiber internet paketlerinde %50 indirim</li>
        <li>Ücretsiz kurulum</li>
        <li>İlk 6 ay sabit fiyat garantisi</li>
        <li>7/24 müşteri desteği</li>
      </ul>
      
      <p>Kampanya 31 Ağustos 2024 tarihine kadar geçerlidir.</p>
    `,
    image: '/assets/blog/yaz-kampanyasi.jpg',
    category: 'kampanyalar',
    author: 'Zeynep Özkan',
    publishDate: '2024-06-10',
    views: 3200,
    featured: true
  },
  {
    id: 5,
    title: 'Türksat Kablonet Yeni Hizmet Bölgelerini Açıkladı',
    slug: 'turksat-kablonet-yeni-hizmet-bolgelerini-acikladi',
    excerpt: 'Fiber internet ağımızı genişletmeye devam ediyoruz. Yeni hizmet bölgeleri açıklandı.',
    content: `
      <p>Türksat Kablonet olarak, daha fazla haneyeye ulaşmak için altyapı yatırımlarımızı sürdürüyoruz.</p>
      
      <h2>Yeni Hizmet Bölgeleri</h2>
      <ul>
        <li>Ankara - Çankaya bölgesi</li>
        <li>İstanbul - Kadıköy bölgesi</li>
        <li>İzmir - Bornova bölgesi</li>
        <li>Bursa - Nilüfer bölgesi</li>
      </ul>
      
      <p>Hizmet vermeye başlama tarihleri yakında açıklanacak.</p>
    `,
    image: '/assets/blog/yeni-hizmet-bolgeleri.jpg',
    category: 'haberler',
    author: 'Ali Şahin',
    publishDate: '2024-06-08',
    views: 1800,
    featured: false
  }
];

// Kategoriye göre post sayısını hesapla
export const getCategoryPostCount = (categorySlug) => {
  if (categorySlug === 'all') {
    return blogPosts.length;
  }
  return blogPosts.filter(post => post.category === categorySlug).length;
};

// Öne çıkan postları getir
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured).slice(0, 3);
};

// En çok okunanları getir
export const getMostViewedPosts = () => {
  return [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5);
};