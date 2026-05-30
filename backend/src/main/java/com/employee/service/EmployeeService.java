package com.employee.service;

import com.employee.dto.*;
import com.employee.entity.Employee;
import com.employee.exception.*;
import com.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Business logic for Employee CRUD operations.
 */
@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // ── CREATE ────────────────────────────────────────────────

    public EmployeeResponse createEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException(
                "Employee with email " + request.getEmail() + " already exists");
        }

        Employee employee = mapToEntity(request);
        Employee saved    = employeeRepository.save(employee);
        return mapToResponse(saved);
    }

    // ── READ ALL ──────────────────────────────────────────────

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ── READ ONE ──────────────────────────────────────────────

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Employee not found with id: " + id));
        return mapToResponse(employee);
    }

    // ── UPDATE ────────────────────────────────────────────────

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Employee not found with id: " + id));

        // Check email conflict with other employees
        employeeRepository.findByEmail(request.getEmail()).ifPresent(e -> {
            if (!e.getId().equals(id)) {
                throw new DuplicateEmailException(
                    "Email " + request.getEmail() + " is already in use");
            }
        });

        // Apply updates
        existing.setFirstName(request.getFirstName());
        existing.setLastName(request.getLastName());
        existing.setEmail(request.getEmail());
        existing.setPhone(request.getPhone());
        existing.setDepartment(request.getDepartment());
        existing.setDesignation(request.getDesignation());
        existing.setSalary(request.getSalary());
        existing.setJoiningDate(request.getJoiningDate());

        return mapToResponse(employeeRepository.save(existing));
    }

    // ── DELETE ────────────────────────────────────────────────

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // ── SEARCH ────────────────────────────────────────────────

    public List<EmployeeResponse> searchEmployees(String keyword) {
        return employeeRepository.searchByKeyword(keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ── Mappers ───────────────────────────────────────────────

    private Employee mapToEntity(EmployeeRequest req) {
        return Employee.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .department(req.getDepartment())
                .designation(req.getDesignation())
                .salary(req.getSalary())
                .joiningDate(req.getJoiningDate())
                .build();
    }

    private EmployeeResponse mapToResponse(Employee emp) {
        return EmployeeResponse.builder()
                .id(emp.getId())
                .firstName(emp.getFirstName())
                .lastName(emp.getLastName())
                .fullName(emp.getFirstName() + " " + emp.getLastName())
                .email(emp.getEmail())
                .phone(emp.getPhone())
                .department(emp.getDepartment())
                .designation(emp.getDesignation())
                .salary(emp.getSalary())
                .joiningDate(emp.getJoiningDate())
                .createdAt(emp.getCreatedAt())
                .updatedAt(emp.getUpdatedAt())
                .build();
    }
}
