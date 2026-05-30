import React from 'react';
import { Navbar as BsNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container fluid>
        <BsNavbar.Brand as={Link} to="/dashboard" className="fw-bold">
          <i className="bi bi-people-fill me-2 text-primary"></i>
          EMS
        </BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse>
          <Nav className="ms-auto align-items-center gap-2">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i>Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/employees">
                  <i className="bi bi-person-lines-fill me-1"></i>Employees
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to="/employees/add">
                    <i className="bi bi-person-plus-fill me-1"></i>Add Employee
                  </Nav.Link>
                )}
                <span className="text-light small border-start ps-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.name}{' '}
                  <Badge bg={isAdmin ? 'warning' : 'success'} text="dark">
                    {user?.role}
                  </Badge>
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
