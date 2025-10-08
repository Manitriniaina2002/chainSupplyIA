const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let forecastData = [];

loadSupplyChainData('backend/data/supply_chain_data.csv').then((data) => {
  console.log('Données brutes du CSV:', data[0]);
  const historicalData = data.map(row => row.debit || 0);
  console.log('Données historiques:', historicalData.slice(0, 5));
  const avgDemand = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
  console.log('Moyenne de la demande:', avgDemand);
  const forecastPeriod = 10;

  forecastData = [...data.slice(0, 100).map((row) => ({
    time: row.time,
    demand: row.debit
  })), ...Array.from({ length: forecastPeriod }, (_, i) => ({
    time: (parseInt(data[99].time) + i + 1).toString(),
    demand: avgDemand + (Math.random() - 0.5) * avgDemand * 0.1
  }))];
  console.log('Forecast data initial:', forecastData[0], forecastData[forecastData.length - 1]);
}).catch((error) => console.error('Erreur chargement CSV pour forecast:', error));

// Forcer une initialisation minimale si nécessaire
if (forecastData.length === 0) {
  forecastData = [{ time: '0', demand: 0 }];
  console.log('Initialisation par défaut de forecastData:', forecastData[0]);
}

setInterval(() => {
  const lastDemand = forecastData[forecastData.length - 1].demand;
  forecastData = forecastData.map((data, index) => ({
    ...data,
    demand: index < 100 ? data.demand : lastDemand + (Math.random() - 0.5) * lastDemand * 0.1
  }));
  console.log('Forecast data mise à jour:', forecastData[0]);
}, 2000);

router.get('/forecast', (req, res) => {
  const dataToSend = [...forecastData]; // Crée une copie pour éviter les modifications
  console.log('Données envoyées à l’API avant envoi:', dataToSend[0]);
  res.json(dataToSend);
});

module.exports = router;
