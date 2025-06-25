import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../App.jsx';

// Basit blog servisi - hata vermeyecek şekilde
export const simpleBlogService = {  // Tüm blog yazılarını getir (basit versiyon)
  async getAll() {
    try {
      console.log('Blog servisi: Veri çekiliyor...');
      const blogsRef = collection(db, 'blog_posts');
      const snapshot = await getDocs(blogsRef);
      
      console.log('Blog servisi: Döküman sayısı:', snapshot.docs.length);
      
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Blog servisi: Döküman verisi:', { id: doc.id, ...data });
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        };
      });
      
      console.log('Blog servisi: İşlenmiş veriler:', posts);
      return posts;
    } catch (error) {
      console.error('Blog yazıları alınırken hata:', error);
      return []; // Hata durumunda boş array döndür
    }
  },

  // Blog yazısı ekle
  async add(postData) {
    try {
      const blogsRef = collection(db, 'blog_posts');
      const docRef = await addDoc(blogsRef, {
        ...postData,
        category: postData.category || 'genel',
        status: postData.status || 'published',
        viewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Blog yazısı eklenirken hata:', error);
      throw error;
    }
  },

  // Blog yazısı güncelle
  async update(id, postData) {
    try {
      const blogRef = doc(db, 'blog_posts', id);
      await updateDoc(blogRef, {
        ...postData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Blog yazısı güncellenirken hata:', error);
      throw error;
    }
  },
  // Blog yazısı sil
  async delete(id) {
    try {
      const blogRef = doc(db, 'blog_posts', id);
      await deleteDoc(blogRef);
    } catch (error) {
      console.error('Blog yazısı silinirken hata:', error);
      throw error;
    }
  },
  // Görüntülenme sayısını artır (daha verimli)
  async incrementViewCount(id) {
    try {
      const blogRef = doc(db, 'blog_posts', id);
      await updateDoc(blogRef, {
        viewCount: increment(1),
        lastViewedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Görüntülenme sayısı artırılırken hata:', error);
      // Hata durumunda silent fail - kullanıcı deneyimini etkilemesin
    }
  },

  // Belirli bir blog yazısını ID ile getir
  async getById(id) {
    try {
      const allPosts = await this.getAll();
      return allPosts.find(post => post.id === id);
    } catch (error) {
      console.error('Blog yazısı getirilirken hata:', error);
      return null;
    }
  }
};

// Yardımcı fonksiyonlar
export const blogUtils = {
  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },

  createExcerpt(content, maxLength = 160) {
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
      return textContent;
    }
    
    return textContent.substring(0, maxLength).trim() + '...';
  }
};
