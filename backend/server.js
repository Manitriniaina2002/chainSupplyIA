const express = require('express');
const cors = require('cors');
const path = require('path');
const metricsRouter = require('./routes/metrics');
const transportRouter = require('./routes/transport');
const maintenanceRouter = require('./routes/maintenance');
//const predictionRouter = require('./routes/prediction');
const optimazationRouter = require('./routes/routeOptimization');
const forecastRouter = require('./routes/forecast');
const optimizationRoutes = require('./routes/optimization');


const app = express();

// Configuration CORS
app.use(cors({
  origin: [
    'https://chain-supply-o2rmtteei-stellams-projects.vercel.app',
    'http://localhost:5173' // Pour tests locaux avec Vite
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Inclure OPTIONS pour preflight
  credentials: true, // Si vous utilisez des cookies/auth
  allowedHeaders: ['Content-Type', 'Authorization'] // En-têtes autorisés
}));
app.use(express.json());

// Message de bienvenue
app.get('/', (req, res) => {
    res.json({
        message: "Fashion & Beauty - Backend actif !",
        status: "En ligne",
        timestamp: new Date().toISOString()
    });
});

// Routes API (on les ajoutera progressivement)
app.use('/api/dashboard', require('./routes/dashboard'));
app.use ('/api', metricsRouter);
app.use('/api', transportRouter);
app.use('/api', maintenanceRouter);
//app.use('/api', predictionRouter);
app.use('/api', optimazationRouter);
app.use('/api', forecastRouter);
app.use('/api', optimizationRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🎯 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`⚡ Status: http://localhost:${PORT}/`);
});

