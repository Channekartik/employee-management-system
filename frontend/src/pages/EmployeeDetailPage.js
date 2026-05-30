import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, Badge, Button,
  Breadcrumb, Alert
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout         from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth }    from '../context/AuthContext';
import employeeService from '../services/employeeService';

const deptColors = {
  Engineering: 'primary', Marketing: 'success', HR: 'info',
  Finance: 'warning', Sales: 'secondary', Design: 'danger',
};

const InfoRow = ({ icon, label, value }) => (
  <div className="d-flex align-items-start gap-3 py-2 border-bottom">
    <i className={`bi bi-${icon} text-primary mt-1`} style={{ minWidth: 20 }}></i>
    <div>
      <div className="text-muted small">{label}</div>
      <div className="fw-semibold">{value}</div>
    </div>
  </div>
);

const EmployeeDetailPage = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { isAdmin }  = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    employeeService.getById(id)
      .then(res => setEmployee(res.data))
      .catch(() => setError('Employee not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><LoadingSpinner message="Loading employee..." /></Layout>;

  if (error) return (
    <Layout>
      <Alert variant="danger">{error}</Alert>
      <Button variant="secondary" onClick={() => navigate('/employees')}>
        <i className="bi bi-arrow-left me-1"></i> Back to List
      </Button>
    </Layout>
  );

  return (
    <Layout>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }}>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/employees' }}>Employees</Breadcrumb.Item>
        <Breadcrumb.Item active>{employee.fullName}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Header card */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="d-flex align-items-center gap-4 p-4">
          {/* Avatar */}
          <div className="avatar-circle-lg bg-primary text-white">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>
          <div className="flex-grow-1">
            <h4 className="fw-bold mb-1">{employee.fullName}</h4>
            <p className="text-muted mb-1">{employee.designation}</p>
            <Badge bg={deptColors[employee.department] || 'secondary'}>
              {employee.department}
            </Badge>
          </div>
          {isAdmin && (
            <div className="d-flex gap-2">
              <Button
                variant="warning" size="sm"
                onClick={() => navigate(`/employees/edit/${employee.id}`)}>
                <i className="bi bi-pencil me-1"></i>Edit
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Details */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="fw-semibold bg-white border-bottom">
              <i className="bi bi-person-vcard me-2 text-primary"></i>Personal Info
            </Card.Header>
            <Card.Body>
              <InfoRow icon="envelope-fill"    label="Email"      value={employee.email} />
              <InfoRow icon="telephone-fill"   label="Phone"      value={employee.phone} />
              <InfoRow icon="calendar-event"   label="Joined"     value={new Date(employee.joiningDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="fw-semibold bg-white border-bottom">
              <i className="bi bi-briefcase-fill me-2 text-success"></i>Employment Info
            </Card.Header>
            <Card.Body>
              <InfoRow icon="diagram-3"        label="Department"  value={employee.department} />
              <InfoRow icon="award-fill"       label="Designation" value={employee.designation} />
              <InfoRow icon="currency-rupee"   label="Salary"      value={`₹ ${Number(employee.salary).toLocaleString('en-IN')}`} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="fw-semibold bg-white border-bottom">
              <i className="bi bi-clock-history me-2 text-secondary"></i>Record Info
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <InfoRow icon="plus-circle"   label="Created At" value={new Date(employee.createdAt).toLocaleString()} />
                </Col>
                <Col md={6}>
                  <InfoRow icon="pencil-square" label="Updated At" value={new Date(employee.updatedAt).toLocaleString()} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button variant="secondary" className="mt-4" onClick={() => navigate('/employees')}>
        <i className="bi bi-arrow-left me-1"></i>Back to List
      </Button>
    </Layout>
  );
};

export default EmployeeDetailPage;
