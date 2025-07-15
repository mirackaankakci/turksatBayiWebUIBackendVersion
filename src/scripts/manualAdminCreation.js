// Manuel Admin Oluşturma Script'i
// Bu script'i admin-login sayfasında console'da çalıştırın

async function createAdminManually() {
  try {
    console.log('🔄 Manuel admin oluşturma başlatılıyor...');
    
    // Firebase servislerini import et
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    
    // Admin bilgileri
    const adminEmail = 'admin@kablonet.com';
    const adminPassword = 'admin123';
    
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Şifre:', adminPassword);
    
    // 1. Authentication kullanıcısı oluştur
    console.log('🔄 Firebase Auth kullanıcısı oluşturuluyor...');
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      adminEmail, 
      adminPassword
    );
    
    const user = userCredential.user;
    console.log('✅ Firebase Auth kullanıcısı oluşturuldu:', user.uid);
    
    // 2. Firestore'da admin dokümantı oluştur
    console.log('🔄 Firestore admin dokümantı oluşturuluyor...');
    await setDoc(doc(db, 'admins', user.uid), {
      email: adminEmail,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
      createdAt: serverTimestamp(),
      lastLoginAt: null,
      permissions: {
        blog: true,
        users: true,
        settings: true
      }
    });
    
    console.log('✅ Firestore admin dokümantı oluşturuldu!');
    
    // 3. Sonuç
    console.log('');
    console.log('🎉 BAŞARILI! Admin kullanıcısı oluşturuldu:');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Şifre:', adminPassword);
    console.log('🆔 UID:', user.uid);
    console.log('');
    console.log('⚠️  GÜVENLİK: İlk girişten sonra şifreyi mutlaka değiştirin!');
    console.log('🔄 Şimdi /admin-login sayfasında giriş yapabilirsiniz.');
    
    return user;
    
  } catch (error) {
    console.error('❌ Admin oluşturulurken hata:', error);
    
    // Hata türlerine göre öneriler
    if (error.code === 'auth/email-already-in-use') {
      console.log('');
      console.log('💡 Bu email zaten kullanımda! Mevcut bilgilerle giriş yapmayı deneyin:');
      console.log('📧 Email: admin@kablonet.com');
      console.log('🔑 Şifre: admin123');
    } else if (error.code === 'auth/weak-password') {
      console.log('💡 Şifre çok zayıf. Daha güçlü bir şifre deneyin.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('💡 Geçersiz email adresi.');
    } else {
      console.log('💡 Firebase konfigürasyonunu kontrol edin.');
      console.log('💡 Internet bağlantınızı kontrol edin.');
    }
    
    throw error;
  }
}

// Kullanım
console.log('🚀 Manuel admin oluşturma script\'i hazır!');
console.log('📝 createAdminManually() fonksiyonunu çalıştırın.');

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createAdminManually;
} 