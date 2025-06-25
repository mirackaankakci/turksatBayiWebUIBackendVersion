import { blogService, categoryService } from '../services/blogService.js';

// Başlangıç kategorileri
const initialCategories = [
  {
    name: 'Teknoloji',
    slug: 'teknoloji',
    icon: '💻',
    description: 'Teknoloji dünyasından haberler ve gelişmeler'
  },
  {
    name: 'İnternet',
    slug: 'internet',
    icon: '🌐',
    description: 'İnternet teknolojileri ve hizmetleri'
  },
  {
    name: 'TV & Eğlence',
    slug: 'tv-eglence',
    icon: '📺',
    description: 'Televizyon ve eğlence dünyası'
  },
  {
    name: 'Kampanyalar',
    slug: 'kampanyalar',
    icon: '🎯',
    description: 'Özel fırsatlar ve kampanyalar'
  },
  {
    name: 'Haberler',
    slug: 'haberler',
    icon: '📰',
    description: 'Sektör haberleri ve duyurular'
  }
];

// Başlangıç blog yazıları
const initialBlogPosts = [
  {
    title: 'Fiber İnternet Nedir? Avantajları Nelerdir?',
    slug: 'fiber-internet-nedir-avantajlari-nelerdir',
    excerpt: 'Fiber internet teknolojisi ve sağladığı avantajlar hakkında detaylı bilgi. Neden fiber internet tercih etmelisiniz?',
    content: `
      <h2>Fiber İnternet Teknolojisi</h2>
      <p>Fiber internet, günümüzün en hızlı internet teknolojisidir. Işık sinyalleri kullanarak veri iletimi yapan bu teknoloji, geleneksel bakır kablolara göre çok daha yüksek hızlar sunar.</p>
      
      <h3>Fiber İnternetin Avantajları</h3>
      <ul>
        <li><strong>Yüksek Hız:</strong> Gigabit hızlara kadar çıkabilir</li>
        <li><strong>Düşük Gecikme:</strong> Online oyunlar ve video konferanslar için ideal</li>
        <li><strong>Güvenilirlik:</strong> Hava koşullarından etkilenmez</li>
        <li><strong>Simetrik Hız:</strong> Upload ve download hızları eşit</li>
        <li><strong>Gelecek Garantisi:</strong> Uzun yıllar güncel kalır</li>
      </ul>
      
      <h3>Kimler Fiber İnternet Kullanmalı?</h3>
      <p>Fiber internet, özellikle şu kullanıcılar için idealdir:</p>
      <ul>
        <li>Uzaktan çalışanlar</li>
        <li>Online oyun severler</li>
        <li>Video içerik üreten kişiler</li>
        <li>Yoğun internet kullanan aileler</li>
      </ul>
      
      <p>Türksat Kablonet olarak, en yeni fiber internet teknolojisiyle hizmet veriyoruz.</p>
    `,
    category: 'internet',
    author: 'Türksat Kablonet',
    image: '/assets/fiber-internet.png',
    status: 'published'
  },
  {
    title: '2025 Yılında TV İzleme Alışkanlıkları',
    slug: '2025-yilinda-tv-izleme-aliskanliklari',
    excerpt: '2025 yılında televizyon izleme alışkanlıkları nasıl değişti? Dijital platformlar ve geleneksel yayıncılık arasındaki denge.',
    content: `
      <h2>Televizyon İzleme Alışkanlıklarının Evrimi</h2>
      <p>2025 yılında televizyon izleme alışkanlıkları büyük bir dönüşüm geçirdi. Akıllı TV'ler ve streaming platformların yaygınlaşmasıyla birlikte izleyiciler artık daha seçici davranıyor.</p>
      
      <h3>En Popüler İçerik Türleri</h3>
      <ul>
        <li>Belgesel ve eğitim programları</li>
        <li>Yerli dizi ve filmler</li>
        <li>Canlı spor yayınları</li>
        <li>Haber ve güncel olaylar</li>
      </ul>
      
      <h3>Kablo TV'nin Avantajları</h3>
      <p>Streaming platformların popülaritesine rağmen, kablo TV hala önemli avantajlar sunuyor:</p>
      <ul>
        <li>Güvenilir yayın kalitesi</li>
        <li>Çeşitli kanal seçenekleri</li>
        <li>Canlı yayın imkanı</li>
        <li>Aile dostu içerik kontrolü</li>
      </ul>
      
      <p>Türksat Kablonet'in HD ve 4K yayın seçenekleriyle en kaliteli TV deneyimini yaşayın.</p>
    `,
    category: 'tv-eglence',
    author: 'Medya Uzmanı',
    image: '/assets/tv-icon.png',
    status: 'published'
  },
  {
    title: 'Evden Çalışma İçin İdeal İnternet Hızı',
    slug: 'evden-calisma-icin-ideal-internet-hizi',
    excerpt: 'Uzaktan çalışma için gerekli internet hızı ne kadar olmalı? Video konferans, dosya paylaşımı ve verimli çalışma için öneriler.',
    content: `
      <h2>Uzaktan Çalışma ve İnternet Hızı</h2>
      <p>Pandemi sonrası dönemde evden çalışma kalıcı hale geldi. Verimli bir home office için doğru internet hızı çok önemli.</p>
      
      <h3>Aktivitelere Göre Gerekli Hızlar</h3>
      <ul>
        <li><strong>E-posta ve web tarama:</strong> 1-5 Mbps</li>
        <li><strong>Video konferans (HD):</strong> 5-10 Mbps</li>
        <li><strong>Dosya yükleme/indirme:</strong> 25+ Mbps</li>
        <li><strong>Bulut depolama senkronizasyonu:</strong> 50+ Mbps</li>
      </ul>
      
      <h3>Çoklu Kullanıcı Senaryoları</h3>
      <p>Evde birden fazla kişi çalışıyorsa veya çocuklar online eğitim alıyorsa daha yüksek hızlara ihtiyaç var:</p>
      <ul>
        <li>2-3 kişi için: 50-100 Mbps</li>
        <li>4+ kişi için: 100+ Mbps</li>
      </ul>
      
      <h3>Türksat Kablonet Avantajları</h3>
      <ul>
        <li>Fiber altyapı ile stabil bağlantı</li>
        <li>Simetrik upload/download hızları</li>
        <li>7/24 teknik destek</li>
        <li>İş kullanımı için özel paketler</li>
      </ul>
    `,
    category: 'teknoloji',
    author: 'IT Uzmanı',
    image: '/assets/router-icon.png',
    status: 'published'
  },
  {
    title: 'Yılbaşı Özel: Tüm Paketlerde %50 İndirim!',
    slug: 'yilbasi-ozel-tum-paketlerde-50-indirim',
    excerpt: '2025 yılbaşına özel tüm internet ve TV paketlerinde büyük indirim fırsatı. Sınırlı süre için geçerli kampanya detayları.',
    content: `
      <h2>Yılbaşı Kampanyası Başladı!</h2>
      <p>2025 yılına özel olarak hazırladığımız muhteşem kampanya ile tüm paketlerde %50'ye varan indirimler!</p>
      
      <h3>Kampanya Kapsamındaki Paketler</h3>
      <ul>
        <li><strong>Fiber İnternet Paketleri:</strong> 25 Mbps - 1000 Mbps arası tüm hızlar</li>
        <li><strong>Kablo TV Paketleri:</strong> Temel'den Premium'a tüm seçenekler</li>
        <li><strong>Kombine Paketler:</strong> İnternet + TV birlikte al, daha çok kazan</li>
      </ul>
      
      <h3>Kampanya Şartları</h3>
      <ul>
        <li>Geçerlilik: 31 Ocak 2025'e kadar</li>
        <li>Minimum 12 ay taahhüt</li>
        <li>Yeni müşterilere özel</li>
        <li>İlk 6 ay için geçerli indirim</li>
      </ul>
      
      <h3>Nasıl Başvurulur?</h3>
      <p>Kampanyadan yararlanmak için:</p>
      <ul>
        <li>Online başvuru formunu doldurun</li>
        <li>Müşteri hizmetlerimizi arayın</li>
        <li>Bayilerimizden bilgi alın</li>
      </ul>
      
      <p><strong>Fırsatı kaçırmayın!</strong> Bu fiyatlarla internet ve TV hizmeti bir daha gelmez.</p>
    `,
    category: 'kampanyalar',
    author: 'Pazarlama Ekibi',
    image: '/assets/campaignsImg/yilbasi-kampanyasi.jpg',
    status: 'published'
  },
  {
    title: 'Türksat Kablonet Yeni Merkez Binasında',
    slug: 'turksat-kablonet-yeni-merkez-binasinda',
    excerpt: 'Türksat Kablonet, artan müşteri talebine cevap vermek için yeni ve modern merkez binasına taşındı. Gelişen teknoloji ve hizmet kalitesi.',
    content: `
      <h2>Yeni Merkez Binası Açıldı</h2>
      <p>Türksat Kablonet olarak büyüyen ailemize daha iyi hizmet verebilmek için modern merkez binamıza taşındık.</p>
      
      <h3>Yeni Binamızın Özellikleri</h3>
      <ul>
        <li>5000 m² kapalı alan</li>
        <li>Modern müşteri hizmetleri merkezi</li>
        <li>Genişletilmiş teknik ekip</li>
        <li>7/24 operasyon merkezi</li>
        <li>Eğitim ve geliştirme birimleri</li>
      </ul>
      
      <h3>Gelişen Hizmet Kalitemiz</h3>
      <p>Yeni merkez binası ile birlikte sunduğumuz iyileştirmeler:</p>
      <ul>
        <li>Daha hızlı teknik destek</li>
        <li>Gelişmiş müşteri hizmetleri</li>
        <li>Proaktif arıza takibi</li>
        <li>Online self-servis seçenekleri</li>
      </ul>
      
      <h3>Müşteri Memnuniyeti Önceliğimiz</h3>
      <p>Yeni tesisimizde müşteri memnuniyetini artırmak için:</p>
      <ul>
        <li>Daha kısa bekleme süreleri</li>
        <li>Uzman ekiplerle doğrudan iletişim</li>
        <li>Hızlı problem çözme süreci</li>
        <li>Kişiselleştirilmiş hizmet deneyimi</li>
      </ul>
      
      <p>Yeni binumuzda sizlere daha iyi hizmet vermek için sabırsızlanıyoruz!</p>
    `,
    category: 'haberler',
    author: 'Türksat Kablonet',
    image: '/assets/logo.png',
    status: 'published'
  }
];

