import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { isAdmin, logout } from "../services/auth";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      EmployeeService.deleteEmployee(id).then(() => {
        setEmployees(employees.filter((emp) => emp.id !== id));
      });
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employee List</Typography>
        <Box>
          {isAdmin() && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add-employee")}
              sx={{ mr: 2 }}
            >
              Add Employee
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Emp ID</b></TableCell>
              <TableCell><b>First Name</b></TableCell>
              <TableCell><b>Last Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              {isAdmin() && <TableCell><b>Actions</b></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.empId}</TableCell>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell>{emp.emailId}</TableCell>
                {isAdmin() && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => navigate(`/edit-employee/${emp.id}`)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
