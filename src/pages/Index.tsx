
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import SuperAdminPanel from '../components/super-admin/SuperAdminPanel';

const Index = () => {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  switch (user.role) {
    case 'super-admin':
      return <SuperAdminPanel user={user} onLogout={() => setUser(null)} />;
    case 'admin':
      return <AdminDashboard user={user} onLogout={() => setUser(null)} />;
    case 'employee':
      return <EmployeeDashboard user={user} onLogout={() => setUser(null)} />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default Index;
