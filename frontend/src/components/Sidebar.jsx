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

const Sidebar = ({ currentPage, setCurrentPage }) => (
  <div className="w-64 bg-white shadow-lg h-screen">
    <div className="p-6">
      <nav className="space-y-2">
        <SidebarItem
          icon={BarChart}
          label="Dashboard"
          active={currentPage === 'dashboard'}
          onClick={() => setCurrentPage('dashboard')}
        />
        <SidebarItem
          icon={TrendingUp}
          label="Prévision Demande"
          active={currentPage === 'prevision'}
          onClick={() => setCurrentPage('prevision')}
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

export default Sidebar;
