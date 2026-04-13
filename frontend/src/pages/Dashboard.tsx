import { useAuth } from '@/contexts/AuthContext';
import PatientDashboard from '@/components/dashboard/PatientDashboard.tsx';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard.tsx';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based dashboard rendering
  if (user?.role === 'doctor' || user?.role === 'admin') {
    return <DoctorDashboard />;
  }

  return <PatientDashboard />;
}
