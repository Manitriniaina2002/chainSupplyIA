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

export default SidebarItem;
