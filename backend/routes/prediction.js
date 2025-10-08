const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let forecastData = [];

loadSupplyChainData('../data/supply_chain_data.csv').then((data) => {
  const historicalData = data.map(row => parseFloat(row['Number of products sold']) || 0);
  const avgDemand = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
  const forecastPeriod = 10; // Prévoyez pour les 10 prochaines unités de temps

  forecastData = data.slice(0, 100).map((row, index) => ({
    time: row.time,
    demand: historicalData[index] || 0
  })).concat(
    Array.from({ length: forecastPeriod }, (_, i) => ({
      time: (parseInt(data[99].time) + i + 1).toString(), // Continue après le dernier time
      demand: avgDemand + (Math.random() - 0.5) * avgDemand * 0.1 // Variation aléatoire
    }))
  );
  console.log('Forecast data sample:', forecastData[0], forecastData[forecastData.length - 1]);
}).catch((error) => console.error('Erreur chargement CSV pour forecast:', error));

setInterval(() => {
  const lastDemand = forecastData[forecastData.length - 1].demand;
  forecastData = forecastData.map((data, i) => ({
    ...data,
    demand: i < 100 ? data.demand : lastDemand + (Math.random() - 0.5) * lastDemand * 0.1
  }));
}, 2000);

router.get('/forecast', (req, res) => {
  console.log('Données forecast envoyées:', forecastData[0]);
  res.json(forecastData);
});

module.exports = router;
