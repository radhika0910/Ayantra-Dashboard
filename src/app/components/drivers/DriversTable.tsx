// app/components/drivers/DriversTable.tsx
'use client';

import { useEffect, useState } from 'react';
import { Driver } from '@/lib/types';

interface DriverUser {
  id: number;
  name: string;
  email: string;
  clerk_id: string;
  role: string;
  verified: boolean | null;
}

interface DriversData {
  existingDrivers: Driver[];
  driverUsers: DriverUser[];
}

export default function DriversTable() {
  const [driversData, setDriversData] = useState<DriversData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<number | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch('/api/drivers');
        const data = await res.json();
        setDriversData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleVerify = async (userId: number, currentStatus: boolean | null) => {
    setVerifying(userId);
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          verified: !currentStatus,
        }),
      });

      if (response.ok) {
        // Update the local state with the new verification status
        setDriversData(prev => {
          if (!prev) return prev;
          
          return {
            ...prev,
            driverUsers: prev.driverUsers.map(user => 
              user.id === userId ? { ...user, verified: !user.verified } : user
            )
          };
        });
      } else {
        console.error('Failed to update driver verification');
      }
    } catch (error) {
      console.error('Error updating driver verification:', error);
    } finally {
      setVerifying(null);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading drivers data...</div>;
  }

  if (!driversData) {
    return <div className="text-center py-10">Failed to load drivers data</div>;
  }

  const { existingDrivers, driverUsers } = driversData;

  return (
    <div className="space-y-8">
      {/* Regular Drivers Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Registered Drivers</h2>
        {existingDrivers.length === 0 ? (
          <p className="text-gray-500">No registered drivers found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {existingDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.first_name} {driver.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.profile_image_url ? (
                        <img src={driver.profile_image_url} alt="Profile" className="h-10 w-10 rounded-full" />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.car_image_url ? (
                        <img src={driver.car_image_url} alt="Car" className="h-10 w-10 rounded" />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.car_seats}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.rating ? driver.rating.toString() : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.rides ? driver.rides.length : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Driver Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Users with Driver Role</h2>
        {driverUsers.length === 0 ? (
          <p className="text-gray-500">No users with driver role found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clerk ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {driverUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.clerk_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleVerify(user.id, user.verified)}
                        disabled={verifying === user.id}
                        className={`px-4 py-2 rounded-md text-white ${
                          user.verified 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        } ${verifying === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {verifying === user.id 
                          ? 'Processing...' 
                          : user.verified 
                            ? 'Unverify' 
                            : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}