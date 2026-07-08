import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';
import ProfileSetup from './pages/Profile/ProfileSetup';
import UserProfile from './pages/Profile/UserProfile';
import EditProfile from './pages/Profile/EditProfile';
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
              <AuthenticatedLayout>
                <ComingSoon pageName="Dashboard" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ComingSoon pageName="Feed" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-knock"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ComingSoon pageName="Create Knock" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ComingSoon pageName="Marketplace" />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <UserProfile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <EditProfile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <EditProfile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ProfileSetup />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ComingSoon pageName="Settings" />
              </AuthenticatedLayout>
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
