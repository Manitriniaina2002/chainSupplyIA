const express = require('express');
const router = express.Router();

let predictionData = [
  { name: 'Août', value: 1400 }, // Historique
  { name: 'Sep', value: 1480 },  // Historique (actuel)
  { name: 'Oct', value: 1550 },  // Prédiction
  { name: 'Nov', value: 1600 },  // Prédiction
  { name: 'Déc', value: 1650 }   // Prédiction
];

let baseValue = 1480; // Aligné sur les données actuelles

setInterval(() => {
  baseValue = Math.max(1400, baseValue + Math.floor(Math.random() * 20) - 10); // Croissance légère avec variation
  predictionData = predictionData.map((item, index) => {
    if (index >= 2) { // Seulement les prédictions changent
      return { ...item, value: baseValue + (index - 1) * 50 + Math.floor(Math.random() * 30) - 15 };
    }
    return item;
  });
}, 2000);

router.get('/prediction', (req, res) => {
  res.json(predictionData);
});

module.exports = router;
