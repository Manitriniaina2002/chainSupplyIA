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

const Prediction = ({ predictionData }) => (
  <div className="p-8">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Prévision Demande</h1>
        <p className="text-gray-600">Prédictions basées sur les données historiques</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Prévisions de Demande</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={predictionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-gray-600">Moyenne prévue : {predictionData.reduce((a, b) => a + b.value, 0) / predictionData.length || 0}</p>
    </div>
  </div>
);

export default Prediction;
