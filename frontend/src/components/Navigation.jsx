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
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/restaurants" style={{ marginRight: '1rem' }}>Restaurants</Link>
        <Link to="/order" style={{ marginRight: '1rem' }}>Order</Link>
        <Link to="/admin">Admin</Link>
      </div>

      {token && (
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, {customer?.name || 'Customer'}</span>
          <button onClick={handleLogout} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
