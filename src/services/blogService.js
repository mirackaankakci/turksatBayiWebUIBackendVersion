import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { db } from '../App.jsx';

// Blog koleksiyonu referansları
const BLOG_COLLECTION = 'blog_posts';
const CATEGORIES_COLLECTION = 'blog_categories';

// Kategoriler için servisler
export const categoryService = {
  // Tüm kategorileri getir
  async getAll() {
    try {
      const categoriesRef = collection(db, CATEGORIES_COLLECTION);
      const q = query(categoriesRef, orderBy('name'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Kategoriler alınırken hata:', error);
      throw error;
    }
  },

  // Kategori ekle
  async add(categoryData) {
    try {
      const categoriesRef = collection(db, CATEGORIES_COLLECTION);
      const docRef = await addDoc(categoriesRef, {
        ...categoryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Kategori eklenirken hata:', error);
      throw error;
    }
  },

  // Kategori güncelle
  async update(id, categoryData) {
    try {
      const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
      await updateDoc(categoryRef, {
        ...categoryData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Kategori güncellenirken hata:', error);
      throw error;
    }
  },

  // Kategori sil
  async delete(id) {
    try {
      const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
      await deleteDoc(categoryRef);
    } catch (error) {
      console.error('Kategori silinirken hata:', error);
      throw error;
    }
  }
};

// Blog yazıları için servisler
export const blogService = {
  // Tüm blog yazılarını getir (sayfalama ile)
  async getAll(options = {}) {
    try {
      const {
        category = null,
        searchTerm = '',
        page = 1,
        pageSize = 6,
        orderByField = 'createdAt',
        orderDirection = 'desc'
      } = options;

      const blogsRef = collection(db, BLOG_COLLECTION);
      let q = query(blogsRef);      // Kategori filtresi (isteğe bağlı)
      if (category && category !== 'all') {
        q = query(q, where('category', '==', category));
      }

      // Durumu published olan yazıları getir
      q = query(q, where('status', '==', 'published'));

      // Sıralama
      q = query(q, orderBy(orderByField, orderDirection));

      // Sayfalama
      if (page > 1) {
        const offset = (page - 1) * pageSize;
        q = query(q, limit(offset + pageSize));
      } else {
        q = query(q, limit(pageSize));
      }

      const snapshot = await getDocs(q);
      let posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));

      // Sayfalama için slice
      if (page > 1) {
        const startIndex = (page - 1) * pageSize;
        posts = posts.slice(startIndex);
      }

      // Arama filtresi (frontend'de)
      if (searchTerm) {
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return posts;
    } catch (error) {
      console.error('Blog yazıları alınırken hata:', error);
      throw error;
    }
  },

  // Toplam yazı sayısını getir
  async getCount(category = null) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      let q = query(blogsRef, where('status', '==', 'published'));
      
      if (category && category !== 'all') {
        q = query(q, where('category', '==', category));
      }

      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('Blog sayısı alınırken hata:', error);
      throw error;
    }
  },

  // Slug ile blog yazısını getir
  async getBySlug(slug) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      const q = query(blogsRef, where('slug', '==', slug), where('status', '==', 'published'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const post = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      };

      // Görüntülenme sayısını artır
      await this.incrementViewCount(doc.id);

      return post;
    } catch (error) {
      console.error('Blog yazısı alınırken hata:', error);
      throw error;
    }
  },

  // ID ile blog yazısını getir
  async getById(id) {
    try {
      const blogRef = doc(db, BLOG_COLLECTION, id);
      const snapshot = await getDoc(blogRef);
      
      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate(),
        updatedAt: snapshot.data().updatedAt?.toDate()
      };
    } catch (error) {
      console.error('Blog yazısı alınırken hata:', error);
      throw error;
    }
  },

  // İlgili yazıları getir (aynı kategoriden)
  async getRelated(categorySlug, currentPostId, limitCount = 3) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      const q = query(
        blogsRef,
        where('category', '==', categorySlug),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        limit(limitCount + 1) // +1 çünkü current post'u çıkaracağız
      );

      const snapshot = await getDocs(q);
      const posts = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        }))
        .filter(post => post.id !== currentPostId)
        .slice(0, limitCount);

      return posts;
    } catch (error) {
      console.error('İlgili yazılar alınırken hata:', error);
      throw error;
    }
  },

  // Blog yazısı ekle
  async add(postData) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      const docRef = await addDoc(blogsRef, {
        ...postData,
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
      const blogRef = doc(db, BLOG_COLLECTION, id);
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
      const blogRef = doc(db, BLOG_COLLECTION, id);
      await deleteDoc(blogRef);
    } catch (error) {
      console.error('Blog yazısı silinirken hata:', error);
      throw error;
    }
  },

  // Görüntülenme sayısını artır
  async incrementViewCount(id) {
    try {
      const blogRef = doc(db, BLOG_COLLECTION, id);
      await updateDoc(blogRef, {
        viewCount: increment(1)
      });
    } catch (error) {
      console.error('Görüntülenme sayısı artırılırken hata:', error);
      // Bu hata critical değil, sessizce geç
    }
  },

  // Popüler yazıları getir
  async getPopular(limitCount = 5) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      const q = query(
        blogsRef,
        where('status', '==', 'published'),
        orderBy('viewCount', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
    } catch (error) {
      console.error('Popüler yazılar alınırken hata:', error);
      throw error;
    }
  },

  // Son yazıları getir
  async getLatest(limitCount = 5) {
    try {
      const blogsRef = collection(db, BLOG_COLLECTION);
      const q = query(
        blogsRef,
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
    } catch (error) {
      console.error('Son yazılar alınırken hata:', error);
      throw error;
    }
  }
};

// Yardımcı fonksiyonlar
export const blogUtils = {
  // Slug oluştur
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

  // İçerik özetini çıkar
  createExcerpt(content, maxLength = 160) {
    // HTML etiketlerini temizle
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
      return textContent;
    }
    
    return textContent.substring(0, maxLength).trim() + '...';
  },

  // Okuma süresini hesapla
  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  }
};
