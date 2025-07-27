import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { isAdmin } from "../services/auth";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [error, setError] = useState("");

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/employees");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.createEmployee(employee);
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError("Failed to add employee. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSave}>
          <TextField
            label="Employee ID"
            name="empId"
            fullWidth
            margin="normal"
            value={employee.empId}
            onChange={handleChange}
            required
          />
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="emailId"
            type="email"
            fullWidth
            margin="normal"
            value={employee.emailId}
            onChange={handleChange}
            required
          />
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddEmployee;
