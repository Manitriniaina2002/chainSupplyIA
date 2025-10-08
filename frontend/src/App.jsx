import React, { useState, useEffect } from 'react'; // Ajout de useEffect ici
import axios from 'axios';
import Chart from 'chart.js/auto'; // Importe Chart.js avec auto-configuration
import { Tooltip, Legend} from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

//import { CSVLink } from 'react-csv';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import { 
  Activity,
  LayoutDashboard,
  Zap,
  DollarSign,
  Truck,
  TrendingUp,
  MapPin,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Search,
  Bell,
  User,
Shirt
} from 'lucide-react';

const NeuralCommandCenter = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [realTimeMetrics, setRealTimeMetrics] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  //const [predictionData, setPredictionData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
const [transportData, setTransportData] = useState([]);
const [metrics, setMetrics] = useState({ orderFlow: 0, avgValue: 0, transportEfficiency: 0, globalPerformance: 50 });
const [optimizationData, setOptimizationData] = useState([]);



  const routeOptimizationData = [
    { name: 'Sem 1', value: 85 },
    { name: 'Sem 2', value: 88 },
    { name: 'Sem 3', value: 92 },
    { name: 'Sem 4', value: 90 }
  ];

  useEffect(() => {
    console.log('Début du useEffect - Current page:', currentPage);
    console.log('État initial - forecastData:', forecastData, 'transportData:', transportData);
    const fetchMetrics = () => axios.get('https://chainsupplyia.onrender.com/api/metrics').then(res => {
      console.log('Métriques reçues:', res.data);
      setRealTimeMetrics(res.data);
    }).catch(error => console.error('Erreur fetch metrics:', error));
    const fetchMaintenance = () => axios.get('https://chainsupplyia.onrender.com/api/maintenance').then(res => {
      console.log('Maintenance reçues:', res.data);
      setMaintenanceData(res.data);
    }).catch(error => console.error('Erreur fetch maintenance:', error));
    const fetchForecast = () => axios.get('https://chainsupplyia.onrender.com/api/forecast').then(res => {
      console.log('Réponse API forecast:', res);
      console.log('Données forecast reçues:', res.data);
      setForecastData(res.data);
    }).catch(error => console.error('Erreur fetch forecast:', error));
    const fetchTransport = () => axios.get('https://chainsupplyia.onrender.com/api/transport').then(res => {
      console.log('Réponse API transport:', res);
      console.log('Données transport reçues:', res.data);
      setTransportData(res.data);
    }).catch(error => console.error('Erreur fetch transport:', error));
 const fetchOptimization = () => axios.get('https://chainsupplyia.onrender.com/api/optimization').then(res => {
    console.log('Données optimization reçues:', res.data);
    setOptimizationData(res.data);
  }).catch(error => console.error('Erreur fetch optimization:', error));
    fetchMetrics();
    fetchMaintenance();
    fetchForecast();
    fetchTransport();
 fetchOptimization(); 
    const interval = setInterval(() => {
      console.log('Intervalle déclenché - Current page:', currentPage);
      fetchMetrics();
      fetchMaintenance();
      fetchForecast();
      fetchTransport();
fetchOptimization();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentPage]);

useEffect(() => {
  console.log('Calcul des métriques déclenché');
  console.log('realTimeMetrics:', realTimeMetrics);
  console.log('maintenanceData:', maintenanceData);
  console.log('transportData:', transportData);
  
  const calculateMetrics = () => {
    const validMaintenance = maintenanceData.filter(d => 
      d.defectRate !== undefined && 
      d.inspectionScore !== undefined
    );
    
    const validTransport = transportData.filter(d => 
      d.leadTime !== undefined && 
      d.shippingCost !== undefined
    );
    
    const validRealTime = realTimeMetrics.filter(d => 
      d.debit !== undefined
    );
    
    console.log('Valid realTime:', validRealTime);
    console.log('Valid maintenance:', validMaintenance);
    console.log('Valid transport:', validTransport);
    
    // ✅ Utiliser realTimeMetrics pour le débit et maintenanceData pour leadTime
    const orderFlow = validRealTime.length > 0 && validMaintenance.length > 0
      ? Number(validRealTime[0].debit) / (Number(validMaintenance[0].leadTime) || 1)
      : 0;
    
    const avgValue = validMaintenance.length > 0 && validTransport.length > 0 
      ? (Number(validMaintenance[0].maintenanceCost) + Number(validTransport[0]?.shippingCost || 0)) / 2
      : (validMaintenance.length > 0 ? Number(validMaintenance[0].maintenanceCost) : 0);
    
    const transportEfficiency = validTransport.length > 0 && validTransport[0]?.leadTime
      ? (1 / Number(validTransport[0].leadTime) * 100) 
      : 0;
    
    const globalPerformance = validMaintenance.length > 0 
      ? ((100 - Number(validMaintenance[0].defectRate) * 100) + Number(validMaintenance[0].inspectionScore)) / 2
      : 50;

    console.log('Métriques calculées:', { orderFlow, avgValue, transportEfficiency, globalPerformance });
    return { orderFlow, avgValue, transportEfficiency, globalPerformance };
  };
  
  const newMetrics = calculateMetrics();
  setMetrics(newMetrics);
}, [maintenanceData, transportData, realTimeMetrics]); // ✅ Ajouter realTimeMetrics dans les dépendances


  useEffect(() => {
    console.log('État mis à jour - forecastData:', forecastData, 'transportData:', transportData);
  }, [forecastData, transportData]);





  const Header = () => (
    <div className="bg-white shadow-xl border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10   rounded-lg flex items-center justify-center">
            <Shirt size={24} color="purple" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">Fashion & Beauty</h1>
            <p className="text-sm text-gray-600">IA pour l'optimisation de la chaîne d'approvisionnement</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Rechercher dans le système..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-medium">SYSTÈME ACTIF</span>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button className="p-2 text-white hover:text-gray-600 transition-colors bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="w-64 bg-white shadow-xl h-screen">
      <div className="p-6">
        
        <nav className="space-y-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Prévision" 
            active={currentPage === 'forecast'}
            onClick={() => setCurrentPage('forecast')}
          />
          <SidebarItem 
            icon={Truck} 
            label="Transport" 
            active={currentPage === 'transport'}
            onClick={() => setCurrentPage('transport')}
          />
          <SidebarItem 
            icon={Settings} 
            label="Maintenance" 
            active={currentPage === 'maintenance'}
            onClick={() => setCurrentPage('maintenance')}
          />
          <SidebarItem 
            icon={Activity} 
            label="Métriques" 
            active={currentPage === 'metrics'}
            onClick={() => setCurrentPage('metrics')}
          />
        </nav>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Système Neural</span>
          </div>
          <p className="text-xs text-gray-600">Intelligence artificielle avancée pour l'optimisation de la chaîne d'approvisionnement</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">Version 2.1.0</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
        active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {active && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
    </button>
  );

  const MetricCard = ({ icon: Icon, title, value, change, color = 'blue' }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-purple-500',
      green: 'from-green-500 to-emerald-500',
      orange: 'from-orange-500 to-red-500',
      purple: 'from-purple-500 to-pink-500',
      red: 'from-red-500 to-pink-500'
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {change && (
              <p className="text-sm text-green-500 mt-1">
                {change} vs dernier
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = ({ realTimeMetrics, orderFlow, avgValue, transportEfficiency, globalPerformance, forecastData, transportData }) => {
  console.log('Dashboard rendu - forecastData:', forecastData, 'transportData:', transportData, 'orderFlow:', orderFlow);
  if (!forecastData || !transportData || forecastData.length === 0 || transportData.length === 0) {
    console.log('Données en chargement ou invalides:', { forecastData, transportData });
    return <div className="p-8 text-center text-gray-600">Chargement des données du Dashboard...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble des performances</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard icon={Zap} title="FLUX COMMANDES" value={`${Number(orderFlow).toFixed(0)}/h`} change="+12.5%" color="purple" />
        <MetricCard icon={DollarSign} title="VALEUR MOYENNE" value={`€${(avgValue).toFixed(2)}`} change="+8.2%" color="green" />
        <MetricCard icon={Truck} title="EFFICACITÉ TRANSPORT" value={`${Number(transportEfficiency).toFixed(2)}%`} change="+5.1%" color="blue" />
        <MetricCard icon={TrendingUp} title="PERFORMANCE GLOBALE" value={`${Number(globalPerformance).toFixed(2)}%`} change="+3.7%" color="orange" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Intelligence Prédictive</h3>
              <p className="text-sm text-gray-600">Prédictions par réseau neuronal</p>
            </div>
            <div className="bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-sm text-purple-600 font-medium">IA EN DIRECT</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Line type="monotone" dataKey="demand" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Optimisation des Routes</h3>
              <p className="text-sm text-gray-600">Algorithm-Driven Logistics</p>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-sm text-green-600 font-medium">OPTIMISÉ</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={optimizationData}> {/* ✅ Utiliser optimizationData au lieu de routeOptimizationData */}
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Forecast = ({ forecastData }) => {
  console.log('Forecast data dans le composant:', forecastData);
  if (!forecastData || forecastData.length === 0) {
    console.log('Données vides ou non chargées:', forecastData);
    return <div className="p-8 text-center text-gray-600">Chargement des données de prévision...</div>;
  }

  useEffect(() => {
    let chartInstance = null;
    if (forecastData.length > 0) {
      const ctx = document.getElementById('forecastChart').getContext('2d');
      if (ctx) {
        // Détruit l'instance précédente s'elle existe
        if (chartInstance) {
          chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: forecastData.map(d => d.time),
            datasets: [{
              label: 'Prévision de Demande',
              data: forecastData.map(d => d.demand || 0),
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              fill: true,
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Demande' }
              },
              x: {
                title: { display: true, text: 'Temps' }
              }
            }
          }
        });
      } else {
        console.error('Contexte du canvas non trouvé');
      }
    }
    // Nettoyage au démontage
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [forecastData]); // Dépendance à forecastData pour re-rendre

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">Prévision</h1>
      <div className="grid grid-cols-4 gap-6 mt-8">
        <MetricCard
          icon={DollarSign}
          title="DEMANDE ACTUELLE"
          value={`${(forecastData[0]?.demand || 0).toFixed(0)} unités`}
          change="+2.0%"
          color="blue"
        />
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">Prévision de Demande</h3>
        <div className="h-96">
          <canvas id="forecastChart"></canvas>
        </div>
      </div>
    </div>
  );
};

// Nouveau composant Transport
const Transport = ({ transportData }) => {
  console.log('Transport data dans le composant:', transportData);
  if (!transportData || transportData.length === 0) {
    return <div className="p-8 text-center text-gray-600">Chargement des données de transport...</div>;
  }

  useEffect(() => {
    let chartInstance = null;
    if (transportData.length > 0) {
      const ctx = document.getElementById('transportChart').getContext('2d');
      if (ctx) {
        if (chartInstance) {
          chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
          type: 'line', // Ou 'bar' pour comparer les routes
          data: {
            labels: transportData.map(d => d.time),
            datasets: [{
              label: 'Coût d\'Expédition',
              data: transportData.map(d => d.shippingCost || 0),
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              fill: true,
              tension: 0.1
            }, {
              label: 'Délai de Livraison',
              data: transportData.map(d => d.leadTime || 0),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              fill: true,
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Valeur' }
              },
              x: {
                title: { display: true, text: 'Temps' }
              }
            }
          }
        });
      } else {
        console.error('Contexte du canvas non trouvé');
      }
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [transportData]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800">Transport</h1>
      <div className="grid grid-cols-4 gap-6 mt-8">
        <MetricCard
          icon={Truck} // Ajoute l'import si nécessaire: import { FaTruck } from 'react-icons/fa';
          title="COÛT ACTUEL"
          value={`$${transportData[0]?.shippingCost.toFixed(2) || 0}`}
          change="+1.5%"
          color="orange"
        />
        <MetricCard
          icon={Clock}
          title="DÉLAI ACTUEL"
          value={`${transportData[0]?.leadTime.toFixed(0) || 0} jours`}
          change="+0.8%"
          color="green"
        />
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">Tendances de Transport</h3>
        <div className="h-96">
          <canvas id="transportChart"></canvas>
        </div>
      </div>
    </div>
  );
};

 const Maintenance = () => {
  // Calculer les métriques agrégées depuis le tableau
  const metrics = React.useMemo(() => {
    if (!maintenanceData || maintenanceData.length === 0) {
      return {
        defectRate: 0,
        leadTime: 0,
        maintenanceCost: 0,
        inspectionScore: 0
      };
    }

    // Option 1 : MOYENNE de toutes les valeurs
    const avgDefectRate = maintenanceData.reduce((sum, item) => sum + (item.defectRate || 0), 0) / maintenanceData.length;
    const avgLeadTime = maintenanceData.reduce((sum, item) => sum + (item.leadTime || 0), 0) / maintenanceData.length;
    const totalMaintenanceCost = maintenanceData.reduce((sum, item) => sum + (item.maintenanceCost || 0), 0);
    const avgInspectionScore = maintenanceData.reduce((sum, item) => sum + (item.inspectionScore || 0), 0) / maintenanceData.length;

    return {
      defectRate: avgDefectRate,
      leadTime: avgLeadTime,
      maintenanceCost: totalMaintenanceCost, // Somme pour le coût total
      inspectionScore: avgInspectionScore
    };
  }, [maintenanceData]);

useEffect(() => {
  let chartInstance = null; // Variable pour stocker l'instance
  
  if (maintenanceData.length > 0 && currentPage === 'maintenance') {
    const ctx = document.getElementById('maintenanceChart');
    
    if (ctx) {
      const context = ctx.getContext('2d');
      
      // Détruire l'instance précédente si elle existe
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }
      
      chartInstance = new Chart(context, {
        type: 'line',
        data: {
          labels: maintenanceData.map(d => d.time),
          datasets: [
            {
              label: 'Taux de Défauts (%)',
              data: maintenanceData.map(d => (d.defectRate || 0) * 100), // Multiplier par 100 si c'est une décimale
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Délai Fabrication (jours)',
              data: maintenanceData.map(d => d.leadTime || 0),
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Coût Maintenance ($)',
              data: maintenanceData.map(d => d.maintenanceCost || 0),
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Score Inspection (%)',
              data: maintenanceData.map(d => d.inspectionScore || 0),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    }
  }
  
  // Nettoyage au démontage ou changement de page
  return () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
}, [maintenanceData, currentPage]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Maintenance Prédictive</h1>
          <p className="text-gray-600">Surveillez l'état de vos équipements en temps réel</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
          Configurer Alertes
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <MetricCard
          icon={AlertTriangle}
          title="TAUX DE DÉFAUTS"
          value={`${metrics.defectRate.toFixed(2)}%`}
          change="+0.5%"
          color="red"
        />
        <MetricCard
          icon={Clock}
          title="DÉLAI FABRICATION"
          value={`${metrics.leadTime.toFixed(0)} jours`}
          change="+0.2%"
          color="orange"
        />
        <MetricCard
          icon={DollarSign}
          title="COÛT MAINTENANCE"
          value={`$${metrics.maintenanceCost.toFixed(2)}`}
          change="+1.0%"
          color="purple"
        />
        <MetricCard
          icon={CheckCircle}
          title="SCORE INSPECTION"
          value={`${metrics.inspectionScore.toFixed(0)}%`}
          change="-0.5%"
          color="green"
        />
      </div>
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">Tendances de Maintenance</h3>
        <div className="h-96">
          {/* Graphique ici */}
          <canvas id="maintenanceChart"></canvas>
        </div>
      </div>
    </div>
  );
};

  const EquipmentCard = ({ name, status, score, vibration, pressure, nextMaintenance, statusColor }) => {
    const statusClasses = {
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    };

    const scoreClasses = {
      green: 'from-green-400 to-green-600',
      orange: 'from-orange-400 to-orange-600',
      red: 'from-red-400 to-red-600'
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="font-medium text-gray-800">{name}</h3>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[statusColor]}`}>
            {status}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Score de Santé</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${scoreClasses[statusColor]} h-2 rounded-full`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-gray-800">{score}%</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Vibration:</span>
            <span className="font-medium">{vibration} bar</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pression:</span>
            <span className="font-medium">{pressure} bar</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Prochaine maintenance:</span>
            <span className="font-medium">{nextMaintenance}</span>
          </div>
        </div>
      </div>
    );
  };

  const Metrics = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Métriques Temps Réel</h1>
          <p className="text-gray-600">Surveillance en temps réel de vos opérations</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>5s</option>
            <option>10s</option>
            <option>30s</option>
          </select>
          <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">En Direct</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-sm text-gray-600">Débit</h3>
              <p className="text-2xl font-bold text-gray-800">{(realTimeMetrics[0]?.debit || 0).toFixed(0)}</p>
              <p className="text-sm text-gray-500">unités/heure</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-sm text-gray-600">Efficacité</h3>
              <p className="text-2xl font-bold text-gray-800">{(realTimeMetrics[0]?.efficacite || 0).toFixed(2)}%</p>
              <p className="text-sm text-green-500">+2.1% aujourd'hui</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-orange-500" />
            <div>
              <h3 className="text-sm text-gray-600">Commandes Actives</h3>
              <p className="text-2xl font-bold text-gray-800">{(realTimeMetrics[0]?.commandes || 0).toFixed(0)}</p>
              <p className="text-sm text-gray-500">en cours</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="text-sm text-gray-600">Alertes</h3>
              <p className="text-2xl font-bold text-gray-800">{(realTimeMetrics[0]?.alertes || 0).toFixed(0)}</p>
              <p className="text-sm text-red-500">nécessitent attention</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Métriques en Temps Réel</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Débit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Efficacité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Commandes</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={realTimeMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis yAxisId="left" stroke="#666" />
            <YAxis yAxisId="right" orientation="right" stroke="#666" />
            <Bar yAxisId="left" dataKey="debit" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="efficacite" stroke="#10b981" strokeWidth={3} />
            <Line yAxisId="right" type="monotone" dataKey="commandes" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'metrics': return <Metrics realTimeMetrics={realTimeMetrics} />;
      case 'maintenance': return <Maintenance maintenanceData={maintenanceData} />;
      case 'forecast': return <Forecast forecastData={forecastData} />;
      case 'transport': return <Transport transportData={transportData} />;
      default: return <Dashboard realTimeMetrics={realTimeMetrics} orderFlow={metrics.orderFlow} avgValue={metrics.avgValue} transportEfficiency={metrics.transportEfficiency} globalPerformance={metrics.globalPerformance} forecastData={forecastData} transportData={transportData} optimizationData={optimizationData} />;
    }
  };

  return (
  <div className="flex h-screen bg-gray-100 flex-col">
    <Header />
    <div className="flex flex-1">
      <Sidebar setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  </div>
);
};

export default NeuralCommandCenter;
