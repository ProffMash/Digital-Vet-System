import { useState } from 'react';
import LandingPage from './landingPage';
import Dashboard from './userDashboard/dashboard';
import AdminDashboard from './adminDashboard/dashboard';
import Auth from './components/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (isAdmin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
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