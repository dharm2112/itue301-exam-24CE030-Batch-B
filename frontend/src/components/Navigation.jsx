import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/restaurants" style={{ marginRight: '1rem' }}>Restaurants</Link>
      <Link to="/order" style={{ marginRight: '1rem' }}>Order</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navigation;
