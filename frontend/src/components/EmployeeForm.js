import React, { useState } from 'react';
import { Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';

const DEPARTMENTS  = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Design', 'Operations'];
const DESIGNATIONS = [
  'Junior Developer', 'Senior Developer', 'Team Lead', 'DevOps Engineer',
  'UI/UX Designer', 'Product Manager', 'HR Specialist', 'Financial Analyst',
  'Marketing Manager', 'Sales Executive', 'Operations Manager',
];

const initialState = {
  firstName: '', lastName: '', email: '',
  phone: '', department: '', designation: '',
  salary: '', joiningDate: '',
};

const EmployeeForm = ({ initial = {}, onSubmit, loading, error, submitLabel = 'Save' }) => {
  const [form,   setForm]   = useState({ ...initialState, ...initial });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())  e.firstName   = 'First name is required';
    if (!form.lastName.trim())   e.lastName    = 'Last name is required';
    if (!form.email.trim())      e.email       = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim())      e.phone       = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone))     e.phone = 'Must be 10 digits';
    if (!form.department)        e.department  = 'Department is required';
    if (!form.designation)       e.designation = 'Designation is required';
    if (!form.salary || Number(form.salary) <= 0) e.salary = 'Valid salary required';
    if (!form.joiningDate)       e.joiningDate = 'Joining date is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ ...form, salary: parseFloat(form.salary) });
  };

  const field = (label, name, type = 'text', props = {}) => (
    <Form.Group as={Col} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type} name={name} value={form[name]}
        onChange={handleChange} isInvalid={!!errors[name]}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2}>
        {field('First Name', 'firstName', 'text', { placeholder: 'Alice' })}
        {field('Last Name',  'lastName',  'text', { placeholder: 'Smith' })}
      </Row>
      <Row xs={1} md={2}>
        {field('Email', 'email', 'email', { placeholder: 'alice@company.com' })}
        {field('Phone', 'phone', 'text', { placeholder: '9876543210', maxLength: 10 })}
      </Row>
      <Row xs={1} md={2}>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Select name="department" value={form.department}
            onChange={handleChange} isInvalid={!!errors.department}>
            <option value="">Select department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Select name="designation" value={form.designation}
            onChange={handleChange} isInvalid={!!errors.designation}>
            <option value="">Select designation</option>
            {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.designation}</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row xs={1} md={2}>
        {field('Salary (₹)', 'salary', 'number', { placeholder: '50000', min: 1 })}
        {field('Joining Date', 'joiningDate', 'date')}
      </Row>

      <Button type="submit" variant="primary" className="mt-2 px-4" disabled={loading}>
        {loading ? <><Spinner size="sm" className="me-2" />Saving...</> : submitLabel}
      </Button>
    </Form>
  );
};

export default EmployeeForm;
