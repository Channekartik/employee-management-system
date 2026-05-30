import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, Button, InputGroup, Form, Alert, Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout       from '../components/Layout';
import EmployeeTable from '../components/EmployeeTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth }  from '../context/AuthContext';
import employeeService from '../services/employeeService';

const EmployeeListPage = () => {
  const { isAdmin }       = useAuth();
  const navigate          = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered,  setFiltered]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [search,    setSearch]    = useState('');
  const [deleteId,  setDeleteId]  = useState(null);
  const [deleting,  setDeleting]  = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await employeeService.getAll();
      setEmployees(data);
      setFiltered(data);
    } catch {
      setError('Failed to load employees.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  // Client-side filter
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(employees);
    } else {
      const kw = search.toLowerCase();
      setFiltered(employees.filter(e =>
        e.fullName.toLowerCase().includes(kw) ||
        e.department.toLowerCase().includes(kw) ||
        e.designation.toLowerCase().includes(kw) ||
        e.email.toLowerCase().includes(kw)
      ));
    }
  }, [search, employees]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await employeeService.remove(deleteId);
      setDeleteId(null);
      fetchEmployees();
    } catch {
      setError('Failed to delete employee.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">
            <i className="bi bi-person-lines-fill me-2 text-primary"></i>Employees
          </h4>
          <p className="text-muted small mb-0">{filtered.length} record(s) found</p>
        </div>
        {isAdmin && (
          <Button variant="primary" onClick={() => navigate('/employees/add')}>
            <i className="bi bi-plus-circle me-1"></i>Add Employee
          </Button>
        )}
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom pb-3">
          <InputGroup style={{ maxWidth: '360px' }}>
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control
              placeholder="Search by name, dept, role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <Button variant="outline-secondary" onClick={() => setSearch('')}>
                <i className="bi bi-x"></i>
              </Button>
            )}
          </InputGroup>
        </Card.Header>
        <Card.Body className="p-0">
          {loading
            ? <LoadingSpinner message="Loading employees..." />
            : <EmployeeTable employees={filtered} onDelete={setDeleteId} />
          }
        </Card.Body>
      </Card>

      {/* Confirm Delete Modal */}
      <Modal show={!!deleteId} onHide={() => setDeleteId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default EmployeeListPage;
