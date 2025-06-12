// components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title, 
  description, 
  keywords = '',
  image = null,
  type = 'website',
  noindex = false
}) => {
  const siteUrl = 'https://turksatkablonet.com';
  const imageUrl = image || `${siteUrl}/logo.png`;
  
  return (
    <Helmet>
      {/* Temel meta etiketleri */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Open Graph meta etiketleri */}
      <meta property="og:site_name" content="Türksat Kablonet" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter Card meta etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};