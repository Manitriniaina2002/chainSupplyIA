const express = require('express');
const router = express.Router();

let equipmentData = [
  { name: 'Convoyeur Principal', score: 85, status: 'Bon', statusColor: 'green', vibration : 120, pressure : 90 , nextMaintenance : '10/03/2024'},
  { name: 'Robot de Tri A', score: 68, status: 'Attention', statusColor: 'orange',vibration : 95, pressure : 75 , nextMaintenance :'10/03/2024'},
  { name: 'Système de Refroidissement', score: 45, status: 'Critique', statusColor: 'red',vibration : 85, pressure : 65, nextMaintenance : '10/03/2024'},
  { name: 'Chariot Élévateur 1', score: 91, status: 'Bon', statusColor: 'green' ,vibration : 140, pressure : 110, nextMaintenance :'10/03/2024'},
  { name: 'Convoyeur Principal', score: 85, status: 'Bon', statusColor: 'green', vibration : 120, pressure : 90 , nextMaintenance : '10/03/2024'},
  { name: 'Robot de Tri A', score: 68, status: 'Attention', statusColor: 'orange',vibration : 95, pressure : 75 , nextMaintenance :'10/03/2024'},
  { name: 'Système de Refroidissement', score: 45, status: 'Critique', statusColor: 'red',vibration : 85, pressure : 65, nextMaintenance : '10/03/2024'},
  { name: 'Chariot Élévateur 1', score: 91, status: 'Bon', statusColor: 'green' ,vibration : 140, pressure : 110, nextMaintenance :'10/03/2024'}
];

setInterval(() => {
  equipmentData = equipmentData.map(eq => ({
    ...eq,
    score: Math.round(Math.max(0, Math.min(100, eq.score + (Math.random() - 0.5) * 5))) // Arrondi à l'entier le plus proche
  }));
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/maintenance', (req, res) => {
  res.json(equipmentData);
});

module.exports = router;
