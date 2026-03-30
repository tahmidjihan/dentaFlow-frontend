import Dashboard from '@/components/Dashboard';
import { DashboardGuard } from '@/components/DashboardGuard';

export default function DashboardPage() {
  return (
    <DashboardGuard>
      <Dashboard />;
    </DashboardGuard>
  );
}
