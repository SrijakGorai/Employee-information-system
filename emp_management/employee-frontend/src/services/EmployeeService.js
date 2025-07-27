// src/services/EmployeeService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/";

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

class EmployeeService {
  // GET all employees
  getEmployees() {
    return axiosInstance.get("viewAllEmp");
  }

  // POST create employee
  createEmployee(employee) {
    return axiosInstance.post("storeemp", employee);
  }

  // GET employee by ID
  getEmployeeById(id) {
    return axiosInstance.get(`emp/${id}`);
  }

  // PUT update employee
  updateEmployee(id, employee) {
    return axiosInstance.put(`update-employee/${id}`, employee);
  }

  // DELETE employee
  deleteEmployee(id) {
    return axiosInstance.delete(`del/${id}`);
  }
}

export default new EmployeeService();
