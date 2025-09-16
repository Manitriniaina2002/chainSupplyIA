import React, { useState, useEffect } from 'react'; // Ajout de useEffect ici
import axios from 'axios';
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

const Maintenance = ({ equipmentData }) => (
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

    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-sm text-gray-600">Équipements Opérationnels</h3>
            <p className="text-2xl font-bold text-gray-800">{equipmentData.filter(eq => eq.status === 'Bon').length}/4</p>
            <p className="text-sm text-gray-500">75% du parc</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="text-sm text-gray-600">Alertes Actives</h3>
            <p className="text-2xl font-bold text-gray-800">3</p>
            <p className="text-sm text-orange-500">1 critique</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600">Temps d'Arrêt Évité</h3>
            <p className="text-2xl font-bold text-gray-800">168h</p>
            <p className="text-sm text-red-500">-15% ce mois</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-sm text-gray-600">Économies Réalisées</h3>
            <p className="text-2xl font-bold text-gray-800">45,600€</p>
            <p className="text-sm text-green-500">+23% vs prévu</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-6">
      {equipmentData.map((eq, index) => (
        <EquipmentCard key={index} {...eq} />
      ))}
    </div>
  </div>
);

export default Maintenance;
