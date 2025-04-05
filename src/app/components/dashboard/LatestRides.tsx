// app/components/dashboard/LatestRides.tsx
'use client';

import { useEffect, useState } from 'react';
import { Ride } from '@/lib/types';

export default function LatestRides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRides = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setRides(data.recentRides);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest rides:', error);
        setLoading(false);
      }
    };

    fetchLatestRides();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading latest rides...</div>;
  }

  if (!rides.length) {
    return <div className="text-center py-10">No recent rides found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Latest Rides</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rides.map((ride) => (
              <tr key={ride.ride_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ride.ride_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ride.origin_address.slice(0, 15)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ride.destination_address.slice(0, 15)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ride.user?.name || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ride.driver ? `${ride.driver.first_name} ${ride.driver.last_name}` : 'Unassigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ride.fare_price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ride.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride.status ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}