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

const Transport = ({ transportData }) => (
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
            <p className="text-2xl font-bold text-gray-800">{transportData.economies}€</p>
            <p className="text-sm text-green-500">+25% ce mois</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-sm text-gray-600">Taux de Ponctualité</h3>
            <p className="text-2xl font-bold text-gray-800">{transportData.ponctualite}%</p>
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

export default Transport;
