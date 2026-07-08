import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Application Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Feed" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-knock"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Create Knock" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Marketplace" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Profile" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ComingSoon pageName="Settings" />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
