// app/components/Header.tsx
'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-200 p-2">
            <span className="font-medium text-gray-800">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}