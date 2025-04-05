// app/components/dashboard/DashboardStats.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaCar, FaRoute, FaMoneyBill } from 'react-icons/fa';
import { DashboardStats as StatsType } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading dashboard data...</div>;
  }

  if (!stats) {
    return <div className="text-center py-10">Failed to load dashboard data</div>;
  }

//   const statCards
// app/components/dashboard/DashboardStats.tsx (continued)
const statCards = [
    {
      title: 'Total Rides',
      value: stats.totalRides,
      icon: FaRoute,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: FaCar,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `rs ${stats.totalRevenue.toFixed(2)}`,
      icon: FaMoneyBill,
      color: 'bg-yellow-500',
    },
  ];

  const chartData = [
    { name: 'Completed Rides', value: stats.completedRides },
    { name: 'Pending Rides', value: stats.pendingRides },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-500">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-lg shadow-md flex items-center"
          >
            <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
              <card.icon size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-500">Ride Status</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4C51BF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}