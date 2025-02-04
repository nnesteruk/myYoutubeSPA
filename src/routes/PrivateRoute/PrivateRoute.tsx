import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
