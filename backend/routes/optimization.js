const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let optimizationData = [];

// Chargement initial
loadSupplyChainData('backend/data/supply_chain_data.csv')
  .then((data) => {
    // Grouper les données par semaine et calculer l'efficacité moyenne
    const weeklyData = {};
    
    data.forEach(row => {
      // Extraire la semaine depuis la date (format: YYYY-MM-DD)
      const date = new Date(row.time);
      const weekNumber = getWeekNumber(date);
      const weekKey = `Sem ${weekNumber}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          name: weekKey,
          totalEfficiency: 0,
          count: 0
        };
      }
      
      // Calculer l'efficacité basée sur plusieurs facteurs
      const efficiency = calculateRouteEfficiency(row);
      weeklyData[weekKey].totalEfficiency += efficiency;
      weeklyData[weekKey].count += 1;
    });
    
    // Calculer les moyennes et formater les données
    optimizationData = Object.values(weeklyData).map(week => ({
      name: week.name,
      value: Math.round(week.totalEfficiency / week.count)
    }));
    
    console.log('✅ Optimization data chargée');
    console.log('📊 Nombre de semaines:', optimizationData.length);
    console.log('📋 Données:', optimizationData);
  })
  .catch((error) => console.error('❌ Erreur chargement CSV pour optimization:', error));

// Fonction pour calculer le numéro de semaine
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Fonction pour calculer l'efficacité des routes
function calculateRouteEfficiency(row) {
  // Formule d'efficacité basée sur plusieurs facteurs
  const timeEfficiency = row.shippingTime ? Math.max(0, 100 - row.shippingTime * 2) : 80;
  const costEfficiency = row.shippingCost ? Math.max(0, 100 - row.shippingCost / 10) : 80;
  const defectPenalty = row.defectRate ? row.defectRate * 100 : 0;
  
  return Math.max(0, Math.min(100, (timeEfficiency + costEfficiency) / 2 - defectPenalty));
}

// Mise à jour périodique (simulation d'optimisation en temps réel)
setInterval(() => {
  if (optimizationData.length === 0) {
    console.log('⚠️ optimizationData vide, attente du chargement...');
    return;
  }
  
  optimizationData = optimizationData.map(item => ({
    ...item,
    value: Math.max(75, Math.min(100, item.value + (Math.random() - 0.5) * 3)) // Variation entre 75-100
  }));
  
  if (Math.random() < 0.1) {
    console.log('🔄 Optimization data mise à jour:', {
      exemple: optimizationData[0],
      timestamp: new Date().toISOString()
    });
  }
}, 3000);

// Route API
router.get('/optimization', (req, res) => {
  if (optimizationData.length === 0) {
    return res.status(503).json({ 
      error: 'Données en cours de chargement',
      message: 'Veuillez réessayer dans quelques secondes'
    });
  }
  
  console.log(`📤 API /optimization appelée - Envoi de ${optimizationData.length} semaines`);
  res.json(optimizationData);
});

module.exports = router;
