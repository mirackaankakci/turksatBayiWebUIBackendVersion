import React from 'react';
import { Route } from 'react-router-dom';

// NOT: Sitemap oluşturma için basitleştirilmiş router.
// Bu dosya sadece URL path'lerini içermeli, element özelliği olmamalı
export default (
  <Route>
    <Route path="/" />
    <Route path="/hemenbasvur" />
    <Route path="/kampanyalar" />
    <Route path="/kampanyalar/:kategori" />
    <Route path="/kampanyalar/:kategori/:kampanyaSlug" />
    <Route path="/tarifeler" />
    <Route path="/cihazlar" />
    <Route path="/donate" />
    <Route path="/kablotv/cihazlar" />
    <Route path="/kablotv/paketler" />
    <Route path="/gizliliksozlesmesi" />
    <Route path="/fesih-i̇şlemleri" />
    <Route path="/kablotv/frekans-listesi" />
    <Route path="/servisler" />
    <Route path="/servisler/:serviceId" />
    <Route path="/sıkça-sorulan-sorular" />
    <Route path="/i̇letişim" />
    <Route path="/altyapı-sorgulama" />
    <Route path="/kablotv/tarifeler" />
    <Route path="/filmler/:id" />
  </Route>
);