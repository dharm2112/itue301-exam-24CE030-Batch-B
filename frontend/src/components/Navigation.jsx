import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { customer, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="nav-brand">
        QuickBite
      </Link>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/restaurants" className="nav-link">Restaurants</Link>
        <Link to="/order" className="nav-link">Order</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
      </nav>

      {token && (
        <div className="nav-user">
          <span className="user-badge">👋 {customer?.name || 'Customer'}</span>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;
