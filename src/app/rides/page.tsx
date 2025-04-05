// app/rides/page.tsx
import DashboardLayout from '../components/layout';
import RidesTable from '../components/rides/RidesTable';

export default function RidesPage() {
  return (
    <DashboardLayout>
      <RidesTable />
    </DashboardLayout>
  );
}