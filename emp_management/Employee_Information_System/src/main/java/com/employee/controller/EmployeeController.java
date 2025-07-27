package com.employee.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.employee.model.Employee;
import com.employee.service.EmployeeServices;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/")
public class EmployeeController {

    @Autowired
    EmployeeServices es;

    @GetMapping("/viewAllEmp")
    public List<Employee> getAllDetails() {
        return es.getAllEmployees();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/storeemp")
    public Employee createEmployee(@RequestBody Employee employee) {
        return es.storeEmployee(employee);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update-employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employeeDetails) {
        Employee emp = es.updateEmployee(employeeDetails, id);
        return ResponseEntity.ok(emp);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/del/{id}")
    public ResponseEntity<Map<String, Boolean>> delEmp(@PathVariable Integer id) {
        es.delete(id);
        Map<String, Boolean> res = new HashMap<>();
        res.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/emp/{id}")
    public Employee getEmpById(@PathVariable Integer id) {
        return es.getEmpById(id);
    }
}
