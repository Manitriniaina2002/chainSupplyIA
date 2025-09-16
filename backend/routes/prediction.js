const express = require('express');
const router = express.Router();

let predictionData = [
  { name: 'Août', value: 1500 }, // Historique
  { name: 'Sep', value: 1480 },  // Historique (actuel)
  { name: 'Oct', value: 1550 },  // Prédiction
  { name: 'Nov', value: 1600 },  // Prédiction
  { name: 'Déc', value: 1650 }   // Prédiction
];

setInterval(() => {
  predictionData = predictionData.map((item, index) => {
    if (index >= 2) { // Seulements les prédictions changent
      return { ...item, value: item.value + Math.floor(Math.random() * 50) - 25 };
    }
    return item;
  });
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/prediction', (req, res) => {
  res.json(predictionData);
});

module.exports = router;
