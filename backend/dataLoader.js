const fs = require('fs');
const csv = require('csv-parser');

const loadSupplyChainData = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim() // Nettoie les headers
      }))
      .on('data', (row) => {
        // DEBUG : Afficher les colonnes du CSV (à retirer après)
        if (results.length === 0) {
          console.log('Colonnes disponibles:', Object.keys(row));
        }
        
        // Fonction helper pour parser en toute sécurité
        const parseNum = (value) => {
          if (!value) return 0;
          const cleaned = String(value).trim().replace(/,/g, '');
          const num = parseFloat(cleaned);
          return isNaN(num) ? 0 : num;
        };
        
        const parseInspection = (value) => {
          if (!value) return 50;
          const cleaned = String(value).toLowerCase().trim();
          if (cleaned === 'pass' || cleaned === 'pending') return 100;
          if (cleaned === 'fail') return 0;
          return 50;
        };
        
        results.push({
          time: row['Lead time'] || row['Lead times'] || new Date().toISOString(),
          debit: parseNum(row['Number of products sold']),
          efficacite: parseNum(row['Availability']) || parseNum(row['Inspection results']),
          commandes: parseNum(row['Order quantities']),
          alertes: parseNum(row['Defect rates']),
          stock: parseNum(row['Stock levels']),
          leadTime: parseNum(row['Lead times']),
          shippingCost: parseNum(row['Shipping costs']),
          route: row['Routes'] || row['Route'] || 'Route par défaut',
          supplier: row['Supplier name'] || 'Fournisseur inconnu',
          
          // Maintenance
          defectRate: parseNum(row['Defect rates']),
          manufacturingLeadTime: parseNum(row['Manufacturing lead time']),
          maintenanceCost: parseNum(row['Manufacturing costs']),
          inspectionScore: parseInspection(row['Inspection results'])
        });
      })
      .on('end', () => {
        console.log(`✅ Chargé ${results.length} enregistrements depuis ${filePath}`);
        
        // DEBUG : Afficher les premières valeurs
        if (results.length > 0) {
          console.log('Premier enregistrement:', results[0]);
          console.log('Somme test debit:', results.reduce((sum, r) => sum + r.debit, 0));
        }
        
        resolve(results);
      })
      .on('error', reject);
  });
};

module.exports = loadSupplyChainData;
