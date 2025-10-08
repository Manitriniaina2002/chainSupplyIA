const express = require('express');
const router = express.Router();
const loadSupplyChainData = require('../dataLoader');

let maintenanceData = [];

// Chargement initial
loadSupplyChainData('data/supply_chain_data.csv')
  .then((data) => {
    maintenanceData = data.map(row => ({
      time: row.time,
      defectRate: row.defectRate,
      leadTime: row.manufacturingLeadTime,
      maintenanceCost: row.maintenanceCost,
      inspectionScore: row.inspectionScore
    }));
    
    console.log('✅ Maintenance data chargée');
    console.log('📊 Nombre d\'enregistrements:', maintenanceData.length);
    console.log('📋 Premier enregistrement:', maintenanceData[0]);
    
    // Vérification des valeurs non-nulles
    const stats = {
      defectRateNonZero: maintenanceData.filter(d => d.defectRate > 0).length,
      leadTimeNonZero: maintenanceData.filter(d => d.leadTime > 0).length,
      maintenanceCostNonZero: maintenanceData.filter(d => d.maintenanceCost > 0).length
    };
    console.log('📈 Statistiques valeurs non-nulles:', stats);
  })
  .catch((error) => console.error('❌ Erreur chargement CSV pour maintenance:', error));

// Mise à jour périodique (simulation temps réel)
setInterval(() => {
  if (maintenanceData.length === 0) {
    console.log('⚠️ maintenanceData vide, attente du chargement...');
    return;
  }
  
  maintenanceData = maintenanceData.map(item => ({  // ✅ Renommé 'data' en 'item'
    ...item,
    defectRate: Math.max(0, Math.min(100, item.defectRate + (Math.random() - 0.5) * 2)), // Limité 0-100
    leadTime: Math.max(0, item.leadTime + (Math.random() - 0.5) * 1), // Variation plus petite
    maintenanceCost: Math.max(0, item.maintenanceCost + (Math.random() - 0.5) * 50) // Variation proportionnelle
  }));
  
  // Log moins fréquent (tous les 10 updates)
  if (Math.random() < 0.1) {
    console.log('🔄 Maintenance data mise à jour:', {
      exemple: maintenanceData[0],
      timestamp: new Date().toISOString()
    });
  }
}, 2000);

// Route API
router.get('/maintenance', (req, res) => {
  if (maintenanceData.length === 0) {
    return res.status(503).json({ 
      error: 'Données en cours de chargement',
      message: 'Veuillez réessayer dans quelques secondes'
    });
  }
  
  console.log(`📤 API /maintenance appelée - Envoi de ${maintenanceData.length} enregistrements`);
  console.log('📋 Exemple de donnée:', maintenanceData[0]);
  
  res.json(maintenanceData);
});

module.exports = router;
