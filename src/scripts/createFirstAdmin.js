// İlk admin kullanıcısını oluşturmak için bu scripti tarayıcı konsolunda çalıştırın

// Firebase import edilmiş olduğundan emin olun
// import { auth, db } from './src/App.jsx';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const createFirstAdmin = async () => {
  try {
    // Firebase servislerini import et
    const { createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js');
    const { doc, setDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js');
    
    // Admin bilgileri
    const adminData = {
      email: 'admin@kablonet.com',
      password: 'admin123', // Mutlaka değiştirin!
      name: 'Super Admin',
      role: 'super_admin'
    };

    console.log('🔄 İlk admin oluşturuluyor...');
    
    // Firebase Auth ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      adminData.email, 
      adminData.password
    );
    
    const user = userCredential.user;
    console.log('✅ Auth kullanıcısı oluşturuldu:', user.uid);
    
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
    
    console.log('🎉 İlk admin başarıyla oluşturuldu!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Şifre:', adminData.password);
    console.log('⚠️  GÜVENLİK: İlk girişten sonra şifreyi mutlaka değiştirin!');
    
    return user;
  } catch (error) {
    console.error('❌ Admin oluşturulurken hata:', error);
    if (error.code === 'auth/email-already-in-use') {
      console.log('💡 Bu email zaten kullanımda. Mevcut admin bilgileri:');
      console.log('📧 Email: admin@kablonet.com');
      console.log('🔑 Şifre: admin123');
    }
    throw error;
  }
};

// Kullanım:
// createFirstAdmin();

// Otomatik çalıştır
console.log('🚀 Admin oluşturma script\'i hazır!');
console.log('📝 createFirstAdmin() fonksiyonunu çalıştırın.');

export default createFirstAdmin;
