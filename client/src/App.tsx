import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./landingPage";
import Dashboard from "./userDashboard/dashboard";
import AdminDashboard from "./adminDashboard/dashboard";
import Auth from "./components/auth";

function App() {
  // Retrieve auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated") || "false");
  });

  const [userRole, setUserRole] = useState<string>(() => {
    return localStorage.getItem("userRole") || "";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("userRole", userRole);
  }, [isAuthenticated, userRole]);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            {userRole === "admin" ? (
              <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
            ) : (
              <Route path="/user-dashboard" element={<Dashboard onLogout={handleLogout} />} />
            )}
            <Route path="*" element={<Navigate to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;