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

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("isAdmin") || "false");
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAuthenticated, isAdmin]);

  const handleLogin = (isAdmin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
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
            {isAdmin ? (
              <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
            ) : (
              <Route path="/user-dashboard" element={<Dashboard onLogout={handleLogout} />} />
            )}
            <Route path="*" element={<Navigate to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