// Veritabanını başlangıç verileriyle doldur
export async function initializeFirestoreData() {
  try {
    console.log('Firebase veritabanı başlatılıyor...');
    
    // Önce kategorileri ekle
    console.log('Kategoriler ekleniyor...');
    for (const category of initialCategories) {
      try {
        await categoryService.add(category);
        console.log(`Kategori eklendi: ${category.name}`);
      } catch (error) {
        console.error(`Kategori eklenirken hata (${category.name}):`, error);
      }
    }
    
    // Sonra blog yazılarını ekle
    console.log('Blog yazıları ekleniyor...');
    for (const post of initialBlogPosts) {
      try {
        await blogService.add(post);
        console.log(`Blog yazısı eklendi: ${post.title}`);
      } catch (error) {
        console.error(`Blog yazısı eklenirken hata (${post.title}):`, error);
      }
    }
    
    console.log('Firebase veritabanı başlatma tamamlandı!');
    return { success: true, message: 'Başlangıç verileri başarıyla eklendi!' };
    
  } catch (error) {
    console.error('Firebase veritabanı başlatılırken hata:', error);
    return { success: false, message: 'Başlangıç verileri eklenirken hata oluştu!' };
  }
}

// Veritabanını temizle (dikkatli kullanın!)
export async function clearFirestoreData() {
  try {
    console.log('Firebase veritabanı temizleniyor...');
    
    // Tüm blog yazılarını al ve sil
    const posts = await blogService.getAll({ page: 1, pageSize: 1000 });
    for (const post of posts) {
      await blogService.delete(post.id);
      console.log(`Blog yazısı silindi: ${post.title}`);
    }
    
    // Tüm kategorileri al ve sil
    const categories = await categoryService.getAll();
    for (const category of categories) {
      await categoryService.delete(category.id);
      console.log(`Kategori silindi: ${category.name}`);
    }
    
    console.log('Firebase veritabanı temizleme tamamlandı!');
    return { success: true, message: 'Veritabanı başarıyla temizlendi!' };
    
  } catch (error) {
    console.error('Firebase veritabanı temizlenirken hata:', error);
    return { success: false, message: 'Veritabanı temizlenirken hata oluştu!' };
  }
}
