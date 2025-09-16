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
const MetricCard = ({ icon: Icon, title, value, change, color = 'blue', className = '' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-purple-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    purple: 'from-purple-500 to-pink-500'
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
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

export default MetricCard;
