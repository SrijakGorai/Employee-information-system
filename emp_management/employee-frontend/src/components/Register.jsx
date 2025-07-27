import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Username already exists");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
