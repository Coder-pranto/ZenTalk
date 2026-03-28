import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to='/login' />;
};

export const PublicRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? <Navigate to='/' /> : children;
};

