// İlk admin kullanıcısını oluşturmak için bu scripti tarayıcı konsolunda çalıştırın

// Firebase import edilmiş olduğundan emin olun
// import { auth, db } from './src/App.jsx';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const createFirstAdmin = async () => {
  try {
    // Admin bilgileri
    const adminData = {
      email: 'admin@kablonet.com',
      password: 'admin123', // Değiştirin!
      name: 'Super Admin',
      role: 'super_admin'
    };

    console.log('İlk admin oluşturuluyor...');
    
    // Firebase Auth ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      adminData.email, 
      adminData.password
    );
    
    const user = userCredential.user;
    console.log('Auth kullanıcısı oluşturuldu:', user.uid);
    
    // Firestore'da admin dökümanı oluştur
    await setDoc(doc(db, 'admins', user.uid), {
      email: adminData.email,
      name: adminData.name,
      role: adminData.role,
      isActive: true,
      createdAt: serverTimestamp(),
      lastLoginAt: null,
      permissions: {
        blog: true,
        users: true,
        settings: true
      }
    });
    
    console.log('✅ İlk admin başarıyla oluşturuldu!');
    console.log('Email:', adminData.email);
    console.log('Şifre:', adminData.password);
    console.log('⚠️ Lütfen şifreyi değiştirin!');
    
    return user;
  } catch (error) {
    console.error('❌ Admin oluşturulurken hata:', error);
    throw error;
  }
};

// Kullanım:
// createFirstAdmin();

export default createFirstAdmin;
