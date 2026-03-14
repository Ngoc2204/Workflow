import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Bọc các route cần đăng nhập.
 * Nếu chưa login → chuyển về /login, giữ lại URL ban đầu trong state.
 */
export default function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
