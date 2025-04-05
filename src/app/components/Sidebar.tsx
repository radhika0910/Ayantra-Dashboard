// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaCar, FaRoute } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/', icon: FaHome },
    { name: 'Drivers', href: '/drivers', icon: FaCar },
    { name: 'Rides', href: '/rides', icon: FaRoute },
    { name: 'Users', href: '/users', icon: FaUsers },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center space-x-2 px-4">
        <span className="text-2xl font-bold">Ayantra</span>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              pathname === item.href
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <item.icon className="mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;