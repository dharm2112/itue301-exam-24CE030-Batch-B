import React from 'react';

const AdminPanel = () => {
  return (
    <main className="container">
      <div className="admin-hero">
        <h1>⚙️ Admin Panel</h1>
        <p>QuickBite administration — lazy loaded via React.lazy() + Suspense</p>
      </div>

      <div className="admin-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <h3>Customers</h3>
          <div className="stat-value">10</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">🍽️</div>
          <h3>Restaurants</h3>
          <div className="stat-value">10</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📦</div>
          <h3>Orders</h3>
          <div className="stat-value">10+</div>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
