import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token') || undefined;
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
