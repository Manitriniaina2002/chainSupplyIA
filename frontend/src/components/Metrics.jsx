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

const Metrics = ({ realTimeMetrics }) => (
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
          <BarChart className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600">Débit</h3>
            <p className="text-2xl font-bold text-gray-800">{realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].debit : 487}</p>
            <p className="text-sm text-gray-500">unités/heure</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-sm text-gray-600">Efficacité</h3>
            <p className="text-2xl font-bold text-gray-800">{realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].efficacite : 92.3}%</p>
            <p className="text-sm text-green-500">+2.1% aujourd'hui</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="text-sm text-gray-600">Commandes Actives</h3>
            <p className="text-2xl font-bold text-gray-800">{realTimeMetrics.length > 0 ? realTimeMetrics[realTimeMetrics.length - 1].commandes : 143}</p>
            <p className="text-sm text-gray-500">en cours</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-sm text-gray-600">Alertes</h3>
            <p className="text-2xl font-bold text-gray-800">2</p>
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

export default Metrics;
