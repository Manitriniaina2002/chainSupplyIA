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

export default EquipmentCard;
