const express = require('express');
const router = express.Router();

let equipmentData = [
  { name: 'Convoyeur Principal', score: 85, status: 'Bon', statusColor: 'green' },
  { name: 'Robot de Tri A', score: 68, status: 'Attention', statusColor: 'orange' },
  { name: 'Système de Refroidissement', score: 45, status: 'Critique', statusColor: 'red' },
  { name: 'Chariot Élévateur 1', score: 91, status: 'Bon', statusColor: 'green' }
];

setInterval(() => {
  equipmentData = equipmentData.map(eq => ({
    ...eq,
    score: Math.max(0, Math.min(100, eq.score + (Math.random() - 0.5) * 5))
  }));
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/maintenance', (req, res) => {
  res.json(equipmentData);
});

module.exports = router;
