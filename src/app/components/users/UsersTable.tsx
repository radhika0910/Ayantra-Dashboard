// app/components/users/UsersTable.tsx
'use client';

import { useEffect, useState } from 'react';
import { User } from '@/lib/types';

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [roleFilter, setRoleFilter] = useState('all');
const filteredUsers = roleFilter === 'all' 
  ? users 
  : users.filter((user) => user.role === roleFilter);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading users data...</div>;
  }

  if (!users.length) {
    return <div className="text-center py-10">No users found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <div className="mb-4">
  <label className="mr-2">Filter by role:</label>
  <select 
    className="border rounded p-1" 
    value={roleFilter} 
    onChange={(e) => setRoleFilter(e.target.value)}
  >
    <option value="all">All Roles</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    {/* Add other roles as needed */}
  </select>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clerk ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rides</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.clerk_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.rides ? user.rides.length : 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
<td className="px-6 py-4 whitespace-nowrap">
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    {user.verified ? 'Verified' : 'Unverified'}
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