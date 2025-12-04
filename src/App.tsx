import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

// Color constants based on the provided config
// Aggie Maroon: #500000
// Aggie Dark Maroon: #3C0000
// Aggie Ochre: #D6D3C4 (Replacing Gold/Yellow)
// Aggie Navy: #2F3E51
// Aggie Gray: #707070
// Aggie Black: #000000
// Aggie Gray Light: #D1D1D1

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'John Aggie', email: 'jaggie@tamu.edu' });

  // Navigation handlers
  const handleLoginClick = () => setView('login');
  const handleSignupClick = () => setView('signup');
  const handleBackToHome = () => setView('landing');

  // Authentication handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <Landing onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      )}
      {view === 'login' && (
        <Login onLogin={handleLogin} onBackToHome={handleBackToHome} onSignupClick={handleSignupClick} />
      )}
      {view === 'signup' && (
        <Signup onSignup={handleSignup} onBackToHome={handleBackToHome} onLoginClick={handleLoginClick} />
      )}
      {view === 'dashboard' && (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;
