import React, { useState } from 'react';
import { Card, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Layout        from '../components/Layout';
import EmployeeForm  from '../components/EmployeeForm';
import employeeService from '../services/employeeService';

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await employeeService.create(formData);
      navigate('/employees');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create employee.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }}>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/employees' }}>Employees</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Employee</Breadcrumb.Item>
      </Breadcrumb>

      <h4 className="fw-bold mb-4">
        <i className="bi bi-person-plus-fill me-2 text-primary"></i>Add New Employee
      </h4>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <EmployeeForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitLabel="Add Employee"
          />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default AddEmployeePage;
