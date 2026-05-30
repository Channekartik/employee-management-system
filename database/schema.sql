-- ============================================================
-- Employee Management System — MySQL Schema
-- Prodigy Infotech Task-02
-- ============================================================

CREATE DATABASE IF NOT EXISTS employee_mgmt_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE employee_mgmt_db;

-- ── Users Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)         NOT NULL,
    email      VARCHAR(150)         NOT NULL UNIQUE,
    password   VARCHAR(255)         NOT NULL,
    role       ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
    enabled    BOOLEAN              NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Employees Table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS employees (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name   VARCHAR(100)   NOT NULL,
    last_name    VARCHAR(100)   NOT NULL,
    email        VARCHAR(150)   NOT NULL UNIQUE,
    phone        VARCHAR(20)    NOT NULL,
    department   VARCHAR(100)   NOT NULL,
    designation  VARCHAR(100)   NOT NULL,
    salary       DECIMAL(12,2)  NOT NULL,
    joining_date DATE           NOT NULL,
    created_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Seed: Admin user  (password = Admin@1234) ─────────────────
INSERT INTO users (name, email, password, role) VALUES
('Super Admin',  'admin@company.com', '$2a$12$KIXwS1r0qBsBsK8mFqLfpua8i4NdBu9U/HSmJlF2bNgr6mzJ0x7bW', 'ADMIN'),
('Regular User', 'user@company.com',  '$2a$12$KIXwS1r0qBsBsK8mFqLfpua8i4NdBu9U/HSmJlF2bNgr6mzJ0x7bW', 'USER');

-- ── Seed: Sample employees ────────────────────────────────────
INSERT INTO employees (first_name, last_name, email, phone, department, designation, salary, joining_date) VALUES
('Alice',   'Johnson',  'alice.johnson@company.com',  '9876543210', 'Engineering',  'Senior Developer',   95000.00, '2021-03-15'),
('Bob',     'Smith',    'bob.smith@company.com',      '9876543211', 'Marketing',    'Marketing Manager',  75000.00, '2020-07-01'),
('Carol',   'Williams', 'carol.williams@company.com', '9876543212', 'HR',           'HR Specialist',      60000.00, '2022-01-10'),
('David',   'Brown',    'david.brown@company.com',    '9876543213', 'Finance',      'Financial Analyst',  80000.00, '2019-11-20'),
('Eva',     'Davis',    'eva.davis@company.com',      '9876543214', 'Engineering',  'DevOps Engineer',    90000.00, '2021-06-05'),
('Frank',   'Miller',   'frank.miller@company.com',   '9876543215', 'Sales',        'Sales Executive',    55000.00, '2023-02-14'),
('Grace',   'Wilson',   'grace.wilson@company.com',   '9876543216', 'Design',       'UI/UX Designer',     70000.00, '2022-08-22'),
('Henry',   'Moore',    'henry.moore@company.com',    '9876543217', 'Engineering',  'Backend Developer',  88000.00, '2020-04-30');
