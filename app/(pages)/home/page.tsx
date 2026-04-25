'use client';
import React, { useState } from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard from '@/_components/fixed-components/Dashboard/Dashboard';

const chartData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 110 },
  { month: 'Mar', value: 95 },
  { month: 'Apr', value: 130 },
  { month: 'May', value: 140 },
  { month: 'Jun', value: 125 },
  { month: 'Jul', value: 145 },
  { month: 'Aug', value: 155 },
  { month: 'Sep', value: 135 },
  { month: 'Oct', value: 140 },
  { month: 'Nov', value: 150 },
  { month: 'Dec', value: 140 },
];

export default function HomePage() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <>
      <Dashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
      <div className="w-full min-h-screen bg-#4196b3 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: '#4169b3' }}>Main Analytics</h1>
          <p className="text-sm mt-1" style={{ color: '#4169b3' }}>Last Update: 2Minutes ago</p>
        </div>
        <button 
          onClick={() => setIsDashboardOpen(true)}
          className="bg-blue-800 text-white hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold shadow-md transition-all " 
          style={{  border: '2px solid #4169b3' }}
        >
          View Dashboard
        </button>
      </div>

      {/* Alert Banner */}
      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <p className="font-semibold" style={{ color: '#4169b3' }}>Critical Alert pH Sensor Offline in Tank2.Immadiate attention rquired.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Water Quality Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#4169b3' }}>Water Quality(TDS)</h3>
          <div className="text-4xl font-bold mb-2" style={{ color: '#4169b3' }}>150 ppm</div>
          <div className="flex items-center gap-1 text-sm" style={{ color: '#4169b3' }}>
            <TrendingUp className="w-4 h-4" />
            <span>+1.5%</span>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#4169b3' }}>Water Temperature</h3>
          <div className="text-4xl font-bold mb-2" style={{ color: '#4169b3' }}>22°C</div>
          <div className="text-sm" style={{ color: '#4169b3' }}>Optimal Range</div>
        </div>

        {/* Recycled Water Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#4169b3' }}>Recycled Water</h3>
          <div className="text-4xl font-bold mb-2" style={{ color: '#4169b3' }}>50,000 L</div>
          <div className="text-sm" style={{ color: '#4169b3' }}>Total Volume</div>
        </div>
      </div>

      {/* Chart and Forecast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-1" style={{ color: '#4169b3' }}>Water Quality Over Time</h2>
            <p className="text-sm" style={{ color: '#4169b3' }}>150 ppm <span style={{ color: '#4169b3' }}>+1.5%</span></p>
            <p className="text-xs mt-1" style={{ color: '#4169b3' }}>Last 24 Hours</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#4169b3" />
              <YAxis stroke="#4169b3" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #4169b3' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4169b3" 
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Forecast */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">🤖</div>
            <h3 className="text-lg font-bold" style={{ color: '#4169b3' }}>AI Forecast</h3>
          </div>
          <p className="text-center" style={{ color: '#4169b3' }}>
            System is predicted to operate
          </p>
          <p className="text-2xl font-bold text-center my-3" style={{ color: '#4169b3' }}>
            at 92% efficiency
          </p>
          <p className="text-center text-sm" style={{ color: '#4169b3' }}>
            for the next 6 hours based on current trends
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
