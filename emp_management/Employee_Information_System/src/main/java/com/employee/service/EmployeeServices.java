package com.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;

@Service
public class EmployeeServices {

	@Autowired
	private EmployeeRepository er;

	public List<Employee> getAllEmployees()
	{
		return er.findAll();
	}
	
	
	public Employee storeEmployee(Employee emp) {
		return er.save(emp);
	}
	
	public Employee updateEmployee(Employee emp, Integer empId) {
		Employee employee = er.findById(empId).get();
		System.out.println(" Employee "+ employee);
		
		employee.setFirstName(emp.getFirstName());
		employee.setLastName(emp.getLastName());
		employee.setEmailId(emp.getEmailId());
		
		Employee updatedEmployee = er.save(employee);	
		System.out.println("End of the method updateEmployee()");
		
		return updatedEmployee;
	}
	
	public void delete(Integer id)
	{
		boolean flag=false;
		Employee emp=er.findById(id).get();
		er.delete(emp);
	}
	
	public Employee getEmpById(Integer id)
	{
		return er.findById(id).get();
	}
	
	
	
	
}
