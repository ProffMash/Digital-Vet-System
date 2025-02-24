import { useState, useEffect } from "react";
import LandingPage from "./landingPage";
import Dashboard from "./userDashboard/dashboard";
import AdminDashboard from "./adminDashboard/dashboard";
import Auth from "./components/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAuthenticated, isAdmin]);

  const handleLogin = (isAdmin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
  };

  if (isAuthenticated) {
    return isAdmin ? (
      <AdminDashboard onLogout={handleLogout} />
    ) : (
      <Dashboard onLogout={handleLogout} />
    );
  }

  return (
    <div>
      <Auth onLogin={handleLogin} />
      <LandingPage />
    </div>
  );
}

export default App;
