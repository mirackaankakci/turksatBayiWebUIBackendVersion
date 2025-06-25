import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../App.jsx';

// Auth servis
export const authService = {
  // Admin giriş yap
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Kullanıcının admin olup olmadığını kontrol et
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      
      if (!adminDoc.exists()) {
        await signOut(auth);
        throw new Error('Bu hesap admin yetkisine sahip değil');
      }
      
      const adminData = adminDoc.data();
      if (!adminData.isActive) {
        await signOut(auth);
        throw new Error('Admin hesabı deaktif durumda');
      }
      
      // Son giriş zamanını güncelle
      await updateDoc(doc(db, 'admins', user.uid), {
        lastLoginAt: serverTimestamp()
      });
      
      return {
        uid: user.uid,
        email: user.email,
        ...adminData
      };
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw error;
    }
  },

  // Çıkış yap
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Çıkış hatası:', error);
      throw error;
    }
  },

  // Mevcut kullanıcıyı al
  getCurrentUser() {
    return auth.currentUser;
  },

  // Auth durumu dinle
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // Admin durumunu kontrol et
  async checkAdminStatus(uid) {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      return adminDoc.exists() && adminDoc.data().isActive;
    } catch (error) {
      console.error('Admin durum kontrolü hatası:', error);
      return false;
    }
  }
};

// Admin yönetim servisi
export const adminService = {
  // Tüm adminleri getir
  async getAll() {
    try {
      const adminsRef = collection(db, 'admins');
      const snapshot = await getDocs(adminsRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastLoginAt: doc.data().lastLoginAt?.toDate()
      }));
    } catch (error) {
      console.error('Adminler alınırken hata:', error);
      return [];
    }
  },

  // Yeni admin ekle
  async createAdmin(adminData) {
    try {
      // Firebase Auth ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        adminData.email, 
        adminData.password
      );
      
      const user = userCredential.user;
      
      // Admin koleksiyonuna ekle
      await setDoc(doc(db, 'admins', user.uid), {
        email: adminData.email,
        name: adminData.name,
        role: adminData.role || 'admin',
        isActive: true,
        createdAt: serverTimestamp(),
        lastLoginAt: null,
        permissions: adminData.permissions || {
          blog: true,
          users: false,
          settings: false
        }
      });
      
      return user.uid;
    } catch (error) {
      console.error('Admin oluşturulurken hata:', error);
      throw error;
    }
  },
  // Admin güncelle
  async updateAdmin(adminId, adminData) {
    try {
      const adminRef = doc(db, 'admins', adminId);
      
      // Şifre güncelleme ayrı olarak ele alınacak
      const { password, ...updateData } = adminData;
      
      // Firestore verilerini güncelle
      await updateDoc(adminRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      // Not: Şifre güncellemesi Firebase Auth kuralları gereği kullanıcının kendisi tarafından yapılmalıdır
      // veya admin SDK kullanılmalıdır. Frontend'de başka kullanıcının şifresini değiştirmek mümkün değildir.
      // Bu özellik için backend Cloud Function gerekir.
      
      if (password) {
        console.warn('Şifre güncellemesi Frontend\'de desteklenmiyor. Backend Cloud Function gerekir.');
        throw new Error('Şifre güncellemesi şu anda desteklenmiyor. Lütfen kullanıcıdan şifre sıfırlama yapmasını isteyin.');
      }
      
    } catch (error) {
      console.error('Admin güncellenirken hata:', error);
      throw error;
    }
  },

  // Admin sil
  async deleteAdmin(adminId) {
    try {
      await deleteDoc(doc(db, 'admins', adminId));
      // Not: Firebase Auth'tan kullanıcıyı silmek için admin SDK gerekir
      // Bu frontend'de yapılamaz, backend function gerekir
    } catch (error) {
      console.error('Admin silinirken hata:', error);
      throw error;
    }
  },

  // Admin durumunu değiştir (aktif/pasif)
  async toggleAdminStatus(adminId, isActive) {
    try {
      const adminRef = doc(db, 'admins', adminId);
      await updateDoc(adminRef, {
        isActive,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Admin durumu değiştirilirken hata:', error);
      throw error;
    }
  }
};
