import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { LandingPage } from '../pages/Landing';
import CampaignsPage from '../pages/Campaigns';
import { useAuth } from '../contexts/AuthContext';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/campaigns',
    element: (
      <ProtectedRoute>
        <CampaignsPage />
      </ProtectedRoute>
    ),
  },
  // Catch all route - redirect to home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]); 