const express = require('express');
const router = express.Router();

// Générer des métriques initiales avec une variation par index
const generateMetrics = (index) => {
  const baseDebit = 300 + (index % 50) * 5; // Variation de base selon l'index
  const baseEfficacite = 85 + (index % 20); // Variation selon l'index
  const baseCommandes = 100 + (index % 30) * 2;

  return {
    time: new Date().toLocaleTimeString(),
    debit: baseDebit,
    efficacite: Math.min(100, baseEfficacite), // Limite à 100
    commandes: baseCommandes
  };
};

// Initialisation avec 200 éléments uniques
let realTimeMetrics = Array(200).fill().map((_, index) => generateMetrics(index));

// Mise à jour avec logique réaliste et différenciée
setInterval(() => {
  const currentHour = new Date().getHours();
  const isPeakHour = currentHour >= 8 && currentHour < 18; // Heures de pointe
  const globalDebitIncrease = isPeakHour ? 10 : -5; // Ajustement global

  realTimeMetrics = realTimeMetrics.map((metric, index) => {
    // Variation individuelle basée sur l'index
    const indexFactor = (index % 10) / 10; // Facteur entre 0 et 1
    const debitChange = globalDebitIncrease + (Math.random() - 0.5 + indexFactor) * 20;
    const newDebit = Math.max(0, metric.debit + debitChange);

    // Efficacité liée au débit (baisse si surcharge)
    const efficaciteChange = newDebit > 600 ? -1 : (Math.random() - 0.5) * 1;
    const newEfficacite = Math.max(0, Math.min(100, metric.efficacite + efficaciteChange));

    // Commandes proportionnelles au débit et à l'efficacité
    const commandesChange = (newDebit / 10) * (newEfficacite / 100) + (Math.random() - 0.5) * 5;
    const newCommandes = Math.max(0, Math.floor(metric.commandes + commandesChange));

    // Alertes basées sur efficacité et débit
    const newAlertes = (newEfficacite < 90 || newDebit > 600) ? metric.alertes + 1 : Math.max(0, metric.alertes - 1);

    return {
      time: new Date().toLocaleTimeString(),
      debit: parseFloat(newDebit.toFixed(2)),
      efficacite: parseFloat(newEfficacite.toFixed(2)),
      commandes: newCommandes,
      alertes: newAlertes
    };
  });
}, 2000); // Mise à jour toutes les 2 secondes

router.get('/metrics', (req, res) => {
  res.json(realTimeMetrics);
});

module.exports = router;
