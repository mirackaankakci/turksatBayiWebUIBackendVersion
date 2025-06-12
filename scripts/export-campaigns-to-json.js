import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CampaignData } from '../src/helpers/CampaingData.jsx';

// __dirname ve __filename ES module'lerde mevcut olmadığı için oluşturuyoruz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kampanya verilerini sadeleştir
const campaignDataSimplified = CampaignData.map(campaign => ({
  id: campaign.id,
  slug: campaign.slug || campaign.id,
  category: campaign.category,
  kampanyaAdi: campaign.kampanyaAdi
}));

// JSON dosyasına yaz
const targetDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(
  path.join(targetDir, 'campaigns.json'),
  JSON.stringify(campaignDataSimplified, null, 2)
);

console.log(`✅ ${campaignDataSimplified.length} kampanya JSON dosyasına aktarıldı.`);