import React, { useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { GamePage } from './pages/GamePage';
import { NotificationArea } from './components/common/NotificationArea';
import { useKeyboard, useNotifications } from './hooks';

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

  useKeyboard();

  const handleLoginSuccess = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GamePage />
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
