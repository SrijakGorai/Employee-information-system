import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuth } from "../services/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Save token and role
      setAuth(res.data.token, res.data.role);

      // Redirect to employee list
      navigate("/employees");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/register")}>
            Register
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
