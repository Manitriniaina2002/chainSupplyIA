const express = require('express');
const router = express.Router();

// Données simulées (remplace par une base si tu veux plus tard)
const metrics = [
  { time: '09:00', debit: 520, efficacite: 89, commandes: 145 },
  { time: '09:30', debit: 480, efficacite: 92, commandes: 138 },
  { time: '10:00', debit: 510, efficacite: 88, commandes: 152 },
  { time: '10:30', debit: 495, efficacite: 91, commandes: 140 },
  { time: '11:00', debit: 530, efficacite: 93, commandes: 148 },
  { time: '11:30', debit: 487, efficacite: 92.3, commandes: 143 }
  // ... autres données
];

router.get('/metrics', (req, res) => {
  res.json(metrics);
});

module.exports = router;
