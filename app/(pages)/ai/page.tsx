
'use client';
import PageHeader from "@/_components/fixed-components/PageHeader/PageHeader"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const performanceData = [
  { month: 'Jan', value: 35 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 55 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 75 },
  { month: 'Jun', value: 70 },
  { month: 'Jul', value: 85 },
  { month: 'Aug', value: 80 },
  { month: 'Sep', value: 88 },
  { month: 'Oct', value: 92 },
  { month: 'Nov', value: 95 },
  { month: 'Dec', value: 98 },
];

const efficiencyData = [
  { name: 'Optimal', value: 92 },
  { name: 'Needs Adjustment', value: 8 },
];

const COLORS = ['#4ade80', '#e5e7eb'];

export default function AiPage() {
  return (
    <>
      <PageHeader />
      <div className="w-full min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#4169b3' }}>AI-Powered Insights & Prediction</h1>
          <p className="text-sm mt-1" style={{ color: '#4169b3' }}>Last Update: 2Minutes ago</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Forecast */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#4169b3' }}>Performance Forecast</h2>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" style={{ color: '#4169b3' }}>next 3 days</button>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold">next 7 days</button>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold">next 30 days</button>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-4" style={{ color: '#4169b3' }}>Predicted Water Purity, Energy, Flow</p>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#4169b3" />
                  <YAxis stroke="#4169b3" />
                  <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #4169b3' }} />
                  <Line type="monotone" dataKey="value" stroke="#4169b3" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Alert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Imminent Filter Clog */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-red-700">Imminent Filter Clog</h3>
                </div>
                <p className="text-sm text-red-700 mb-3">Model predicts a 95% probability of a clog in filter block C within 2 days</p>
                <button className="text-red-600 font-semibold hover:underline">View Filter Details</button>
              </div>

              {/* Optimal Reuse Ratio */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold text-yellow-700">Optimal Reuse Ratio</h3>
                </div>
                <p className="text-sm text-yellow-700 mb-3">AI suggest adjusting the reuse ratio to 85% for maximum efficiency</p>
                <button className="text-yellow-600 font-semibold hover:underline">Adjust Ratios</button>
              </div>
            </div>
          </div>

          {/* Overall Plant Efficiency */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 w-full" style={{ color: '#4169b3' }}>Overall Plant Efficiency</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">Based on real-time data and predictive analytics</p>
            
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={efficiencyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-6 text-center">
              <p className="text-4xl font-bold" style={{ color: '#4169b3' }}>92%</p>
              <p className="text-lg font-semibold text-green-600 mt-2">Optimal</p>
              <p className="text-xs text-gray-600 mt-3">Efficiency is in the top 5% comperd to similar plants.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
