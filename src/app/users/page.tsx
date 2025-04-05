// app/users/page.tsx
import DashboardLayout from '../components/layout';
import UsersTable from '../components/users/UsersTable';

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersTable />
    </DashboardLayout>
  );
}