import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CampaignData } from '../helpers/CampaingData';

const CampaignDetail = () => {
  const { id, kategori } = useParams();
  const location = useLocation();
  const [campaign, setCampaign] = useState(null);
  const [pageTitle, setPageTitle] = useState('Kampanya Detayı | Türksat Kablonet');
  const [pageDescription, setPageDescription] = useState('Türksat Kablonet kampanya detayları');
  const [pageKeywords, setPageKeywords] = useState('türksat, kablonet, kampanya');

  useEffect(() => {
    const fetchCampaignData = () => {
      // CampaignData'dan gerçek kampanya verisini bul
      const campaignData = CampaignData.find(camp => camp.id === parseInt(id)) || {
        id: id,
        kampanyaAdi: 'Kampanya Bulunamadı',
        category: kategori || 'internet',
        fiyat: '0',
        ozellikler: ['Bilgi mevcut değil']
      };
      
      setCampaign(campaignData);
      
      // Kampanya tipine ve kategoriye göre title oluştur
      let title = '';
      let description = '';
      let keywords = 'türksat, kablonet, kampanya';

      const categoryName = kategori || campaignData.category;
      
      switch (categoryName) {
        case 'kablonet':
        case 'internet':
          title = `${campaignData.kampanyaAdi} | Kablonet İnternet Kampanyası - Türksat`;
          description = `${campaignData.kampanyaAdi} kampanya detayları. ${campaignData.ozellikler?.slice(0,3).join(', ')} özellikleri ile sadece ${campaignData.fiyat} TL.`;
          keywords += ', fiber internet, kablonet, broadband';
          break;
        case 'kablotv':
        case 'tv':
          title = `${campaignData.kampanyaAdi} | Kablo TV Kampanyası - Türksat`;
          description = `${campaignData.kampanyaAdi} TV kampanya detayları. ${campaignData.ozellikler?.slice(0,3).join(', ')} özellikleri ile sadece ${campaignData.fiyat} TL.`;
          keywords += ', kablo tv, televizyon, hd tv';
          break;
        case 'kabloses':
        case 'phone':
          title = `${campaignData.kampanyaAdi} | Kablo Ses Telefon Kampanyası - Türksat`;
          description = `${campaignData.kampanyaAdi} telefon kampanya detayları. ${campaignData.ozellikler?.slice(0,3).join(', ')} özellikleri ile sadece ${campaignData.fiyat} TL.`;
          keywords += ', kablo ses, sabit telefon, telefon';
          break;
        case 'mevcutmusteri':
          title = `${campaignData.kampanyaAdi} | Mevcut Müşteri Kampanyası - Türksat`;
          description = `${campaignData.kampanyaAdi} mevcut müşteri kampanya detayları. Özel avantajlar ve indirimli fiyatlar.`;
          keywords += ', mevcut müşteri, sadakat kampanyası';
          break;
        default:
          title = `${campaignData.kampanyaAdi} | Türksat Kablonet Kampanyası`;
          description = `${campaignData.kampanyaAdi} kampanya detayları ve özellikleri.`;
      }
      
      setPageTitle(title);
      setPageDescription(description);
      setPageKeywords(keywords);
    };

    fetchCampaignData();
  }, [id, kategori]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      
      {/* Kampanya detay içeriği */}
      {campaign && (
        <div className="container mx-auto px-4 py-8 pt-32">
          <h1 className="text-3xl font-bold mb-4">{campaign.kampanyaAdi}</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-xl font-semibold text-blue-600 mb-4">
              {campaign.fiyat} TL/ay
            </p>
            {campaign.ozellikler && (
              <ul className="list-disc list-inside space-y-2">
                {campaign.ozellikler.map((ozellik, index) => (
                  <li key={index} className="text-gray-700">{ozellik}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetail;