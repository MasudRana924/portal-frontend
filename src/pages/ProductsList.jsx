import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, Sector, RadialBarChart, RadialBar } from 'recharts';

const ProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('https://portal-back-maxp.onrender.com/api/v1/dashboard');
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatChartData = (data) => {
    if (!data) return [];
    return Object.entries(data)
      .map(([name, value], index) => ({
        name: name.length > 20 ? `${name.substring(0, 20)}...` : name,
        fullName: name,
        value,
        fill: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
  };

  const COLORS = [
    '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',  // Modern blues and purples
    '#D946EF', '#EC4899', '#F43F5E', '#FB7185', '#FDA4AF',  // Modern pinks and reds
    '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#86EFAC'   // Modern greens
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <circle cx={cx} cy={cy} r={innerRadius} fill="white" />
        <text x={cx} y={cy} textAnchor="middle" fill="#333" className="text-lg font-semibold">
          {value}
        </text>
        <text x={cx} y={cy + 25} textAnchor="middle" fill="#666" className="text-sm">
          {payload.fullName}
        </text>
      </g>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="text-xl font-semibold text-gray-600 animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-xl text-red-600 bg-white p-4 rounded-lg shadow-lg">{error}</div>
      </div>
    );
  }

  const productTypeData = formatChartData(dashboardData?.productTypeChart);
  const kamData = formatChartData(dashboardData?.KAMChart);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="w-full mx-auto">
        <div className=" p-8 mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
            Dashboard Analytics
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Distribution</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <defs>
                      {productTypeData.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.3} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60} 
                      tick={{ fill: '#4B5563', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#4B5563' }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      name="Number of Products"
                      radius={[8, 8, 0, 0]}
                    >
                      {productTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">KAM Distribution</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient key={`pieGradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={kamData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      paddingAngle={4}
                    >
                      {kamData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#pieGradient-${index})`}
                          stroke="white"
                          strokeWidth={2}
                          className="transition-all duration-300"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;