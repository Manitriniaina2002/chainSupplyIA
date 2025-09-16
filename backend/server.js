const express = require('express');
const cors = require('cors');
const path = require('path');
const metricsRouter = require('./routes/metrics');
const transportRouter = require('./routes/transport');
const maintenanceRouter = require('./routes/maintenance');
const predictionRouter = require('./routes/prediction');

const app = express();

// Configuration
app.use(cors());
app.use(express.json());

// Message de bienvenue
app.get('/', (req, res) => {
    res.json({
        message: "🚀 Centre de Commande Neuronal - Backend actif !",
        status: "En ligne",
        timestamp: new Date().toISOString()
    });
});

// Routes API (on les ajoutera progressivement)
app.use('/api/dashboard', require('./routes/dashboard'));
app.use ('/api', metricsRouter);
app.use('/api', transportRouter);
app.use('/api', maintenanceRouter);
app.use('/api', predictionRouter);

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🎯 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`⚡ Status: http://localhost:${PORT}/`);
});

