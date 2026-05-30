import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Form,
  Button, Alert, Spinner, ListGroup
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const PWD_RULES = [
  { id: 'len',     label: 'At least 8 characters',          test: v => v.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter',            test: v => /[A-Z]/.test(v) },
  { id: 'lower',   label: 'One lowercase letter',            test: v => /[a-z]/.test(v) },
  { id: 'digit',   label: 'One digit (0–9)',                  test: v => /\d/.test(v) },
  { id: 'special', label: 'One special char (@$!%*?&)',       test: v => /[@$!%*?&]/.test(v) },
];

const RegisterPage = () => {
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!PWD_RULES.every(r => r.test(form.password))) e.password = 'Password does not meet requirements';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErr('');
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }

    setLoading(true);
    try {
      const { data } = await authService.register(form);
      login(data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setApiErr(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="fs-1 mb-2">✨</div>
                  <h4 className="fw-bold">Create Account</h4>
                  <p className="text-muted small">Join the system</p>
                </div>

                {apiErr && (
                  <Alert variant="danger" dismissible onClose={() => setApiErr('')}>{apiErr}</Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text" name="name" placeholder="Jane Doe"
                      value={form.name} onChange={handleChange}
                      isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email" name="email" placeholder="you@company.com"
                      value={form.email} onChange={handleChange}
                      isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password" name="password" placeholder="Create a strong password"
                      value={form.password} onChange={handleChange}
                      isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  {form.password && (
                    <ListGroup className="mb-3" style={{ fontSize: '0.82rem' }}>
                      {PWD_RULES.map(r => (
                        <ListGroup.Item key={r.id} className={`py-1 px-2 border-0 ${r.test(form.password) ? 'text-success' : 'text-danger'}`}>
                          {r.test(form.password) ? '✅' : '❌'} {r.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                  <Button type="submit" variant="primary" className="w-100 py-2 fw-semibold" disabled={loading}>
                    {loading ? <><Spinner size="sm" className="me-2" />Creating...</> : 'Create Account'}
                  </Button>
                </Form>
                <hr />
                <p className="text-center mb-0 small">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-semibold">Sign in</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
