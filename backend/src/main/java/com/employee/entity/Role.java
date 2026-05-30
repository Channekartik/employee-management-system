package com.employee.entity;

/**
 * Application roles for RBAC.
 * ADMIN  — full CRUD on employees.
 * USER   — read-only access.
 */
public enum Role {
    USER,
    ADMIN
}
