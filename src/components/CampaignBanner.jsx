// src/components/CampaignBanner.jsx
import React from 'react';
import './CampaignBanner.css';
import kabloTvImg from '/assets/kablonet.png';



export default function CampaignBanner() {
  return (
    <div className="campaign-banner">
      <div className="campaign-content">
        <h2 className="title">Muhteşem İkili Kampanyası</h2>
        <ul className="features">
          <li>➤ Kolay Başvuru</li>
          <li>➤ Hızlı Kurulum</li>
          <li>➤ Fırsatı Yakala</li>
        </ul>
        <div className="buttons">
          <button className="btn primary">Başvur!</button>
          <button className="btn secondary">Kampanyayı Gör</button>
        </div>
      </div>

      <div className="coffee-images">
        <img src={kabloTvImg} alt="KabloTV" className="coffee coffee-1" />
      </div>

      <div className="quick-form">
        <div className="tab">Hızlı Başvuru Formu</div>
        <input type="text" placeholder="Adınız Soyadınız" className="input name" />
        <input type="tel" placeholder="Telefon Numaranız" className="input phone" />
        <button className="submit-btn">
          
        </button>
      </div>
    </div>
  );
}
