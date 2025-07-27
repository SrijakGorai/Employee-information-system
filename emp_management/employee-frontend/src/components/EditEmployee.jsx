import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { isAdmin } from "../services/auth";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/employees"); // Redirect if user is not ADMIN
      return;
    }
    EmployeeService.getEmployeeById(id).then((res) => setEmployee(res.data));
  }, [id, navigate]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(id, employee).then(() =>
      navigate("/employees")
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Edit Employee
        </Typography>
        <form onSubmit={handleUpdate}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/employees")}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditEmployee;
