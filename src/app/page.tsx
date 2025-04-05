// app/page.tsx
import DashboardLayout from './components/layout';
import DashboardStats from './components/dashboard/DashboardStats';
import LatestRides from './components/dashboard/LatestRides';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardStats />
        <LatestRides />
      </div>
    </DashboardLayout>
  );
}