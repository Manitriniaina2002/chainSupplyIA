const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let realTimeMetrics = [];

// Charger les données réelles au démarrage
loadSupplyChainData('backend/data/supply_chain_data.csv').then((data) => {
  realTimeMetrics = data.slice(0, 200); // Prend les 200 premières lignes
  console.log(`Chargé ${realTimeMetrics.length} enregistrements pour metrics.`);
}).catch((error) => {
  console.error('Erreur chargement CSV pour metrics:', error);
  realTimeMetrics = Array(200).fill().map(() => ({
    time: new Date().toLocaleTimeString(),
    debit: Math.floor(Math.random() * 1000),
    efficacite: Math.floor(Math.random() * 100),
    commandes: Math.floor(Math.random() * 500),
    alertes: Math.floor(Math.random() * 10)
  }));
});

// Mise à jour simulée pour dynamisme
setInterval(() => {
  if (realTimeMetrics.length > 0) {
    realTimeMetrics = realTimeMetrics.map((metric) => ({
      ...metric,
      debit: Math.max(0, metric.debit + (Math.random() - 0.5) * 10),
      efficacite: Math.max(0, Math.min(100, metric.efficacite + (Math.random() - 0.5) * 2)),
      commandes: Math.max(0, metric.commandes + (Math.random() - 0.5) * 5),
      alertes: Math.max(0, metric.alertes + (Math.random() - 0.5) * 1)
    }));
  }
}, 2000);

router.get('/metrics', (req, res) => {
  res.json(realTimeMetrics);
});

module.exports = router;
