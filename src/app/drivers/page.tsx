// app/drivers/page.tsx
import DashboardLayout from '../components/layout';
import DriversTable from '../components/drivers/DriversTable';

export default function DriversPage() {
  return (
    <DashboardLayout>
      <DriversTable />
    </DashboardLayout>
  );
}