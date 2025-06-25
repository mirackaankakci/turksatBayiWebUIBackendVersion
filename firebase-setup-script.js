// Firebase Test Script - Basit Blog Yazısı Ekle
// Browser Console'da (F12 -> Console) bu kodu çalıştırın

console.log("Basit blog yazısı ekliyorum...");

// Test blog yazısı
const testPost = {
  title: 'Test Blog Yazısı',
  content: 'Bu bir test blog yazısıdır. Firebase bağlantısını test ediyoruz.',
  author: 'Test Kullanıcı',
  category: 'genel',
  status: 'published'
};

// Firebase'e blog yazısı ekleme
async function addTestPost() {
  try {
    const { simpleBlogService } = await import('./src/services/simpleBlogService.js');
    
    const postId = await simpleBlogService.add(testPost);
    console.log(`✅ Test blog yazısı eklendi! ID: ${postId}`);
    
    // Yazıları listele
    const posts = await simpleBlogService.getAll();
    console.log(`📝 Toplam ${posts.length} blog yazısı var:`, posts);
    
  } catch (error) {
    console.error('❌ Test yazısı eklenirken hata:', error);
  }
}

// Test yazısını ekle
addTestPost();
