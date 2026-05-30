package com.employee.controller;

import com.employee.dto.*;
import com.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Employee CRUD REST API.
 *
 * GET    /api/employees            → list all   (USER + ADMIN)
 * GET    /api/employees/{id}       → get one    (USER + ADMIN)
 * GET    /api/employees/search     → search     (USER + ADMIN)
 * POST   /api/employees            → create     (ADMIN only)
 * PUT    /api/employees/{id}       → update     (ADMIN only)
 * DELETE /api/employees/{id}       → delete     (ADMIN only)
 */
@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /** Get all employees */
    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    /** Get employee by ID */
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    /** Search employees by keyword */
    @GetMapping("/search")
    public ResponseEntity<List<EmployeeResponse>> searchEmployees(
            @RequestParam String keyword) {
        return ResponseEntity.ok(employeeService.searchEmployees(keyword));
    }

    /** Create a new employee (ADMIN only) */
    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.createEmployee(request));
    }

    /** Update an existing employee (ADMIN only) */
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, request));
    }

    /** Delete an employee (ADMIN only) */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
