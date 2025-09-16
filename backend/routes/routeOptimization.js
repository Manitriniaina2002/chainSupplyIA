const express = require('express');
const router = express.Router();

let routeOptimizationData = [
  { name: 'Route 1', value: 95 },
  { name: 'Route 2', value: 92 },
  { name: 'Route 3', value: 78 },
  { name: 'Route 4', value: 95 }
];

let baseEfficiency = 90; // Aligné sur transportData.ponctualite

setInterval(() => {
  baseEfficiency = Math.max(70, Math.min(100, baseEfficiency + (Math.random() - 0.5) * 3)); // Variation réaliste
  routeOptimizationData = routeOptimizationData.map(item => ({
    ...item,
    value: baseEfficiency + (Math.random() - 0.5) * 10 // Légère variation par route
  }));
}, 2000);

router.get('/route-optimization', (req, res) => {
  res.json(routeOptimizationData);
});

module.exports = router;
