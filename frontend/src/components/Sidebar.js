import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `sidebar-link d-flex align-items-center gap-2 px-3 py-2 rounded mb-1 text-decoration-none${
      isActive ? ' active' : ''
    }`;

  return (
    <div className="sidebar bg-dark text-white d-flex flex-column p-3"
         style={{ minHeight: '100vh', width: '220px', minWidth: '220px' }}>
      <div className="sidebar-brand mb-4 text-center">
        <i className="bi bi-people-fill fs-2 text-primary"></i>
        <div className="fw-bold mt-1">EMS Panel</div>
      </div>

      <Nav className="flex-column">
        <NavLink to="/dashboard"  className={linkClass}>
          <i className="bi bi-speedometer2"></i> Dashboard
        </NavLink>
        <NavLink to="/employees"  className={linkClass}>
          <i className="bi bi-person-lines-fill"></i> Employees
        </NavLink>
        {isAdmin && (
          <NavLink to="/employees/add" className={linkClass}>
            <i className="bi bi-person-plus-fill"></i> Add Employee
          </NavLink>
        )}
      </Nav>

      <div className="mt-auto text-muted small text-center pt-3 border-top border-secondary">
        Prodigy Infotech © 2024
      </div>
    </div>
  );
};

export default Sidebar;
