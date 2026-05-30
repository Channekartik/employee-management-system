import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute     from './routes/AdminRoute';

import LoginPage         from './pages/LoginPage';
import RegisterPage      from './pages/RegisterPage';
import DashboardPage     from './pages/DashboardPage';
import EmployeeListPage  from './pages/EmployeeListPage';
import AddEmployeePage   from './pages/AddEmployeePage';
import EditEmployeePage  from './pages/EditEmployeePage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import NotFoundPage      from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected — USER + ADMIN */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute><EmployeeListPage /></ProtectedRoute>
          } />
          <Route path="/employees/:id" element={
            <ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>
          } />

          {/* Admin only */}
          <Route path="/employees/add" element={
            <AdminRoute><AddEmployeePage /></AdminRoute>
          } />
          <Route path="/employees/edit/:id" element={
            <AdminRoute><EditEmployeePage /></AdminRoute>
          } />

          {/* Redirects */}
          <Route path="/"   element={<Navigate to="/dashboard" replace />} />
          <Route path="*"   element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
