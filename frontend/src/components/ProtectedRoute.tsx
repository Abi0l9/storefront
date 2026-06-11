import { Navigate } from 'react-router-dom';
import { statusPanel } from '../lib/styles';
import { useAuth } from '../state/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className={statusPanel}>Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
