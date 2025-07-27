import axios from "axios";

export const setAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  // Attach token to all axios requests
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  delete axios.defaults.headers.common["Authorization"];
};

export const isAuthenticated = () => !!localStorage.getItem("token");
export const isAdmin = () => localStorage.getItem("role") === "ADMIN";

// Ensure axios always has token on page refresh
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
