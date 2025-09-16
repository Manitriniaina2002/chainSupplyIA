const express = require('express');
const router = express.Router();

let transportData = {
  economies: 4700,
  ponctualite: 92.8,
  livraisons: 307,
  routesOptimisees: 156
};

setInterval(() => {
  transportData = {
    ...transportData,
    economies: transportData.economies + Math.floor(Math.random() * 100) - 50,
    ponctualite: Math.min(100, transportData.ponctualite + (Math.random() - 0.5)),
    livraisons: transportData.livraisons + Math.floor(Math.random() * 5) - 2,
    routesOptimisees: transportData.routesOptimisees + Math.floor(Math.random() * 3) - 1
  };
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/transport', (req, res) => {
  res.json(transportData);
});

module.exports = router;
