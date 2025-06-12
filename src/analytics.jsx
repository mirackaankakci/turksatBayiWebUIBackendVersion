// src/analytics.js
export const sendToAnalytics = ({ name, delta, id }) => {
  // Google Analytics, Mixpanel veya kendi backend'inize gönderebilirsiniz
  console.log(`Metric: ${name} \nValue: ${delta} \nID: ${id}`);
  
  // Örnek Google Analytics gönderimi
  if (window.gtag) {
    window.gtag('event', name, {
      value: Math.round(delta),
      metric_id: id,
      metric_name: name
    });
  }
};