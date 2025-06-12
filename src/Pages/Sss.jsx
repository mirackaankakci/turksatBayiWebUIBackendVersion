import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import serit from "/assets/serit.png"; // Banner alt kısmındaki şerit resmi

const Sss = () => {
  const [aktivKategori, setAktivKategori] = useState('tumu');
  const [aramaMetni, setAramaMetni] = useState('');
  const [acikSoru, setAcikSoru] = useState(null);
  
  // Kategorileri gruplandırma ve görsel isimlendirme için kategori eşleştirme
  const kategoriIsimleri = {
    'tumu': 'Tümü',
    'kablotv_genel': 'Kablo TV',
    'i̇nternet_genel': 'İnternet',
    'ses_genel': 'Telefon Hizmetleri'
  };

  // Sayfa başlığını dinamik olarak değiştirmek için useEffect ekleyelim
  useEffect(() => {
    let pageTitle = 'Sıkça Sorulan Sorular | Türksat Kablonet';
    let metaDescription = 'Türksat Kablonet ve KabloTV hakkında sıkça sorulan sorular ve yanıtları. TV, internet ve telefon hizmetleri ile ilgili merak edilen konular.';
    
    // Arama yapılıyorsa başlığı değiştirelim
    if (aramaMetni) {
      pageTitle = `${aramaMetni} - Sıkça Sorulan Sorular | Türksat Kablonet`;
      metaDescription = `Türksat Kablonet "${aramaMetni}" ile ilgili sıkça sorulan sorular ve detaylı bilgiler.`;
    }
    
    // Kategori seçiliyse başlığı değiştirelim
    if (aktivKategori && aktivKategori !== 'tumu') {
      const kategoriAdi = kategoriIsimleri[aktivKategori] || aktivKategori;
      pageTitle = `${kategoriAdi} Hakkında Sıkça Sorulan Sorular | Türksat Kablonet`;
      metaDescription = `Türksat Kablonet ${kategoriAdi} hizmetleri hakkında sıkça sorulan sorular ve detaylı yanıtlar. Merak ettiğiniz tüm konular burada.`;
    }
    
    // Doğrudan document.title'ı güncelleyelim
    document.title = pageTitle;
  }, [aramaMetni, aktivKategori]);

  // Örnek SSS verileri - gerçek verilerinizi burada kullanabilirsiniz
  const sssVerileri = [
     {
    "id": 1,
    "kategori": "kablotv_genel",
    "soru": "Analog KabloTV nedir?",
    "cevap": "Kablonet ve/veya KabloTV servisi ile birlikte sağlanan, hava şartlarından etkilenmeyen ve ilave ücret ödemeden birden çok odada kullanabilen, görüntü kirliliği oluşturmayan, günün her saati satış sonrası ücretsiz teknik servis servisi sunan analog TV yayın servisidir."
  },
  {
    "id": 2,
    "kategori": "kablotv_genel",
    "soru": "KabloTV nedir?",
    "cevap": "KabloTV, Analog KabloTV şebekesi üzerinden verilen dijital TV platformudur."
  },
  {
    "id": 3,
    "kategori": "kablotv_genel",
    "soru": "Analog KabloTV aboneliğim yok. KabloTV hizmetinden faydalanabilir miyim?",
    "cevap": "KabloTV Hizmeti, Analog KabloTV Hizmeti ile birlikte sunulabilmektedir."
  },
  {
    "id": 4,
    "kategori": "kablotv_genel",
    "soru": "KabloTV'nin avantajları nelerdir?",
    "cevap": "• KabloTV aboneleri, içinde HD (yüksek çözünürlüklü) kanalların da bulunduğu birçok kanalı üstün görüntü ve ses ile izleyebilmektedirler.\n• KabloTV çanak anten gerektirmez.\n• KabloTV frekans kirlenmesinden ve kötü hava koşullarından etkilenmez.\n• Müşterilerine günün her saati kaliteli ve ücretsiz teknik servis servisi sunar.\n• Müşteriler, kurulumda ya da teknik arızaların giderilmesinde kablo ya da yedek parça gibi malzemelere ücret ödemezler. Yalnızca müşteri kaynaklı sorunlarda ücreti karşılığında hizmet sunulur.\n• KabloTV platformunda sadece Ulusal kanalları değil, İngiltere, Almanya, Japonya, Kore ve Fransa gibi ülkelerin sevilen kanallarını da keyifle izleyebilirsiniz."
  },
  {
    "id": 5,
    "kategori": "kablotv_genel",
    "soru": "Evimde KabloTV hattı var. KabloTV abonesi olabilir miyim?",
    "cevap": "KabloTV Tarifeleri sayfasında yer alan avantajlı tarife veya kampanyalarımızdan birini seçerek KabloTV abonesi olabilirsiniz."
  },
  {
    "id": 6,
    "kategori": "kablotv_genel",
    "soru": "KabloTV'ye abone olduğumda tek cihazla birden fazla odada KabloTV hizmetinden faydalanabilir miyim?",
    "cevap": "KabloTV servisini izlemek istediğiniz her bir televizyon için ayrı bir set-top box ve abonelik almanız gerekmektedir."
  },
  {
    "id": 7,
    "kategori": "kablotv_genel",
    "soru": "KabloTV ile ilgili yaşadığım sorunları nasıl çözebilirim?",
    "cevap": "0850 806 60 00 nolu çağrı merkezimizi günün her saati arayarak sorununuzu iletebilirsiniz. Servis taleplerinize en geç 5 saat içerisinde cevap verilecektir."
  },
  {
    "id": 8,
    "kategori": "kablotv_genel",
    "soru": "KabloTV aktivasyon nedir?",
    "cevap": "KabloTV servisinizi aktif etmek amacıyla uygulanan işlemdir."
  },
  {
    "id": 9,
    "kategori": "kablotv_genel",
    "soru": "Smart kart nedir?",
    "cevap": "KabloTV yayınından faydalanmayı sağlayan şifre çözücü karttır."
  },
  {
    "id": 10,
    "kategori": "kablotv_genel",
    "soru": "Smart kartımı başka bir uydu alıcısı ile kullanabilir miyim?",
    "cevap": "Bu kart sadece TÜRKSAT A.Ş. KabloTV yayınından faydalanmak için kullanılır."
  },
  {
    "id": 11,
    "kategori": "kablotv_genel",
    "soru": "Smart kartım arızalanırsa ne yapmalıyım?",
    "cevap": "Smart kartın arızalanması durumunda teknik servisimiz tarafından değiştirilir. Smart kart, kullanıcı hatasından dolayı arızalanmış veya hasar görmüşse kart ücreti kullanıcıya yansıtılır. Arıza bildirimi için 0850 806 60 00 numaralı destek hattımızı arayabilirsiniz."
  },
  {
    "id": 12,
    "kategori": "kablotv_genel",
    "soru": "KabloTV'ye nasıl abone olabilirim?",
    "cevap": "0850 806 60 00  numaralı çağrı merkezinden, Online İşlemler sayfamızdan ve Türksat abone merkezlerinden abone olabilirsiniz."
  },
  {
    "id": 13,
    "kategori": "kablotv_genel",
    "soru": "KabloTV aboneliğimi nakil edebilir miyim?",
    "cevap": "Nakil etmek istediğiniz adreste Türksat Kablo altyapısı varsa nakil işlemi yapabilirsiniz."
  },
  {
    "id": 14,
    "kategori": "kablotv_genel",
    "soru": "Abonelik sözleşmesine nasıl ulaşabilirim?",
    "cevap": "Abonelik sözleşmesine ulaşmak için tıklayınız."
  },
  {
    "id": 15,
    "kategori": "i̇nternet_genel",
    "soru": "Kablonet nedir?",
    "cevap": "Kablonet, Türksat Kablo olarak sunduğumuz geniş bant internet hizmetlerine verilen genel addır."
  },
  {
    "id": 16,
    "kategori": "i̇nternet_genel",
    "soru": "Kablonet'in avantajları nelerdir?",
    "cevap": "• Kablonet geniş bant internet çözümüdür.\n• Kablonet size ekonomik tarifeler ile abonelik imkanı sunar.\n• Kullandığın kadar öde İnternet aboneliği ile kullandığınız kadar ücret ödersiniz.\n• Abonelik süresince ücretsiz ve yerinde teknik servis imkanı vardır.\n• Kablonet abonesi olabilmeniz için telefon hattına ihtiyacınız yoktur.\n• Mesafe sorunu yoktur. İnternet hızı, herhangi bir noktaya olan uzaklığınız ile bağlantılı değildir."
  },
  {
    "id": 17,
    "kategori": "i̇nternet_genel",
    "soru": "Evimde Türksat KabloTV hattı var. Kablonet kullanabilir miyim?",
    "cevap": "Bu, binanızda Türksat Kablo'nun olduğu anlamına gelir ve İnternet Tarifeleri adresinde yer alan avantajlı tarifelerimizden birini seçerek Kablonet abonesi olabilirsiniz."
  },
  {
    "id": 18,
    "kategori": "i̇nternet_genel",
    "soru": "Kablonet ile ilgili yaşadığım sorunları nasıl çözebilirim?",
    "cevap": "0850 806 60 00 nolu çağrı merkezimizi günün her saati arayarak sorununuzu iletebilirsiniz. Servis taleplerinize en geç 5 saat içerisinde ve herhangi bir ücret talep edilmeden cevap verilecektir."
  },
  {
    "id": 19,
    "kategori": "i̇nternet_genel",
    "soru": "Kablonet aktivasyon nedir?",
    "cevap": "Kablonet servisinizi aktif etmek amacıyla uygulanan işlemdir."
  },
  {
    "id": 20,
    "kategori": "ses_genel",
    "soru": "Kabloses Nedir?",
    "cevap": "Kablonet üzerinden sağlanan telefon servisidir."
  },
  {
    "id": 21,
    "kategori": "ses_genel",
    "soru": "Kabloses hizmetini kullanabilmek için voip telefon ya da her hangi bir ek cihaz gerekir mi?",
    "cevap": "Kablonet modeminizin telefon servisini destekliyorsa analog telefon olarak tabir edilen eskiden kullanmış olduğunuz telefonunuzu modemin telefon portuna takmanız yeterlidir. İlave bir cihaz ya da voip telefon almanıza gerek yoktur."
  },
  {
    "id": 22,
    "kategori": "ses_genel",
    "soru": "Kablonet aboneliğim yok. Kabloses'e abone olabilir miyim?",
    "cevap": "Öncelikle Kablonet'in avantajlı tarifelerinden birine abone olmanız gerekmektedir."
  },
  {
    "id": 23,
    "kategori": "ses_genel",
    "soru": "Kabloses ile kimleri arayabilirim?",
    "cevap": "Kabloses ile şebeke içi, şehir içi, şehirlerarası, uluslararası, 444, 118XY, diğer alternatif Telekom operatörleri, GSM numaraları, kısa numaraları arayabileceksiniz."
  },
  {
    "id": 24,
    "kategori": "ses_genel",
    "soru": "Kabloses hizmeti hangi illerde sunulacaktır?",
    "cevap": "Hali hazırda KabloTV şebekesinin bulunduğu tüm illerde Kabloses servisi sunulmaktadır."
  },
  {
    "id": 25,
    "kategori": "ses_genel",
    "soru": "Kabloses hizmetine nasıl abone olabilirim?",
    "cevap": "0850 806 60 00 numaralı çağrı merkezinden ve Türksat abone merkezlerinden abone olabilirsiniz."
  },
  {
    "id": 26,
    "kategori": "ses_genel",
    "soru": "Kabloses hizmetinden kimler faydalabilir?",
    "cevap": "Kablonet aboneliği olan herkes Kabloses servisinden yararlanabilir."
  },
  {
    "id": 27,
    "kategori": "ses_genel",
    "soru": "Kabloses hizmeti ile konferans yapabilir miyim?",
    "cevap": "İhtiyacınıza göre 3' lü,5' li veya 6'lı konferans özelliklerinden birine abone olarak konferans görüşme servisinden yararlanabilirsiniz."
  },
  {
    "id": 28,
    "kategori": "ses_genel",
    "soru": "Kabloses'e numara taşıma nedir?",
    "cevap": "Farklı bir işletmecide kullandığınız telefon numarasını değiştirmeden Kabloses'e taşınmasıdır."
  },
  {
    "id": 29,
    "kategori": "ses_genel",
    "soru": "Kabloses'e numara taşıma ücretli midir?",
    "cevap": "Ücretsizdir."
  },
  {
    "id": 30,
    "kategori": "ses_genel",
    "soru": "Kabloses'e numara taşıma işlemi ne kadar sürer?",
    "cevap": "2 ile 6 gün arasında sürmektedir."
  },
  {
    "id": 31,
    "kategori": "ses_genel",
    "soru": "Kabloses'e numaramı taşımak için gereken evraklar nelerdir?",
    "cevap": "Nüfus cüzdanı, pasaport ya da ehliyetten biri ve imzalayacağınız formlar ile numara taşıma başvurusunu yapabilirsiniz."
  },
  {
    "id": 32,
    "kategori": "ses_genel",
    "soru": "Kabloses'e numaramı taşımak için ne yapmam gerekir?",
    "cevap": "Kablonet'iniz varsa tüm satış kanallarımızdan başvuru yapabilirsiniz. Kablonet'iniz yoksa tüm satış kanallarımızdan öncelikle Kablonet başvurusu sonra numara taşıma başvurusu yapabilirsiniz."
  },
  {
    "id": 33,
    "kategori": "kablotv_genel",
    "soru": "KabloTV paketleri nelerdir?",
    "cevap": "KabloTV'de sunulan paketler arasında Giriş Paketi, Temel Paket, Üst Paket, Gümüş Sinema Paketi ve Altın Sinema Paketi bulunmaktadır."
  },
  {
    "id": 34,
    "kategori": "kablotv_genel",
    "soru": "KabloTV Giriş Paketi kanalları nelerdir?",
    "cevap": "KabloTV Giriş Paketi'nde yer alan kanalları öğrenmek için KabloTV Paketler sayfasını ziyaret edebilirsiniz."
  },
  {
    "id": 35,
    "kategori": "kablotv_genel",
    "soru": "KabloTV Temel Paket kanalları nelerdir?",
    "cevap": "KabloTV Temel Paketi'nde bulunan kanalları görmek için KabloTV Paketler sayfasını inceleyebilirsiniz."
  },
  {
    "id": 36,
    "kategori": "kablotv_genel",
    "soru": "KabloTV Üst Paket kanalları nelerdir?",
    "cevap": "KabloTV Üst Paketi'nde sunulan kanallar hakkında bilgi almak için KabloTV Paketler sayfasını kontrol edebilirsiniz."
  },
  {
    "id": 37,
    "kategori": "kablotv_genel",
    "soru": "Gümüş Sinema Paketi kanalları nelerdir?",
    "cevap": "Gümüş Sinema Paketi'nde yer alan kanalları öğrenmek için KabloTV Paketler sayfasını ziyaret edebilirsiniz."
  },
  {
    "id": 38,
    "kategori": "kablotv_genel",
    "soru": "Altın Sinema Paketi kanalları nelerdir?",
    "cevap": "Altın Sinema Paketi'nde bulunan kanallar hakkında bilgi almak için KabloTV Paketler sayfasını inceleyebilirsiniz."
  },
  {
    "id": 39,
    "kategori": "kablotv_genel",
    "soru": "Paket ekleme işlemi yapabilir miyim?",
    "cevap": "Evet, paket ekleme işlemini 0850 806 60 00 numaralı çağrı merkezimizi arayarak, Online İşlemler üzerinden veya Türksat İl Müdürlükleri/Türksat Abone Ofislerine başvurarak gerçekleştirebilirsiniz."
  },
  {
    "id": 40,
    "kategori": "kablotv_genel",
    "soru": "Hangi kanallar HD yayın yapıyor?",
    "cevap": "KabloTV paketlerinde bulunan kanalların yayın türlerini öğrenmek ve HD yayın yapan kanalları görmek için KabloTV Paketler sayfasını ziyaret edebilirsiniz. 'Bul' kutucuğuna 'HD' yazarak arama yapabilirsiniz."
  },
  {
    "id": 41,
    "kategori": "kablotv_genel",
    "soru": "CosmoGO nedir?",
    "cevap": "CosmoGO, tek bir üyelikle yüzlerce film, tematik kanallar ve videoları çevrimiçi olarak izleyebileceğiniz bir eğlence servisidir."
  },
  {
    "id": 42,
    "kategori": "kablotv_genel",
    "soru": "CosmoGO ücretli bir uygulama mıdır?",
    "cevap": "CosmoGO, ilk ay ücretsizdir. Sonraki aylarda kullanım bedeli, Paketler sayfasında belirtilen fiyatlarla abonenin Türksat faturasına yansıtılır."
  },
  {
    "id": 43,
    "kategori": "kablotv_genel",
    "soru": "CosmoGO'ya nasıl giriş yapabilirim?",
    "cevap": "CosmoGO'ya erişim için gerekli kullanıcı adı ve şifre, aboneye SMS veya e-posta yoluyla bildirilecektir."
  },
  {
    "id": 44,
    "kategori": "kablotv_genel",
    "soru": "CosmoGO üyeliğimi iptal edebilir miyim?",
    "cevap": "Evet, CosmoGO üyeliğinizi çağrı merkezi aracılığıyla veya Türksat İl Müdürlükleri/Türksat Abone Ofislerine bizzat başvurarak iptal ettirebilirsiniz."
  },
  {
    "id": 45,
    "kategori": "kablotv_genel",
    "soru": "Dijital dergi nedir?",
    "cevap": "Dijital dergi, sinema kanallarının yayın akışına elektronik ortamda ulaşabileceğiniz bir uygulamadır."
  },
  {
    "id": 46,
    "kategori": "kablotv_genel",
    "soru": "Dijital dergilere nasıl ulaşabilirim?",
    "cevap": "Dijital dergilere internet sitemiz üzerinden erişmek için Dijital Dergiler sayfasını ziyaret edebilirsiniz."
  },
  {
    "id": 47,
    "kategori": "kablotv_genel",
    "soru": "KabloTV platformunda bulunan kanallar nelerdir?",
    "cevap": "KabloTV platformunda yer alan kanalları KabloTV Paketler sayfasında bulabilirsiniz."
  },
  {
    "id": 48,
    "kategori": "kablotv_genel",
    "soru": "KabloTV abonesiyim. Sinema paketlerine nasıl abone olabilirim?",
    "cevap": "Sinema paketlerine abone olmak için 0850 806 60 00 numaralı çağrı merkezimizi arayabilir, Türksat abone merkezlerinden veya Online İşlemler üzerinden dilediğiniz paketi ekleyebilirsiniz."
  },
  {
    "id": 49,
    "kategori": "kablotv_genel",
    "soru": "Filmleri orijinal dilinde izleyebilir miyim?",
    "cevap": "Evet, yayın ve alıcınız bu özellikleri destekliyorsa, yayınları altyazı seçeneği ile orijinal dilinde veya dublajlı olarak izleyebilirsiniz. Bu özellik sadece desteklenen kanallarda mevcuttur."
  },
  {
    "id": 50,
    "kategori": "kablotv_genel",
    "soru": "Yayın akışına nereden ulaşabilirim?",
    "cevap": "KabloTV yayın akışına ulaşmak için Yayın Akışı sayfasını ziyaret edebilirsiniz."
  },
  {
    "id": 51,
    "kategori": "kablotv_genel",
    "soru": "KabloTV paket ücretleri nedir?",
    "cevap": "KabloTV paket ücretlerine KabloTV Paketleri sayfasından ulaşabilirsiniz."
  },
  {
    "id": 52,
    "kategori": "kablotv_genel",
    "soru": "KabloTV hizmeti için bağlantı ücreti ödeyecek miyim?",
    "cevap": "Hayır, KabloTV hizmeti için bağlantı ücreti alınmamaktadır."
  },
  {
    "id": 53,
    "kategori": "kablotv_genel",
    "soru": "KabloTV hizmeti için aktivasyon ücreti ödeyecek miyim?",
    "cevap": "KabloTV hizmeti için Hizmet/İşlem Ücret Tarifeleri sayfasında belirtilen aktivasyon ücreti faturanıza yansıtılır. Ancak bir kampanya kapsamında başvuru yaptıysanız, kampanya koşulları geçerli olacaktır."
  },
  {
    "id": 54,
    "kategori": "kablotv_genel",
    "soru": "Borcumdan dolayı hizmetim kesildi. Borcumu ödedikten sonra başka bir ücret ödeyecek miyim?",
    "cevap": "Borcunuz nedeniyle kesilen KabloTV hizmetinin yeniden açılması için Hizmet/İşlem Ücret Tarifeleri sayfasında belirtilen açma bedeli faturanıza yansıtılır."
  },
  {
    "id": 55,
    "kategori": "kablotv_genel",
    "soru": "KabloTV yayınlarını izleyebilmek için ek bir cihaza ihtiyaç var mıdır?",
    "cevap": "Evet, KabloTV yayınlarını izlemek için HD Kutu, İnteraktif HD Kutu veya Conax Modül gibi cihazlara ihtiyaç vardır. Detaylı bilgiye Cihazlar sayfasından ulaşabilirsiniz."
  },
  {
    "id": 56,
    "kategori": "kablotv_genel",
    "soru": "KabloTV'ye abone olarak TV kutusu talep ettim. Cihazımı nasıl alabilirim?",
    "cevap": "Cihazınız, KabloTV hizmetini aktif hale getirmekle yükümlü personelimiz tarafından kurulum esnasında size teslim edilecektir."
  },
  {
    "id": 57,
    "kategori": "kablotv_genel",
    "soru": "Türksat'tan satın aldığım TV kutusunun garanti süresi ne kadardır?",
    "cevap": "Türksat'tan satın alınan TV kutularının garanti süresi 2 yıldır."
  },
  {
    "id": 58,
    "kategori": "kablotv_genel",
    "soru": "Türksat'tan aldığım TV Kutusu arızalanırsa ne yapmalıyım?",
    "cevap": "0850 806 60 00 numaralı çağrı merkezimizi arayarak arıza kaydı bırakmalısınız. İlgili ekipler cihazınızı sizden teslim alacak ve gerekli işlemleri yapacaktır."
  },
  {
    "id": 59,
    "kategori": "kablotv_genel",
    "soru": "Conax modül nedir?",
    "cevap": "Conax modül, set-top box özelliği mevcut televizyonlar için, conax şifreleme sistemini çözmeye yarayan smart kartın okunmasını sağlayan; şifre çözücü kartın, televizyonla bağlantısını sağlayan bir aparattır."
  },
  {
    "id": 60,
    "kategori": "kablotv_genel",
    "soru": "i-Kutu nedir?",
    "cevap": "i-Kutu, yeni nesil interaktif TV alıcısıdır. Yayınların yüksek çözünürlükte izlenmesini, gelişmiş özelliklerin ve internet tabanlı servislerin kullanılmasını sağlar."
  },
  {
    "id": 61,
    "kategori": "kablotv_genel",
    "soru": "i-Kutu'yu nasıl temin edebilirim?",
    "cevap": "0850 806 60 00 numaralı çağrı merkezimizi arayarak, İl Müdürlüklerimizi veya abone merkezlerimizi ziyaret ederek cihaz siparişinde bulunabilirsiniz."
  },
  {
    "id": 62,
    "kategori": "kablotv_genel",
    "soru": "i-Kutu ile neler izleyebilirim?",
    "cevap": "Belgesel, sinema, spor ve haber yayınlarını, arşiv filmlerini, tekrar izle içeriklerini izleyebilir; ayrıca 'TV Her Yerde' markasıyla sunulan yeni özellikleri kullanabilirsiniz."
  },
  {
    "id": 63,
    "kategori": "kablotv_genel",
    "soru": "i-Kutu kullanabilmem için hangi hizmete abone olmam gerekir?",
    "cevap": "i-Kutu kullanabilmeniz için TV Her Yerde Giriş, Temel veya Üst Pakete abone olmanız gerekmektedir."
  },
  {
    "id": 64,
    "kategori": "kablotv_genel",
    "soru": "\"Durdur İzle\" özelliği nedir?",
    "cevap": "\"Durdur İzle\" özelliği, izlemekte olduğunuz yayını veya içeriği istediğiniz zaman durdurmanıza ve kaldığınız yerden devam etmenize olanak tanır."
  },
  {
    "id": 65,
    "kategori": "kablotv_genel",
    "soru": "\"Durdur İzle\" özelliğini nasıl kullanabilirim?",
    "cevap": "İzlemekte olduğunuz yayını veya içeriği kumandadaki tek tuş ile durdurabilir ve yayının siz hazır oluncaya kadar sizi beklemesini sağlayabilirsiniz. Aynı şekilde kayıt durumuna göre ileri geri alınabilmektedir."
  },
  {
    "id": 66,
    "kategori": "kablotv_genel",
    "soru": "\"Sesle Yazdır\" özelliği nedir?",
    "cevap": "\"Sesle Yazdır\" özelliği, tuşlayarak yazmak yerine, kumandaya konuşarak yazdırmanıza ve TV Her Yerde'deki içerikleri kolaylıkla bulmanıza olanak tanır."
  },
  {
    "id": 67,
    "kategori": "kablotv_genel",
    "soru": "\"Sesle Yazdır\" özelliğini nasıl kullanabilirim?",
    "cevap": "Mikrofon tuşuna basarak 'yazma alanlarında' konuşarak yazdırabilirsiniz."
  },
  {
    "id": 68,
    "kategori": "kablotv_genel",
    "soru": "\"Sesle Kanal Değiştir\" özelliği nedir?",
    "cevap": "\"Sesle Kanal Değiştir\" özelliği sayesinde kanal numaralarını ezberlemenize gerek kalmaz; bir sözünüzle kanal değiştirme isteğiniz yerine gelir."
  },
  {
    "id": 69,
    "kategori": "kablotv_genel",
    "soru": "Çocuk Kumandası ne işe yarar?",
    "cevap": "Çocuk Kumandası, sadece çocuklar için hazırlanmış kanalların ve içeriklerin izlenmesini sağlar; böylece çocuklarınız TV izlerken daha güvende hissedersiniz."
  },
  {
    "id": 70,
    "kategori": "kablotv_genel",
    "soru": "Çocuk Kumandası satın almak zorunda mıyım?",
    "cevap": "Çocuk Kumandası ve Kolay Kumanda isteğe bağlıdır; ayrıca temin edilmelidir."
  },
  {
    "id": 71,
    "kategori": "kablotv_genel",
    "soru": "Kolay Kumanda ne işe yarar?",
    "cevap": "Kolay Kumanda, daha az özellik kullanmayı tercih eden kullanıcılar için tasarlanmıştır; basit ve kullanıcı dostu bir deneyim sunar."
  }
  ];

  // Benzersiz kategorileri oluştur
  const benzersizKategoriler = ['tumu', ...new Set(sssVerileri.map(item => item.kategori))];
  
  // Kategori bilgileriyle birlikte detaylı kategori listesi oluştur
  const kategoriler = benzersizKategoriler.map(kategoriId => ({
    id: kategoriId,
    isim: kategoriIsimleri[kategoriId] || kategoriId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }));
  
  // Filtreleme fonksiyonu
  const filtrelenenSSS = sssVerileri.filter(item => {
    const kategoriFiltresi = aktivKategori === 'tumu' || item.kategori === aktivKategori;
    const aramaFiltresi = 
      item.soru.toLowerCase().includes(aramaMetni.toLowerCase()) || 
      item.cevap.toLowerCase().includes(aramaMetni.toLowerCase());
    
    return kategoriFiltresi && aramaFiltresi;
  });

  // Soru tıklama işleyicisi
  const soruTikla = (id) => {
    setAcikSoru(acikSoru === id ? null : id);
  };

  // Kategori değiştirme işleyicisi
  const kategoriDegistir = (kategoriId) => {
    setAktivKategori(kategoriId);
    setAcikSoru(null); // Kategori değiştiğinde açık soruyu sıfırla
  };
  
  // Meta açıklama ve anahtar kelimeler için yardımcı fonksiyonlar
  const getMetaDescription = () => {
    if (aramaMetni) {
      return `Türksat Kablonet "${aramaMetni}" ile ilgili sıkça sorulan sorular ve detaylı bilgiler.`;
    }
    
    if (aktivKategori !== 'tumu') {
      const kategoriAdi = kategoriIsimleri[aktivKategori] || aktivKategori;
      return `Türksat Kablonet ${kategoriAdi} hizmetleri hakkında sıkça sorulan sorular ve detaylı yanıtlar. Merak ettiğiniz tüm konular burada.`;
    }
    
    return 'Türksat Kablonet ve KabloTV hakkında sıkça sorulan sorular ve yanıtları. TV, internet ve telefon hizmetleri ile ilgili merak edilen konular.';
  };
  
  const getMetaKeywords = () => {
    if (aramaMetni) {
      return `${aramaMetni}, sss, sıkça sorulan sorular, türksat, kablonet, kablotv, yardım`;
    }
    
    if (aktivKategori !== 'tumu') {
      const kategoriAdi = kategoriIsimleri[aktivKategori] || aktivKategori;
      switch (aktivKategori) {
        case 'kablotv_genel':
          return 'kablo tv, türksat tv, dijital yayın, hd kanallar, tv kutusu, kablotv paketleri';
        case 'i̇nternet_genel':
          return 'kablonet internet, fiber internet, geniş bant, modem, türksat internet, hızlı internet';
        case 'ses_genel':
          return 'kabloses, sabit telefon, türksat telefon, numara taşıma, ses paketi, telefon tarifeleri';
        default:
          return `${kategoriAdi.toLowerCase()}, sss, türksat, kablonet, sorular, yardım`;
      }
    }
    
    return 'sss, sıkça sorulan sorular, türksat, kablonet, kablotv, kabloses, fiber internet, yardım merkezi';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          {aramaMetni
            ? `${aramaMetni} - Sıkça Sorulan Sorular | Türksat Kablonet`
            : aktivKategori !== 'tumu'
              ? `${kategoriIsimleri[aktivKategori] || aktivKategori} Hakkında Sıkça Sorulan Sorular | Türksat Kablonet`
              : 'Sıkça Sorulan Sorular | Türksat Kablonet'}
        </title>
        <meta 
          name="description" 
          content={getMetaDescription()} 
        />
        <meta 
          name="keywords" 
          content={getMetaKeywords()} 
        />
      </Helmet>

      {/* Banner Eklendi - Diğer sayfalardaki gibi */}
      <div className="relative mx-auto w-full h-[300px] pt-[70px] items-center sm:h-[350px] md:h-[400px] lg:h-[400px] bg-gradient-to-b from-[#2F3D8D] to-[#3399D2]">
        <img
          src={serit}
          alt="Serit"
          className="absolute -bottom-1 left-0 w-full h-auto pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="container mx-auto max-w-6xl items-center text-center mt-[70px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {aramaMetni
              ? `"${aramaMetni}" için Sonuçlar`
              : aktivKategori !== 'tumu'
                ? `${kategoriIsimleri[aktivKategori] || aktivKategori} Soruları`
                : 'Sıkça Sorulan Sorular'}
          </h1>
          <p className="text-xl text-blue-100 max-w-full">
            {aramaMetni
              ? `"${aramaMetni}" araması için ${filtrelenenSSS.length} sonuç bulundu`
              : aktivKategori !== 'tumu'
                ? `${kategoriIsimleri[aktivKategori] || aktivKategori} hakkında merak edilen tüm soruların cevapları`
                : 'Türksat Kablo hizmetleri hakkında merak ettiğiniz tüm soruların cevapları burada.'}
          </p>
        </div>
      </div>

      {/* Ana İçerik Bölümü */}
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:py-16 relative z-10 -mt-8">
        {/* Arama kutusu */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Soru veya cevap ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Kategori seçici - yatay kaydırılabilir */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 justify-start min-w-max px-1">
            {kategoriler.map((kategori) => (
              <button
                key={kategori.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  aktivKategori === kategori.id 
                    ? 'bg-blue-700 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => kategoriDegistir(kategori.id)}
              >
                {kategori.isim}
              </button>
            ))}
          </div>
        </div>
        
        {/* SSS listesi */}
        <div className="space-y-4">
          {filtrelenenSSS.length > 0 ? (
            filtrelenenSSS.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <div 
                  className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => soruTikla(item.id)}
                >
                  <h3 className="text-lg font-medium text-gray-800">{item.soru}</h3>
                  <div className="text-blue-700 flex-shrink-0 ml-4">
                    {acikSoru === item.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                {acikSoru === item.id && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.cevap}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">Aramanızla eşleşen soru bulunamadı.</p>
            </div>
          )}
        </div>
        
        {/* Alt bilgilendirme ve iletişim bölümü */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Sorularınız hala yanıtlanmadı mı?</h2>
          <p className="text-gray-600 mb-6">Müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
          <a href="tel:08508066000" className="bg-blue-700 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md">
            0850 806 60 00
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sss;