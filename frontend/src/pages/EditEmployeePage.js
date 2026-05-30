import React, { useEffect, useState } from 'react';
import { Card, Breadcrumb, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout          from '../components/Layout';
import EmployeeForm    from '../components/EmployeeForm';
import LoadingSpinner  from '../components/LoadingSpinner';
import employeeService from '../services/employeeService';

const EditEmployeePage = () => {
  const { id }          = useParams();
  const navigate        = useNavigate();
  const [initial,  setInitial]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [fetchErr, setFetchErr] = useState('');
  const [saveErr,  setSaveErr]  = useState('');

  // Load existing employee data
  useEffect(() => {
    employeeService.getById(id)
      .then(res => {
        const e = res.data;
        setInitial({
          firstName:   e.firstName,
          lastName:    e.lastName,
          email:       e.email,
          phone:       e.phone,
          department:  e.department,
          designation: e.designation,
          salary:      String(e.salary),
          joiningDate: e.joiningDate,   // already "YYYY-MM-DD" from backend
        });
      })
      .catch(() => setFetchErr('Failed to load employee details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setSaveErr('');
    try {
      await employeeService.update(id, formData);
      navigate('/employees');
    } catch (err) {
      setSaveErr(err.response?.data?.message || 'Failed to update employee.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }}>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/employees' }}>Employees</Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Employee</Breadcrumb.Item>
      </Breadcrumb>

      <h4 className="fw-bold mb-4">
        <i className="bi bi-pencil-square me-2 text-warning"></i>Edit Employee
      </h4>

      {fetchErr && <Alert variant="danger">{fetchErr}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          {loading
            ? <LoadingSpinner message="Loading employee data..." />
            : initial && (
                <EmployeeForm
                  initial={initial}
                  onSubmit={handleSubmit}
                  loading={saving}
                  error={saveErr}
                  submitLabel="Update Employee"
                />
              )
          }
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default EditEmployeePage;
