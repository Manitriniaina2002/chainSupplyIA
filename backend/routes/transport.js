const express = require('express');
const router = express.Router();

let transportData = Array(100).fill().map((_, index) => ({
  id: index + 1,
  route: `Route ${index + 1}`,
  ponctualite: Math.floor(Math.random() * 101),
  distance: Math.floor(Math.random() * 1000)
}));

setInterval(() => {
  transportData = transportData.map(data => ({
    ...data,
    ponctualite: Math.max(0, Math.min(100, data.ponctualite + (Math.random() - 0.5) * 5))
  }));
}, 2000);

router.get('/transport', (req, res) => {
  res.json(transportData);
});
module.exports = router;
