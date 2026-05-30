import React, { useState } from 'react';
import {
  Container, Row, Col, Card,
  Form, Button, Alert, Spinner
} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const LoginPage = () => {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState('');
  const [loading, setLoading] = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErr('');
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }

    setLoading(true);
    try {
      const { data } = await authService.login(form);
      login(data);
      navigate(from, { replace: true });
    } catch (err) {
      setApiErr(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={9} md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="fs-1 mb-2">🏢</div>
                  <h4 className="fw-bold">Employee Management</h4>
                  <p className="text-muted small">Sign in to your account</p>
                </div>

                {apiErr && (
                  <Alert variant="danger" dismissible onClose={() => setApiErr('')}>
                    {apiErr}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email" name="email" placeholder="you@company.com"
                      value={form.email} onChange={handleChange}
                      isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password" name="password" placeholder="••••••••"
                      value={form.password} onChange={handleChange}
                      isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold" disabled={loading}>
                    {loading ? <><Spinner size="sm" className="me-2" />Signing in...</> : 'Sign In'}
                  </Button>
                </Form>

                <hr />
                <p className="text-center mb-0 small">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-semibold">Register</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
