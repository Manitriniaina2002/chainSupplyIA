const express = require('express');
const router = express.Router();

let lastTime = '09:00';
let baseDebit = 500;
let baseEfficacite = 90;
let baseCommandes = 140;

function generateMetrics() {
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  const index = times.indexOf(lastTime);
  if (index < times.length - 1) lastTime = times[index + 1];
  else lastTime = times[0];

  baseDebit += Math.floor(Math.random() * 20) - 10; // Variation réaliste
  baseEfficacite = Math.min(95, Math.max(85, baseEfficacite + (Math.random() - 0.5))); // Stabilité entre 85-95%
  baseCommandes += Math.floor(Math.random() * 5) - 2; // Légère variation

  return {
    time: lastTime,
    debit: baseDebit,
    efficacite: baseEfficacite,
    commandes: baseCommandes
  };
}

let realTimeMetrics = Array(6).fill().map(generateMetrics);

setInterval(() => {
  realTimeMetrics.shift(); // Supprime le plus ancien
  realTimeMetrics.push(generateMetrics()); // Ajoute un nouveau
}, 2000);

router.get('/metrics', (req, res) => {
  res.json(realTimeMetrics);
});

module.exports = router;
