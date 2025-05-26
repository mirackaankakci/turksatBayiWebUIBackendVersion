export const CampaignData = [
  {
    id: 1,
    kampanyaAdi: "Dördü Bir Arada Kampanyasııı",
    taahut12Fiyat: "495,00 TL",
    taahut24Fiyat: "395,00 TL",
    ozellikler: [
      "100 Mbps İnternet Hızı",
      "Sınırsız Kablonet Kullanımı",
      "TV+ Aile Paketi",
      "Telefon Hizmetleri",
    ],
    aciklama: "4 ürünü bir arada cazip fiyatla alın!",
    imgsrc: "/src/assets/aileboyu.png",
    category: "tv",
    popular: "true",
    ucretlendirme: `<table>
      <thead>
        <tr>
          <th>TARİFE</th>
          <th>CİHAZ KİRALAMA</th>
          <th>HERŞEY DAHİL</th>
        </tr>
        <tr>
          <th>
            <div>
              <p>KabloTV Temel Paket</p>
              <p>100 Mbps Sınırsız Kablonet</p>
              <p>İlk 3 ay <strong>389 TL/Ay</strong></p>
              <p>Sonraki 9 ay <strong>479 TL/Ay</strong></p>
              <p>(Sadece Türksat Altyapı Bölgesinde)</p>
            </div>
          </th>
          <th>
            <div>
              <p>Modem <strong>60 TL/Ay</strong></p>
              <p>HD Kutu/Conax /TV Box <strong>35 TL/Ay</strong></p>
            </div>
          </th>
          <th>
            <div>
              <p>İlk 3 ay <strong>484 TL/Ay</strong></p>
              <p>Sonraki 9 ay <strong>574 TL/Ay</strong></p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>
              <p>TV Her Yerde Temel Paket</p>
              <p>50 Mbps Sınırsız Kablonet</p>
              <p>İlk 3 ay <strong>349 TL/Ay</strong></p>
              <p>Sonraki 9 ay <strong>439 TL/Ay</strong></p>
              <p>(Türksat ve Türk Telekom Altyapı Bölgesinde)</p>
            </div>
          </td>
          <td>
            <div>
              <p>Modem <strong>60 TL/Ay</strong></p>
              <p>Türksat TV Box <strong>35 TL/Ay</strong></p>
            </div>
          </td>
          <td>
            <div>
              <p>İlk 3 ay <strong>444 TL/Ay</strong></p>
              <p>Sonraki 9 ay <strong>534 TL/Ay</strong></p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`,
    cihazlarHtml: `<table>
      <thead>
        <tr>
          <th>CİHAZ</th>
          <th>ÖZELLİKLER</th>
          <th>ÜCRET</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>Wi-Fi 6 Modem</p>
            <img src="/modem.png" alt="Wi-Fi 6 Modem" style="height: 100px; margin: 10px auto; display: block;" />
          </td>
          <td>
            <ul style="list-style-type: disc; padding-left: 20px;">
              <li>Yüksek hız ve geniş kapsama alanı</li>
              <li>Wi-Fi 6 teknolojisi</li>
              <li>4x4 MIMO destekli</li>
              <li>Çoklu cihaz bağlantısı için optimize edilmiş</li>
            </ul>
          </td>
          <td>
            <p><strong>60 TL/Ay</strong></p>
            <p>Kiralama</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Premium Mesh Modem</p>
            <img src="/modem-premium.png" alt="Premium Mesh Modem" style="height: 100px; margin: 10px auto; display: block;" />
          </td>
          <td>
            <ul style="list-style-type: disc; padding-left: 20px;">
              <li>Mesh teknolojisi ile kesintisiz internet deneyimi</li>
              <li>Geniş alanlar için ideal çözüm</li>
              <li>Özel güvenlik protokolleri</li>
              <li>Akıllı bağlantı yönetimi</li>
            </ul>
          </td>
          <td>
            <p><strong>90 TL/Ay</strong></p>
            <p>Kiralama</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>TV Box</p>
            <img src="/tv-box.png" alt="TV Box" style="height: 100px; margin: 10px auto; display: block;" />
          </td>
          <td>
            <ul style="list-style-type: disc; padding-left: 20px;">
              <li>HD TV yayınları için set üstü kutu</li>
              <li>Dijital ses ve görüntü kalitesi</li>
              <li>Kanal gruplandırma ve kayıt özelliği</li>
              <li>Çocuk kilidi ve program hatırlatıcı</li>
            </ul>
          </td>
          <td>
            <p><strong>35 TL/Ay</strong></p>
            <p>Kiralama</p>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div style="margin-top: 20px; background-color: #ebf5ff; padding: 15px; border-radius: 8px;">
      <h3 style="font-weight: 600; margin-bottom: 10px;">Cihaz Avantajları</h3>
      <table>
        <thead>
          <tr>
            <th>AVANTAJ</th>
            <th>AÇIKLAMA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ücretsiz Teknik Destek</td>
            <td>
              Kiralanan cihazlar için teknik destek ücretsizdir. 7/24 teknik destek hattımızı arayarak yardım alabilirsiniz.
            </td>
          </tr>
          <tr>
            <td>Cihaz Değişimi</td>
            <td>
              Arıza durumunda yenisi ile ücretsiz değişim yapılır. Teknisyenlerimiz en kısa sürede yeni cihazı adresinize getirir.
            </td>
          </tr>
          <tr>
            <td>Kesintisiz Hizmet</td>
            <td>
              Teknolojik cihazlar ile daha stabil ve kesintisiz hizmet. En son teknolojiye sahip cihazlarla internet deneyiminizi maksimize edin.
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
    detaylarHtml: `<div>
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Özellikleri</h3>
      <ul class="space-y-3 mb-6">
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>100 Mbps İnternet Hızı</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Sınırsız Kablonet Kullanımı</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>TV+ Aile Paketi</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Telefon Hizmetleri</span>
        </li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Koşulları</h3>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
        <ul class="space-y-2">
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya 01.05.2025 – 31.12.2025 tarihleri arasında geçerli olacaktır.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya kapsamında müşteriler aşağıdaki tabloda belirtilen; Sınırsız Kablonet tarifelerinden birisine abone olabileceklerdir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanyada; teknik imkanlar doğrultusunda Docsis, GPON, xDSL ve FTTx altyapılarından biri ile hizmet verilebilmektedir. Hizmet sunulan şebekeye göre, hizmet tarifeleri farklılık gösterebilir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya kapsamında 12 ay veya 24 Ay taahhüt istenecektir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanyadan bireysel tarifede olan müşteriler resmi kurum ve kuruluşlar faydalanabilir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya kapsamında, <strong style="color: #2563eb">Türksat Kablonet</strong> aktivasyon ücreti alınmayacaktır.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Taahhüt süresi boyunca 12 Ay taahhüt için; 16 Mbps kadar Sınırsız Kablonet 455,00 TL/Ay, 24 Ay taahhüt için; 16 Mbps Sınırsız Kablonet ilk 12 ay 355 TL/Ay, ikinci 12 ay 455 TL/Ay olarak uygulanacaktır.</span>
          </li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Hakkında</h3>
      <div class="prose max-w-none text-gray-700">
        <p class="mb-4">
          Dördü Bir Arada Kampanyasııı ile Türksat Kablo'nun sunduğu yüksek hız ve kaliteli hizmet avantajlarından faydalanabilirsiniz.
          Bu özel kampanya kapsamında seçtiğiniz taahhüt süresine göre uygun fiyatlarla hizmetlerimizden yararlanabilirsiniz.
        </p>
        <p class="mb-4">
          Kombo paketlerimizle internet, televizyon ve telefon hizmetlerini tek pakette birleştirerek hem zamandan hem de bütçenizden tasarruf edin.
        </p>
        <p class="mb-4">
          Bu kampanya ile 100 Mbps hızında sınırsız internet, TV+ aile paketi, telefon hizmetleri ve daha fazlasına sahip olabilirsiniz.
          Üstelik taahhüt seçenekleriyle daha da uygun fiyatlara!
        </p>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-6">Sıkça Sorulan Sorular</h3>
      <div class="space-y-4">
        <div class="border-b border-gray-200 pb-4">
          <h4 class="text-lg font-medium text-gray-900 mb-2">Bu kampanyadan kimler faydalanabilir?</h4>
          <p class="text-gray-700">
            Bu kampanya, altyapımızın bulunduğu bölgelerdeki yeni müşterilerimiz için geçerlidir. Mevcut müşterilerimiz için farklı kampanyalarımız bulunmaktadır.
          </p>
        </div>
        <div class="border-b border-gray-200 pb-4">
          <h4 class="text-lg font-medium text-gray-900 mb-2">Taahüt süresi dolmadan iptal etmek istersem ne olur?</h4>
          <p class="text-gray-700">
            Taahüt süresi dolmadan hizmeti iptal etmeniz durumunda, o ana kadar kampanyalı fiyat üzerinden sağlanan indirimler ve varsa kurulum ücretleri fatura edilir.
          </p>
        </div>
      </div>
    </div>`
  },
  
  {
    id: 2,
    kampanyaAdi: "Aile Paketi",
    taahut12Fiyat: "395,00 TL",
    taahut24Fiyat: "345,00 TL",
    ozellikler: [
      "50 Mbps İnternet Hızı",
      "Sınırsız Kablonet Kullanımı",
      "Temel TV Paketi",
    ],
    aciklama: "Aile için ideal paket!",
    imgsrc: "/src/assets/aileboyu.png",
    category: "tv",
    popular: "true",
    ucretlendirme: `<table>
      <thead>
        <tr>
          <th>TARİFE</th>
          <th>CİHAZ KİRALAMA</th>
          <th>HERŞEY DAHİL</th>
        </tr>
        <tr>
          <th>
            <p>KabloTV Temel Paket</p>
            <p>16 Mbps veya 50 Mbps Sınırsız Kablonet</p>
            <p>İlk 3 ay <strong>349 TL/Ay</strong></p>
            <p>Sonraki 9 ay <strong>439 TL/Ay</strong></p>
            <p>(Sadece Türksat Altyapı Bölgesinde)</p>
          </th>
          <th>
            <p>Modem <strong>60 TL/Ay</strong></p>
            <p>HD Kutu/Conax /TV Box <strong>35 TL/Ay</strong></p>
          </th>
          <th>
            <p>İlk 3 ay <strong>444 TL/Ay</strong></p>
            <p>Sonraki 9 ay <strong>489 TL/Ay</strong></p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>TV Her Yerde Temel Paket</p>
            <p>16 Mbps veya 50 Mbps Sınırsız Kablonet</p>
            <p>İlk 3 ay <strong>349 TL/Ay</strong></p>
            <p>Sonraki 9 ay <strong>439 TL/Ay</strong></p>
            <p><strong>(Türksat ve Türk Telekom Altyapı Bölgesinde)</strong></p>
          </td>
          <td>
            <p>Modem <strong>60 TL/Ay</strong></p>
            <p>Türksat TV Box <strong>35 TL/Ay</strong></p>
          </td>
          <td>
            <p>İlk 3 ay <strong>444 TL/Ay</strong></p>
            <p>Sonraki 9 ay <strong>534 TL/Ay</strong></p>
          </td>
        </tr>
      </tbody>
    </table>`,
    cihazlarHtml: `<table class="table">
<tbody>
<tr>
<th colspan="2">Cihazlar</th>
<th>Kiralama</th>
</tr>
<tr>
<th>TV Cihazları</th>
<th>HD Kutu / Conax Mod&uuml;l / i-Kutu / T&uuml;rksat TV Box</th>
<th>35 TL/Ay</th>
</tr>
<tr>
<th>İnternet Cihazları</th>
<th>Modem</th>
<th>60 TL/Ay</th>
</tr>
</tbody>
</table>`,
    detaylarHtml: `<div>
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Özellikleri</h3>
      <ul class="space-y-3 mb-6">
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>50 Mbps İnternet Hızı</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Sınırsız Kablonet Kullanımı</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Temel TV Paketi</span>
        </li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Koşulları</h3>
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
        <ul class="space-y-2">
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya 01.05.2025 – 31.12.2025 tarihleri arasında geçerli olacaktır.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya kapsamında müşteriler belirtilen; Sınırsız Kablonet tarifelerinden birisine abone olabileceklerdir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanyada; teknik imkanlar doğrultusunda Docsis ve GPON altyapılarından biri ile hizmet verilebilmektedir.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>xDSL ve FTTx altyapılarında Akıllı Sınırsız Kablonet Tarifeleri bulunmamaktadır.</span>
          </li>
          <li class="flex items-start">
            <span class="text-gray-500 font-bold mr-2">•</span>
            <span>Kampanya kapsamında 12 ay veya 24 Ay taahhüt istenecektir.</span>
          </li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Kampanya Hakkında</h3>
      <div class="prose max-w-none text-gray-700">
        <p class="mb-4">
          Aile Paketi ile Türksat Kablo'nun sunduğu yüksek hız ve kaliteli hizmet avantajlarından faydalanabilirsiniz.
          Bu özel kampanya kapsamında seçtiğiniz taahhüt süresine göre uygun fiyatlarla hizmetlerimizden yararlanabilirsiniz.
        </p>
        <p class="mb-4">
          Kablo TV ile yüzlerce kanal, dijital görüntü ve ses kalitesiyle evinizde. HD kanallar ve geniş içerik seçenekleriyle televizyon keyfini doyasıya yaşayın.
        </p>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-6">Sıkça Sorulan Sorular</h3>
      <div class="space-y-4">
        <div class="border-b border-gray-200 pb-4">
          <h4 class="text-lg font-medium text-gray-900 mb-2">Kurulum ücreti var mı?</h4>
          <p class="text-gray-700">
            Bu kampanyada kurulum ücreti bulunmamaktadır. Teknik ekibimiz ücretsiz olarak kurulum hizmeti sağlamaktadır.
          </p>
        </div>
        <div class="border-b border-gray-200 pb-4">
          <h4 class="text-lg font-medium text-gray-900 mb-2">Altyapı kontrolü nasıl yaparım?</h4>
          <p class="text-gray-700">
            Adresinizde altyapı kontrolü yapmak için başvuru formunu doldurabilir veya müşteri hizmetlerimizi arayabilirsiniz. 
            Ekiplerimiz en kısa sürede adresinizde kontrol yapacaktır.
          </p>
        </div>
      </div>
    </div>`
  }
];
