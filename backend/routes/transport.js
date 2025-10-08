const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let transportData = [];

loadSupplyChainData('data/supply_chain_data.csv').then((data) => {
  transportData = data.slice(0, 100).map(row => ({
    time: row.time,
    shippingCost: row.shippingCost,
    leadTime: row.leadTime,
    route: row.route,
    supplier: row.supplier
  }));
  console.log('Transport data initial:', transportData[0]);
}).catch((error) => console.error('Erreur chargement CSV pour transport:', error));

setInterval(() => {
  transportData = transportData.map(data => ({
    ...data,
    shippingCost: Math.max(0, data.shippingCost + (Math.random() - 0.5) * 0.5),
    leadTime: Math.max(0, data.leadTime + (Math.random() - 0.5) * 0.5)
  }));
  console.log('Transport data mise à jour:', transportData[0]);
}, 10000); // Mise à jour toutes les 10 secondes

router.get('/transport', (req, res) => {
  console.log('Données transport envoyées:', transportData[0]);
  res.json(transportData);
});

module.exports = router;
