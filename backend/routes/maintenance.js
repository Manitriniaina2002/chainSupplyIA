const express = require('express');
const router = express.Router();

let equipmentData = Array(100).fill().map((_, index) => ({
  id: index + 1,
  name: `Équipement ${String.fromCharCode(65 + (index % 26))}${Math.floor(index / 26) + 1}`,
  status: Math.random() > 0.3 ? "OK" : "KO",
  score: Math.floor(Math.random() * 101),
  lastMaintenance: `2025-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`
}));

setInterval(() => {
  equipmentData = equipmentData.map(eq => ({
    ...eq,
    score: Math.round(Math.max(0, Math.min(100, eq.score + (Math.random() - 0.5) * 5)))
  }));
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/maintenance', (req, res) => {
  res.json(equipmentData);
});

module.exports = router;
