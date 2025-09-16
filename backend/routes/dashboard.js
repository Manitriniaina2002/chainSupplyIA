const express = require('express');
const router = express.Router();

// 📊 KPI principaux pour votre dashboard
router.get('/kpis', (req, res) => {
    console.log('📞 Demande des KPIs reçue');
    
    // Simulation de données réalistes avec petites variations
    const kpis = {
        flux_commandes: {
            value: 65.4 + (Math.random() - 0.5) * 5,
            unit: "/h",
            change: "+12.5%",
            trend: "up"
        },
        valeur_moyenne: {
            value: 1250 + Math.floor(Math.random() * 200),
            unit: "€",
            change: "+8.2%",
            trend: "up"
        },
        efficacite_transport: {
            value: 92.3 + (Math.random() - 0.5) * 3,
            unit: "%",
            change: "+5.1%",
            trend: "up"
        },
        performance_globale: {
            value: 94 + (Math.random() - 0.5) * 2,
            unit: "%",
            change: "+3.7%",
            trend: "up"
        }
    };

    res.json({
        success: true,
        data: kpis,
        timestamp: new Date().toISOString(),
        message: "KPIs générés avec succès"
    });
});

// 📈 Données pour le graphique Intelligence Prédictive
router.get('/prediction-data', (req, res) => {
    console.log('📈 Demande des données prédictives reçue');
    
    const predictionData = [];
    const baseValue = 1300;
    
    // Génère 10 points de données avec variations réalistes
    for (let i = 0; i < 10; i++) {
        const variation = Math.sin(i * 0.5) * 100 + (Math.random() - 0.5) * 50;
        predictionData.push({
            x: i,
            y: baseValue + variation,
            label: `Point ${i + 1}`
        });
    }

    res.json({
        success: true,
        data: predictionData,
        analysis: {
            trend: "Croissance modérée",
            confidence: "87%",
            next_peak: "Dans 3 jours"
        }
    });
});

// 🚚 Données pour l'optimisation des routes
router.get('/route-optimization', (req, res) => {
    console.log('🚚 Demande d\'optimisation des routes reçue');
    
    const routeData = [];
    const months = ['Jan', 'Fév', 'Mar', 'Avr'];
    
    months.forEach(month => {
        routeData.push({
            month: month,
            optimized: 75 + Math.random() * 25,
            standard: 60 + Math.random() * 15
        });
    });

    res.json({
        success: true,
        data: routeData,
        stats: {
            total_routes: 156,
            optimized_today: 12,
            efficiency_gain: "23%"
        }
    });
});

// 🔄 Métriques temps réel (simulées)
router.get('/realtime-metrics', (req, res) => {
    console.log('⏰ Demande de métriques temps réel reçue');
    
    const currentTime = new Date();
    const metrics = {
        throughput: {
            current: 487,
            unit: "unités/heure",
            status: "normal",
            history: generateHourlyData(24)
        },
        efficiency: {
            current: 92.3,
            unit: "%",
            status: "excellent",
            change: "+2.1%"
        },
        active_commands: {
            current: 143,
            unit: "commandes",
            status: "en cours",
            pending: 27
        },
        alerts: {
            current: 2,
            critical: 0,
            warning: 2,
            info: 5
        }
    };

    res.json({
        success: true,
        data: metrics,
        timestamp: currentTime.toISOString(),
        refresh_rate: "5s"
    });
});

// 🎯 Fonction helper pour générer des données historiques
function generateHourlyData(hours) {
    const data = [];
    const now = new Date();
    
    for (let i = hours - 1; i >= 0; i--) {
        const time = new Date(now - i * 60 * 60 * 1000);
        data.push({
            time: time.toISOString(),
            value: 400 + Math.random() * 200,
            efficiency: 80 + Math.random() * 20
        });
    }
    
    return data;
}

// Export du router
module.exports = router;
