// URL kategori adları ile uygulama içi kategori adları arasında dönüşüm yapar
export const CATEGORY_MAP = {
  kablonet: 'internet',
  kablotv: 'tv',
  kabloses: 'phone',
  mevcutmusteri: 'mevcutmusteri',
  kombo: 'combo'
};

export const REVERSE_CATEGORY_MAP = {
  internet: 'kablonet',
  tv: 'kablotv',
  phone: 'kabloses',
  mevcutmusteri: 'mevcutmusteri',
  combo: 'kombo',
  all: 'kampanyalar'
};

// URL'deki kategori adını uygulama içi kategori adına dönüştürür
export const urlToCategory = (urlCategory) => {
  return CATEGORY_MAP[urlCategory] || 'all';
};

// Uygulama içi kategori adını URL kategori adına dönüştürür
export const categoryToUrl = (category) => {
  return REVERSE_CATEGORY_MAP[category] || 'kampanyalar';
};