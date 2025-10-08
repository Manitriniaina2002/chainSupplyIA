import React, { useState, useEffect } from 'react'; // Ajout de useEffect ici
import axios from 'axios';
import Chart from 'chart.js/auto'; // Importe Chart.js avec auto-configuration
import { Tooltip, Legend} from 'recharts';

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
  User
} from 'lucide-react';

const NeuralCommandCenter = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [realTimeMetrics, setRealTimeMetrics] = useState([]);
  const [transportData, setTransportData] = useState({});
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  //const [predictionData, setPredictionData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  // Données pour les graphiques
  const predictiveData = [
    { name: 'Jan', value: 1200 },
    { name: 'Fév', value: 1380 },
    { name: 'Mar', value: 1320 },
    { name: 'Avr', value: 1400 },
    { name: 'Mai', value: 1350 },
    { name: 'Jun', value: 1420 },
    { name: 'Jul', value: 1480 }
  ];

  const routeOptimizationData = [
    { name: 'Sem 1', value: 85 },
    { name: 'Sem 2', value: 88 },
    { name: 'Sem 3', value: 92 },
    { name: 'Sem 4', value: 90 }
  ];

  useEffect(() => {
    console.log('Début du useEffect pour les fetches');
    const fetchMetrics = () => axios.get('http://localhost:3001/api/metrics').then(res => {
      console.log('Métriques reçues:', res.data);
      setRealTimeMetrics(res.data);
    });
    const fetchMaintenance = () => axios.get('http://localhost:3001/api/maintenance').then(res => {
      console.log('Maintenance reçues:', res.data);
      setMaintenanceData(res.data);
    });
    const fetchForecast = () => axios.get('http://localhost:3001/api/forecast').then(res => {
      console.log('Réponse API forecast:', res);
      console.log('Données forecast reçues:', res.data);
      setForecastData(res.data);
    }).catch(error => console.error('Erreur fetch forecast:', error));
    fetchMetrics();
    fetchMaintenance();
    fetchForecast();
    const interval = setInterval(() => { fetchMetrics(); fetchMaintenance(); fetchForecast(); },10000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
    if (maintenanceData.length > 0 && currentPage === 'maintenance') {
      const ctx = document.getElementById('maintenanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: maintenanceData.map(d => d.time),
          datasets: [
            {
              label: 'Taux de Défauts (%)',
              data: maintenanceData.map(d => d.defectRate || 0),
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              fill: true,
              tension: 0.1
            },
            {
              label: 'Délai Fabrication (jours)',
              data: maintenanceData.map(d => d.leadTime || 0),
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              fill: true,
              tension: 0.1
            },
            {
              label: 'Coût Maintenance ($)',
              data: maintenanceData.map(d => d.maintenanceCost || 0),
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              fill: true,
              tension: 0.1
            },
            {
              label: 'Score Inspection (%)',
              data: maintenanceData.map(d => d.inspectionScore || 0),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              fill: true,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [maintenanceData, currentPage]);



  const Header = () => (
    <div className="bg-white shadow-xl border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
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
            <Activity className="w-4 h-4 text-purple-500" />
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
      purple: 'from-purple-500 to-pink-500'
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

  const Dashboard = () => (

    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble des performances</p>
        </div>
        
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={Zap} 
          title="FLUX COMMANDES" 
          value="65.4/h" 
          change="+12.5%" 
          color="purple" 
        />
        <MetricCard 
          icon={DollarSign} 
          title="VALEUR MOYENNE" 
          value="€1250" 
          change="+8.2%" 
          color="green" 
        />
        <MetricCard 
          icon={Truck} 
          title="EFFICACITÉ TRANSPORT" 
          value="92.3%" 
          change="+5.1%" 
          color="blue" 
        />
        <MetricCard 
          icon={TrendingUp} 
          title="PERFORMANCE GLOBALE" 
          value="94%" 
          change="+3.7%" 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-2 shadow-xl rounded-lg gap-6">
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
            <LineChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Optimisation Routes</h3>
              <p className="text-sm text-gray-600">Algorithm-Driven Logistics</p>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-sm text-green-600 font-medium">OPTIMISÉ</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={routeOptimizationData}>
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
          value={`${(forecastData[0]?.demand || 0).toFixed(2)} unités`}
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

  const Transport = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Optimisation du Transport</h1>
          <p className="text-gray-600">Optimisez vos routes et réduisez vos coûts de transport</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
          Optimiser les Routes
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-sm text-gray-600">Économies Réalisées</h3>
              <p className="text-2xl font-bold text-gray-800">4700€</p>
              <p className="text-sm text-green-500">+25% ce mois</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-sm text-gray-600">Taux de Ponctualité</h3>
              <p className="text-2xl font-bold text-gray-800">{(transportData.ponctualite || 0).toFixed(3)}%</p>
              <p className="text-sm text-green-500">+3.2% cette semaine</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-orange-500" />
            <div>
              <h3 className="text-sm text-gray-600">Livraisons</h3>
              <p className="text-2xl font-bold text-gray-800">{transportData.livraisons}</p>
              <p className="text-sm text-blue-500">Cette semaine</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="text-sm text-gray-600">Routes Optimisées</h3>
              <p className="text-2xl font-bold text-gray-800">{transportData.routesOptimisees}</p>
              <p className="text-sm text-green-500">+12 aujourd'hui</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Nouvelle Optimisation de Route</h3>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Point de Départ</label>
            <input 
              type="text" 
              placeholder="Entrepôt A"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input 
              type="text" 
              placeholder="Zone de livraison"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de Véhicule</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Camion</option>
              <option>Van</option>
              <option>Poids lourd</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacité Max (kg)</label>
            <input 
              type="number" 
              placeholder="1000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Priorité</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Standard</option>
              <option>Urgent</option>
              <option>Express</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

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
          icon={Clock}
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
      default: return <Dashboard realTimeMetrics={realTimeMetrics} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  );
};

export default NeuralCommandCenter;
