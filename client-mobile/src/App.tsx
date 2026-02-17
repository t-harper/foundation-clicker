import React, { useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MobileLoginPage } from './pages/MobileLoginPage';
import { MobileGamePage } from './pages/MobileGamePage';
import { NotificationArea } from '@desktop/components/common';
import { useNotifications } from '@desktop/hooks';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('foundation_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const navigate = useNavigate();
  const { notifications, removeNotification } = useNotifications();

  const handleLoginSuccess = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<MobileLoginPage onSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MobileGamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <NotificationArea
        notifications={notifications}
        onDismiss={removeNotification}
      />
    </>
  );
}
