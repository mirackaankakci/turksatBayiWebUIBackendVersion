/**
 * Temel HTML tablosuna CSS sınıfları ekleyerek stillendirir
 * @param {string} html Ham HTML tablosu
 * @return {string} Stillendirilmiş HTML tablosu
 */
export function styleTable(html) {
  if (!html) return '';

  // HTML'i DOM elementine çevirme
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Tablo elementini bulma
  const table = tempDiv.querySelector('table');
  if (!table) return html;
  
  // Tablo CSS sınıfı ekleme
  table.classList.add('w-full', 'border-collapse');
  
  // thead içindeki tr ve th elementlerini stillendirme
  const thead = table.querySelector('thead');
  if (thead) {
    const headerRows = thead.querySelectorAll('tr');
    headerRows.forEach((row, rowIndex) => {
      // Ana başlık satırı
      if (rowIndex === 0) {
        const thElements = row.querySelectorAll('th');
        thElements.forEach(th => {
          th.classList.add('p-3', 'bg-gray-500', 'text-white', 'text-center', 'font-semibold', 'border', 'border-gray-300');
        });
      } 
      // Alt başlık satırı veya içerik satırı (thead içinde)
      else {
        const thElements = row.querySelectorAll('th');
        thElements.forEach(th => {
          th.classList.add('p-4', 'border', 'border-gray-300', 'bg-blue-100');
          // İçerik hizalama
          const divs = th.querySelectorAll('div');
          divs.forEach(div => div.classList.add('text-center'));
        });
      }
    });
  }
  
  // tbody içindeki tr ve td elementlerini stillendirme
  const tbody = table.querySelector('tbody');
  if (tbody) {
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row, rowIndex) => {
      // Satır arka plan rengi
      row.classList.add(rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-blue-50');
      
      // Hücreler
      const cells = row.querySelectorAll('td');
      cells.forEach(td => {
        td.classList.add('p-4', 'border', 'border-gray-300');
        // İçerik hizalama
        const divs = td.querySelectorAll('div');
        divs.forEach(div => div.classList.add('text-center'));
      });
    });
  }
  
  // Stillendirilmiş HTML'i geri döndürme
  return tempDiv.innerHTML;
}