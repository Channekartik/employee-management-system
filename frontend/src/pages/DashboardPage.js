import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import employeeService from '../services/employeeService';

const StatCard = ({ icon, label, value, bg }) => (
  <Card className={`border-0 text-white bg-${bg} shadow-sm`}>
    <Card.Body className="d-flex align-items-center gap-3">
      <i className={`bi bi-${icon} fs-1 opacity-75`}></i>
      <div>
        <div className="fs-2 fw-bold">{value}</div>
        <div className="small opacity-75">{label}</div>
      </div>
    </Card.Body>
  </Card>
);

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    employeeService.getAll()
      .then(res => setEmployees(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <Layout>
      <div className="mb-4">
        <h4 className="fw-bold">Welcome back, {user?.name}! 👋</h4>
        <p className="text-muted">
          You are signed in as{' '}
          <Badge bg={isAdmin ? 'warning' : 'success'} text="dark">{user?.role}</Badge>
        </p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <Row className="g-3 mb-4">
            <Col xs={12} sm={6} xl={3}>
              <StatCard icon="people-fill" label="Total Employees" value={employees.length} bg="primary" />
            </Col>
            <Col xs={12} sm={6} xl={3}>
              <StatCard icon="diagram-3-fill" label="Departments" value={departments.length} bg="success" />
            </Col>
            <Col xs={12} sm={6} xl={3}>
              <StatCard icon="person-check-fill" label="Active Users" value={employees.length} bg="info" />
            </Col>
            <Col xs={12} sm={6} xl={3}>
              <StatCard icon="shield-lock-fill" label="Your Role" value={user?.role} bg={isAdmin ? 'warning' : 'secondary'} />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="fw-semibold bg-white border-bottom">
                  <i className="bi bi-diagram-3 me-2 text-primary"></i>Departments
                </Card.Header>
                <Card.Body>
                  {departments.map(dep => {
                    const count = employees.filter(e => e.department === dep).length;
                    return (
                      <div key={dep} className="d-flex justify-content-between align-items-center mb-2">
                        <span>{dep}</span>
                        <Badge bg="primary" pill>{count}</Badge>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="fw-semibold bg-white border-bottom">
                  <i className="bi bi-clock-history me-2 text-success"></i>Recent Employees
                </Card.Header>
                <Card.Body className="p-0">
                  {employees.slice(0, 5).map(emp => (
                    <div key={emp.id}
                      className="d-flex align-items-center gap-3 px-3 py-2 border-bottom">
                      <div className="avatar-circle bg-primary text-white">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <div>
                        <div className="fw-semibold small">{emp.fullName}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{emp.designation}</div>
                      </div>
                      <Badge bg="light" text="dark" className="ms-auto">{emp.department}</Badge>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default DashboardPage;
