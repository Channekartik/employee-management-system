import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <div style={{ fontSize: '6rem' }}>🔍</div>
      <h1 className="fw-bold display-4 mt-2">404</h1>
      <h5 className="text-muted mb-4">Oops! Page not found.</h5>
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        <i className="bi bi-house me-1"></i>Back to Dashboard
      </Button>
    </Container>
  );
};

export default NotFoundPage;
