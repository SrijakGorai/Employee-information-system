import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, isAdmin, logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Employee System
        </Typography>

        {loggedIn ? (
          <Box>
            <Button color="inherit" onClick={() => navigate("/employees")}>
              Employees
            </Button>
            {isAdmin() && (
              <Button color="inherit" onClick={() => navigate("/add-employee")}>
                Add Employee
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
