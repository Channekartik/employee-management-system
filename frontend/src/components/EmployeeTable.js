import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const deptColors = {
  Engineering: 'primary',
  Marketing:   'success',
  HR:          'info',
  Finance:     'warning',
  Sales:       'secondary',
  Design:      'danger',
};

const EmployeeTable = ({ employees, onDelete }) => {
  const { isAdmin } = useAuth();
  const navigate    = useNavigate();

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-person-x fs-1 d-block mb-2"></i>
        No employees found.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Phone</th>
            <th>Salary (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id}>
              <td className="text-muted">{idx + 1}</td>
              <td>
                <div className="fw-semibold">{emp.fullName}</div>
              </td>
              <td className="text-muted small">{emp.email}</td>
              <td>
                <Badge bg={deptColors[emp.department] || 'secondary'}>
                  {emp.department}
                </Badge>
              </td>
              <td>{emp.designation}</td>
              <td>{emp.phone}</td>
              <td>{Number(emp.salary).toLocaleString('en-IN')}</td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    size="sm" variant="outline-info"
                    onClick={() => navigate(`/employees/${emp.id}`)}
                    title="View">
                    <i className="bi bi-eye"></i>
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        size="sm" variant="outline-warning"
                        onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        title="Edit">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        size="sm" variant="outline-danger"
                        onClick={() => onDelete(emp.id)}
                        title="Delete">
                        <i className="bi bi-trash"></i>
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
