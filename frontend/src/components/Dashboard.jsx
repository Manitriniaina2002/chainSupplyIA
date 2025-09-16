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

const Dashboard = ({ realTimeMetrics, transportData }) => {
  const averageDebit = realTimeMetrics.length > 0 ? realTimeMetrics.reduce((a, b) => a + b.debit, 0) / realTimeMetrics.length : 65.4;
  const averageCommandes = realTimeMetrics.length > 0 ? realTimeMetrics.reduce((a, b) => a + b.commandes, 0) / realTimeMetrics.length : 140;
  const averageValue = averageCommandes * 9;
  const transportEfficiency = transportData.ponctualite || 92.3;
  const globalPerformance = (realTimeMetrics.length > 0 ? realTimeMetrics[0].efficacite : 94 + transportEfficiency) / 2;

  return (
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
};

export default Dashboard;
